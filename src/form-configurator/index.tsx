import React, { Component, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Input, Picker, ScrollView } from '@tarojs/components'
import { AtButton, AtIcon, AtImagePicker, AtList, AtListItem, AtSwitch } from 'src/image-picker/node_modules/taro-ui';
import Taro, { Current, render, useRouter } from '@tarojs/taro';
import CityPicker from '../city-picker';
import ImagePicker from '../image-picker';
import './index.scss';
import { ConfigurationProps } from './static';

const FormConfigurator:React.FC<ConfigurationProps> = function({dataSource}) {
    const [values, setValues] = useState({});
    const cityRef = useState<CityPicker>();

    const renderListItem = (item, index) => {
        const renderRight = () => {
            if (item.type === 'input') {
                return <Input
                    className="input"
                    type={item.inputType}
                    value={values[item.key]}
                    placeholder={item.placeholder}
                    onInput={(e) => {
                        setValues((preValues) => {
                            return {
                                ...preValues,
                                [item.key]: e.detail.value
                            }
                        })
                    }}
                    maxlength={item.maxlength}></Input>
            }

            if (item.type === 'switch') {
                return <AtSwitch checked={!!values[item.key]} color="#FF345F" onChange={(e) => {
                    setValues((preValues) => {
                        return {
                            ...preValues,
                            [item.key]: e
                        }
                    })
                }} />
            }

            const currentVal = values[item.key];
            const className = typeof currentVal !== 'undefined' ? 'placeholder selector' : 'placeholder';
            const option = item.options && item.options.find((option) => option.value === Number(currentVal));
            let content = option ? option.label : currentVal ? currentVal : item.placeholder;

            if (item.type === 'city') {
                if (values[item.key] && cityRef.current) {
                    const { current } = cityRef.current?.getCurrentCity(values[item.key]);
                    content = current[0].name + ' ' + current[1].name
                }
            }
            return <Text className={className}>{content}</Text>
        }

        const className = item.required ? 'label required' : 'label';
        const hintStyle = item.type === 'switch' ? 'font-weight: 400;' : 'font-weight: 500;';
        const innerView = (
            <View className="card card-item">
                <View>
                    <View>
                        <Text className={className}>{item.label}</Text>
                    </View>
                    {item.hint ? <Text className="hint"
                        style={hintStyle}>{item.hint}</Text> : null}
                </View>
                {renderRight()}
            </View>
        )

        if (item.type === 'picker') {
            let value = (item.options).findIndex((option) => {
                if (item.key === 'height') {
                    if (!values[item.key]) {
                        return option.value === 170;
                    }
                }
                return option.value === values[item.key]
            })
            value = value < 0 ? 0 : value;
            // picker 的value 为索引
            return (
                <Picker
                    mode="selector"
                    value={value}
                    range={item.options} rangeKey="label"
                    onChange={(e) => {
                        setValues((preValues) => {
                            return {
                                ...preValues,
                                [item.key]: item.options[e.detail.value].value
                            }
                        })
                    }}>
                    {innerView}
                </Picker>
            )
        } else if (item.type === 'datepicker') {
            return (
                <Picker
                    mode="date"
                    value={ values[item.key]}
                    onChange={(e) => {
                        setValues((preValues) => {
                            return {
                                ...preValues,
                                [item.key]: e.detail.value
                            }
                        })
                    }}>
                    {innerView}
                </Picker>
            )
        } else if (item.type === 'city') {
            return (
                <CityPicker
                    ref={cityRef}
                    id={values[item.key]}
                    onGetRegion={(region) => {
                        let cityCode = region[1]?.id
                        setValues((preValues) => {
                            return {
                                ...preValues,
                                [item.key]: String(cityCode)?.slice(0, 4)
                            }
                        })
                    }}>
                    {innerView}
                </CityPicker>
            )
        } else if (item.type === 'imagepicker') {
            const value = values[item.key] ? values[item.key].split(',').map((item, value) => {
                return {
                    url: item,
                    file: {
                        path: item,
                        size: 0
                    }
                }
            }) : []
            const count = values[item.key]  ? 9 - values[item.key].split(',').length : 9;
            return (
                <View className="card card-photo">
                    <View className="headline required">上传生活照</View>
                    <ImagePicker></ImagePicker>
                </View>
            )
        }
        return innerView;
    }

    return (
        <View className="root">
            <View className="list">
                {dataSource.map(renderListItem)}
            </View>
        </View>
    )
}

export default FormConfigurator;
