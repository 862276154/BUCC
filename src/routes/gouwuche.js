import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {loggedIn, APIHost} from '../utils/fetch';
import styles from "./styles/gouwuche.less";
import { Button,Toast,Checkbox,Stepper, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import MyTabBar from "../components/TabBar";
import * as fetch from '../services/shop';
import shouyedemo from '../assets/images/shouyedemo.png';
import store from '../assets/images/store.png';
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class gouwuche extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "gouwuche",
            carList:[],
            price:0,
            page:1,
            total:0,
            height:document.documentElement.clientHeight,
            refreshing:false
        };
    }
    componentDidMount(){
        fetch.shopcarList({}).then((data)=>{
          if(data.code === 1){
            console.log(data,'1')
            this.setState({carList:data.data})
          }else{
            Toast.offline(data.msg,2); return;
          }
        })
      }
    // componentDidMount(){
    //   fetch.shopcarList({page:this.state.page}).then((data)=>{
    //     if(data.code === 1){
    //       console.log(data,'1')
    //       if(data.data.length<1){
    //       }else{
    //         this.setState({carList:data.data, page: data.current_page, total: data.total})
    //       }
    //     }else{
    //       Toast.offline(data.msg,2); return;
    //     }
    //   })
    // }

    componentWillMount(){
        const {dispatch} = this.props;
        const carList = this.state.carList;
        if(carList.length>0){
            this.setState({
                carList
            },()=>{
                this.getPrice()
            })
        }
       const user = loggedIn();
       if(!user){
           dispatch(routerRedux.push('/'))
       }
    }
    componentWillReceiveProps(nextProps){
        const carList = this.state.carList;
        if(carList.length>0){
            this.setState({
                carList
            },()=>{
                this.getPrice()
            })
        }
    }
    // getShopList(){      //加载更多\
    //   const {page} = this.state;   // 页数
    //   let pageNum = page*1+1;
    //   this.setState({ refreshing: true, isLoading: true });
    //   fetch.shopcarList({page:pageNum}).then((result)=>{
    //     if(result.code === 1){
    //       if(result.data.length<1){
    //         this.setState({ refreshing: false, isLoading: false, total: result.total });
    //       }else{
    //         var newArr = this.state.carList.concat(result.msg.data);
    //         this.setState({page: pageNum, carList:newArr, total: result.total, refreshing: false, isLoading: false});
    //       }
    //     }else{
    //       Toast.offline(result.msg,2); return;
    //     }
    //   })
    // };
        //删除购物车中的商品
        async deleteGood(id,index){
          const carList = this.state.carList;
            const value= await fetch.DeleteCar({id});
            if(value.code==1){
                Toast.success(value.msg,1);
                carList.splice(index,1);
                this.setState({carList})
            }else{
                Toast.fail(value.msg,2);
            }
        }
             // 变更购物车选中状态
        chgChecked(e,index){
          const carList = this.state.carList;
            carList[index].selectType=e.target.checked;
            this.setState({
                carList
                    }
                ,()=>{
                this.getPrice();
            })
        }
         // 更改数量
         async chgNum(num,index){
          const carList = this.state.carList;
            carList[index].goods_num=num;
            this.setState({
                carList
            },()=>{
                this.getPrice()
            })
            let id=carList[index].id;
            // let num=num;
            const value=await fetch.changeNum({id,num});
        }
             // 全选和全不选
     chgCheckedAll(e){
      const carList = this.state.carList;
        carList.map((i,index)=>{
            carList[index].selectType=e.target.checked;
        })
        this.setState({
            carList
        },()=>{
            this.getPrice()
        })
    }
     // 计算价格
     getPrice(){
      const carList = this.state.carList;
        let num=0;
        carList.map((i,index)=>{
            if(i.selectType){
                num+=Math.round(parseFloat((i.goods_num*Number(i.sku.realprice))*100))/100
            }
        })
        this.setState({
            price:num
        })
    }
        // 提交信息生成订单
        async goSubmit(){
            const {dispatch}=this.props;
            const carList = this.state.carList;
            let newArr=[];
            // let newArrs=[];
            carList.map((i,index)=>{
                if(i.selectType){
                    newArr.push({id:i.id,shop_id:i.shop_id})
                }
            })
          //   carList.map((i,index)=>{
          //     if(i.selectType){
          //         newArr.push({shop_id:i.shop_id})
          //     }
          // })
            if(newArr==''){
                Toast.fail('请选择商品',2);
                return;
            }
            console.log(newArr,'0001')
            fetch.CarOrderList({newArr}).then((result)=>{
              console.log(result,'222222')
              if(result.code === 1){
                Toast.success(result.msg,1.5,()=>{
                  dispatch(routerRedux.push('/lijiOrders'+'?id='+result.data.orderid))

                })
              }else{
                Toast.offline(result.msg,1.5); return;
              }
            })
        }
    render() {
        const {history,dispatch}=this.props;
        const {price}=this.state;
        const carList = this.state.carList;
        console.log(carList,'22')
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                dispatch(routerRedux.goBack())
            },
            titleName:"购物车",
        }

        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }
        return (
            <div>
                <style>
                    {
                        `
                        .am-button-primary{
                            background:#3790FF;
                        }
                        .am-button-ghost{
                          color:white !important;
                        }
                        .am-stepper-handler{
                          background:#3790FF;
                          border:none;
                        }
                        .am-checkbox.am-checkbox-checked .am-checkbox-inner{
                          border-color: #3790FF;
                          background: #3790FF;
                        }
                        .am-stepper-input{
                          color:white;
                        }
                        `
                    }
                </style>
                <MyNavBar {...navBarProps}/>
                <MyTabBar {...tabBarProps}/>
                <div className={styles.main}>
                   {
                     carList?carList.map((i,index)=>{
                       return(
                      <div className={styles.first} key={index}>
                      <p className={styles.store}> <img src={store} alt='' style={{marginRight:'0.28rem',marginBottom:'0.05rem'}}/>{i.shop?i.shop.shop_name:''}</p>
                        <div className={styles.goodItem}>
                          <span className={styles.checkBox}>
                            <Checkbox
                            checked={i.selectType}
                            onChange={(e)=>this.chgChecked(e,index)}
                            />
                          </span>
                          <div className={styles.imgBox}>
                              <img src={APIHost+i.goods.goods_pic} alt=""/>
                          </div>
                          <div className={styles.propBox}>
                              <p className={styles.name}>{i.goods.goods_name}</p>
                              <p className={styles.guige}>颜色：{i.color?i.color.color_name:''} <span>规格：{i.sku?i.sku.sku_name:''}</span></p>
                              <p className={styles.price}>
                              {i.sku.realprice}+bucc
                              </p>
                              <div className={styles.stepper}>
                                  <Stepper
                                      style={{maxWidth:'2rem'}}
                                      showNumber
                                      max={999}
                                      min={1}
                                      value={i.goods_num}
                                      onChange={(num)=>this.chgNum(num,index)}
                                  />
                                  <span>
                                      <Button type='ghost' size='small'
                                       onClick={()=>this.deleteGood(i.id,index)}
                                          >删除</Button>
                                  </span>
                              </div>
                          </div>
                      </div>
                      </div>
                      )
                     }):''

                   }
           </div>
           <div className={styles.totalBox}>
                        <div className={styles.all}>
                            <Checkbox defaultChecked={false} onChange={(e)=>this.chgCheckedAll(e)} />
                            <span>全选</span>
                        </div>
                        <div className={styles.price}>
                            合计：
                            <span>¥{price}</span>
                        </div>
                        <div className={styles.btn}>
                            <Button type='primary' onClick={()=>this.goSubmit()} >结算</Button>
                        </div>
                    </div>
            </div>
        )
    }
}
