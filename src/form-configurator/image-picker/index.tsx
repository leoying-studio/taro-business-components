import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Input, Picker, ScrollView } from '@tarojs/components';
import { AtButton, AtIcon, AtImagePicker, AtList, AtListItem, AtSwitch } from 'taro-ui';
import './index.scss';

const ImagePicker = () => {

    return (
        <View>
            <View className="photo-list">
                <View className="photo-item">
                    <View className="inner">
                        <AtIcon className="" value="add" color="#C7C8C8"></AtIcon>
                        <View className="counter-text">1/9</View>
                    </View>
                </View>
            </View>
        </View>
    )

}