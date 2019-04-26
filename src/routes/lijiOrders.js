import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/lijiOrders.less";
import { Toast,InputItem, Modal,List} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import redact from '../assets/images/redact.png';
import shouyedemo from '../assets/images/shouyedemo.png';
import store from '../assets/images/store.png';
import { APIHost } from '../utils/fetch';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class lijiOrders extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          sel:'1',
          modal1:false,
          DATA:'',
          dizhi:'',
          Number:'',
          type:'1',
          PRICE:''
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
         /*切换选项*/
  handleNavSel = (sel) => {
    if (sel === undefined) return;
    this.setState({sel});
    this.setState({type:sel})
    console.log(this.state.type,'22222222222222222222222222')
  };

    // console.log(message,'11')
    async componentDidMount(){
      const {  location } = this.props;
      fetch.shouye({}).then((prices)=>{
        if(prices.code === 1){
          console.log(prices,'shouyelaide')
          this.setState({PRICE:prices.data.price});
          }
      });
      const parse = queryString.parse(location.search.replace('?', ''));
      const data = await fetch.huoquDEtail({orderid:parse.id});
      console.log(data,'11')
      this.setState({DATA:data.data})
      const info = await fetch.changeDizhi({});
      console.log(info,'dzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz')
      this.setState({dizhi:info.data[0]});
      // this.setState({dizhi:info.data[0]});
    }
     // 进入地址列表
     gotoAddressList() {
      const { dispatch } = this.props;
      dispatch(routerRedux.push('/address'));
  }
  //立即下单
  async xiadanFunc(){
    const {  location } = this.props;
    const parse = queryString.parse(location.search.replace('?', ''));
    console.log(this.state.type,'2')
    let message = this.refs.message.value;
    console.log(this.state.dizhi,'2999')
    if(this.state.dizhi===undefined){
      Toast.offline('请选择收获地址',1.5);
      return;
    }
         if(this.state.type === '1'){
           this.setState({modal1:true})
         }else{
           Toast.offline('暂未开通',1.5);
         }
  }
  async yesFunc(){
    const {  location,dispatch } = this.props;
    const parse = queryString.parse(location.search.replace('?', ''));
    let note = this.refs.message.value;
    let s_pwd = this.refs.pwd.value;
    let orderid = parse.id;
    if(s_pwd === ''){
      Toast.offline('请输入交易密码',1.5);
      return;
    }
    let sql = {note,s_pwd,orderid};
    console.log(sql,'***')
    const value = await fetch.orderPay(sql);
    if(value.code === 1){
      Toast.success(value.msg,1.5,()=>{
        dispatch(routerRedux.push('/wodedingdan'));
      });
    }else{
      Toast.fail(value.msg,1.5);
      return;
    }
  }
    render() {
        const {dispatch}=this.props;
        const {sel,DATA,dizhi,PRICE} = this.state;
        const _this = this;
        const Detail = DATA?DATA.detail:'';
        const nnn = (Math.round(DATA.order_money / PRICE * 100)/100.00);
        console.log(dizhi,'dddddddddddddddd')
        console.log(Detail,'6565656565')
        console.log(PRICE,'sssssss')
        console.log(nnn,'hejijineeee')
        // console.log(this.state.Number,'0.0')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"立即下单",
      }

        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-modal-content{
                      background:#2E323B;
                      color:white;
                      border-radius:0.2rem;
                    }
                    .am-modal-popup-slide-up{
                      bottom:5rem;
                      padding:0 0.5rem;
                    }
                    .am-modal-body{
                      color:white;
                      line-height:2.5;
                    }
                    .am-modal-close{
                      top:0.2rem;
                      background-color:white;
                      border-radius:50%;
                    }
                    .am-modal-button-group-v .am-modal-button{
                      color:white;
                      border:none;
                    }
                    .today input{
                      overflow: visible;
                      text-align: center;
                      background: none;
                      border: none;
                      color: white;
                      border-bottom: 1px solid #696969;
                    }
                    html:not([data-scale]) .am-modal-button-group-v .am-modal-button::before{
                      background-color:none !important;
                      height:0;
                    }
                    .nums{
                      margin-top:0.4rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                {
                  dizhi?
                  <div className={styles.dizhi} onClick={_this.gotoAddressList.bind(_this)}>
                  <p>{dizhi.name}<span>{dizhi.tel}</span></p>
                  <p>{dizhi.area_name+dizhi.address}</p>
                  <img src={redact} alt='' />
                </div>
                :
                <div className={styles.dizhi} onClick={_this.gotoAddressList.bind(_this)} >
                <p>请选择收货地址</p>
                <img src={redact} alt='' />
            </div>
                }

                <div className={styles.main}>
                <p style={{lineHeight:'0.68rem',fontSize:'0.24rem'}}><img src={store} alt='' style={{marginRight:'0.3rem',marginBottom:'5px'}}/>{DATA.shop?DATA.shop.shop_name:''}</p>
                {
                  Detail?Detail.map((item,index)=>(
                    <dl>
                      <dt><img src={APIHost+item.goods_pic} alt='' /></dt>
                      <dd>
                        <p style={{fontSize:'0.28rem'}}>{item.goods_name}</p>
                        <p style={{fontSize:'0.24rem'}}>颜色：{item.color_name}    <span style={{marginLeft:'0.3rem'}}>规格：{item.sku_name}</span></p>
                        <p style={{fontSize:'0.32rem',color:'#FF0000'}}>{item.sku_price}</p>
                      </dd>
                      <font>x{item.goods_num}</font>
                    </dl>
                  )):''
                }
                </div>
                {/* <p style={{color:'white',fontSize:'0.24rem',lineHeight:'0.7rem',padding:'0 0.24rem',borderBottom:'1px solid #494949'}}>
                  赠送优惠券
                  <span style={{float:'right',color:'#FF0000'}}>66张</span>
                </p> */}
                <div className={styles.payWay}>
                  <p style={{lineHeight:'0.7rem'}}>支付方式</p>
                  <div className={styles.payWays} onClick={e => this.handleNavSel(e.target.dataset.type)}>
                    <span data-type='1' style={sel==='1'?{background:'#3790FF',border:'none'}:null}>流通钱包</span>
                    <span data-type='2' style={sel==='2'?{background:'#3790FF',border:'none'}:null}>支付宝支付</span>
                    <span data-type='3' style={sel==='3'?{background:'#3790FF',border:'none'}:null}>微信支付</span>
                    {/* <span data-type='4' style={sel==='4'?{background:'#3790FF',border:'none'}:null}>其他</span> */}
                  </div>
                </div>
                 <div className={styles.liuyan}>
                  <textarea type='text' ref='message' placeholder='买家留言：'></textarea>
               </div>
                <div className={styles.dibu}>
                  合计：<font>{this.state.DATA.order_money}</font>
                  <span onClick={()=>this.xiadanFunc()}>确认下单</span>
                </div>
                <Modal
                    popup
                    visible={this.state.modal1}
                    onClose={this.onClose('modal1')}
                    animationType="slide-up"
                    closable='true'
                    // footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                >
                 <div className='modal'>
                 {/* {
                   this.state.type === '1'?
                   <p className='everyday'>所需数量111</p>
                   :''
                 } */}
                    <p className='nums'>所需数量{nnn}</p>
                    <p className='everyday'>请输入交易密码</p>
                    <div className='today'>
                      <input type='password' ref='pwd'/>
                    </div>
                    <div onClick={()=>this.yesFunc()}>确  定</div>
                </div>
                </Modal>
               </div>
        )
    }
}
