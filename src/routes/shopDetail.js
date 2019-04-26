import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {APIHost} from '../utils/fetch';
import styles from "./styles/shopDetail.less";
import { Toast,InputItem, Modal,Carousel,Stepper} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shopGoback from '../assets/images/shopGoback.png';
import shouyedemo from '../assets/images/shouyedemo.png';
import shopGo from '../assets/images/shopGo.png';
import shopStore from '../assets/images/shopStore.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class shopDetail extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          modal2:false,
          modal1:false,
          val:'1',
          itemIndex:'',
          itemIndex2:'',
          rongliang:'',
          yanse:'',
          tupian:'',
          toggle:'',
          DATA:'',
          Price:'',
          sku_id:'',
          color_id:''
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
    onChange = (val) => {
      this.setState({ val });
    }
    handleClick(item,val,index){
      this.setState({itemIndex:val})
      this.setState({rongliang:item.sku_name})
      this.setState({Price:item.realprice})
      this.setState({sku_id:item.sku_id})
    };
    handleClick2(item,val,index){
      this.setState({itemIndex2:val})
      this.setState({yanse:item.color_name})
      this.setState({tupian:item.sku_pic})
      this.setState({color_id:item.color_id})
    };
    componentDidMount(){
      const {location} = this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      this.setState({toggle:parse.tabs})
      fetch.baodanDetails({goods_id:parse.id}).then((data)=>{
        console.log(data,'222222222q')
        this.setState({DATA:data.msg})
        this.setState({Price:data.msg.goods_sku[0].realprice})
        this.setState({rongliang:data.msg.goods_sku[0].sku_name})
        this.setState({sku_id:data.msg.goods_sku[0].sku_id})
        this.setState({yanse:data.msg.goods_color[0].color_name})
        this.setState({color_id:data.msg.goods_color[0].color_id})
        this.setState({tupian:data.msg.goods_color[0].sku_pic})
      })
    }
    //立即购买
    async buyNow(){
      const {history,dispatch} = this.props;
      console.log(this.state.rongliang,'.....')
      console.log(this.state.yanse,'.....')
      console.log(this.state.DATA.goods_name,'.....')
      console.log(this.state.Price,'.....')
      console.log(this.state.DATA.goods_pic,'.....')
      fetch.cjdingdan({goods_id:this.state.DATA.id,
        sku_id:this.state.sku_id,color_id:this.state.color_id,
        goods_num:this.state.val,shop_id:this.state.DATA.shop_id,
        sku_name:this.state.rongliang,sku_price:this.state.Price,
        goods_pic:this.state.DATA.goods_pic,goods_name:this.state.DATA.goods_name,color_name:this.state.yanse
      }).then((result)=>{
        console.log(result,'0.0.0.0')
        if(result.code === 1){
          Toast.success(result.msg,1.5,()=>{
            console.log(result.data.orderid,'iiiiiiii')
            dispatch(routerRedux.push('/lijiOrders'+'?id='+result.data.orderid))
          })
        }else{
          Toast.offline(result.msg,2); return;
        }
      })
    }
    //加入购物车
    async addCar(){
      console.log(this.state.val,'.....111111goods_num')
      console.log(this.state.DATA.id,'.....2222222商品goods_id')
      console.log(this.state.sku_id,'.....3333333sku_id')
      console.log(this.state.color_id,'.....4444444color_id')
      fetch.shopcar({goods_id:this.state.DATA.id,sku_id:this.state.sku_id,color_id:this.state.color_id,goods_num:this.state.val}).then((data)=>{
        console.log(data,'++++++++++++')
        if(data.code === 1){
          Toast.success(data.msg,1.5,()=>{
            this.setState({modal1:false})
          })
        }else{
          Toast.offline(data.msg,2); return;
        }
      })
    }
    goBack(){
      const {dispatch} = this.props;
      dispatch(routerRedux.goBack())
      // if(this.state.toggle){
      //   dispatch(routerRedux.push('/sichengtianxia?index='+2))
      // }else{
      //   dispatch(routerRedux.goBack())
      // }
    }
     //处理富文本
     htmlspecialchars_decode(str, APIHost){
      str = str.replace(/&amp;/g, '&');
      str = str.replace(/&lt;/g, '<');
      str = str.replace(/&gt;/g, '>');
      str = str.replace(/&quot;/g, '"');
      str = str.replace(/&#039;/g, "'");
      str = str.replace(/\/uploads/g,APIHost+'/uploads' );
      return str;
      }
    render() {
        const {dispatch,location}=this.props;
        const {itemIndex,itemIndex2,DATA} = this.state;
        console.log(DATA,'####122222222222222')
        console.log(DATA.goods_sku,'####1')
        console.log(DATA.goods_color,'####2')
        let dataInfo = DATA.goods_sku;
        let dataInfo2 = DATA.goods_color;
        let value=DATA.goods_detail?DATA.goods_detail:"";
        const html=this.htmlspecialchars_decode(value,APIHost)
        // console.log(html,'@@')
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .slider am-carousel{
                      height:100%;
                  }
                  .slider-frame{
                      height:100%;
                  }
                  .slider-list{
                      height:7.6rem !important;
                  }
                  .divs{
                    display:inline-block;
                    width:100%;
                    height:7.6rem !important;
                  }
                  .am-modal-body{
                    color:white;
                  }
                  .am-modal-content{
                    background-color:#2E323B;
                    padding:0 0.3rem;
                    text-align:-webkit-auto !important;
                  }
                  .cpcs{
                    font-size:0.32rem;
                    line-height:1rem;
                    margin-bottom:0.3rem;
                    text-align: center;
                  }
                  .alls{
                    color: white;
                    font-size: 0.26rem;
                    text-align: left;
                  }
                  .alls span{
                    display: block;
                    font-size: 0.24rem;
                    line-height: 64px;
                    border-bottom: 1px solid #494949;
                  }
                  .wancheng{
                    font-size:0.26rem;
                    width:100%;
                    height:0.6rem;
                    line-height:0.6rem;
                    margin:0.62rem 0 0.16rem;
                    text-align:center;
                  }
                  .wancheng span{
                    background:#3790FF;
                    padding:0.17rem 1.78rem;
                    border-radius:0.3rem;
                  }
                  .parameters dl{
                    display: flex;
                    flex-direction: row;
                    margin-top: 0.3rem;
                  }
                  .parameters dt{
                    width: 2.02rem;
                    height: 2.14rem;
                  }
                  .parameters dt img{
                    width: 100%;
                    height: 100%;
                  }
                  .parameters dd{
                    margin-left: 0.15rem;
                    font-size:0.24rem;
                    margin-top:0.3rem;
                  }
                  .capacity{
                    margin: 40px 0 50px;
                  }
                  .changes{
                    width: 100%;
                    height: 80px;
                    line-height:80px;
                    overflow: scroll;
                  }
                  .changes span{
                    font-size: 0.2rem;
                    padding: 0.16rem 0.27rem;
                    // background: #DFDFDF;
                    // color:black;
                    border-radius: 6px;
                    margin-right:0.28rem;
                  }
                  .colorChange{
                    margin-bottom:0.5rem;
                  }
                  .am-stepper-handler{
                    color:#2E323B;
                    border:none;
                    background:#3790FF;
                  }
                  .am-stepper-input{
                    color:white;
                  }
                  .base{
                    width: 100%;
                    height: 1.2rem;
                    background: #2E323B;
                    color: white;
                    font-size: 0.24rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                  }
                  .base span{
                    display: block;
                    margin: auto 0;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    padding: 0 0.55rem;
                    background: #ADADAD;
                    border-radius: 0.3rem;
                  }
                    `
                }
            </style>
                <div className={styles.top}>
                {/* {shopInfo?
                        <Carousel
                          autoplay={true}
                          infinite
                          dots={true}
                          selectedIndex={this.state.slideIndex}
                          >
                         {
                            shopInfo?shopInfo.map((item, index) => (
                              <div
                              key={item + index}
                              style={{ display: 'inline-block', width: '100%', height:'4.4rem'}}
                              >
                              <img
                                  src={APIHost+item}
                                  alt=""
                                  style={{ width: '100%', verticalAlign: 'top' }}
                              />
                              </div>
                           )):''
                         }
                          </Carousel>
                          :''} */}
                        <Carousel
                          autoplay={true}
                          infinite
                          dots={true}
                          selectedIndex={this.state.slideIndex}
                          >
                              <div className='divs'>
                                <img src={APIHost+DATA.goods_pic} alt="" style={{ width: '100%', verticalAlign: 'top' }} />
                              </div>
                          </Carousel>
                        <img src={shopGoback} alt="" className={styles.fanhui} onClick={()=>this.goBack()}/>
                </div>
                <div className={styles.main}>
                    {
                      this.state.toggle?
                      <div>
                        <p style={{fontSize:'0.36rem',color:'#FF0000'}}>￥3690</p>
                        <p style={{fontSize:'0.24rem',color:'#7C818A',margin:'8px 0 10px'}}><s>￥3690</s></p>
                      </div>
                      :
                      <div>
                        <p style={{fontSize:'0.36rem',color:'#FF0000'}}>￥{this.state.Price}</p>
                        <p style={{fontSize:'0.24rem',lineHeight:'0.4rem'}}></p>
                        {/* <p style={{fontSize:'0.24rem',lineHeight:'0.4rem'}}><span style={{color:'#B5B8BF',marginRight:'0.1rem'}}>送</span>优惠券3690张</p> */}
                      </div>
                    }
                    <p style={{fontSize:'0.26rem',lineHeight:'0.46rem'}}>{DATA.goods_name}</p>
                    {/* <p style={{fontSize:'0.22rem',lineHeight:'0.4rem',color:'#C2C2C2',borderBottom:'1px solid #494949'}}>销量2300</p> */}
                    <p className={styles.norms} onClick={this.showModal('modal1')}>选择 请选择你需要的规格 <img src={shopGo} alt=''/></p>
                    {/* <p className={styles.norms} onClick={this.showModal('modal2')}>商品参数<img src={shopGo} alt=''/></p> */}
                </div>
                <div className={styles.particular}>
                 <p className={styles.particulars}>————<span>详情</span>————</p>
                 <div dangerouslySetInnerHTML={{__html:`${html}`}} style={{color:'white'}}></div>
                </div>
                {
                   this.state.toggle?
                   <div className={styles.footer}>
                    <dl>
                      <dt><img src={shopStore} alt='' /></dt>
                      <dd>店铺</dd>
                    </dl>
                    <span onClick={this.showModal('modal1')}>加入购物车</span>
                    <span style={{background:'#3790FF'}} onClick={this.showModal('modal1')}>立即购买</span>
                </div>
                :
                <div className={styles.footer}>
                    <span onClick={this.showModal('modal1')}>加入购物车</span>
                    <span style={{background:'#3790FF'}} onClick={this.showModal('modal1')}>立即购买</span>
                </div>
                }
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    >
                    <p className='cpcs'>商品参数</p>
                    <p className='alls'><font>美丽无忧</font> <span>品质服务，安心享受什么什么的</span></p>
                    <p className='alls'><font>美丽无忧</font> <span>品质服务，安心享受什么什么的</span></p>
                    <p className='alls'><font>美丽无忧</font> <span>品质服务，安心享受什么什么的</span></p>
                    <p className='alls'><font>美丽无忧</font> <span>品质服务，安心享受什么什么的</span></p>
                    <p className='alls'><font>美丽无忧</font> <span>品质服务，安心享受什么什么的</span></p>
                    <div className='wancheng'><span onClick={this.onClose('modal2')}>确   定</span></div>
                </Modal>
                <Modal
                    popup
                    visible={this.state.modal1}
                    onClose={this.onClose('modal1')}
                    animationType="slide-up"
                    >
                    <div className='parameters'>
                    <dl>
                      {/* <dt><img src={APIHost+this.state.tupian} alt=''/></dt> */}
                      <dt><img src={APIHost+DATA.goods_pic} alt=''/></dt>
                      <dd>
                        <p style={{fontSize:'0.3rem',color:'#FF0600',marginBottom:'0.2rem'}}>￥{this.state.Price}</p>
                        <p>已选：“{this.state.rongliang}” “{this.state.yanse}”</p>
                      </dd>
                    </dl>
                      <p className='capacity'> 容量</p>
                      <p className='changes'>
                      {
                        dataInfo?dataInfo.map((item,index)=>(
                          <span data-type={index}
                          style={itemIndex==index?{background:'#3790FF',color:'white'}:{background:'#DFDFDF',color:'black'}}
                          onClick={e=>this.handleClick(item,index,e.target.dataset.type)}
                          >{item.sku_name?item.sku_name:''}</span>
                        )):''
                      }
                      </p>
                      <p className='colorChange'> 颜色分类</p>
                       <p className='changes'>
                       {
                        dataInfo2?dataInfo2.map((item,index)=>(
                          <span data-type={index}
                          style={itemIndex2==index?{background:'#3790FF',color:'white'}:{background:'#DFDFDF',color:'black'}}
                          onClick={e=>this.handleClick2(item,index,e.target.dataset.type)}
                          >{item.color_name?item.color_name:''}</span>
                        )):''
                      }
                      </p>
                      <p> 数量</p>
                      <div clasName='numbers' style={{width:'35%',float:'right',minWidth:'1.2rem'}}>
                      <Stepper
                          style={{ width: '100%', minWidth: '100px' }}
                          showNumber
                          max={999}
                          min={1}
                          value={this.state.val}
                          onChange={this.onChange}
                          />
                      </div>
                      <div className='base'>
                      <span onClick={()=>this.addCar()}>加入购物车</span>
                      <span style={{background:'#3790FF'}} onClick={()=>this.buyNow()}>立即购买</span>
                </div>
                        </div>
                </Modal>
               </div>
        )
    }
}
