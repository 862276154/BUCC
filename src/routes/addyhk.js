import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/yhklist.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import active from '../assets/walletImg/active.png';
import no_active from '../assets/walletImg/no_active.png';
import { Tabs,} from 'antd-mobile';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class ticket extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
// 添加
async addBtn(){
    // const {dispatch}=this.props;
    // var bankName=this.refs.bankName.value;
    // var bankNumber=this.refs.bankNumber.value;
    // var arr=bankName.split(" "); 
    // if (bankName==="") {Toast.offline("开户行不能为空!",2); return; }
    // if (bankNumber==="") {Toast.offline("银行卡号不能为空!",2); return; }
    // Toast.loading("正在添加", 0);
    // var regData={
    //   // 开户行
    //   bank:arr.length==2?arr[0]:'',
    //   // 银行卡类型
    //   type:arr.length==2?arr[1]:'',
    //   // 银行卡号
    //   bankCard:bankNumber,
    // }
    // const value =await userServer.AddYhk(regData);
    // Toast.hide();
    // // console.log(value,'value ')
    // if(value.statusCode===101){
    //   Toast.success(value.message,1,await function(){
    //     dispatch(routerRedux.push('/Wallet'))
    //   });
    // }else{
    //   Toast.fail(value.message, 2);
    // }
  }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"添加银行卡",
      }
    
      
    return (
        <div>
           <style>{`
                body,html{
                    background-color: #2E323B;
                }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div>
                <p style={{height:'0.7rem',lineHeight:'0.7rem',marginLeft:"0.3rem",color:'#F72933',fontSize:"0.26rem"}}>*请绑定持卡人本人的银行卡，姓名一经保存不可修改</p>
                <ul className={styles.AddYhk}>
                    <li>
                        <span>*持卡人姓名</span>
                        <input type='text' placeholder='请输入持卡人姓名'  ref='bankUser'/>
                    </li>
                    <li>
                        <span>*开户银行</span>
                        <input type='text' placeholder='请输入开户银行' ref='bankName' />
                    </li>
                    <li>
                        <span>*银行卡号</span>
                        <input type='text' placeholder='请输入银行卡号' ref='bankNumber'/>
                    </li> 
                    <li>
                        <span>*开户支行</span>
                        <input type='text' placeholder='请输入开户银行支行' ref='bankAddress'/>
                    </li> 
                </ul>
                <p className={styles.addyhk_active}>
                    <img src={active} alt=''/>
                    <span>设为默认银行卡</span>
                </p>
                <div className={styles.AddYhkBtn}
         onClick={()=>this.addBtn()}
        >确定</div>
            </div>
        </div>
    )
    }
}
