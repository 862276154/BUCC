import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wangjimima.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
// import shouji from '../assets/images/zhanghao.png';
// import mima from '../assets/images/mima.png';
// import yzm from '../assets/images/yzm.png';
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class wangjimima extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            codeVal:'获取验证码'
        };
    }
//验证码
async onClickYzm() {
  if(!this.refs.phone.state.value || !this.refs.phone.state.value.replace(/\s/g,"")){
    Toast.offline("手机号不正确!",1);
    return;
  }
  if(this.refs.phone.state.value.replace(/\s/g,"").length!==11){
    Toast.offline("手机号不正确!",1);
    return;
  }
  this.setState({disabledattr:true})
  this.setState({ bgcol: "#c4c4c4" })
  const _this = this;
  let tel = this.refs.phone.state.value;
  const message = await fetch.smscode({"tel": tel});
  if(message.code === 1){
    Toast.success('发送成功!', 0.5);
    let num = 120;
    let Countdown = setInterval(function () {
      num = num - 1;
      if (num >= 0) {
        _this.setState({ codeVal: num+'s后重试' });
        return;
      }
      _this.setState({ codeVal: '获取验证码', bgcol: "#33333",  disabledattr:false});
      clearInterval(Countdown);
    }, 1000)
  }else{
    Toast.fail(message.msg, 1);
    _this.setState({ codeVal: '获取验证码', bgcol: "#33333",  disabledattr:false});
    return;
  }
}
  async determine(){
    const {dispatch} = this.props;
    let name = this.refs.name.state.value;
    let tel = this.refs.phone.state.value;
    let code = this.refs.code.state.value;
    let pwd = this.refs.password.state.value;
    let us_dlpwd1 = this.refs.passwords.state.value;
    if(name===''){
      Toast.offline('请输入账号!',1.5);
      return;
    }
    if(tel===''){
      Toast.offline('请输入手机号码!',1.5);
      return;
    }
    if(code===''){
      Toast.offline('请输入手机验证码!',1.5);
      return;
    }
    if(pwd===''){
      Toast.offline('请输入新密码!',1.5);
      return;
    }
    if(us_dlpwd1===''){
      Toast.offline('请再次输入新密码!',1.5);
      return;
    }
    if(pwd!==us_dlpwd1){
      Toast.offline('两次输入密码不一致!',1.5);
      return;
    }
    let sql = {name,tel,code,pwd};
    const value = await fetch.forget(sql);
    if(value.code===1){
      Toast.success('修改成功',2,function(){
          dispatch(routerRedux.push('/'))
      })
  }else{
      Toast.fail(value.msg,2)
  }
  }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                dispatch(routerRedux.goBack())
            },
            titleName:"忘记密码",
            rightContent:"",
        }
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-list-item:not(:last-child) .am-list-line{
                        border:0;
                    }
                    html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
                        height:0;
                    }
                    .am-list-item.am-list-item-middle .am-list-line{
                      padding-left:2rem;
                    }
                    .am-list-item{
                      background-color:#2E323B;
                    }
                    .am-list-item .am-input-control input{
                      color:white;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
               <div className={styles.neirong}>
               <div className={styles.main}>
               <div className={styles.mains}>
               <span>账号</span>
                    <InputItem type='text' ref='name' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>手机号</span>
                    <InputItem type='number' ref='phone' maxLength='11' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>验证码</span>
                    <InputItem type='number' ref='code'></InputItem>
                    <font onClick={this.onClickYzm.bind(this)} disabled={this.state.disabledattr}>{this.state.codeVal}</font>
               </div>
               <div className={styles.mains}>
               <span>请设置登录密码</span>
                    <InputItem type='password' ref='password' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>请确认登录密码</span>
                    <InputItem type='password' ref='passwords' clear></InputItem>
               </div>
                </div>
            </div>
            <div className={styles.denglu}>
                        <span onClick={()=>this.determine()}>确  认</span>
                    </div>
               </div>
        )
    }
}
