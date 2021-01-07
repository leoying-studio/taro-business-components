import React, { Component } from 'react'
import './app.scss'
import 'taro-ui/dist/style/index.scss' 
import { TopProvider } from './hooks/useTopView'

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
        <TopProvider>
            {this.props.children}
        </TopProvider>
    )
  }
}

export default App;

