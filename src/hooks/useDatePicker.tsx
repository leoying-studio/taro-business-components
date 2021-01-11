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
               
                    <DateView {...props}></DateView>
            )
        }, {
            type: 'slid-up'
        })
    }
    return {...overlay, show}
};

export { useDatePicker };
