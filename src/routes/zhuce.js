import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/zhuce.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class zhuce extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            codeVal:'获取验证码',
            DATA:'',
            checked: false,
            u_name:''
        };
    }
    async componentDidMount(){
      const {location} = this.props;
      const parse = queryString.parse(location.search.replace('?',''));
      console.log(parse.name,'zzz')
      this.setState({u_name:parse.name})
      // const data = await fetch.saozhuce({id:parse.id})
      // console.log(data,'---')
      // this.setState({DATA:data.msg})
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
  async querenFunc(){
    const {dispatch} = this.props;
    let p_name = this.refs.tuijian.state.value?this.refs.tuijian.state.value:this.refs.tuijian.state.placeholder;
    let tel = this.refs.phone.state.value;
    let name = this.refs.tel.state.value;
    let code = this.refs.code.state.value;
    let pwd = this.refs.us_pwd.state.value;
    let s_pwd = this.refs.us_pwd1.state.value;
    let card = this.refs.card.state.value;
    if(p_name ===''){
      Toast.offline('请输入推荐码',1.5);
      return;
    }
    if(tel ===''){
      Toast.offline('请输入手机号',1.5);
      return;
    }
    if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel))){
      Toast.offline("手机号格式不正确!", 1.5);
      return;
    }
    if(name ===''){
      Toast.offline('请输入账号',1.5);
      return;
    }
    if(code ===''){
      Toast.offline('请输入手机验证码',1.5);
      return;
    }
    if(pwd ===''){
      Toast.offline('请输入登录密码',1.5);
      return;
    }
    if(s_pwd ===''){
      Toast.offline('请输入支付密码',1.5);
      return;
    }
    if(card ===''){
      Toast.offline('请填写身份证号',1.5);
      return;
    }
    let sql = {p_name,name,pwd,s_pwd,card,tel,code};
    console.log(sql,'1')
    const val = await fetch.registered(sql);
    if(val.code ===1){
      Toast.success('注册成功',1.5,()=>{
        dispatch(routerRedux.push('/'))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
  }
    render() {
        const {history}=this.props;
        console.log(this.state.u_name,'222222333')
        const navBarProps = {
            leftVisible:false,
            titleName:"注册",
            rightContent:"立即登录",
            rightFunc(){
                history.push('/')
            }
        }
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-list-item{
                      background-color:#2E323B;
                    }
                    .am-list-item .am-input-control input{
                      color:white;
                    }
                    .am-list-item .am-input-control input:disabled{
                      background-color:#2E323B;
                    }
                    .zhuce__wrapper___2CZXF .zhuce__neirong___18enS .zhuce__main___3oaLe .zhuce__mains___14jXj input{
                      padding-left: 2rem;
                    }
                    .wrapper___2CZXF .neirong___18enS .main___3oaLe .mains___14jXj input{
                      padding-left: 2rem !important;
                    }
                    .am-list-item:not(:last-child) .am-list-line{
                      border-bottom:none !important;
                      // border-bottom: 1px solid #2E323B;
                    }
                    html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
                      height:0 !important;
                      // z-index:111;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
               <div className={styles.neirong}>
               <div className={styles.main}>
               <div className={styles.mains}>
               <span>推荐人</span>
               {
                 this.state.u_name?
                 <InputItem type='text' placeholder={this.state.u_name} ref='tuijian'></InputItem>
                  :
                  <InputItem type='text' placeholder='' ref='tuijian'></InputItem>
               }
               </div>
               <div className={styles.mains}>
               <span>手机号<a style={{color:'#189DE2',margin:'0 0.2rem 0 0.3rem'}}>+86</a></span>
                    <InputItem type='number' placeholder='请输入您的手机号' ref='phone' maxLength='11' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>账号</span>
                    <InputItem type='text' placeholder='请输入账号' ref='tel' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>登录密码</span>
                    <InputItem type='password' placeholder='请输入6~32位数字加字母' ref='us_pwd' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>支付密码</span>
                    <InputItem type='password' placeholder='请输入6位数字支付密码' ref='us_pwd1' clear></InputItem>
               </div>
               <div className={styles.mains}>
               <span>验证码</span>
                    <InputItem type='number' placeholder='填写验证码' ref='code'></InputItem>
                    <font onClick={this.onClickYzm.bind(this)} disabled={this.state.disabledattr}>{this.state.codeVal}</font>
               </div>
               <div className={styles.mains}>
               <span>身份证号</span>
                    <InputItem type='text' placeholder='请填写身份证号' ref='card' clear></InputItem>
               </div>
                </div>
            </div>
            <div className={styles.denglu}>
                        <span onClick={()=>this.querenFunc()}>立即注册</span>
                    </div>
               </div>
        )
    }
}
