import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/allSale.less";
import { Toast,PullToRefresh, Modal,Tabs} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shops from '../assets/images/shops.png';
import { APIHost } from '../utils/fetch';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class allSale extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          selected:0,
          INFO:'',
          YII:'',
          DATA:[],
          page:1,
          total:0,
          size:18,
          height:document.documentElement.clientHeight,
          refreshing:false,
        };
    }
    async componentDidMount(){
      // fetch.billClassify({type:1}).then((data)=>{
      //   console.log(data,'111')
      //   if(data.code === 1){
      //     this.setState({INFO:data.data})
      //     this.setState({YII:data.data[0]})
      //   }
      // })
      const data = await fetch.billClassify({type:1});
      this.setState({INFO:data.data})
      // const aaa = await fetch.ClassifyList({cate_id:data.data[0].id});
      // this.setState({DATA:aaa.data.items})
      fetch.ClassifyList({page:this.state.page,size:this.state.size,cate_id:data.data[0].id}).then((data)=>{
        console.log(data,'fuck')
        if(data.code === 1){
          if(data.data.length<1){

          }else{
            this.setState({DATA:data.data.items,page:data.data.current_page,total:data.data.total})
          }
        }else{
          Toast.offline(data.msg,2);return;
        }
      })
    }
    getGoodsListOfClass(item,index){
      fetch.ClassifyList({page:this.state.page,size:this.state.size,cate_id:item.id}).then((data)=>{
        console.log(data,'fuck')
        if(data.code === 1){
          if(data.data.length<1){

          }else{
            this.setState({DATA:data.data.items,page:data.data.current_page,total:data.data.total, selected: index})
          }
        }else{
          Toast.offline(data.msg,2);return;
        }
      })
}
getShopList(){      //加载更多
  const {page} = this.state;   // 页数
  let pageNum = page*1+1;
  this.setState({ refreshing: true, isLoading: true });
  fetch.ClassifyList({page:pageNum,size:this.state.size}).then((data)=>{
    if(data.code === 1){
      console.log(data,'99')
      if(data.data.length<1){
        this.setState({ refreshing: false, isLoading: false, total: data.data.total });
      }else{
        var newArr = this.state.DATA.concat(data.data.items);
        this.setState({page: pageNum, DATA:newArr, total: data.data.total, refreshing: false, isLoading: false});
      }
    }else{
      Toast.offline(data.msg,2); return;
    }
  })
};
    render() {
        const {history,dispatch}=this.props;
        console.log(this.state.YII,'222iii')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
            dispatch(routerRedux.push('/sichengtianxia?index='+2))
          },
            titleName:"全部分类",
        }
        const {sel,INFO,DATA} = this.state;
        console.log(INFO,'2')
        const tabs = [

        ];
        INFO?INFO.map(function(item){
          item.title = item.cate_name;
          tabs.push(item);
      }):''
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-tabs-tab-bar-wrap div{
                      background-color:#3F434D;
                    }
                    .am-tabs-default-bar-left .am-tabs-default-bar-tab{
                      border:none;
                    }
                    .am-tabs-default-bar-underline{
                      border:none;
                    }
                    .am-tabs-default-bar-tab-active{
                      color:#00B4E9;
                      background:#2E323B !important;
                    }
                    // .am-tabs-default-bar-tab{
                    //   height:1.1rem !important;
                    // }
                    html:not([data-scale]) .am-tabs-default-bar-left .am-tabs-default-bar-tab::after{
                      width:0;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                <div className={styles.main}>
                {tabs&&tabs.length>0?
                <Tabs tabs={tabs}
                initalPage={false}
                page={this.state.selected}
                tabBarPosition="left"
                tabDirection="vertical"
                onChange={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                onTabClick={(tab, index) => { this.getGoodsListOfClass(tab,index) }}
                >
                <div style={{ display: 'flex' }}>
                  <div className={styles.neirong}>
                    <p style={{textAlign:'center',fontSize:'0.26rem',color:'#999999',margin:'0.2rem 0 0.3rem'}}>
                    ——————<span style={{margin:'0 0.2rem',color:'white'}}>分类</span>——————
                    </p>
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
                      DATA?DATA.map((item,index)=>(
                        <dl key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                          <dt><img src={item.goods_pic?APIHost+item.goods_pic:''} alt=''/></dt>
                          <dd>{item.goods_name}</dd>
                        </dl>
                      )):''
                    }
                    </PullToRefresh>
                  </div>
                </div>
                </Tabs>:''}
                </div>
                </div>
        )
    }
}
