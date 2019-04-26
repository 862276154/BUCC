import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/mcjyDetails.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transferImg from '../assets/images/transferImg.png';
import redHeart from '../assets/images/redHeart.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class mcjyDetails extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
    componentDidMount(){
      const {location}=this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      console.log(parse.id,'2')
      fetch.salesCenter({id:parse.id}).then((data)=>{
        console.log(data,'gailema')
        if(data.code === 1){
            this.setState({DATA:data.data.items[0]})
        }else{
          Toast.offline(data.msg,2); return;
        }
      })
    }
    async quxiao(){
      const {location}=this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      const {dispatch} = this.props;
      let s_pwd = this.refs.s_pwd.state.value;
      if(s_pwd ===''){
        Toast.offline('请输入交易密码',1.5);
        return;
      }
      let sql = {s_pwd,id:parse.id};
      const val = await fetch.maichuQuxiao(sql);
      if(val.code ===1){
        Toast.success(val.msg,1.5,()=>{
          dispatch(routerRedux.push('/guamai'))
        })
      }else{
        Toast.offline(val.msg,1.5);
      }
    }
    async queding(){
      const {location}=this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      const {dispatch} = this.props;
      let s_pwd = this.refs.s_pwd.state.value;
      if(s_pwd ===''){
        Toast.offline('请输入交易密码',1.5);
        return;
      }
      let sql = {s_pwd,id:parse.id};
      const val = await fetch.maichuQueding(sql);
      if(val.code ===1){
        Toast.success(val.msg,1.5,()=>{
          dispatch(routerRedux.push('/guamai'))
        })
      }else{
        Toast.offline(val.msg,1.5);
      }
    }

    render() {
        const {history,dispatch}=this.props;
        const owns = this.state.DATA?this.state.DATA.seller.name:'';
        console.log(owns,'0.0')
        var aas =localStorage.getItem('user');
        aas = eval('(' + aas + ')');
        const locals = aas.username;
        console.log(aas.username,locals,'cunc')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"卖出交易详情",
        }
        const {sel} = this.state;
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
                      padding-left: 2rem;
                    }
                    .mcjyDetails__wrapper___V1qRK .mcjyDetails__mains___9xA_D input{
                      padding-left: 2rem;
                    }
                    .wrapper___V1qRK .mains___9xA_D input{
                      padding-left: 2rem !important;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.counterparty}>
                    <p className={styles.adverse}>交易对方</p>
                    <dl>
                          <dt><img src={transferImg} alt=''/></dt>
                          <dd>
                            <p>{this.state.DATA?this.state.DATA.seller.name:''}</p>
                            <p>
                              <span style={{marginRight:'0.12rem'}}>电话</span>
                              {this.state.DATA?this.state.DATA.seller.tel:''}
                            </p>
                            <p>支付方式:<span>{this.state.DATA?this.state.DATA.seller.bank:''}</span></p>
                          </dd>
                        </dl>
                  </div>
                  <div className={styles.mains}>
                  <span>卖出余额</span>
                        <InputItem type='text' placeholder={this.state.DATA.trade_num} disabled clear></InputItem>
                  </div>
                  <div className={styles.mains}>
                  <span>预计收益</span>
                        <InputItem type='text' placeholder={this.state.DATA.trade_num-this.state.DATA.fee} disabled clear></InputItem>
                  </div>
                  <div className={styles.mains} style={{marginTop:'1rem'}}>
                  <span>交易密码</span>
                        <InputItem type='password' placeholder='请输入交易密码' ref='s_pwd' clear></InputItem>
                  </div>
                  {
                    locals === owns?
                    <div className={styles.confirm}><span onClick={()=>this.quxiao()}>取消</span></div>
                    :
                    <div className={styles.confirm}><span onClick={()=>this.queding()}>确定</span></div>
                  }
               </div>
        )
    }
}
