'use strict'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import './search.less'
// import logo from '../images/down@2x.png'
// import '../../common/index.js';
// //=========自己打包的库
// import largeNumber from 'large-number-nymph'
const React = require('react')
// const ReactDOM = require('react-dom')
const largeNumber = require('large-number-nymph')
const logo = require('../images/down@2x.png')
require('./search.less')
require('../../common/index.js')
// 性能优化的范畴
/**
 * 
 * babel首先处理js文件，真正进行tree-shaking识别和记录的是webpack本身。删除多于代码是在uglify中执行的
 */
// 当mode为production时，会默认开启tree-shaking，会自动除去没有用到的代码
// 就是tree-shaking依赖es6的模块引入或输出语法。如果你的模块引入方式是require等等等乱七八糟的东西。tree-shaking将不会起到任何作用。
// Tree-shaking的本质是消除无用的js代码。无用代码消除在广泛存在于传统的编程语言编译器中，
//编译器可以判断出某些代码根本不影响输出，然后消除这些代码，这个称之为DCE（dead code elimination）。
// Dead Code 一般具有以下几个特征
/*•代码不会被执行，不可到达

•代码执行的结果不会被用到

•代码只会影响死变量（只写不读）*/
/*rollup（tree-shaking时webpack从rollup借鉴过来的）
只处理函数和顶层的import/export变量，不能把没用到的类的方法消除掉
javascript动态语言的特性使得静态分析比较困难
*/


const  {a} =require('./tree-shaking')
class Search extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      Text: null
    }
  }
  loadComponent() {
    import('./text.js').then(Text=>{
      this.setState({
        Text: Text.default
      })
    });
  }
  render () {
    const funcA = a ()
    const { Text } = this.state
    const addResult = largeNumber('999','1')
    return <div className="search">
      {
        Text?<Text/>:null
      }
      <p>哈哈，watch监听  ：watch监听中再package.json中配置需要手动刷新</p>
      <p>利用热更新（WDS）webpack-dev-server 
      好处：wds不刷新浏览器
            wds不输出文件，而是放在缓存中
  配合HotModuleReplacePlugin插件{funcA}</p>
      <img src={logo} onClick={this.loadComponent.bind(this)}/>
      <p>{addResult}</p>
      </div>
  }
}
/*
ReactDOM.render(
  <Search />,
  document.getElementById('root')
)
*/
module.exports = <Search/>