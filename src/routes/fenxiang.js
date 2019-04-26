import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wallet.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import fxbg from '../assets/walletImg/fxbg.png';
import wallet_navbgb from '../assets/walletImg/wallet_navbgb.png';
import { Tabs,} from 'antd-mobile';
import copy from 'copy-to-clipboard';
var QRCode = require('qrcode.react');

const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class fenxiang extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            xianshi:false,
            DATA:''
        };
    }
    copyCode = (tgUrl) => {
        copy(tgUrl);
        Toast.success("复制成功!如未成功请手动复制!", 2);
      }
      async componentDidMount(){
        fetch.personalInfo({}).then((data)=>{
          console.log(data,'222')
          this.setState({DATA:data.data})
        })
      }

    render() {
        const {dispatch}=this.props;
        console.log(this.state.DATA,'00.')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"分享二维码",
          // rightContent:'保存到相册'
      }
      const wrapBg={
        backgroundImage: `url(`+fxbg+`)`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }
      const tgUrl = "http://47.92.88.214:3787/zhuce?name="+this.state.DATA.name;
    return (
        <div className='fx_wrap' style={wrapBg}>
            <style>{`
                .am-navbar{
                    background-color: transparent !important;
                    border-bottom:0!important;
               }
               .fx_wrap{
                    width:100%;
                    height:100vh;
               }
               .ewmWarp {
                    width: 3.4rem;
                    height: 3.4rem;
                    text-align: center;
                    margin: 3.5rem auto 0 auto;
                    background: #fff;
                    padding:0.2rem;
                    box-sizing:border-box;
               }
               .ewmWarp canvas{
                width:100% !important;
                height:100% !important;
               }
               .ewmWarp_titel{
                   width:70%;
                   margin:auto;
                   height:0.7rem;
                   background:#3790FF;
                   text-align: center;
                   line-height: 0.7rem;
                   border-radius: 0.4rem;
                   color: #fff;
                   margin-top: 1.2rem;
               }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div className='ewmWarp'>
               <QRCode
              value={"http://47.92.88.214:3787/zhuce?name="+this.state.DATA.name}
               />
               {/* 长按保存二维码时用这种 */}
               {/* < img className={styles.mama} src={"http://qr.liantu.com/api.php?text=https://www.yahoosp.cn/?id="+codelist.us_account} /> */}
            </div>
            <p className='ewmWarp_titel'
             onClick={() => this.copyCode(tgUrl)}
                >复制链接</p>
        </div>
    )
    }
}
