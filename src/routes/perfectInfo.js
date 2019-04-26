import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/perfectInfo.less";
import { Toast,InputItem, Modal,ImagePicker} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import headimg from '../assets/images/jiahao.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class perfectInfo extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          codeVal:'获取验证码',
          DATA:''
        };
    }
    async componentDidMount(){
      const data = await fetch.personalInfo({});
      console.log(data,'123')
      this.setState({DATA:data.data})
    }
    //验证码
    async onClickYzm() {
      this.setState({disabledattr:true})
      this.setState({ bgcol: "#c4c4c4" })
      const _this = this;
      let tel = this.state.DATA.tel;
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
      let code = this.refs.code.state.value;
      let wechat = this.refs.wechat.state.value;
      let alipay = this.refs.alipay.state.value;
      let banknum = this.refs.banknum.state.value;
      let bank = this.refs.bank.state.value;
      let address = this.refs.address.state.value;
      if(code ===''){
        Toast.offline('请输入手机验证码',1.5);
        return;
      }
      let sql = {code,wechat,alipay,banknum,bank,address};
      console.log(sql,'123')
      const val = await fetch.xiugaiInfo(sql);
      if(val.code ===1){
        Toast.success(val.msg,1.5,()=>{
          // dispatch(routerRedux.push('/gerenzhongxin'))
        })
      }else{
        Toast.offline(val.msg,1.5);
      }
    }

    render() {
        const {dispatch}=this.props;
        const {files}=this.state;
        // console.log(this.state.DATA,'111')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"完善个人资料",
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
                .wrapper___2A82q .neirong___1Gbeg .main___3ZygN .mains___12Hag input{
                  padding-left: 1.6rem;
                }
                .am-list-item:not(:last-child) .am-list-line{
                  border-bottom:none !important;
                }
                html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
                  height:0 !important;
                }
                .perfectInfo__wrapper___2A82q .perfectInfo__neirong___1Gbeg .perfectInfo__main___3ZygN .perfectInfo__mains___12Hag input{
                  padding-left: 1.6rem;
                }
                `
            }
        </style>
            <MyNavBar {...navBarProps}/>
           <div className={styles.neirong}>
           <div className={styles.main}>
           <div className={styles.mains}>
           <span>账号</span>
                <InputItem type='text' placeholder={this.state.DATA.name} disabled clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>手机号</span>
                <InputItem type='number' maxLength='11' disabled value={this.state.DATA.tel} ref='tel' clear></InputItem>
           </div>
           <div className={styles.mains}>
               <span>验证码</span>
                    <InputItem type='number' placeholder='填写验证码' ref='code'></InputItem>
                    <font onClick={this.onClickYzm.bind(this)} disabled={this.state.disabledattr}>{this.state.codeVal}</font>
               </div>
           <div className={styles.mains}>
           <span>微信</span>
                <InputItem type='text' placeholder={this.state.DATA.wechat} ref='wechat' clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>支付宝</span>
                <InputItem type='text' placeholder={this.state.DATA.alipay} ref='alipay' clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>银行卡</span>
                <InputItem type='text' placeholder={this.state.DATA.banknum} ref='banknum' clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>开户行</span>
                <InputItem type='text' placeholder={this.state.DATA.bank} ref='bank' clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>开户支行</span>
                <InputItem type='text' placeholder={this.state.DATA.address} ref='address' clear></InputItem>
           </div>

            </div>
        </div>
        <div className={styles.denglu}>
                    <span onClick={()=>this.querenFunc()}>确定</span>
                </div>
           </div>
    )
}
}
