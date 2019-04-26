import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {loggedIn,loginOut, APIHost} from '../utils/fetch';
import styles from "./styles/gerenzhongxin.less";
import { Button,Toast,Checkbox,Stepper, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as fetch from '../services/shop';
import headimg from '../assets/images/headimg.png';
import tright from '../assets/images/tright.png';
import unfilledOrders from '../assets/images/unfilledOrders.png';
import shipped from '../assets/images/shipped.png';
import approved from '../assets/images/approved.png';
import personage1 from '../assets/images/personage1.png';
import personage2 from '../assets/images/personage2.png';
import personage3 from '../assets/images/personage3.png';
import personage4 from '../assets/images/personage4.png';
import personage5 from '../assets/images/personage5.png';
import personage6 from '../assets/images/personage6.png';
import personage7 from '../assets/images/personage7.png';
import personage8 from '../assets/images/personage8.png';
import personage9 from '../assets/images/personage9.png';
import personage10 from '../assets/images/personage10.png';
import personage11 from '../assets/images/personage11.png';
import personage12 from '../assets/images/personage12.png';
import personage13 from '../assets/images/personage13.png';
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class gerenzhongxin extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "gerenzhongxin",
            DATA:''
        };
    }
  // 退出登录
  tuichuFunc=()=>{
    const {dispatch}=this.props;
    loginOut()
    Toast.success('退出成功',1.5,()=>{
      dispatch(routerRedux.push('/'))
    })
}
//  componentDidMount(){
//    fetch.qqq({}).then((data)=>{
//     console.log(data,'112')
//    })
// }
async componentDidMount(){
  const {dispatch} = this.props;
  //判断是否登录
  fetch.personalInfo({}).then((data)=>{
    console.log(data,'123')
    if(data.code === 1){
    this.setState({DATA:data.data})
    }else{
      Toast.offline(data.msg,2.5,()=>{
        dispatch(routerRedux.push('/'))
      });
    }
  })
  // const data = await fetch.personalInfo({});
  // console.log(data,'123')
  // this.setState({DATA:data.data})
}
gameFunc(){
  Toast.offline('暂未开放',2);
}
    render() {
        const {history,shop}=this.props;
        console.log(this.state.DATA,'mb')
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div className={styles.wrapper}>
                <style>
                    {
                        `

                        `
                    }
                </style>
                <MyTabBar {...tabBarProps}/>
                <div className={styles.head}>
                    <h1 style={{fontSize:'0.36rem',textAlign:'center'}}>个人中心</h1>
                    <dl className={styles.dla}>
                        <dt><img src={this.state.DATA?APIHost+this.state.DATA.headimg:headimg} alt=""/></dt>
                        <dd>
                            <p className={styles.dyi}>账号：{this.state.DATA.name}</p>
                            <p className={styles.der}>
                              {
                                this.state.DATA.grade===0?'体验会员'
                                :this.state.DATA.grade===1?'会员'
                                :this.state.DATA.grade===2?'玩家'
                                :this.state.DATA.grade===3?'白领'
                                :this.state.DATA.grade===4?'精英'
                                :''
                              }
                            </p>
                        </dd>
                    </dl>
                    {/* <img src={tright} alt="" className={styles.jiantou} onClick={()=>history.push('/gerenziliao')} /> */}
                    <h2 style={{fontSize:'0.26rem',marginTop:'1.4rem',textAlign:'center'}}>推荐人:{this.state.DATA.p_name?this.state.DATA.p_name:'无'}</h2>
                </div>
                <div className={styles.myOrder}>
                    <div className={styles.myOrders}>
                      <dl onClick={() => history.push('/wodedingdan?index='+1)}>
                        <dt><img src={unfilledOrders} alt=''/></dt>
                        <dd>未发货</dd>
                      </dl>
                      <dl onClick={() => history.push('/wodedingdan?index='+2)}>
                        <dt><img src={shipped} alt=''/></dt>
                        <dd>已发货</dd>
                      </dl>
                      <dl onClick={() => history.push('/wodedingdan?index='+3)}>
                        <dt><img src={approved} alt=''/></dt>
                        <dd>已完成</dd>
                      </dl>
                    </div>
                </div>
                <div className={styles.personage}>
                    <div className={styles.personages}>
                    <dl onClick={()=>history.push('/changeInfo')}>
                            <dt><img src={personage1} alt=""/></dt>
                            <dd>修改资料</dd>
                        </dl>
                        <dl onClick={()=>history.push('/perfectInfo')}>
                            <dt><img src={personage2} alt=""/></dt>
                            <dd>完善资料</dd>
                        </dl>
                        <dl onClick={()=>history.push('/wallet')}>
                            <dt><img src={personage3} alt=""/></dt>
                            <dd>我的钱包</dd>
                        </dl>
                        <dl onClick={()=>history.push('/incomelist')}>
                            <dt><img src={personage4} alt=""/></dt>
                            <dd>收入明细</dd>
                        </dl>
                        <dl onClick={()=>history.push('/group')}>
                            <dt><img src={personage5} alt=""/></dt>
                            <dd>我的好友</dd>
                        </dl>
                        {/* <dl onClick={()=>history.push('/yhklist')}>
                            <dt><img src={personage6} alt=""/></dt>
                            <dd>银行卡</dd>
                        </dl> */}
                        <dl onClick={()=>history.push('/gonggao')}>
                            <dt><img src={personage7} alt=""/></dt>
                            <dd>公告</dd>
                        </dl>
                        <dl onClick={()=>history.push('/xgmmCon')}>
                            <dt><img src={personage8} alt=""/></dt>
                            <dd>密码修改</dd>
                        </dl>
                        <dl onClick={()=>history.push('/address')}>
                            <dt><img src={personage9} alt=""/></dt>
                            <dd>收货地址</dd>
                        </dl>
                        <dl onClick={()=>history.push('/applyfor')}>
                            <dt><img src={personage10} alt=""/></dt>
                            <dd>商家申请</dd>
                        </dl>
                        <dl onClick={()=>history.push('/fenxiang')}>
                            <dt><img src={personage11} alt=""/></dt>
                            <dd>分享</dd>
                        </dl>
                        {/* <dl onClick={()=>history.push('/wodedianpu')}>
                            <dt><img src={personage12} alt=""/></dt>
                            <dd>我的店铺</dd>
                        </dl> */}
                        {/* <dl onClick={()=>history.push('/ticket')}>
                            <dt><img src={personage13} alt=""/></dt>
                            <dd>优惠券</dd>
                        </dl> */}
                    </div>
                </div>
                <div className={styles.quit}>
                    <span onClick={this.tuichuFunc}>退出登录</span>
                </div>
            </div>
        )
    }
}
