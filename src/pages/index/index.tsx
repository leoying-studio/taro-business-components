import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import FormConfigurator from './../../form-configurator'
import { BasicDataSource } from './constant'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
       <FormConfigurator
						defaultValues={{}}
						onValueChange={(values) => {
							// setData({...data, ...values});
						}}
						dataSource={BasicDataSource} />
      </View>
    )
  }
}
