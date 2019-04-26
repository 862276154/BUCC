import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
// 登出方法,当前服务器网址
import {loggedIn, loginOut, APIHost} from '../utils/fetch';
// 本页样式
import styles from "./styles/IndexPage.less";
// 引入ANTD组件
import { Button,Toast,WhiteSpace,WingBlank,Card, Modal} from 'antd-mobile';
// TabBar,引入底部标签栏组件
import MyTabBar from "../components/TabBar";
// navVbar,引入头部导航栏组件
import MyNavBar from "../components/MyNavBar";
// 本页可能用的请求
import * as fetch from '../services/shop';
// 商品列表组件
import GoodItem from '../components/GooodItem';
// 无限滚动组件
import InfiniteScroll from 'react-infinite-scroller';
// 临时商品图
import good01 from '../assets/images/good01.png';
// 设置alert,非必要,可直接使用Modal.alert,效果相同
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shopData: state.shop}))
export default class IndexPage extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            selectedTabBar: "shop"
        };
    }


    //加载更多的方法,写法固定,只需替换变量名
    loadFunc(e){
        // const {dispatch,shopData}=this.props;
        // let page=shopData.pagination.current_page+1;
        // dispatch({
        //   type:"shop/getShopList",
        //   payload:{
        //     is_hot:true,
        //     page
        //   }
        // })
    }
    render() {
        const {history,dispatch,shopData}=this.props;
        // 列表是否有下一页
        // let hasMore=shopData.pagination.hasMore;
        let hasMore=true;
        
        // 伪造的列表数据
        // let shopList=shopData.shopList;
        let shopList=[
            {image:good01,title:"临时伪造数据",price:'999.00'},
            {image:good01,title:"临时伪造数据",price:'999.00'},
            {image:good01,title:"临时伪造数据",price:'999.00'},
            {image:good01,title:"临时伪造数据",price:'999.00'},
            {image:good01,title:"临时伪造数据",price:'999.00'},
            {image:good01,title:"临时伪造数据",price:'999.00'},
        ]
        // 传入navbBar参数
        // 共有 
        // leftVisible(左侧是否显示,可不传默认true,布尔值)
        // leftFunc(左侧点击方法,非必填,func) 
        // titleName(主标题,可不穿默认为标题,string) 
        // rightContent(右侧显示内容,非必填默认为空,string)
        // rightFunc(右侧点击方法,非必填,func) 
        // background(背景色,基本不用传,string)
        // titleColor(标题颜色,基本不用传,string)
        // sideColor(两侧的颜色,基本不用传,string)
        const navBarProps = {
            leftVisible:true,
            leftFunc(){
                alert('提示', '你点击了左侧???', [
                    { text: 'Cancel', onPress: () => console.log('cancel') },
                    { text: 'Ok', onPress: () => console.log('ok') },
                ])
            },
            titleName:"这是一个标题",
            rightContent:"右侧",
            rightFunc(){
                alert('提示', '你点击了右侧???', [
                    { text: 'Cancel', onPress: () => console.log('cancel') },
                    { text: 'Ok', onPress: () => console.log('ok') },
                ])
            }
        }
        
        // 传入tabBar参数
        // selectedTabBar:活动的tab,string
        // history ,传入history用于点击跳转
        const tabBarProps = {
            selectedTabBar: this.state.selectedTabBar,
            history
        }

        // 商品列表的参数
        // goodData 商品数据
        const goodListProps = {
            goodData: shopList,
            tapItem(id){
                dispatch(routerRedux.push("/"))
            }
        }
        return (
            <div>
                
                {/*头部导航栏*/}
                <MyNavBar {...navBarProps}/>
                {/*底部标签栏*/}
                <MyTabBar {...tabBarProps}/>
                

                <div className={styles.main}>

                    {/*_________*/}
                    <WingBlank size="lg">
                        <WhiteSpace size="lg" />
                        Antd-Mobile基本无需再像以前一样写样式,
                        大部分颜色和样式只需在<span className={styles.actice}>theme.js(非常重要,详情请查看theme.js的注释)</span>中进行编辑,包括全局主题色,全局字体大小,
                        样式大小基本满足项目使用
                        <br/>
                        请注意,设计图大小需按照<span className={styles.actice}>750</span>为基准
                        
                        px转换rem为:<span className={styles.actice}>1rem=100px</span>;
                        <br/>
                        <span className={styles.actice}>但是:</span>css或less中<span className={styles.actice}>不要使用rem!!!!!</span>;
                        <br/>
                        less(包括antd或其他一部分插件中的)或css中的px会被<span className={styles.actice}>自动编译</span>为rem.
                        <br/>
                        如果样式不想被编译为rem请使用大写的PX
                        <br/>例如:<br/>
                        font-size: 24px;
                        // 编译后为.24rem
                        <br/>
                        font-size: 24PX;
                        // 编译后为24PX
                        <br/>
                        <br/>
                        部分第三方插件会缩小,如有此问题自行解决
                        <br/>
                        <br/>
                        end
                        <WhiteSpace size="lg" />
                    </WingBlank>
                    {/*_________*/}


                    <WingBlank size='lg'>
                        ~~
                        <br/>
                        <br/>
                            下面为,列表无限滚动的demo,model中的shop.js中有更新方法;
                            <br/>
                            ANTD的PullToRefresh有些BUG,暂时不要使用!
                        <br/>
                        <br/>
                    </WingBlank>




                    {/*商品列表 自动刷新*/}
                    {/*无限滚动插件NPM地址,https://www.npmjs.com/package/react-infinite-scroller*/}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={(e)=>this.loadFunc(e)}
                        hasMore={hasMore}
                        threshold={100}
                        loader={<div className="loader" style={{fontSize:".28rem",lineHeight:".36rem",textAlign:"center",marginBottom:".3rem"}} key={0}>加载中,可自定义,可插入DOM或组件...</div>}
                    >
                        <GoodItem {...goodListProps} />
                    </InfiniteScroll>
                    
                </div>
            </div>
        )
    }
}
