import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/yhklist.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import ticket_yi from '../assets/walletImg/ticket_yi.png';
import ticket_wei from '../assets/walletImg/ticket_wei.png';
import addYhk from '../assets/images/addYhk.png';
import { Tabs,} from 'antd-mobile';


const queryString = require('query-string');
// 把model 传入props
@connect(state => ({user: state.user}))
export default class yhkList extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {

        };
    }

  //银行卡号展示
//   cardType(val){
//     if(val){
//       console.log(val,'val')
//         return  val.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2")
//         // console.log(val,"@@@@@")
//       }else{
//         return
//       }
//   }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"银行卡",
          rightContent:"添加",
          rightFunc(){
            dispatch(routerRedux.push('/addyhk'))
          }
      }

      var _this=this;
    return (
        <div>
            <style>{`
                body,html{
                    background-color: #2E323B;
                }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div className={styles.yhklist}>
                <ul>
                   <li>
                       <p>
                           <span>建设银行</span>
                           <span>BANK</span>
                       </p>
                       <p>储蓄卡</p>
                       <p>12333333333333333
                       {/* {_this.cardType(12333333333333333)} */}
                       </p>
                       <p>
                           <span>添加时间</span>
                           <span>12/25</span>
                       </p>
                   </li>
                   <li>
                       <p>
                           <span>建设银行</span>
                           <span>BANK</span>
                       </p>
                       <p>储蓄卡</p>
                       <p>12333333333333333
                       {/* {_this.cardType(12333333333333333)} */}
                       </p>
                       <p>
                           <span>添加时间</span>
                           <span>12/25</span>
                       </p>
                   </li>
                   <li>
                       <p>
                           <span>建设银行</span>
                           <span>BANK</span>
                       </p>
                       <p>储蓄卡</p>
                       <p>12333333333333333
                       {/* {_this.cardType(12333333333333333)} */}
                       </p>
                       <p>
                           <span>添加时间</span>
                           <span>12/25</span>
                       </p>
                   </li>
                </ul>
            </div>
        </div>
    )
    }
}
