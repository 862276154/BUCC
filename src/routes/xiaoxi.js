import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/xiaoxi.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class xiaoxi extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"消  息",
      }

        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `

                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                <ul className={styles.information}>
                  <li>
                    <p>您好，您的商品有人购买了</p>
                    <p>2018-12-12</p>
                  </li>
                  <li>
                    <p>您好，您的交易有新消息了</p>
                    <p>2018-12-12</p>
                  </li>
                </ul>
               </div>
        )
    }
}
