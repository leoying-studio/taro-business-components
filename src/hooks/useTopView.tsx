import { View, PageMeta } from '@tarojs/components';
import React, { Fragment, ReactNode, useCallback, useRef, useState } from 'react';

interface OverlayProps {
    popup: (Comp: React.FC, options?:TopViewOptions ) => Promise<void>
    close: () => void
    topView: React.ReactNode
}

export interface TopViewOptions {
    closeable?: boolean
}
let timer: NodeJS.Timeout | Number = 0;
export const TopContext = React.createContext({} as OverlayProps);
export const TopProvider = function(props) {
    const [topView, setTopView] = useState<React.ReactNode>(null);
    // 解决冒泡事件问题
    const cushion = useRef(false);

    const updateCushion = function() {
        cushion.current = true;
        clearTimeout(timer as NodeJS.Timeout);
        timer = setTimeout(() => {
            cushion.current = false;
        }, 400)
    }
    
    const popup = useCallback((Comp: React.FC, options: TopViewOptions = {}):Promise<undefined> => {
        const {closeable = true} = options;
        return new Promise((resolve) => {
            const com =(
                <View className="top-view" onClick={() => {
                    if (!cushion.current && closeable) {
                        resolve();
                        setTopView(null);
                    }
                }}>
                    <Comp />
                </View>
            )
           updateCushion();
           setTopView(com);
        })
    }, [])

    const close = useCallback(() => {
        setTopView(null);
    }, []) 

    return (
        <TopContext.Provider value={{popup, close, topView}}>
            {props.children}
        </TopContext.Provider>
    )
}