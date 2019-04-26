import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/shangjiadingdan.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import wallet_navbga from '../assets/images/logo.png';
import dianhua from '../assets/images/电话.png';
import dizhi from '../assets/images/地址.png';

import wallet_navbgb from '../assets/walletImg/wallet_navbgb.png';
import { Tabs,} from 'antd-mobile';


const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class shangjiadingdan extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            dingdanhao:3452414364,
            time:"2018-12-12 12:45",
            shop_name:"商品名称",
            shop_price:"68.9",
            shop_num:1,
            all_price:98.6,
            dianhua:18814912792,
            dizhi:"上海市南京路8号大厦",
            maijia_name:"李明玉",

        };
    }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"商家订单",
      }
      const tabs = [
        { title: '未发货' },
        { title: '已发货' },
        { title: '已验收' },
    ];
    
      
    return (
        <div>
            <style>{`
                .am-navbar{
                    background: #2E323B !important;
                }
                .am-tabs-tab-bar-wrap{
                    height: 0.9rem;
                }
               .am-tabs-default-bar{
                background-color: #3D424B !important;
               }
               .am-tabs-default-bar-top .am-tabs-default-bar-tab{
                   color:#fff;
                   font-size: 0.26rem;
               }
               .am-tabs-default-bar-tab-active{
                   color: #3790FF !important;
                   font-size:0.32rem !important;
               }
               .am-tabs-default-bar-underline{
                   border:0;
                   width:0 !important;
               }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <Tabs tabs={tabs}
                initalPage={'t2'}
            >
            <div>
            <div className={styles.weifahuo}>
                <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
                >订单号：{this.state.dingdanhao}<span className={styles.sapn1}>{this.state.time}</span></p>
                <div className={styles.shangpinming}>
                    <img src={wallet_navbga}></img>
                    <span className={styles.mai1}>{this.state.shop_name}</span>
                    <span className={styles.mai2}>￥{this.state.shop_price}</span>
                </div>
                <section className={styles.maijiaxinxin}>
                    <p>买家信息 
                        <span>共{this.state.shop_num}件商品</span>
                    <span>合计：{this.state.all_price}元</span>
                    </p>

                </section>
                <div className={styles.info}>
                    <img src={dizhi}></img>地址：{this.state.dizhi}
                
                </div>
                <div className={styles.info}>
                    <img src={dianhua}></img>电话：{this.state.dianhua}
                    <span>{this.state.maijia_name}</span>
                    <button>发货</button>
                </div>
                <p className={styles.ppp}></p>
            </div>
            </div>

            <div>
            <div className={styles.weifahuo}>
                <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
                >订单号：{this.state.dingdanhao}<span className={styles.sapn1}>{this.state.time}</span></p>
                <div className={styles.shangpinming}>
                    <img src={wallet_navbga}></img>
                    <span className={styles.mai1}>{this.state.shop_name}</span>
                    <span className={styles.mai2}>￥{this.state.shop_price}</span>
                </div>
                <section className={styles.maijiaxinxin}>
                    <p>买家信息 
                        <span>共{this.state.shop_num}件商品</span>
                    <span>合计：{this.state.all_price}元</span>
                    </p>

                </section>
                <div className={styles.info}>
                    <img src={dizhi}></img>地址：{this.state.dizhi}
                
                </div>
                <div className={styles.info}>
                    <img src={dianhua}></img>电话：{this.state.dianhua}
                    <span>{this.state.maijia_name}</span>
                    <button className={styles.yifahuo}>已发货</button>
                </div>
                <p className={styles.ppp}></p>
            </div>
            </div>

               <div>
            <div className={styles.weifahuo}>
                <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
                >订单号：{this.state.dingdanhao}<span className={styles.sapn1}>{this.state.time}</span></p>
                <div className={styles.shangpinming}>
                    <img src={wallet_navbga}></img>
                    <span className={styles.mai1}>{this.state.shop_name}</span>
                    <span className={styles.mai2}>￥{this.state.shop_price}</span>
                </div>
                <section className={styles.maijiaxinxin}>
                    <p>买家信息 
                        <span>共{this.state.shop_num}件商品</span>
                    <span>合计：{this.state.all_price}元</span>
                    </p>

                </section>
                <div className={styles.info}>
                    <img src={dizhi}></img>地址：{this.state.dizhi}
                
                </div>
                <div className={styles.info}>
                    <img src={dianhua}></img>电话：{this.state.dianhua}
                    <span>{this.state.maijia_name}</span>
                    <button className={styles.yiyanshou}>已验收</button>
                </div>
                <p className={styles.ppp}></p>
            </div>

            </div>
   
            </Tabs> 
        </div>
    )
    }
}
