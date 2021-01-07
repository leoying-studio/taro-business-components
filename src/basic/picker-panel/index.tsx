import React, {
  Children,
  CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";
import Taro from "@tarojs/taro";
import {
  PickerView,
  PickerViewColumn,
  View,
  Button,
  Text,
} from "@tarojs/components";
import { useOverlay } from "@/hooks/useOverlay";

interface PickerOuterProps {
  onCancel?: () => void;
  onConfirm: () => void;
}

const PickerPanel: React.FC<PickerOuterProps> = function (props) {
 const overlay = useOverlay();

 const textStyle = {};

 const headerStyle = {
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingLeft: '30rpx',
   paddingRight: '30rpx',
   paddingTop: '20rpx',
   paddingBottom: '20rpx',
   fontSize: '30rpx',
   backgroundColor: 'white'
 };

  return (
    <View>
      <View style={headerStyle}>
        <Text
          onClick={() => {
            if (props.onCancel) {
              props.onCancel();
            } else {
              overlay.close();
            }
          }}
        >
          取消
        </Text>
        <Text
          onClick={() => {
            props.onConfirm && props.onConfirm();
          }}
        >
          确定
        </Text>
      </View>
      {props.children}
    </View>
  );
};

export default PickerPanel;