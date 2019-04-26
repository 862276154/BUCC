import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/zhuanhuan.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import cut from '../assets/images/cut.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class zhuanhuan extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          cuts:'1',
          DATA:'',
          INFO:''
        };
    }
       /*切换选项*/
  handleNavSel = (cuts) => {
    // console.log(this.state.cuts,'12',cuts)
    // if(cuts=this.state.cuts){
    //   this.setState({cuts});
    // }
    if (cuts === undefined) return;
    this.setState({cuts});
  };
  async componentDidMount(){
    const data = await fetch.shouye({});
    this.setState({DATA:data.data})
    const info = await fetch.transferRule({});
    console.log(info,'guizhe')
    this.setState({INFO:info.data})

  }
  async YesFunc(){
    const {dispatch} = this.props;
    let num = this.refs.num.state.value;
    let s_pwd = this.refs.s_pwd.state.value;
    let rules_id = this.state.INFO[1].id;
    if(num ===''){
      Toast.offline('请输入转换数量',1.5);
      return;
    }
    if(s_pwd ===''){
      Toast.offline('请输入交易密码',1.5);
      return;
    }
    let sql = {num,s_pwd,rules_id};
    console.log(sql,'***')
    const val = await fetch.ltzcx(sql);
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        dispatch(routerRedux.push('/zhuanhuanjilu?index='+1))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
  }
  async querenFunc(){
    const {dispatch} = this.props;
    let num = this.refs.num1.state.value;
    let s_pwd = this.refs.s_pwd1.state.value;
    let rules_id = this.state.INFO[0].id;
    if(num ===''){
      Toast.offline('请输入转换数量',1.5);
      return;
    }
    if(s_pwd ===''){
      Toast.offline('请输入交易密码',1.5);
      return;
    }
    let sql = {num,s_pwd,rules_id};
    console.log(sql,'***')
    const val = await fetch.ltzcx(sql);
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        dispatch(routerRedux.push('/zhuanhuanjilu?index='+2))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
  }

  async shengxiFunc(){
    console.log('生息钱包','..-')
    const {dispatch} = this.props;
    let num = this.refs.num2.state.value;
    let s_pwd = this.refs.s_pwd2.state.value;
    let rules_id = this.state.INFO[2].id;
    if(num ===''){
      Toast.offline('请输入转换数量',1.5);
      return;
    }
    if(s_pwd ===''){
      Toast.offline('请输入交易密码',1.5);
      return;
    }
    let sql = {num,s_pwd,rules_id};
    console.log(sql,'***生息钱包')
    const val = await fetch.ltzcx(sql);
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        dispatch(routerRedux.push('/zhuanhuanjilu?index='+5))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
  }


    render() {
        const {history,dispatch}=this.props;
        console.log(this.state.DATA,'22')
        console.log(this.state.INFO,'222')
        const liutong = this.state.INFO[1]?this.state.INFO[1].mini_base:'';
        const chuxu = this.state.INFO[0]?this.state.INFO[0].mini_base:'';
        const shengxi = this.state.INFO[2]?this.state.INFO[2].mini_base:'';
        console.log(liutong,chuxu,'1233***')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"转换",
            rightContent:"转换记录",
            rightFunc(){
                history.push('/zhuanhuanjilu?index='+1)
            }
        }
        const {cuts} = this.state;
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
                    .zhuanhuan__wrapper___1YDXO .zhuanhuan__mains___3KlIj input{
                      padding-left:2rem;
                    }
                    .wrapper___1YDXO .mains___3KlIj input{
                      padding-left:2rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.wallet}>
                    <div className={styles.myWallet}>
                      <p>流通钱包<span>{this.state.DATA.xj_coin}</span></p>
                      <p>储蓄钱包<span>{this.state.DATA.cx_coin}</span></p>
                      <p>生息钱包<span>{this.state.DATA.sx_coin}</span></p>
                    </div>
                  </div>
                  <div className={styles.purses}
                   onClick={e => this.handleNavSel(e.target.dataset.type)}
                   >
                    <span data-type='1' style={cuts==='1'?{color:'#3790FF'}:null}>流通钱包</span>
                    <span data-type='2' style={cuts ==='2'?{color:'#3790FF'}:null}>储蓄钱包</span>
                    <span data-type='3' style={cuts ==='3'?{color:'#3790FF'}:null}>生息钱包</span>
                  </div>

                  <div className={styles.purse} style={{display: cuts === '1' ? 'block' : 'none'}}
                   onClick={e => this.handleNavSel(e.target.dataset.type)}
                   >
                   <div>
                   <span style={{color:'#3790FF'}}>流通钱包</span>
                    <img src={cut} alt='' />
                    <span>储蓄钱包</span>
                   </div>
                   <div className={styles.mains}>
                    <span>转换数量</span>
                    <InputItem type='number' placeholder='请输入转账数量' ref='num' clear></InputItem>
                  </div>
                  <p style={{fontSize:'0.22rem',color:'#ABAEB3',margin:'0 0 0.5rem 0.65rem'}}>提示：最少转账数量{liutong}，而且是{liutong}的倍数</p>
                  <div className={styles.mains}>
                    <span>交易密码</span>
                    <InputItem type='password' placeholder='请输入交易密码' ref='s_pwd' clear></InputItem>
                  </div>
                  <div className={styles.confirm}>
                    <span onClick={()=>this.YesFunc()}>确定</span>
                  </div>
                  </div>

                  <div className={styles.purse} style={{display: cuts === '2' ? 'block' : 'none'}}
                   onClick={e => this.handleNavSel(e.target.dataset.type)}
                   >
                   <div>
                   <span style={{color:'#3790FF'}}>储蓄钱包</span>
                    <img src={cut} alt='' />
                    <span>流通钱包</span>
                   </div>
                   <div className={styles.mains}>
                    <span>转换数量</span>
                    <InputItem type='number' placeholder='请输入转账数量' ref='num1' clear></InputItem>
                  </div>
                  <p style={{fontSize:'0.22rem',color:'#ABAEB3',margin:'0 0 0.5rem 0.65rem'}}>提示：最少转账数量{chuxu}，而且是{chuxu}的倍数</p>
                  <div className={styles.mains}>
                    <span>交易密码</span>
                    <InputItem type='password' placeholder='请输入交易密码' ref='s_pwd1' clear></InputItem>
                  </div>
                  <div className={styles.confirm}>
                    <span onClick={()=>this.querenFunc()}>确定</span>
                  </div>
                  </div>

                  <div className={styles.purse} style={{display: cuts === '3' ? 'block' : 'none'}}
                   onClick={e => this.handleNavSel(e.target.dataset.type)}
                   >
                   <div>
                   <span style={{color:'#3790FF'}}>生息钱包</span>
                    <img src={cut} alt='' />
                    <span>流通钱包</span>
                   </div>
                   <div className={styles.mains}>
                    <span>转换数量</span>
                    <InputItem type='number' placeholder='请输入转账数量' ref='num2' clear></InputItem>
                  </div>
                  <p style={{fontSize:'0.22rem',color:'#ABAEB3',margin:'0 0 0.5rem 0.65rem'}}>提示：最少转账数量{shengxi}，而且是{shengxi}的倍数</p>
                  <div className={styles.mains}>
                    <span>交易密码</span>
                    <InputItem type='password' placeholder='请输入交易密码' ref='s_pwd2' clear></InputItem>
                  </div>
                  <div className={styles.confirm}>
                    <span onClick={()=>this.shengxiFunc()}>确定</span>
                  </div>
                  </div>
               </div>
        )
    }
}
