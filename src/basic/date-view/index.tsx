import React, { Component, CSSProperties, useState } from 'react';
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import Taro from '@tarojs/taro';
import "./index.scss";

interface DatePickerProps {
    onChange: (value: {
        year: number,
        month: number,
        day: number
    }) => void
    defaultValue?: string
}

interface DatePickerState {
   years: number[] ,
   year: number,
   months: (number | string)[],
   days: (number | string)[]
   day: number | string
   value: number[]
   month?: number
}

export const getDatePickerSource = function() {
      const years: number[] = []
      const months: (number | string)[]  = []
      const days:  (number | string)[] = []
      const len = new Date().getFullYear() - 17;
      for (let i = 1940; i <= len; i++) {
        years.push(i)
      }
      for (let i = 1; i <= 12; i++) {
        const value = i < 10 ? '0' + i : i;
        months.push(value);
      }
      for (let i = 1; i <= 31; i++) {
        const value = i < 10 ? '0' + i : i;
        days.push(value)
      }

      return {
        years,
        months,
        days
      }
}

export const getDatePickerValue = function(value) {
    if (value) {
        const [y, m] = (value as string)?.split('-') || [];
        return [Number(y) - 1940, Number(m) - 1];
    }
    return [50, 0];
}

export default class DatePicker extends Component<DatePickerProps, DatePickerState> {

    constructor (props) {
      super(props)
      const { years, months, days } = getDatePickerSource();
      const date = new Date()
      this.state = {
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        value: getDatePickerValue(this.props.defaultValue)
      }
    }
  
    onChange = e => {
      const val = e.detail.value
      const nextState = {
        year: this.state.years[val[0]],
        month: this.state.months[val[1]] as number,
        day: this.state.days[val[2]] as number,
        value: val
      };
      this.setState(nextState, () => {
          this.props.onChange && this.props.onChange({...nextState});
      })
    }

    private getStyle = (index, col):CSSProperties => {
        const active = index === this.state.value[col];
        return {
            overflow: 'hidden',
            whiteSpace:'nowrap',
            textOverflow:'ellipsis',
            height: 34 + 'px',
            lineHeight: 34 + 'px',
            fontWeight: active ? 600 : 400,
            color: active ? "#FF3C4B" : '#000000'
        }
      }
  
    render() {
      return (
        <View style={{backgroundColor: 'white'}}>
          <PickerView  
            indicatorStyle='height: 34px;'
            value={this.state.value} onChange={this.onChange}>
            <PickerViewColumn style="text-align: center; height: 250rpx;">
              {this.state.years.map((item, index) => {
                return (
                  <View style={this.getStyle(index, 0)}>{item}年</View>
                );
              })}
            </PickerViewColumn>
            <PickerViewColumn style="text-align: center; height: 250rpx;">
              {this.state.months.map((item, index) => {
                return (
                  <View style={this.getStyle(index, 1)}>{item}月</View>
                )
              })}
            </PickerViewColumn>
          </PickerView>
        </View>
      )
    }
  }