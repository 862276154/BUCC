import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {APIHost} from '../utils/fetch';
import styles from "./styles/reclassify.less";
import { Toast,PullToRefresh, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shops from '../assets/images/shops.png';
import { parse } from 'url';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class reclassify extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          page:1,
          total:0,
          size:6,
          shopList:[],
          height:document.documentElement.clientHeight,
          refreshing:false
        };
    }
    componentDidMount(){
      const {location} = this.props;
      const parse = queryString.parse(location.search.replace('?',''));
      console.log(parse.id,'2')
      fetch.ClassifyList({cate_id:parse.id,page:this.state.page,size:this.state.size}).then((data)=>{
        console.log(data,'111')
        if(data.code === 1){
          if(data.data.items.length<1){
          }else{
            this.setState({shopList:data.data.items, page: data.data.current_page, total: data.data.total})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
      })
    }
    getShopList(){      //加载更多\
      const {page} = this.state;   // 页数
      let pageNum = page*1+1;
      this.setState({ refreshing: true, isLoading: true });
      fetch.ClassifyList({page:pageNum,size:this.state.size}).then((result)=>{
        if(result.code === 1){
          if(result.data.items.length<1){
            this.setState({ refreshing: false, isLoading: false, total: result.data.total });
          }else{
            var newArr = this.state.shopList.concat(result.data.items);
            this.setState({page: pageNum, shopList:newArr, total: result.data.total, refreshing: false, isLoading: false});
          }
        }else{
          Toast.offline(result.msg,2); return;
        }
      })
    };

    render() {
        const {history,dispatch}=this.props;
        console.log(this.state.shopList,'11111-----')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.push('/sichengtianxia?index='+2))
          },
            titleName:"商品列表",
        }
        const {sel} = this.state;
        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `

                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                <div className={styles.main}>
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
                    this.state.shopList.map((item,index)=>(
                      <dl className={styles.goods} key={index} onClick={()=>history.push('/shopDetail?id='+item.id)}>
                        <dt><img src={APIHost+item.goods_pic} alt=''/></dt>
                        <dd>
                          <p>{item.goods_name}</p>
                          <span>{item.goods_sku[0].realprice}</span>
                          {/* <span>360 <font>34342人已付款</font></span> */}
                        </dd>
                      </dl>
                    ))
                  }
                </PullToRefresh>
                </div>
                </div>
        )
    }
}
