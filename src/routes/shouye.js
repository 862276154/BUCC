import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
// 登出方法,当前服务器网址
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
// 本页样式
import styles from "./styles/shouye.less";
// 引入ANTD组件
import { Button,Toast,WhiteSpace,WingBlank,Card, Modal,Tabs,Badge} from 'antd-mobile';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 临时商品图
import saoyisao from '../assets/images/saoyisao.png';
import mark from '../assets/images/mark.png';
import transfer from '../assets/images/transfer.png';
import transition from '../assets/images/transition.png';
import hangSell from '../assets/images/hangSell.png';
import shopping from '../assets/images/shopping.png';
import topUp from '../assets/images/topUp.png';
import moneyCode from '../assets/images/moneyCode.png';
import theGame from '../assets/images/theGame.png';
import nationalBrands from '../assets/images/nationalBrands.png';
import business from '../assets/images/business.png';
import retail from '../assets/images/retail.png';
import announcement from '../assets/images/announcement.png';
import shouyedemo from '../assets/images/shouyedemo.png';
const alert=Modal.alert;

   function AndroidToJs(result) {
      console.log(result, 'xx');
      // alert(1,'111');
    }

    window.SaoYiSao = function SaoYiSao() {
      // alert(1,'111');
      console.log('方法')
    };
    window.AndroidToJs = function (data) {
      // alert(data,'222')
      // data='https://www.pgyer.com/9wsc';
      if (data == undefined) {
        return;
      } else {
        var str = data.slice(0, 4);
        if (str === 'http') {
          window.location.href = data;
        } else {
          window.location.href = 'http://' + data;
        }
      }
    };

@connect(state => ({shopData: state.shop}))
export default class shouye extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shouye",
            modal1:false,
            jiaru:'1',
            DATA:'',
            Gonggao:'',
            data1:[],
            data2:[],
            id:"",
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
    async componentDidMount(){
      const{dispatch} = this.props;
      fetch.shouye({}).then((data)=>{
        if(data.code === 1){
          this.setState({DATA:data.data});
          }else{
            Toast.offline(data.msg,2.5,()=>{
              dispatch(routerRedux.push('/'));
            });
          }
      });
      fetch.gonggao({type:3}).then((info)=>{
        console.log(info,'1')
        this.setState({Gonggao:info.data[0]})
      })
      const result1 = await fetch.gonggao({ type:1});
      const result2 = await fetch.gonggao({ type:2});

      console.log(result1.data,"result111111111111111");
      console.log(result2.data,"result222222222222222");
      console.log(this,"thissssss");
      this.setState({
        data1:result1.data,
        data2:result2.data,

      })
    }
    handleSao(){
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.saoYiSao(true);
      } else if (isIOS) {
        window.location.href = "js://iosSaoYiSao";
        // window.SaoYiSao();
      }
    }
    hangSellFunc(){
      const {dispatch} = this.props;
      console.log(this.state.jiaru,'2');
      dispatch(routerRedux.push('/guamai'));
      // if(this.state.jiaru){
      //   this.setState({modal1:true});
      // }else{
      //   dispatch(routerRedux.push('/guamai'));
      // }
    }
    gameFunc(){
      Toast.offline('暂未开放',2);
    }
    AndroidToJs = () => {
      alert('安卓al');
    };

    AndroidToJs() {
      alert('安卓al');
    }
    render() {
      var reg = /<p>(.*)<\/p>/g;
        const {history}=this.props;
        const {Gonggao} = this.state;
        const bulletin = Gonggao?Gonggao:''
        console.log(this.state.DATA,'ggggg')
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        const tabs = [
          { title: <Badge>推荐</Badge> },
          { title: <Badge>热点</Badge> },
        ];
        const { data1,data2 } = this.state;
        return (
          <div className={styles.wrapper}>
          <style>
            {
              `
              .am-tabs-tab-bar-wrap div{
                background-color:#2E323B !important;
              }
              .am-tabs-default-bar-tab-active{
                color:#2E8CFF;
              }
              .am-tabs-default-bar-underline{
                border:none;
              }
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
                bottom:5rem;
              }
              .am-modal-body{
                color:white;
                line-height:4.5;
              }
              .am-modal-close{
                top:0.2rem;
                background-color:white;
                border-radius:50%;
              }
              .am-modal-button-group-v .am-modal-button{
                color:white;
              }
              `
            }
          </style>
                <MyTabBar {...tabBarProps}/>
                <div className={styles.top}>
                  会员名({this.state.DATA.name})
                  <img src={saoyisao} alt='' onClick={this.handleSao.bind(this)}/>
                </div>
                <div className={styles.money}>
                  <div className={styles.mone}>
                    <img src={mark} alt='' style={{marginTop:'0.23rem',marginLeft:'0.32rem'}} onClick={()=>history.push('/fenxiang')}/>
                    {/* <p style={{marginTop:'0.4rem',fontSize:'0.56rem',textAlign:'center'}}>${this.state.DATA.count}</p>
                    <p style={{marginTop:'0.23rem',fontSize:'0.32rem',textAlign:'center'}}>总资产</p> */}
                    <div className={styles.price}>
                      <p>{this.state.DATA.count}<span>总资产</span></p>
                      <p>￥{this.state.DATA.price}<span>今日BUCC价格</span></p>
                    </div>
                    <div className={styles.mon}>
                      <p>{this.state.DATA.cx_coin}<span>储蓄钱包</span></p>
                      <p>{this.state.DATA.power}‰<span>分享收益</span></p>
                      <p>{this.state.DATA.pow}‰<span>消费收益</span></p>
                    </div>
                  </div>
                </div>
                <div className={styles.banner}>
                  <dl onClick={()=>history.push('/zhuanzhang')}>
                    <dt><img src={transfer} alt=''/></dt>
                    <dd>转账</dd>
                  </dl>
                  <dl onClick={()=>history.push('/zhuanhuan')}>
                    <dt><img src={transition} alt=''/></dt>
                    <dd>转换</dd>
                  </dl>
                  <dl onClick={()=>this.hangSellFunc()}
                  >
                    <dt><img src={hangSell} alt=''/></dt>
                    <dd>挂卖</dd>
                  </dl>
                  <dl onClick={()=>history.push('/sichengtianxia')}>
                    <dt><img src={shopping} alt=''/></dt>
                    <dd>购物</dd>
                  </dl>
                  <dl onClick={()=>history.push('/chongzhi')}>
                    <dt><img src={topUp} alt=''/></dt>
                    <dd>充值</dd>
                  </dl>
                  <dl onClick={()=>history.push('/shoukuanma')}>
                    <dt><img src={moneyCode} alt=''/></dt>
                    <dd>收款码</dd>
                  </dl>
                  <dl onClick={()=>this.gameFunc()}>
                    <dt><img src={theGame} alt=''/></dt>
                    <dd>游戏</dd>
                  </dl>
                  <dl onClick={()=>history.push('/minzupinpai')}>
                    <dt><img src={nationalBrands} alt=''/></dt>
                    <dd>民族品牌</dd>
                  </dl>
                  <dl onClick={()=>history.push('/xinshangye')}>
                    <dt><img src={business} alt=''/></dt>
                    <dd>新商业</dd>
                  </dl>
                  <dl onClick={()=>history.push('/xinlingshou')}>
                    <dt><img src={retail} alt=''/></dt>
                    <dd>新零售</dd>
                  </dl>
                </div>
                <div className={styles.gonggao} onClick={()=>history.push('/gonggao')}>
                    <img src={announcement} alt='' className={styles.gfgg}/>
                    <marquee behavior="" direction="">
                    {bulletin?bulletin.n_message.replace(/<p>|<\/p>/g, ''):''}
                    </marquee>
                </div>
                <div className={styles.main}>
                <Tabs tabs={tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                  <div style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#2E323B' }}>

                  { data1?data1.map(function(item,index){
                    return(
                      <dl className={styles.first} key={index} onClick={()=>history.push('/xiangqing?id='+item.id)}>
                      <dd>
                        <p className={styles.shenglue}>{item.n_title}</p>
                        <p>{item.create_time}</p>
                      </dd>
                      <dt><img src={APIHost+item.img} alt=''/></dt>
                    </dl>
                    )
                  }):'' }

                    {/* <div className={styles.second}>
                      <p>资讯标题资讯标题资讯标题资讯标题资讯标题资讯标题资标题资讯标题资标题资讯标题资...</p>
                      <p>
                        <img src={shouyedemo} alt=''/>
                        <img src={shouyedemo} alt=''/>
                        <img src={shouyedemo} alt=''/>
                      </p>
                      <p>2018-12-12</p>
                    </div> */}

                  </div>
                  <div style={{ alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#2E323B' }}>

                  { data2?data2.map(function(val,i){
                    return(
                      <dl className={styles.first} key={i} onClick={()=>history.push('/xiangqing?id='+val.id)}>
                      <dd>
                        <p className={styles.shenglue}>{val.n_title}</p>
                        <p>{val.create_time}</p>
                      </dd>
                      <dt><img src={APIHost+val.img} alt=''/></dt>
                    </dl>
                    )
                  }):'' }

                  </div>
                </Tabs>
                </div>
                {/* <Modal
                    popup
                    visible={this.state.modal1}
                    onClose={this.onClose('modal1')}
                    animationType="slide-up"
                    closable='true'
                    footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                >
                 <div className='modal'>
                    <p className='everyday'>提  示</p>
                    <div className='today'>注册满？工作日后可以挂卖</div>
                </div>
                </Modal> */}
            </div>
        )
    }
}
