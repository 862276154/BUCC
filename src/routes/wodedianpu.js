import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wodedianpu.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shouyedemo from '../assets/images/shouyedemo.png';
import whiteBack from '../assets/images/whiteBack.png';
import { goBack } from 'react-router-redux';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class wodedianpu extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          modal1:false,
          modal2:false,
        };
    }
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
    //修改库存
    yesFunc(){
      alert(1)
    }
    //修改价格
    yesFunc2(){
      alert(2222)
    }
    fanhui(){
      const {dispatch} = this.props;
      dispatch(routerRedux.goBack())
    }

    render() {
        const {dispatch,history}=this.props;
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-tabs-default-bar-tab{
                      width:20% !important;
                    }
                    .am-tabs-default-bar-tab am-tabs-default-bar-tab-active{
                      width:20% !important;
                    }
                    .am-modal-popup{
                      padding:0 10%;
                    }
                    .am-modal-content{
                      background:#2E323B;
                      color:white;
                      border-radius:0.2rem;
                    }
                    .am-modal-popup-slide-up{
                      bottom:6rem;
                    }
                    .am-modal-body{
                      color:white;
                      line-height:4.5;
                    }
                   .modal input{
                     height:0.5rem;
                     border-radius:6px;
                     background: none;
                     color: white;
                     border:none;
                     border:1px solid white;
                     padding-left:0.2rem;
                   }
                   .am-modal-button-group-h .am-modal-button:first-child{
                     color:white;
                   }
                   .am-modal-button-group-h .am-modal-button{
                     color:#189DE2;
                   }
                   .price{
                     width:100%;
                     padding:0 20%;
                   }
                   .price input{
                     width:150px;
                   }
                    `
                }
            </style>
               <div className={styles.top}>
                <div className={styles.top_yi}>
                  <img src={whiteBack} alt='' onClick={()=>this.fanhui()}/>
                  <p className={styles.mydianpu}>我的店铺</p>
                  <span onClick={()=>history.push('/shangjiadingdan')}>商家订单</span>
                </div>
                <div className={styles.earnings}>
                  <p style={{borderRight:'2px solid white'}}>今日收益<span>2300</span></p>
                  <p>总收益<span>3300</span></p>
                </div>
               </div>
               <ul className={styles.main}>
                  <li>
                    <dl>
                      <dt><img src={shouyedemo} alt=''/></dt>
                      <dd>
                        <p>平板</p>
                        <p>库存：1</p>
                      </dd>
                    </dl>
                    <font>BUCC+360</font>
                    <div className={styles.operation}>
                      <span style={{color:'#189DE2',border:'1px solid #189DE2'}} onClick={this.showModal('modal1')}>修改库存</span>
                      <span style={{color:'#189DE2',border:'1px solid #189DE2'}} onClick={this.showModal('modal2')}>修改价格</span>
                      <span>上架</span>
                    </div>
                  </li>
               </ul>
               <div className={styles.bottom}>
                <p><span onClick={()=>history.push('/fabushangpin')}>新添商品</span></p>
                <p><span onClick={()=>history.push('/fabuguanggao')}>发布广告</span></p>
               </div>
               <Modal
                    popup
                    visible={this.state.modal1}
                    onClose={this.onClose('modal1')}
                    animationType="slide-up"
                    // closable='true'
                    footer={[
                      { text: '取消', onPress: () => { console.log('ok'); this.onClose('modal1')(); } },
                      { text: '确定', onPress: () => { this.yesFunc(); } }
                    ]}
                >
                 <div className='modal'>
                    <p className='everyday'>修改商品库存</p>
                    <input type='number' ref='num' placeholder={1}/>
                </div>
                </Modal>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    footer={[
                      { text: '取消', onPress: () => { console.log('ok'); this.onClose('modal2')(); } },
                      { text: '确定', onPress: () => { this.yesFunc2(); } }
                    ]}
                >
                 <div className='modal'>
                    <p className='everyday'>修改商品价格</p>
                    {/* 二选一 */}
                    {/* <input type='number' ref='num' placeholder={2300}/> */}
                    <p className='price'>
                      <input type='number' ref='num' placeholder={2300}/>
                          &nbsp;&nbsp;+&nbsp;&nbsp;
                      <input type='number' ref='num' placeholder='BUCC' disabled/>
                    </p>
                </div>
                </Modal>
               </div>
        )
    }
}
