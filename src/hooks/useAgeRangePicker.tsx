import React, { useRef, useState, useEffect, useContext } from "react";
import Taro from "@tarojs/taro";
import {  } from "./useTopView";
import { View, Text } from "@tarojs/components";
import AgeRangePicker, { AgeRangePickerProps } from "@/basic/age-range-picker";
import { useOverlay } from "./useOverlay";

const useAgeRangePicker = () => {
    const overlay = useOverlay();

    const show = function(props: AgeRangePickerProps) {
        overlay.show(() => {
            return (
                <View className="panel">
                    <AgeRangePicker {...props}></AgeRangePicker>
                </View>
            )
        }, {
            type: 'slid-up'
        })
    }
    return {...overlay, show}
};

export { useAgeRangePicker };
