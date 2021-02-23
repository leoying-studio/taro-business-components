import React, { Component, CSSProperties, useState } from "react";
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import PickerPanel from "./../picker-panel";
import { PickerPropsStyle } from "./../_interface/picker";
import utils from "./../_utils/date";
import { formatDate } from "@/utils/date";

export interface DatePickerProps extends PickerPropsStyle {
  onChoose: (value: PostDate, handleType?: "onChange" | "onConfirm") => void;
  date?: string;
  minDate?: string;
  maxDate?: string;
  mode?: "date" | "year-month" | "year"
}

interface DatePickerState {
  value: number[];
}

interface PostDate {
  year?: number | string;
  day?: number | string;
  month?: number | string;
}

export default class DatePicker extends Component<
  DatePickerProps,
  DatePickerState
> {

  static defaultPorps = {
     date: formatDate(new Date(), 'yyyy-MM-dd'),
     mode: 'date'
  }
  /**
   * 存数据源
   */
  private sources: [][] = [];

  private postdate: PostDate = {};

  constructor(props) {
    super(props);
    console.log(props, 'props.date')
    const value = props.date
      ? this.getValues(props.date)
      : utils.getToDayIndexs();

    this.state = {
      value,
    };
  }

  private handleChange(value, handleType: 'onChange' | 'onConfirm' = "onChange") {
    const {onChoose} = this.props;
    this.setPostDate(value);
    value = this.getValues(Object.values(this.postdate).join('-'));
    this.setPostDate(value);
    const nextState = { value };
    this.setState(nextState, () => {
      onChoose && onChoose({ ...nextState, ...this.postdate }, handleType);
    });
  }

  private setPostDate(value) {
    const [years, months = [], days = []] = this.sources;
    const [yIndex, mIndex, dIndex] = value;
    const justIndex = utils.adjustDayIndex( years[yIndex], months[mIndex || 0]);
    const dayIndex = dIndex > justIndex ? justIndex :dIndex;
    this.postdate = {
      year: years[yIndex],
      month: months[mIndex] || '01',
      day: days[dayIndex] || '01',
    };
  }

  private getValues(date: string) {
    const { minDate, maxDate } = this.props;
    const result = utils.compareSize(date, minDate, maxDate);
    if (result === "lt") {
      return utils.findIndexs(minDate as string);
    }

    if (result === "gt") {
      return utils.findIndexs(maxDate as string);
    }

    return utils.findIndexs(date);
  }

  private getSource() {
    const { year = 1940, month = 1, day = 1 } = this.postdate;
    const { mode = "date" } = this.props;
    const { years, months, days } = utils.createSource(
      year as number,
      month as number
    );
    if (mode === "date") {
      return [years, months, days];
    }
    if (mode === "year-month") {
      return [years, months];
    }
    return [years];
  }

  onChange = (e) => {
    const val = e.detail.value;
    this.handleChange(val);
  };

  private getStyle = (index, col): CSSProperties => {
    const { activeTextStyle, textStyle = {} } = this.props;
    const active = index === this.state.value[col];
    if (active && activeTextStyle) {
      return activeTextStyle;
    }
    return {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      height: 34 + "px",
      lineHeight: 34 + "px",
      fontWeight: active ? 600 : 400,
      color: active ? "#FF3C4B" : "#000000",
      ...textStyle,
    };
  };

  render() {
    const { columnStyle = {}, style = {} } = this.props;
    this.sources = this.getSource() as [][];

    return (
      <PickerPanel
        onConfirm={() => {
          this.handleChange(this.state.value, "onConfirm");
        }}
      >
        <PickerView
          indicatorStyle="height: 34px;"
          style={{
            backgroundColor: "#ffffff",
            ...style,
          }}
          value={this.state.value}
          onChange={this.onChange}
        >
          {this.sources.map((list, col) => {
            const unitText = col === 0 ? "年" : col === 1 ? "月" : "日";
            return (
              <PickerViewColumn
                style={{
                  textAlign: "center",
                  height: "250rpx",
                  ...columnStyle,
                }}
              >
                {list.map((item, index) => {
                  return (
                    <View style={this.getStyle(index, col)}>
                      {item < 10 ? '0' + item : item}
                      {unitText}
                    </View>
                  );
                })}
              </PickerViewColumn>
            );
          })}
        </PickerView>
      </PickerPanel>
    );
  }
}
