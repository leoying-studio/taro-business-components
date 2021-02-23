import React, { useRef, useState, useEffect, useContext, CSSProperties } from "react";
import Taro from "@tarojs/taro";
import { TopContext, TopViewOptions } from "./useTopView";
import { View } from "@tarojs/components";

interface overlayOptionsProps extends TopViewOptions {
    type?: 'fade' | 'slid-up'
}

const useOverlay = () => {
    const {popup, close, topView} = useContext(TopContext)

    useEffect(() => {
        // return () => {
        //     close && close();
        // }
    }, [])

    function show(Comp: React.FC, options: overlayOptionsProps ={}) {

        const innerContaiStyle: CSSProperties = options.type === 'slid-up' ? {
            flexDirection: 'column',
            justifyContent: 'flex-end'
        } : {
            justifyContent: 'center',
            alignItems: 'center'
        }

       return popup(() => {
            return (
                <View 
                    onClick={(e) => {
                    
                    }}
                    style={{  width: '100%',
                    height: 100 + 'vh',
                    display: 'flex', ...innerContaiStyle}}>
                    <View onClick={(e) => {
                        e.stopPropagation()
                    }}>
                     <Comp></Comp>
                    </View>
                   
                </View>
            )
        }, options)
    }

    return {show, close, overlayView: topView}
};

export { useOverlay };
