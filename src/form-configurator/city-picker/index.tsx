import React, { Component } from 'react'
import { View, Text, Picker } from '@tarojs/components'
import Taro, { render, useRouter } from '@tarojs/taro';
import './index.scss'
import region from './region.json'

interface RegionProps {
    id: string
    onGetRegion:(region) => void
}

export interface CurrentCity {
    value: number[],
    current: Array<any>
}

export default class TaroRegionPicker extends Component<RegionProps, any> {
    state = {
        region: '请选择省市区',
        // H5、微信小程序、百度小程序、字节跳动小程序
        range: [],
        value: [0, 0],
        // 支付宝小程序
        list: []
    }

    componentWillMount() {
        // 省市区选择器初始化
        // H5、微信小程序、百度小程序、字节跳动小程序
        let range = this.state.range;
        let temp = [];
        for (let i = 0; i < region.length; i++) {
            temp.push(region[i]);
        }
        range.push(temp);
        temp = [];
        for (let i = 0; i < region[0].childArea.length; i++) {
            temp.push(region[0].childArea[i]);
        }
        range.push(temp);
        this.setState({
            range: range
        })
    }

    public getCurrentCity  = (id) => {
        if (!id) {
            return {
                value: [0, 0],
                current: [region[0], region[0].childArea[0]]
            }
        }
        for (let i = 0; i < region.length; i++) {
            for (let j =0; j < region[i].childArea.length; j++) {
                const cityId = String(region[i].childArea[j].id).substr(0, 4);
                if (cityId === id) {
                    return {
                        value: [i, j],
                        current: [region[i], region[i].childArea[j]]
                    }
                }
            }
        }
        return {
            value: [0, 0],
            current: [region[0], region[0].childArea[0]]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            const {value} = this.getCurrentCity(nextProps.id);
            this.setState({
                value
            })
        }
    }   

    // H5、微信小程序、百度小程序、字节跳动小程序
    onChange = (e) => {
        let regionTemp = this.state.region;
        let rangeTemp = this.state.range;
        let valueTemp = this.state.value;
        valueTemp = e.detail.value;
        regionTemp = [rangeTemp[0][valueTemp[0]] , rangeTemp[1][valueTemp[1]]];
        this.setState({
            region: regionTemp.map((item) => {
                return item.name
            }).join('-'),
            range: rangeTemp,
            value: valueTemp
        }, () => {this.props.onGetRegion(regionTemp)})
    }

    onColumnChange = (e) => {
        let rangeTemp = this.state.range;
        let valueTemp = this.state.value;

        let column = e.detail.column;
        let row = e.detail.value;

        valueTemp[column] = row;

        switch (column) {
            case 0:
                let cityTemp = [];
                let districtAndCountyTemp = [];
                for (let i = 0; i < region[row].childArea.length; i++) {
                    cityTemp.push(region[row].childArea[i]);
                }
                for (let i = 0; i < region[row].childArea[0].childArea.length; i++) {
                    districtAndCountyTemp.push(region[row].childArea[0].childArea[i]);
                }
                valueTemp[1] = 0;
                valueTemp[2] = 0;
                rangeTemp[1] = cityTemp;
                // rangeTemp[2] = districtAndCountyTemp;
                break;
            case 1:
                let districtAndCountyTemp2 = [];
                for (let i = 0; i < region[valueTemp[0]].childArea[row].childArea.length; i++) {
                    districtAndCountyTemp2.push(region[valueTemp[0]].childArea[row].childArea[i]);
                }
                valueTemp[2] = 0;
                // rangeTemp[2] = districtAndCountyTemp2;
                break;
            case 2:
                break;
        }

        this.setState({
            range: [...rangeTemp],
            value: [...valueTemp]
        })
    }

    // 支付宝小程序
    onClick = () => {
        let temp = this.state.region;
        my.multiLevelSelect({
            list: this.state.list,
            success: (result) => {
                if (result.success) {
                    // temp = result.result[0]. + ' - ' + result.result[1].name + ' - ' + result.result[2].name;
                    // this.setState({
                    //     region: temp
                    // }, () => {this.props.onGetRegion(this.state.region)})
                }
            }
        })
    }

    render () {
        return (
            <View>
                    <Picker
                        mode='multiSelector' 
                        onChange={this.onChange}
                        rangeKey="name"
                        onColumnChange={this.onColumnChange}
                        range={this.state.range}
                        value={this.state.value}
                    >
                        {this.props.children}
                    </Picker>
            </View>
        )
    }
}