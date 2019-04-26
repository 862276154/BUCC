import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/shoukuanma.less";
import { Toast, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import copy from 'copy-to-clipboard';
const alert=Modal.alert;
var QRCode = require('qrcode.react');
@connect(state => ({shop: state.shop}))
export default class shoukuanma extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
  //   copyCode=(url)=>{
  //     copy(url);
  //     Toast.success("复制成功!如未成功请手动复制!",3);
  // }
  async componentDidMount(){
    const data = await fetch.personalInfo({});
    console.log(data,'222222')
    this.setState({DATA:data.data})
  }
    render() {
        const {history,dispatch,shop}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                dispatch(routerRedux.goBack())
            },
            titleName:"收款二维码",
        }
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div>
                <style>
                    {
                        `
                        `
                    }
                </style>
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                <div className={styles.main}>
                    <div className={styles.tuiguang}>
                        <div className={styles.ma}>
                        <QRCode className={styles.mama} value={"http://47.92.88.214:3787"+"/zhuanzhang?name="+this.state.DATA.name} />
                        </div>
                        <div className={styles.fot}>扫一扫&nbsp;&nbsp;&nbsp;&nbsp;向我付款</div>
                    </div>
                    {/* <button onClick={()=>this.copyCode("http://192.168.0.110:8000"+"/zhuanzhang?name="+this.state.DATA.name)}>复制链接</button> */}
                </div>
            </div>
        )
    }
}
