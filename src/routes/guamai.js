import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/guamai.less";
import { Toast,InputItem, Modal,PullToRefresh} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import * as Shop from '../services/shop';
import transferImg from '../assets/images/transferImg.png';
import guamaijia from '../assets/images/guamaijia.png';
import redHeart from '../assets/images/redHeart.png';
import { APIHost } from '../utils/fetch';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class guamai extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          sel:'1',
          IMGS:'',
          smoney:'0',
          sales:'1',
          DATA:'',
          shopList:[],
          shopList2:[],
          chosed:'',
          qian:'',
          page:1,
          total:0,
          // size:2,
          height:document.documentElement.clientHeight,
          refreshing:false,
          INFO:'',
          Choose:''
        };
    }
      /*切换选项*/
  handleNavSel = (sel) => {
    if (sel === undefined) return;
    this.setState({sel});
    // console.log(sel,this.state.DATA,'111-+')
    //卖出记录
    fetch.maichuDetail({seller_uid:this.state.DATA.uid,page:this.state.page}).then((data)=>{
      // console.log(data,'234666卖出记录')
      if(data.code === 1){
        if(data.data.length<1){
        }else{
          this.setState({shopList:data.data.items, page: data.data.current_page, total: data.data.total})
        }
      }else{
        Toast.offline(data.msg,2); return;
      }
      })
      //买入记录
      fetch.mairuDetail({buyer_uid:this.state.DATA.uid,page:this.state.page}).then((data)=>{
        // console.log(data,'买入记录234666')
        if(data.code === 1){
          if(data.data.length<1){
          }else{
            this.setState({shopList2:data.data.items, page: data.data.current_page, total: data.data.total})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
        })
  };
  getShopList(){
    const {page} = this.state;   // 页数
    let pageNum = page*1+1;
    this.setState({ refreshing: true, isLoading: true });
    fetch.salesCenter({page:pageNum}).then((result)=>{
      if(result.code === 1){
        if(result.data.data){
          this.setState({ refreshing: false, isLoading: false, total: result.data.total });
        }else{
          var newArr = this.state.shopList.concat(result.data.items);

          this.setState({page: pageNum, shopList:newArr, total: result.data.total, refreshing: false, isLoading: false});
        }
      }else{
        Toast.offline(result.msg,2); return;
      }
    });
  }
  getShopList2(){
    const {page} = this.state;   // 页数
    let pageNum = page*1+1;
    this.setState({ refreshing: true, isLoading: true });
    fetch.salesCenter({page:pageNum}).then((result)=>{
      if(result.code === 1){
        if(result.data.data){
          this.setState({ refreshing: false, isLoading: false, total: result.data.total });
        }else{
          var newArr = this.state.shopList2.concat(result.data.items);

          this.setState({page: pageNum, shopList2:newArr, total: result.data.total, refreshing: false, isLoading: false});
        }
      }else{
        Toast.offline(result.msg,2); return;
      }
    });
  }
  async componentDidMount(){
    const data = await fetch.shouye({});
    this.setState({DATA:data.data})
    const info = await fetch.salesCenter({});
    // console.log(info,'1231111')
    this.setState({INFO:info.data})
    const choose = await fetch.userWarn({});
    this.setState({Choose:choose.data})
      // console.log(choose,'222---')
    const chose = await fetch.changeMon({});
    // console.log(chose,'cnnnnnnn')
    this.setState({chosed:chose.data,qian:chose.data[0].mini_base})
  }
          //上传图片
          async getLocalImg(e){
            //     var formData = new FormData();
            //     formData.append("imgFile",e.target.files[0]);
            //     const result =await fetch.uploadPZ(formData);
            //     Toast.hide();
            //     if(result.code == 1){
            //         this.setState({
            //             IMGS:APIHost+result.data
            //         })
            //         Toast.success('上传成功!',1);
            //     }else{
            //         Toast.offline("上传失败请重新尝试",1);
            //     }
            }
   /*切换金额*/
  handleNavMon(item,index,smoney){
    if (smoney === undefined) return;
    this.setState({smoney,qian:index.mini_base});
    // console.log(item,'333666')
    // console.log(item,index,smoney,'...++++++++++++++++++++++',item.mini_base)
    // this.setState({qian:item.id})
  };
    /*卖出中心切换金额*/
    handlsalesCenter = (sales) => {
      if (sales === undefined) return;
      this.setState({sales});
    };
    //创建订单
    async creOrder(){
    if(this.state.Choose === 1){
      Toast.info('你有一次交易未及时确认，为了避免被禁止交易，请注意以后及时确认！',3);
      return;
    };
    if(this.state.Choose >= 2){
      Toast.info('你已经被禁止交易！',3);
      return;
    };

      const {dispatch} = this.props;
      const {DATA}=this.state;
      let num = this.state.qian;
      let s_pwd = this.refs.s_pwd.state.value;
      // if(num ===''){
      //   Toast.offline('请输入挂卖金额',1.5);
      //   return;
      // }
      if(s_pwd ===''){
        Toast.offline('请输入交易密码',1.5);
        return;
      }
      let sql = {s_pwd,num};
      console.log(sql,'0.0.0.0')
      const val = await fetch.creadeOrder(sql);
      if(val.code ===1){
        Toast.success(val.msg,1.5,()=>{
          this.componentDidMount()
            this.clear()
        })
      }else{
        Toast.offline(val.msg,1.5);
      }
    }
    //清空
  clear = ()=>{
    this.setState({
      Data:'',
    })
    this.refs.s_pwd.state.value = '';
  }
    render() {
        const {history,dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.push('/shouye'))
          },
            titleName:"挂卖",
        }
        const {sel} = this.state;
        const {smoney} = this.state;
        const {sales} = this.state;
        let dataInfo = this.state.INFO.items;
        console.log(this.state.qian,'$$$$$$$$$$$$')
        console.log(dataInfo,this.state.INFO,'**---+*')
        console.log(this.state.chosed,'**--00000000000000000')
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .shangc dd{
                      color:white;
                      padding-left:0.3rem;
                    }
                    .fengmianDiv input{ display:none;}
                    .fengmianDiv img{
                    width: 0.35rem;
                    height: 0.35rem;
                    border:1px #ccc dashed;
                    position: absolute;
                    left: 1.8rem;
                    margin-top: 1.1rem;
                    }
                    // .inp{
                    //   overflow: visible;
                    //   background: none;
                    //   border: none;
                    //   border-bottom: 1px solid white;
                    //   color: white;
                    //   text-align: center;
                    // }
                    .am-list-item{
                      background-color:#2E323B;
                    }
                    .am-list-item .am-input-control input{
                      color:white;
                    }
                    .am-list-item .am-input-control input:disabled{
                      background-color:#2E323B;
                    }
                    .guamai__wrapper___SMEJ3 .guamai__matter___ZZbkq .guamai__mains___1mFdg input{
                      padding-left:2rem;
                    }
                    .wrapper___SMEJ3 .matter___ZZbkq .mains___1mFdg input{
                      padding-left:2rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.record} onClick={e => this.handleNavSel(e.target.dataset.type)}>
                    <p><span data-type='1' style={sel==='1'?{color:'#29A1F7'}:null}>挂单卖出</span></p>
                    <p><span data-type='2' style={sel==='2'?{color:'#29A1F7'}:null}>交易大厅</span></p>
                    <p><span data-type='3' style={sel==='3'?{color:'#29A1F7'}:null}>卖出记录</span></p>
                    <p><span data-type='4' style={sel==='4'?{color:'#29A1F7'}:null}>买入记录</span></p>
                  </div>
                   {/* 创建订单  */}
                  <div className={styles.matter} style={{display: sel === '1' ? 'block' : 'none'}}>
                    <div className={styles.first}>
                    <div className={styles.firsts}>
                      <p>我的可用余额</p>
                        <p>{this.state.DATA.xj_coin}</p>
                     </div>
                    </div>
                    {/* <div className={styles.second}>
                    <div className={styles.seconds}>
                    <dl class='shangc'>
                        <dt>
                          <label className="fengmianDiv">
                                <input id="imgURl" name="from" type="file" onChange = {this.getLocalImg.bind(this)}  accept="image/*"/>
                                <img className="id_card" ref="headIm"   src={this.state.IMGS?this.state.IMGS:guamaijia} />
                            </label>
                        </dt>
                        <dd>上传收款码或银行卡号</dd>
                    </dl>
                     </div>
                    </div> */}
                    <p style={{paddingLeft: '0.2rem', fontSize: '0.26rem',lineHeight: '0.7rem'}}>请选择挂卖数额</p>
                    <div className={styles.selectMoney}>
                    {
                      this.state.chosed?this.state.chosed.map((item,index)=>(
                        <span data-type={index} style={smoney==index?{color:'white',background:'#3790FF'}:null}
                        onClick={e => this.handleNavMon(e.target.dataset.type,item,index)}
                        >
                          {item.mini_base}
                        </span>
                      )):''
                    }
                      {/* // <span data-type='1' style={smoney==='1'?{color:'white',background:'#3790FF'}:null}>500</span>
                      // <span data-type='2' style={smoney==='2'?{color:'white',background:'#3790FF'}:null}>1000</span>
                      // <span data-type='3' style={smoney==='3'?{color:'white',background:'#3790FF'}:null}>2100</span>
                      // <span data-type='4' style={smoney==='4'?{color:'white',background:'#3790FF'}:null}>500</span> */}
                    </div>
                    {/* <div className={styles.mains}>
                      <span>挂卖数额</span>
                      <InputItem type='text' placeholder='请输入挂卖数额' ref='num' clear></InputItem>
                    </div>
                  <p style={{fontSize:'0.22rem',color:'#ABAEB3',margin:'0 0 0.5rem 0.65rem'}}>提示：挂卖数额最少为{this.state.DATA.sell_base}，并且是{this.state.DATA.sell_base}的倍数</p> */}
                  <div className={styles.mains}>
                    <span>交易密码</span>
                    <InputItem type='password' placeholder='请输入交易密码' ref='s_pwd' clear></InputItem>
                  </div>
                    <div className={styles.createOrder}>
                      <span onClick={()=>this.creOrder()}>创建订单</span>
                    </div>
                  </div>



                  {/* 卖出中心 */}
                  <div style={{display: sel === '2' ? 'grid' : 'none'}}>
                  {/* <div className={styles.salesCenter} onClick={e => this.handlsalesCenter(e.target.dataset.type)}>
                      <span data-type='1' style={sales==='1'?{color:'white',background:'#3790FF'}:null}>500</span>
                      <span data-type='2' style={sales==='2'?{color:'white',background:'#3790FF'}:null}>1000</span>
                      <span data-type='3' style={sales==='3'?{color:'white',background:'#3790FF'}:null}>2100</span>
                      <span data-type='4' style={sales==='4'?{color:'white',background:'#3790FF'}:null}>500</span>
                      <span data-type='5' style={sales==='5'?{color:'white',background:'#3790FF'}:null}>1000</span>
                      <span data-type='6' style={sales==='6'?{color:'white',background:'#3790FF'}:null}>2100</span>
                    </div> */}
                    <ul className={styles.salesMain}>
                    {
                      dataInfo?dataInfo.map((item,index)=>(
                        <li key={index}>
                        <dl>
                          <dt><img src={APIHost+item.seller.headimg} alt=''/></dt>
                          <dd>
                            <p>{item.seller.name}</p>
                            <p>
                              <span style={{marginRight:'0.12rem'}}>电话</span>
                              {item.seller.tel}
                              {/* {
                                item.credit===5?
                                <font><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/></font>
                                :item.credit===4?
                                <font><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/></font>
                                :item.credit===3?
                                <font><img src={redHeart} alt=''/><img src={redHeart} alt=''/><img src={redHeart} alt=''/></font>
                                :item.credit===2?
                                <font><img src={redHeart} alt=''/><img src={redHeart} alt=''/></font>
                                :item.credit===1?
                                <font><img src={redHeart} alt=''/></font>
                                :''
                              } */}
                            </p>
                            <p>支付方式:<span>{item.seller.bank}</span></p>
                          </dd>
                        </dl>
                        <span style={{position:'absolute',top:'0.4rem',right:'0.35rem'}}>交易金额：{item.trade_num}</span>
                        <span onClick={()=>history.push('/mcjyDetails?id='+item.id)}
                        style={{position:'absolute',top:'0.86rem',right:'0.35rem',padding:'6px 25px',background:'#EE4949',borderRadius:'5px'}}>购买</span>
                      </li>
                      )):''
                    }

                    </ul>
                  </div>
                  {/* 卖出记录 */}
                  <div style={{display: sel === '3' ? 'block' : 'none'}}>
                  <ul className={styles.orderRecord}>
                  <PullToRefresh id="ListBox"
                    style={{
                      height: this.state.height,
                      overflow: 'auto',
                    }}
                    indicator={{ deactivate: '上拉可以刷新' }}
                    direction="up"
                    refreshing={this.state.refreshing}
                    onRefresh={() =>this.getShopList()}
                  >
                   {
                  this.state.shopList?this.state.shopList.map((item,index)=>(
                    <li key={index} onClick={()=>history.push('/mcjyDetails2?id='+item.id+'&mr='+1)}>
                    <dl>
                      <dt><img src={APIHost+item.seller.headimg} alt=''/></dt>
                      <dd>
                        <p><span>昵称</span>   {item.seller.name}</p>
                        <p><span>电话</span>     {item.seller.tel}</p>
                        <p><span>状态</span>   <font style={{color:'#ED921D'}}>
                        {
                          item.status === 0?'挂卖中'
                          :item.status === 1?'等待打款'
                          :item.status === 2?'等待收款'
                          :item.status === 3?'交易完成'
                          :item.status === -1?'交易取消'
                          :''
                        }
                        </font></p>
                      </dd>
                    </dl>
                    <font className={styles.amount}>{item.trade_num}</font>
                  </li>
                  )):''
                }
            </PullToRefresh>
                    </ul>
                  </div>
                   {/* 买入记录 */}
                   <div style={{display: sel === '4' ? 'block' : 'none'}}>
                  <ul className={styles.orderRecord}>
                  <PullToRefresh id="ListBox"
                    style={{
                      height: this.state.height,
                      overflow: 'auto',
                    }}
                    indicator={{ deactivate: '上拉可以刷新' }}
                    direction="up"
                    refreshing={this.state.refreshing}
                    onRefresh={() =>this.getShopList2()}
                  >
                   {
                  this.state.shopList2?this.state.shopList2.map((item,index)=>(
                    <li key={index} onClick={()=>history.push('/mcjyDetails2?id='+item.id)}>
                    <dl>
                      <dt><img src={APIHost+item.seller.headimg} alt=''/></dt>
                      <dd>
                        <p><span>昵称</span>   {item.seller.name}</p>
                        <p><span>电话</span>     {item.seller.tel}</p>
                        <p><span>状态</span>   <font style={{color:'#ED921D'}}>
                        {
                          item.status === 0?'挂卖中'
                          :item.status === 1?'等待打款'
                          :item.status === 2?'等待收款'
                          :item.status === 3?'交易完成'
                          :item.status === -1?'交易取消'
                          :''
                        }
                        </font></p>
                      </dd>
                    </dl>
                    <font className={styles.amount}>{item.trade_num}</font>
                  </li>
                  )):''
                }
            </PullToRefresh>
                    </ul>
                  </div>
               </div>
        )
    }
}
