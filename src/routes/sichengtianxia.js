import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
// 登出方法,当前服务器网址
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
// 本页样式
import styles from "./styles/sichengtianxia.less";
// 引入ANTD组件
import { Button,Toast,WhiteSpace,WingBlank,Carousel, Modal,Tabs,Badge,TabBar,InputItem} from 'antd-mobile';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 临时商品图
import lunbo from '../assets/images/lunbo.png';
import bshopx from '../assets/images/bshopx.png';
import bshopwx from '../assets/images/bshopwx.png';
import xshopx from '../assets/images/xshopx.png';
import xshopwx from '../assets/images/xshopwx.png';
import shops from '../assets/images/shops.png';
import womensclothing from '../assets/images/womensclothing.png';
import mansclothing from '../assets/images/mansclothing.png';
import box from '../assets/images/box.png';
import homeAppliances from '../assets/images/homeAppliances.png';
import beauty from '../assets/images/beauty.png';
import jewelry from '../assets/images/jewelry.png';
import exercise from '../assets/images/exercise.png';
import electron from '../assets/images/electron.png';
import work from '../assets/images/work.png';
import more from '../assets/images/more.png';
const queryString = require('query-string');
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shopData: state.shop}))
export default class sichengtianxia extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "sichengtianxia",
            selectedTab: 1,
            DATA:'',
            INFO:'',
            shengji1:'',
            baodan2:'',
            BAODAN:'',
            SHENGJI:'',
            number:'',
            xiaofei:'',
            REMEN:'',
            LIKE:''
        };
    }

   async componentDidMount(){
      const {location}=this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      if(parse.index){
        this.setState({selectedTab:parseFloat(parse.index)})
      }
      const {dispatch} = this.props;
      fetch.shopLunbo({}).then((data)=>{
        if(data.code === 1){
          this.setState({DATA:data.data});
          }else{
            Toast.offline(data.msg,2.5,()=>{
              dispatch(routerRedux.push('/'));
            });
          }
      })
    const a=  await fetch.billClassify({}).then((info)=>{
      console.log(info,'allllllll')
      return info;
      });
      this.setState({
        INFO:a.data,
        shengji1:a.data[0]?a.data[0].id:'',
        baodan2:a.data[1]?a.data[1].id:'',
      })
    const shengji111=a.data[0]?a.data[0].id:'';
    const baodan111=a.data[1]?a.data[1].id:'';
      // const {location}=this.props;
      // const parse=queryString.parse(location.search.replace('?',''));
      // console.log(parse.index,'gun8')
      // // this.setState({selectedTab:parse.index})
      // this.setState({selectedTab:parseFloat(parse.index)})
      fetch.ClassifyList({cate_id:baodan111}).then((result)=>{
        this.setState({BAODAN:result.data.items})
      });
      fetch.ClassifyList({cate_id:shengji111}).then((result)=>{
        this.setState({SHENGJI:result.data.items})
      });
       //消费商城
       fetch.billClassify({type:1}).then((data)=>{
        if(data.code === 1){
          this.setState({xiaofei:data.data})
        }
       console.log(data,'xiaofeishangcheng消费商城')
     })
        //热门商品
        fetch.ClassifyList({is_hot:1}).then((data)=>{
          this.setState({REMEN:data.data.items})
        });
        //猜你喜欢
        fetch.ClassifyList({}).then((data)=>{
          console.log(data,'xhhhhhhhhhhhhh')
          this.setState({LIKE:data.data.items})
        });
    }

    //报单商品
    async baodanFunc(){
      const id = parseInt(this.state.baodan2);
      const {history} = this.props;
      history.push('/reclassify?id='+id);
    }
    //升级商品
    async shengjiFunc(){
      const id = parseInt(this.state.shengji1);
      const {history} = this.props;
      history.push('/reclassify?id='+id);
    }
    yesFunc(){
       // alert(11)
      //  {
      //   this.state.number?
      //   this.setState({
      //     selectedTab: this.state.number,
      //   }):
      //   this.setState({
      //     selectedTab: 2,
      //   });
      // }
      this.setState({
        selectedTab: 2,
      });

    }
    render() {
        const {history}=this.props;
        let comeon = this.state.number;
        const xiaofeiInfo = this.state.xiaofei.slice(0,9);
        const baodanInfo = this.state.BAODAN?this.state.BAODAN.slice(0,4):'';
        const shengjiInfo = this.state.SHENGJI?this.state.SHENGJI.slice(0,4):'';
        const remen = this.state.REMEN?this.state.REMEN.slice(0,2):'';
        const like = this.state.LIKE?this.state.LIKE.slice(0,2):'';
        console.log(like,'00000000000000000000000000',remen)

        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
          <div className={styles.wrapper}>
          <style>
            {
              `
              .aaa{
                display:inline-block;
                width:100%;
                height:3rem !important;
              }
              .am-tabs-top, .am-tabs-bottom{
                flex-direction: column-reverse;
              }
              .am-tab-bar-bar .am-tab-bar-tab{
                flex-direction:inherit !important;
              }
              .am-tab-bar-bar .am-tab-bar-tab-title{
                font-size:0.36rem;
                margin-left:0.22rem;
              }
              .am-tabs-tab-bar-wrap{
                border-bottom:0.12rem solid #434853;
              }
              `
            }
          </style>
                <MyTabBar {...tabBarProps}/>
                <p className={styles.title}>司城天下</p>
                <div className={styles.lunbo}>
                {
                  this.state.DATA?
                  <Carousel
                  autoplay={true}
                  infinite={true}
                  dots={true}
                  selectedIndex={this.state.slideIndex}
                  >
                 {
                    this.state.DATA?this.state.DATA.map((item, index) => (
                      <div className='aaa'
                      key={item + index}
                      >
                      <img
                          src={APIHost+item.pic_name}
                          alt=""
                          style={{ width: '100%', verticalAlign: 'top' }}
                      />
                      </div>

                   )):''
                 }
                  </Carousel>
                  :''
                }

                </div>
                <div className={styles.mains}>
                 <TabBar
                  barTintColor="none"
                  hidden={this.state.hidden}
                  tabBarPosition="bottom"
                  prerenderingSiblingsNumber='0'
                >
                <TabBar.Item
                title="报单商城"

                icon={
                      <img src={bshopwx} style={{
                          width: '0.3rem',
                          height: '0.3rem',
                      }}
                  />
                  }
                  selectedIcon={
                      <img src={bshopx} style={{
                          width: '0.3rem',
                          height: '0.3rem',
                      }}
                  />
                  }
                selected={this.state.selectedTab === 1}
                onPress={() => {
                  this.setState({
                    selectedTab: 1,
                  });
                }}
                data-seed="logId"
              >
                <div className={styles.songlian}>
                <p className={styles.theMore}>报单商品
                <span onClick={()=>this.baodanFunc()}>更多 ></span></p>
                <div className={styles.main}>
                {/* 报单商品详情 */}
                {
                  baodanInfo?baodanInfo.map((item,index)=>(
                    <dl className={styles.goods} key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                        <dt><img src={APIHost+item.goods_pic} alt=''/></dt>
                        <dd>
                          <p>{item.goods_name}</p>
                          <span>{item.goods_sku[0].realprice}</span>
                          {/* <span>360 <font>34342人已付款</font></span> */}
                        </dd>
                      </dl>
                  )):''
                }

                </div>
                </div>
                <div className={styles.songlian1}>
                <p className={styles.theMore}>升级商品 <span onClick={()=>this.shengjiFunc()}>更多 ></span></p>
                <div className={styles.main}>
                {
                  shengjiInfo?shengjiInfo.map((item,index)=>(
                    <dl className={styles.goods} key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                        <dt><img src={APIHost+item.goods_pic} alt=''/></dt>
                        <dd>
                          <p>{item.goods_name}</p>
                          <span>{item.goods_sku[0].realprice}</span>
                          {/* <span>360 <font>34342人已付款</font></span> */}
                        </dd>
                      </dl>
                  )):''
                }
                </div>
                </div>
              </TabBar.Item>
              <TabBar.Item
                title="消费商城"
                icon={
                      <img src={xshopwx} style={{
                          width: '0.3rem',
                          height: '0.3rem',

                      }}
                  />
                  }
                  selectedIcon={
                      <img src={xshopx} style={{
                          width: '0.3rem',
                          height: '0.3rem',
                      }}
                  />
                  }
                // selected={
                //   this.state.number?
                //   this.state.selectedTab == this.state.number
                //   :
                //   this.state.selectedTab == 2
                // }
                selected={this.state.selectedTab === 2}
                onPress={() => {
                  this.yesFunc();
                  // {
                  //   this.state.number?
                  //   this.setState({
                  //     selectedTab: this.state.number,
                  //   }):
                  //   this.setState({
                  //     selectedTab: 2,
                  //   });
                  // }
                  // console.log(this.state.number,'...')
                  // this.setState({
                  //   selectedTab: 2,
                  // });
                }}
              >
              <div className={styles.consumption}>
                <div className={styles.cbanner}>
                {
                  xiaofeiInfo?xiaofeiInfo.map((item,index)=>(
                    <dl key={index} onClick={()=>history.push('/reclassify?id='+item.id)}>
                    <dt><img src={item.cate_pic?APIHost+item.cate_pic:''} alt=''/></dt>
                    <dd>{item.cate_name}</dd>
                  </dl>
                  )):''
                }
                {
                  this.state.xiaofei.length>9?
                  <dl onClick={()=>history.push('/allSale')}>
                  <dt><img src={more} alt=''/></dt>
                  <dd>全部</dd>
                </dl>
                :''
                }

                </div>
                <p className={styles.theMore}>热门商品</p>
                <div className={styles.main}>
                {
                  remen?remen.map((item,index)=>(
                    <dl className={styles.goods} key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                  <dt><img src={item.goods_pic?APIHost+item.goods_pic:''} alt=''/></dt>
                  <dd>
                    <p>{item.goods_name}</p>
                    <span>￥{item.goods_price}
                      {/* <font>34342人已付款</font> */}
                      </span>
                  </dd>
                </dl>
                  )):''
                }
                </div>
                {/* <div className={styles.mainsecond}>
                    <dl className={styles.mainseconddl}>
                      <dt><img src={shops} alt=''/></dt>
                      <dd>水果圣代</dd>
                    </dl>
                    <dl className={styles.mainseconddl}>
                      <dt><img src={shops} alt=''/></dt>
                      <dd>山西大草莓</dd>
                    </dl>
                    <dl className={styles.mainseconddl}>
                      <dt><img src={shops} alt=''/></dt>
                      <dd>阿里山提子</dd>
                    </dl>
                </div> */}
                <p className={styles.theMore}>猜你喜欢</p>
                <div className={styles.main}>
                {
                  like?like.map((item,index)=>(
                    <dl className={styles.goods} key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                  <dt><img src={item.goods_pic?APIHost+item.goods_pic:''} alt=''/></dt>
                  <dd>
                    <p>{item.goods_name}</p>
                    <span>￥{item.goods_price}
                      {/* <font>34342人已付款</font> */}
                      </span>
                  </dd>
                </dl>
                  )):''
                }
                </div>
              </div>
              </TabBar.Item>
                </TabBar>
                </div>
            </div>
        )
    }
}
