import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
// 登出方法,当前服务器网址
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
// 本页样式
import styles from "./styles/kuangji.less";
// 引入ANTD组件
import { Button,Toast,WhiteSpace,WingBlank,Carousel, Modal,Tabs,Badge,TabBar,InputItem} from 'antd-mobile';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 临时商品图
import kuangjibg from '../assets/images/kuangjibg.png';
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shopData: state.shop}))
export default class kuangji extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "kuangji",
            selectedTab: 'blueTab',
            DATA:''
        };
    }
    componentDidMount(){
      const{dispatch} = this.props;
      fetch.shouye({}).then((data)=>{
        if(data.code === 1){
          this.setState({DATA:data.data});
          }else{
            Toast.offline(data.msg,2.5,()=>{
              dispatch(routerRedux.push('/'));
            });
          }
      });
    }
    render() {
        const {history}=this.props;
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
          <div className={styles.wrapper}>
          <style>
            {
              `

              `
            }
          </style>
                {/* <MyNavBar {...navBarProps}/> */}
                <MyTabBar {...tabBarProps}/>
                <p className={styles.title}>储蓄钱包</p>
                <div className={styles.bgcol}><img src={kuangjibg} alt=''/></div>
                <div className={styles.contain}>
                <div className={styles.conLeft}>
                {this.state.DATA.cx_coin}
                  <span>持币量</span>
                </div>
                <div className={styles.conRight}>
                {this.state.DATA.power}‰
                  <span>当前算力</span>
                </div>
                </div>
                </div>
        )
}
}
