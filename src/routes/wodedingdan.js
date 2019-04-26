import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/wodedingdan.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import { APIHost } from "../utils/fetch";
import * as fetch from '../services/shop';
import shopStore from '../assets/images/shopStore.png';
import { Tabs,} from 'antd-mobile';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))


export default class wodedingdan extends Component {
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
            store_name:"康艾米灵店",
            zhuangtai:"订单已发货",
            DATA:[],
            detail:"",
            shop:"",
            statu:"",
            data1:[],
            data0:[],
            data2:[],
            status1:""



        };
    }

  async  componentWillMount(){
    const {location}=this.props;
    const parse=queryString.parse(location.search.replace('?',''));
    console.log(parse.index,'789')
    this.setState({number:parseFloat(parse.index)})
    }
    async componentDidMount(){
        const data = await fetch.wodedingdan({});
        const data0 = await fetch.wodedingdan({status:0});
        const data1 = await fetch.wodedingdan({status:1});
        const data2 = await fetch.wodedingdan({status:2});
        console.log(data,"111");
        console.log(data.data.items,'123');
        console.log(data1,"data11111111");

      console.log(data.data.items.status)

        this.setState({
          DATA:data.data.items,
            detail:data.data.items.map(function(v,i){
                return(v.detail)
            }),
            data1:data1.data.items,
            data0:data0.data.items,
            data2:data2.data.items,
        });
        console.log(this.state.detail,"detail")
      }
          //确认收获
     querenFunc(id,index) {
       console.log(id,index,'0.')
      // const result = await fetch.shouhuos({ id:id });
      fetch.shouhuos({id}).then((result)=>{
        console.log(result,'2#')
         if (result.code == 1) {
          Toast.success(result.msg, 2,  ()=> {
            this.state.data1.splice(index,1);
            this.componentDidMount();
          })
      } else {
          Toast.fail(result.msg, 2)
      }
      })
      // if (value.code == 1) {
      //     Toast.success(value.msg, 2,  ()=> {
      //       this.state.data1.splice(index,1);
      //       this.setState({data1})
      //     })
      // } else {
      //     Toast.fail(value.msg, 2)
      // }
  }

    render() {
        const {dispatch}=this.props;
        const { DATA,detail,statu,data1,data0,data2,status1 } = this.state;
        console.log(data1,'000')
        let comeon = this.state.number;
        const _this = this;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"我的订单",
      }
      const tabs = [
        { title: '全部' },
        { title: '未发货' },
        { title: '已发货' },
        { title: '已完成' },
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
              initialPage={this.state.number}
            >
 {/* 全部 */}

            {
    DATA.map(function(item,index){
        return(

        <div className={styles.weifahuo} key={index}>

            <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
            >
            <img src={shopStore} style={{width:".3rem",height:".23rem",marginRight:".2rem"}}></img>{item.shop?item.shop.shop_name:''}
            <span className={styles.sapn1}  style={{color:"red"}}>总价：￥{item.order_money}</span>
            </p>

            <h3>{item.status==0?"订单待发货":
                 item.status==1?'订单已发货':
                 item.status==2?'订单已完成':
                 item.status==-1?'订单已取消':''}<span>{item.update_time}</span></h3>
             {item.detail.map(function(v,i){
                return(
                    <div className={styles.shangpinming} key={i}>


                        <img src={APIHost + v.goods_pic}></img>
                        <span className={styles.mai1}>{v.goods_name}</span>
                        <span className={styles.mai2}>{v.sku_price}x{v.goods_num}</span>



                </div>
                )
            })}
            <p className={styles.ppp}></p>
        </div>

        )
    })
}








{/* 未发货 */}

{
    data0.map(function(item,index){
        return(

        <div className={styles.weifahuo} key={index}>

            <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
            >
            <img src={shopStore} style={{width:".3rem",height:".23rem",marginRight:".2rem"}}></img>{item.shop?item.shop.shop_name:''}
            <span className={styles.sapn1}  style={{color:"red"}}>总价：￥{item.order_money}</span>
            </p>

            <h3>{item.status==0?"订单待发货":
                 item.status==1?'订单已发货':
                 item.status==2?'订单已完成':
                 item.status==-1?'订单已取消':''}<span>{item.update_time}</span></h3>
             {item.detail.map(function(v,i){
                return(
                    <div className={styles.shangpinming} key={i}>


                        <img src={APIHost + v.goods_pic}></img>
                        <span className={styles.mai1}>{v.goods_name}</span>
                        <span className={styles.mai2}>{v.sku_price}x{v.goods_num}</span>



                </div>
                )
            })}
            <p className={styles.ppp}></p>
        </div>

        )
    })
}


{/* 已发货 */}
                        {
    data1.map(function(item,index){
        return(

        <div className={styles.weifahuo} key={index}>

            <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
            >
            <img src={shopStore} style={{width:".3rem",height:".23rem",marginRight:".2rem"}}></img>{item.shop?item.shop.shop_name:''}
            <span className={styles.sapn1}  style={{color:"red"}}>总价：￥{item.order_money}</span>
            </p>

            <h3>{item.status==0?"订单待发货":
                 item.status==1?'订单已发货':
                 item.status==2?'订单已完成':
                 item.status==-1?'订单已取消':''}<span>{item.update_time}</span></h3>
             {item.detail.map(function(v,index){
               console.log("@@@@@@",v);
                return(
                    <div className={styles.shangpinming} key={index}>
                        <img src={APIHost + v.goods_pic}></img>
                        <span className={styles.mai1}>{v.goods_name}</span>
                        <span className={styles.mai2}>{v.sku_price}x{v.goods_num}</span>
                        <p className={styles.yueShou}>
                          {/* <font style={{float:'left'}}>单号：{item.out_trade_no}<a href={`https://m.kuaidi100.com/index_all.html?postid=${item.out_trade_no}`} style={{color:'#3790FF',marginLeft:'20px'}}>点击查询</a></font> */}
                          <span onClick={_this.querenFunc.bind(_this, item.id,index)}>确认收货</span>
                        </p>
                </div>
                )
            })}
            <p className={styles.ppp}></p>
        </div>

        )
    })
}
{/* 已完成 */}
                        {
    data2.map(function(item,index){
        return(

        <div className={styles.weifahuo} key={index}>

            <p style={{height:'1rem',lineHeight:"1rem",color:'#fff',fontSize:'0.26rem'}}
            >
            <img src={shopStore} style={{width:".3rem",height:".23rem",marginRight:".2rem"}}></img>{item.shop?item.shop.shop_name:''}
            <span className={styles.sapn1}  style={{color:"red"}}>总价：￥{item.order_money}</span>
            </p>

            <h3>{item.status==0?"订单待发货":
                 item.status==1?'订单已发货':
                 item.status==2?'订单已完成':
                 item.status==-1?'订单已取消':''}<span>{item.update_time}</span></h3>
             {item.detail.map(function(v,i){
                return(
                    <div className={styles.shangpinming} key={i}>


                        <img src={APIHost + v.goods_pic}></img>
                        <span className={styles.mai1}>{v.goods_name}</span>
                        <span className={styles.mai2}>{v.sku_price}x{v.goods_num}</span>



                </div>
                )
            })}
            <p className={styles.ppp}></p>
        </div>

        )
    })
}


            </Tabs>
        </div>
    )
    }
}
