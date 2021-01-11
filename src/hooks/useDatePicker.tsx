import React, { useRef, useState, useEffect, useContext } from "react";
import Taro from "@tarojs/taro";
import {  } from "./useTopView";
import { View, Text } from "@tarojs/components";
import DateView from "@/basic/date-view";
import { useOverlay } from "./useOverlay";

const useDatePicker = () => {
    const overlay = useOverlay();

    const show = function(props) {
        overlay.show(() => {
            return (
                <View className="panel">
                    <DateView {...props}></DateView>
                </View>
            )
        }, {
            type: 'slid-up'
        })
    }
    return {...overlay, show}
};

export { useDatePicker };
