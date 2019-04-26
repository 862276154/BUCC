import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/chongzhijilu.less";
import { Toast,PullToRefresh, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class chongzhijilu extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          shopList:[],
          page:1,
          total:0,
          size:8,
          height:document.documentElement.clientHeight,
          refreshing:false
        };
    }
    componentDidMount(){
      fetch.rechargeRecord({page:this.state.page,size:this.state.size}).then((data)=>{
        console.log(data,'222222')
        if(data.code === 1){
          if(data.data.length<1){
          }else{
            this.setState({shopList:data.data.items, page: data.data.current_page, total: data.data.total})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
      })
    }
    getShopList(){
      const {page,size} = this.state;   // 页数
      let pageNum = page*1+1;
      this.setState({ refreshing: true, isLoading: true });
      fetch.rechargeRecord({page:pageNum,size:this.state.size}).then((result)=>{
        if(result.code === 1){
          if(result.data.data){
            this.setState({ refreshing: false, isLoading: false, total: result.data.total });
          }else{
             console.log(this.state.shopList,newArr,'11111112222223333333')
            var newArr = this.state.shopList.concat(result.data.items);

            this.setState({page: pageNum, shopList:newArr, total: result.data.total, refreshing: false, isLoading: false});
          }
        }else{
          Toast.offline(result.msg,2); return;
        }
      });
    }

    render() {
        const {history,dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"充值记录",
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
                <ul className={styles.contents}>
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
                      <li key={index}>
                        <p>充值状态 <span>
                          {
                            item.status === 0?'审核中':
                            item.status === 1?'完成':
                            item.status === -1?'取消':
                            ''
                          }
                          </span></p>
                        <p>充值金额：{item.num} <span>{item.create_time}</span></p>
                      </li>
                    )):''
                  }
                  </PullToRefresh>
                </ul>
               </div>
        )
    }
}
