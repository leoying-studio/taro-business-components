import React, { useRef, useState, useEffect, useContext } from "react";
import Taro from "@tarojs/taro";
import {  } from "./useTopView";
import { View, Text } from "@tarojs/components";
import RegionView from "@/basic/region-view";
import { useOverlay } from "./useOverlay";

const useRegionPicker = () => {
    const overlay = useOverlay();

    const show = function(props) {
        overlay.show(() => {
            return (
                <View className="panel">
                    <RegionView {...props}></RegionView>
                </View>
            )
        }, {
            type: 'slid-up'
        })
    }
    return {...overlay, show}
};

export { useRegionPicker };
