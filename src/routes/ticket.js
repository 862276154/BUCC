import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wallet.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import ticket_yi from '../assets/walletImg/ticket_yi.png';
import ticket_wei from '../assets/walletImg/ticket_wei.png';
import { Tabs,} from 'antd-mobile';


const queryString = require('query-string');
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class ticket extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            modal1:false,
        };
    }
// modal
showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
//兑换按钮
  async dhBtn(){

  }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"我的优惠券",
      }
      const tabs = [
        { title: '未使用', sub: '1' },
        { title: '已使用', sub: '2' },
      ];

    return (
        <div>
            <style>{`
                .am-tabs-default-bar{
                    background:transparent !important;
                }
                .am-tabs-default-bar-top .am-tabs-default-bar-tab {
                    color: #fff;
                }
                .am-tabs-default-bar-tab-active{
                    color: #3790FF !important;
                }
                .am-tabs-default-bar-underline{
                    border:0;
                }
                html:not([data-scale]) .am-tabs-default-bar-top .am-tabs-default-bar-tab::after{
                    height:0;
                }
                .am-modal-close-x {
                    width: 0;
                    height: 0;
                }
                .am-modal-transparent {
                    width:90%;
                }
                .am-modal-title{
                   color:#fff;
                }
                .am-modal-content{
                    background:#2E323B;
                }
                .am-modal-button-group-h .am-modal-button:first-child {
                    color:#3790FF;
                }
                .am-modal-button-group-h .am-modal-button{
                    color: #fff;
                }
                html:not([data-scale]) .am-modal-button-group-h .am-modal-button:last-child::before,
                html:not([data-scale]) .am-modal-button-group-h::before{
                    width:0;
                }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div>
                 <Tabs tabs={tabs}
                    initialPage={0}
                    tabBarPosition="top"
                    renderTab={tab => <span>{tab.title}</span>}
                    >
                    <div className={styles.ticketCona}>
                        <ul>
                            <li  onClick={this.showModal('modal1')}>
                                <p>￥100</p>
                                <p>可兑换等值的BUCC</p>
                                <p>2018-12-12 00:00到期</p>
                            </li>
                            <li>
                                <p>￥100</p>
                                <p>可兑换等值的BUCC</p>
                                <p>2018-12-12 00:00到期</p>
                            </li>
                        </ul>
                        {/*兑换弹框 */}
                        <Modal
                            visible={this.state.modal1}
                            transparent
                            onClose={this.onClose('modal1')}
                            maskClosable={true}
                            closable={true}
                            title="兑换"
                            footer={[
                                 { text: '取消', onPress: () => {this.onClose('modal1')(); } },
                                { text: '确定',onPress:()=>this.dhBtn() },

                            ]}
                        >
                        <p style={{color:'#fff',fontSize:"0.3rem",margin: '0.5rem 0'}}>当前优惠券可兑换BUCC,确定兑换吗？</p>
                        </Modal>
                    </div>
                    <div className={styles.ticketConb}>
                        <ul>
                            <li>
                                <p>￥100</p>
                                <p>可兑换等值的BUCC</p>
                                <p>已使用</p>
                            </li>
                            <li>
                                <p>￥100</p>
                                <p>可兑换等值的BUCC</p>
                                <p>已使用</p>
                            </li>
                        </ul>
                    </div>
                </Tabs>
            </div>
        </div>
    )
    }
}
