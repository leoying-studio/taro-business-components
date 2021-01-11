import * as React from "react";
import { View, Text, Image, Input, Swiper, Icon } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";
const Api = {};
interface State {
  phone: string;
  code: string;
  countdown: number;
}
// 业务组件, 用的时候拷贝出，然后复制修改
const REG = /^[1][3,4,5,7,8,9][0-9]{9}$/;
const COUNT_DOWN = 61;

class Login extends React.Component<any, State> {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      code: "",
      countdown: COUNT_DOWN,
    };
  }

  private timer: NodeJS.Timeout | number = 0;

  setCountdown(reset?: boolean) {
    if (reset) {
      clearInterval(this.timer as number);
      return this.setState({
        countdown: COUNT_DOWN,
      });
    }
    this.timer = setInterval(() => {
      this.setState((preState) => {
        if (preState.countdown === 1) {
          clearInterval(this.timer as number);
        }
        return {
          ...preState,
          countdown:
            preState.countdown === 1 ? COUNT_DOWN : preState.countdown - 1,
        };
      });
    }, 1000);
  }

  sendVerificationCode = (sendable: boolean) => {
    if (!sendable) {
      return;
    }
    this.setState({
      countdown: COUNT_DOWN - 1,
    });
    Api.verify
      .getCode({
        serviceCode: 5 as number,
        verifyType: "0" as string,
        verifyKey: this.state.phone,
      })
      .then((res) => {
        this.setCountdown();
      })
      .catch((e) => {
        this.setState({
          countdown: COUNT_DOWN,
        });
        Taro.showToast({
          icon: "none",
          title: e.message,
        });
      });
  };

  submitPhone = () => {
    const { phone, code } = this.state;
    if (!phone) {
      return Taro.showToast({ icon: "none", title: "请输入手机号" });
    }
    if (!REG.test(phone)) {
      return Taro.showToast({ icon: "none", title: "手机号不合法" });
    }
    if (code.length < 4) {
      return Taro.showToast({ icon: "none", title: "请输入4位验证码" });
    }
    Taro.showLoading({
      title: "正在提交...",
    });
    Api.appletsUserInfos.bindPhone({ phone, verifyCode: code }).then((res) => {
      if (!res) {
        return Taro.showToast({
          title: "手机号码和验证码不匹配",
        });
      }
      Taro.hideLoading();
      this.setCountdown(true);
      Taro.navigateTo({
        url: "/pages/index/identification-result/index",
      });
      //    const loginInfo = getLoginInfo();
      //    (loginInfo as {user: {phone: string}}).user.phone = phone as string;
      //    setCahce('login', loginInfo)
      // 	}).catch((e) => {
      // 		console.log('e', e)
      // 		Taro.hideLoading();
      // 		Taro.showToast({
      //       title: e.msg,
      //       icon: 'none'
      // 	});
    });
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {
    this.setCountdown(true);
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { countdown, phone } = this.state;
    const sendable = countdown === COUNT_DOWN && REG.test(phone);
    const hint =
      countdown === COUNT_DOWN - 1
        ? "正在发送"
        : countdown < COUNT_DOWN
        ? `${countdown}秒后发送`
        : "获取验证码";
    return (
      <View className="login-panel">
        <View className="submit-wrapper">
          <View className="input-box">
            <Input
              placeholder="请输入手机号"
              placeholderClass="placeholder-input"
              value={this.state.phone as string}
              type="number"
              maxlength={11}
              onInput={(event) => {
                this.setState({
                  phone: event.detail.value,
                });
              }}
            ></Input>
          </View>
          <View className="input-box verification-code">
            <Input
              placeholder="请输入验证码"
              placeholderClass="placeholder-input"
              value={this.state.code as string}
              type="number"
              maxlength={4}
              onInput={(event) => {
                this.setState({
                  code: event.detail.value,
                });
              }}
            ></Input>
            <View
              className="text-wrapper"
              onClick={() => this.sendVerificationCode(sendable)}
            >
              <Text className="text" style={`opacity: ${sendable ? 1 : 0.5}`}>
                {hint}
              </Text>
            </View>
          </View>
          <View className="btn btn-custom" onClick={this.submitPhone}>
            <Text>登录</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
