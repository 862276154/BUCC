import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {login} from '../utils/fetch';
import styles from "./styles/denglu.less";
import { InputItem,Toast, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import logo from '../assets/images/logo.png';
import shouji from '../assets/images/zhanghao.png';
import mima from '../assets/images/mima.png';
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class denglu extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async dengluFunc(){
      const {dispatch,shop} = this.props;
      let name = this.refs.phone.state.value;
      let pwd = this.refs.password.state.value;
      if(name===''||pwd===''){
        Toast.offline('账号和密码不能为空!',1.5);
        return;
      }
      const data = await fetch.denglu({name,pwd});
      if(data.code === 1){
        login(name,pwd)
        Toast.success('登录成功',1.5,()=>{
          dispatch(routerRedux.push('/shouye'))
        })
      }else{
        Toast.offline(data.msg,1.5);
      }
    }
    render() {
        const {history}=this.props;
        const navBarProps = {
            leftVisible:false,
            titleName:"登录",
            rightContent:"立即注册",
            rightFunc(){
                history.push('/zhuce')
            }
        }
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-list-item{
                      background-color:#404653 !important;
                    }
                    .am-list-item .am-input-control input{
                      color:white;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                <div className={styles.logo}>
                    <img src={logo} alt=""/>
                </div>
               <div className={styles.neirong}>
               <div className={styles.main}>
                <div className={styles.mains}>
                    <img src={shouji} alt=""/>
                    <InputItem type='text' placeholder='请输入账号' ref='phone' clear></InputItem>
                </div>
                <div className={styles.mains}>
                    <img src={mima} alt=""/>
                    <InputItem type='password' placeholder='请输入密码' ref='password' clear></InputItem>
                </div>
                    <div className={styles.denglu}>
                        <span onClick={()=>this.dengluFunc()}>登录</span>
                    </div>
                    <p className={styles.wjmm} onClick={()=>history.push('/wangjimima')} style={{marginBottom:'0.3rem'}}>忘记密码?</p>
                </div>
               </div>
            </div>
        )
    }
}
