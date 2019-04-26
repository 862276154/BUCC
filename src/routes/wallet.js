import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wallet.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import wallet_navbga from '../assets/walletImg/wallet_navbga.png';
import wallet_navbgb from '../assets/walletImg/wallet_navbgb.png';
import { Tabs,} from 'antd-mobile';


const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class wallet extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            xianshi:false,
            DATA:''
        };
    }
    async componentDidMount(){
      const data = await fetch.personalInfo({});
      console.log(data,'123')
      this.setState({DATA:data.data})
    }
// 切换nav
async navBtn(val){
    if(val==false){
      this.setState({
        xianshi:!this.state.xianshi,
      })
    }
    if(val==true){
      this.setState({
        xianshi:!this.state.xianshi,
      })
    }
  }
     // 选择类型
     pxChangeJ(){
        var objS = document.getElementById("pxidj");
        var pxValue = objS.options[objS.selectedIndex].value;
        // this.setState({
        // pxValue:pxValue,
        // })
        // console.log(pxValue,'pxValue')
        // var datab={type:pxValue?pxValue:0,page:'1',size:'15'}
        // fetchs.creat_Token(fetchs.APIHost + "/user/acclog", fetchs.getAuth("/user/acclog"), JSON.stringify(datab)).then(response => response.json())
        // .then(json => {
        //     // console.log("商品333", json)
        //     if (json.code == 1) {
        //         this.setState({
        //             JjListb:json.data
        //         })
        //     }else {
        //         Toast.offline(json.msg, 2);
        //     }
        // });
    }
    render() {
        const {dispatch,history}=this.props;
        console.log(this.state.DATA,'1122')
        const yi = parseFloat(this.state.DATA.cx_coin);
        const er = parseFloat(this.state.DATA.xj_coin);
        const san = parseFloat(this.state.DATA.xf_coin);
        const si = parseFloat(this.state.DATA.tz_coin);
        const alls = parseFloat(yi+er+san+si).toFixed(2);
        console.log(alls,'00')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"我的钱包",
      }
      const tabs2 = [
        { title: '', sub: '1' },
        { title: '', sub: '2' },
      ];

    return (
        <div>
            <style>{`
                .am-tabs{
                    position: static;
                }
                .am-tabs-default-bar-bottom{
                    background-color:transparent !important;
                }
                .am-tabs-default-bar-bottom .am-tabs-default-bar-underline{
                    width: 0 !important;
                }
                .am-tabs-default-bar-underline{
                    border:0;
                }
                .am-tabs-default-bar-bottom .am-tabs-default-bar-content{
                    justify-content:center;
                }
                .am-tabs-default-bar-bottom .am-tabs-default-bar-tab{
                    width: 0.15rem !important;
                    height: 0.15rem;
                    background: #A8A8A8;
                    border-radius: 50%;
                    margin: 0 0.1rem;
                    padding: 0 0;
                }
                html:not([data-scale]) .am-tabs-default-bar-bottom .am-tabs-default-bar-tab::before{
                    height:0;
                }
                .am-tabs-default-bar-tab>span{
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    border-radius: 50%;
                }
                .am-tabs-default-bar-tab-active{
                    background: #3790FF !important;
                }
                .am-tabs-tab-bar-wrap{
                    position: absolute;
                    bottom: -0.2rem;
                    width: 100%;
                    left: 0;
                }
            `} </style>
            <MyNavBar {...navBarProps}/>
            <div className={styles.wallet_top}>
                <p>总资产</p>
                <p>
                  {alls}
                {/* parseInt('this.state.DATA.cx_coin') */}
                {/* {this.state.DATA.cx_coin}+{this.state.DATA.xj_coin} */}
                </p>
                <ul className={styles.wallet_ul}>
                    <li>
                        <p>通证钱包</p>
                        <p>{this.state.DATA.tz_coin}</p>
                    </li>
                    <li>
                        <p>消费钱包</p>
                        <p>{this.state.DATA.xf_coin}</p>
                    </li>
                </ul>
                <ul className={styles.wallet_ul}>
                    <li  onClick={this.navBtn.bind(this,false)}>
                        <p>流通钱包</p>
                        <p>{this.state.DATA.xj_coin}</p>
                    </li>
                    <li  onClick={this.navBtn.bind(this,true)}>
                        <p>生息钱包</p>
                        <p>{this.state.DATA.sx_coin}</p>
                    </li>
                    <li  onClick={this.navBtn.bind(this,true)}>
                        <p>储蓄钱包</p>
                        <p>{this.state.DATA.cx_coin}</p>
                    </li>
                </ul>
            </div>
            {/* 流通钱包 */}
            {/* <div className={styles.wallet_cona}
            style={{display:this.state.xianshi===false?'block':'none',
            paddingBottom:'0.2rem'}}>
                 <Tabs tabs={tabs2}
                    initialPage={1}
                    tabBarPosition="bottom"
                    renderTab={tab => <span>{tab.title}</span>}
                    >
                    <div>
                        <ul className={styles.wallet_conb_ula}>
                            <li>
                                <p>挂卖中</p>
                                <p>90.01</p>
                            </li>
                            <li>
                                <p>复投中</p>
                                <p>90.01</p>
                            </li>
                        </ul>
                        <p className={styles.wallet_conb_ulp}>预期收益类目构成</p>
                        <ul className={styles.wallet_conb_ulb}>
                            <li>
                                <p>动态收益</p>
                                <p>90.01</p>
                            </li>
                            <li>
                                <p>静态收益</p>
                                <p>90.01</p>
                            </li>
                            <li>
                                <p>手续费</p>
                                <p>90.01</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <ul className={styles.wallet_conb_ulc}>
                            <li>
                                <p>BUCC</p>
                                <p>90.01</p>
                            </li>
                            <li>
                                <img alt='' src={transition}/>
                            </li>
                            <li>
                                <select id="pxidj" onClick={() =>{this.pxChangeJ()}}
                                    style={{ background: 'transparent',border: '0',color:'#fff',fontSize:"0.26rem"}}>
                                    <option style={{background:'#333'}} value='0'>比特币</option>
                                    <option style={{background:'#333'}} value='1'>乙太仿</option>
                                </select>
                                <p>90.01</p>
                            </li>
                        </ul>
                        <ul className={styles.wallet_conb_uld}>
                            <li>
                                <p>BUCC</p>
                                <p>90.01</p>
                            </li>
                            <li></li>
                            <li>
                                <p>RMB</p>
                                <p>90.01</p>
                            </li>
                        </ul>
                        <ul className={styles.wallet_conb_uld}>
                            <li>
                                <p>BUCC</p>
                                <p>90.01</p>
                            </li>
                            <li></li>
                            <li>
                                <p>RMB</p>
                                <p>90.01</p>
                            </li>
                        </ul>
                        <ul className={styles.wallet_conb_uld}>
                            <li>
                                <p>BUCC</p>
                                <p>90.01</p>
                            </li>
                            <li></li>
                            <li>
                                <p>比特币</p>
                                <p>90.01</p>
                            </li>
                        </ul>
                    </div>
                </Tabs>
            </div> */}
            {/* 储蓄钱包 */}
            {/* <div className={styles.wallet_conb}
             style={{display:this.state.xianshi===true?'block':'none'}}>
                <ul className={styles.wallet_conb_ula}>
                    <li>
                        <p>动态算力</p>
                        <p>90.01</p>
                    </li>
                    <li>
                        <p>静态算力</p>
                        <p>90.01</p>
                    </li>
                </ul>
                <p className={styles.wallet_conb_ulp}>预期收益类目构成</p>
                <ul className={styles.wallet_conb_ulb}>
                    <li>
                        <p>动态算力</p>
                        <p>90.01</p>
                    </li>
                    <li>
                        <p>静态算力</p>
                        <p>90.01</p>
                    </li>
                    <li>
                        <p>充值</p>
                        <p>90.01</p>
                    </li>
                </ul>
            </div> */}
            <p className={styles.walletBtn} onClick={()=>history.push('/chongzhi')}>充值</p>
        </div>
    )
    }
}
