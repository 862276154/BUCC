import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
// import styles from "./styles/yhklist.less";
import { List, Toast,WhiteSpace, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import ticket_yi from '../assets/walletImg/ticket_yi.png';
import ticket_wei from '../assets/walletImg/ticket_wei.png';
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

    render() {
        const {dispatch,history}=this.props;
        const Item = List.Item;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"修改密码",
      }
    
      var _this=this;
    return (
        <div>
            <style>{`
                body,html{
                    background-color: #2E323B;
                }
                .am-list{
                    width:100%;
                    background-color: #2E323B;
                    margin:auto;
                  }
                  .am-list-item{
                    min-height: 0.8rem;
                    border-radius: 0.1rem;
                    background-color: #2E323B;
                  }
                  .am-list-item img{
                    width:0.28rem;
                    height:0.29rem;
                  }
                  .am-list-item .am-list-line .am-list-content{
                    font-size: 0.26rem;
                    line-height: 0.8rem;
                    padding-top: 0;
                    padding-bottom: 0;
                    color:#fff;
                  }
                  html:not([data-scale]) .am-list-body::before,
                  html:not([data-scale]) .am-list-body::after,
                  html:not([data-scale]) .am-list-body div:not(:last-child)
                   .am-list-line::after{
                    height:0;
                  }
                  .am-list-body{
                    background-color: transparent;
                  }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div>
                <List>
                    <Item
                        onClick={()=>history.push('/xgmm?id='+1)}
                        arrow="horizontal"
                    >
                        修改登录密码
                    </Item>                  
                    <WhiteSpace style={{height:'1px',backgroundColor:'#434953'}}/>
                    <Item
                        onClick={()=>history.push('/xgmm?id='+2)}
                        arrow="horizontal"
                    >
                        修改支付密码
                    </Item>                  
                    <WhiteSpace style={{height:'1px',backgroundColor:'#434953'}}/>
                </List>
            </div>
        </div>
    )
    }
}
