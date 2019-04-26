import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/zhuanzhang.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class zhuanzhang extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
    async componentDidMount(){
      const data = await fetch.shouye({});
      this.setState({DATA:data.data})
      const {location} = this.props;
      const parse = queryString.parse(location.search.replace('?',''));
      console.log(parse.name,'000000')
      this.setState({ID:parse.name});
    }
    async yesFunc(){
      const {dispatch} = this.props;
      let name = this.refs.name.state.value?this.refs.name.state.value:this.refs.name.state.placeholder;
      let num = this.refs.num.state.value;
      let s_pwd = this.refs.pwd.state.value;
      if(name ===''){
        Toast.offline('请输入对方账号',1.5);
        return;
      }
      if(num ===''){
        Toast.offline('请输入转账数量',1.5);
        return;
      }
      if(s_pwd ===''){
        Toast.offline('请输入交易密码',1.5);
        return;
      }
      let sql = {name,num,s_pwd};
      console.log(sql,'000')
      const val = await fetch.transfer(sql);
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        dispatch(routerRedux.push('/zhuanzhangjilu'))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
    }

    render() {
        const {history,dispatch}=this.props;
        console.log(this.state.ID,'***')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"转账",
            rightContent:"转账记录",
            rightFunc(){
                history.push('/zhuanzhangjilu')
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
                    .zhuanzhang__wrapper___3BgRL .zhuanzhang__mains___3BwBy input{
                      padding-left:2rem;
                    }
                    .wrapper___3BgRL .mains___3BwBy input{
                      padding-left:1.6rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.wallet}>
                    <div className={styles.myWallet}>
                      <p>我的流通钱包<span>{this.state.DATA.xj_coin}</span></p>
                      {/* <p>我的储蓄钱包<span>10000.00</span></p> */}
                    </div>
                  </div>
                  <p style={{fontSize:'0.26rem',color:'#3790FF',lineHeight:'0.68rem',textAlign:'center',borderBottom:'2px solid #585E6D'}}>好友转账</p>
                  {
                    this.state.ID?
                    <div className={styles.mains}>
                      <span>账号</span>
                      <InputItem type='text' placeholder={this.state.ID} ref='name' clear></InputItem>
                    </div>:
                  <div className={styles.mains}>
                  <span>账号</span>
                  <InputItem type='text' placeholder='请输入对方账号' ref='name' clear></InputItem>
                </div>
                  }


                  <div className={styles.mains}>
                    <span>交易数量</span>
                    <InputItem type='text' placeholder='请输入转账数量' ref='num' clear></InputItem>
                  </div>
                  <p style={{fontSize:'0.22rem',color:'#ABAEB3',margin:'0 0 0.5rem 0.65rem'}}>提示：最少转账数量{this.state.DATA.trans_base}，而且是{this.state.DATA.trans_base}的倍数，手续费{this.state.DATA.trans_fee}%</p>
                  <div className={styles.mains}>
                    <span>交易密码</span>
                    <InputItem type='password' placeholder='请输入交易密码' ref='pwd' clear></InputItem>
                  </div>
                  <div className={styles.confirm}>
                    <span onClick={()=>this.yesFunc()}>确定</span>
                  </div>
               </div>
        )
    }
}
