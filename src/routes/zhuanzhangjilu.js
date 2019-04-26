import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {APIHost} from '../utils/fetch';
import styles from "./styles/zhuanzhangjilu.less";
import { Toast,InputItem, Modal,PullToRefresh} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transferImg from '../assets/images/transferImg.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class zhuanzhangjilu extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          sel:'1',
          page:1,
          total:0,
          size:6,
          shopList:[],
          shopList2:[],
          height:document.documentElement.clientHeight,
          refreshing:false
        };
    }
      /*切换选项*/
  handleNavSel = (sel) => {
    if (sel === undefined) return;
    this.setState({sel});
  };
  async componentDidMount(){
    //转入
    fetch.transferzr({page:this.state.page,size:this.state.size}).then((data)=>{
      console.log(data,'转入')
      if(data.code === 1){
        if(data.data.length<1){
        }else{
          this.setState({shopList:data.data.items, page: data.data.current_page, total: data.data.total})
        }
      }else{
        Toast.offline(data.msg,2); return;
      }
    })
    //转出
    fetch.transferList({page:this.state.page,size:this.state.size}).then((data)=>{
      console.log(data,'转出')
      if(data.code === 1){
        if(data.data.length<1){
        }else{
          this.setState({shopList2:data.data.items, page: data.data.current_page, total: data.data.total})
        }
      }else{
        Toast.offline(data.msg,2); return;
      }
    })
  }
  getShopList(){
    const {page} = this.state;   // 页数
    let pageNum = page*1+1;
    this.setState({ refreshing: true, isLoading: true });
    fetch.transferList({page:pageNum,size:this.state.size}).then((result)=>{
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
  getShopList2(){      //加载更多\
    const {page} = this.state;   // 页数
    let pageNum = page*1+1;
    this.setState({ refreshing: true, isLoading: true });
    fetch.transferzr({page:pageNum,size:this.state.size}).then((result)=>{
      if(result.code === 1){
        if(result.data.data){
          this.setState({ refreshing: false, isLoading: false, total: result.data.total });
        }else{
           console.log(this.state.shopList2,newArr,'11111112222223333333')
          var newArr = this.state.shopList2.concat(result.data.items);

          this.setState({page: pageNum, shopList2:newArr, total: result.data.total, refreshing: false, isLoading: false});
        }
      }else{
        Toast.offline(result.msg,2); return;
      }
    })
  };

    render() {
        const {history,dispatch}=this.props;
        const {shopList} = this.state;
        const User = shopList[0]?shopList[0].user:'';
        console.log(User,'...')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"转账记录",
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
                  <div className={styles.record} onClick={e => this.handleNavSel(e.target.dataset.type)}>
                    <p><span data-type='1' style={sel==='1'?{color:'#3790FF'}:null}>转入记录</span></p>
                    <p><span data-type='2' style={sel==='2'?{color:'#3790FF'}:null}>转出记录</span></p>
                  </div>
                  <div className={styles.matter} style={{display: sel === '1' ? 'block' : 'none'}}>
                   {
                     User?
                     <ul>
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
                         <dl>
                           <dt><img src={item.agent.headimg?APIHost+item.agent.headimg:transferImg} alt=''/></dt>
                           <dd>
                             <p><span>账号</span>   {item.agent.name?item.agent.name:''}</p>
                             <p><span>手机</span>      {item.agent.tel?item.agent.tel:''}</p>
                             <p><span>时间</span>   {item.update_time?item.update_time:''}</p>
                           </dd>
                         </dl>
                         <font className={styles.amount}>{item.trade_num}</font>
                       </li>
                   )):''
                 }
             </PullToRefresh>

                     </ul>
                     :''
                   }
                  </div>
                  <div style={{display: sel === '2' ? 'block' : 'none'}}>
                  {/* <p style={{color:'white'}}>1111</p> */}
                    <ul className={styles.matter}>
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
                    <li key={index}>
                        <dl>
                        <dt><img src={item.user.headimg?APIHost+item.user.headimg:transferImg} alt=''/></dt>
                          <dd>
                            <p><span>账号</span>   {item.user.name}</p>
                            <p><span>手机</span>      {item.user.tel}</p>
                            <p><span>时间</span>   {item.update_time}</p>
                          </dd>
                        </dl>
                        <font className={styles.amount}>{item.trade_num}</font>
                      </li>
                  )):''
                  // Toast.offline('暂无记录',1.5)
                }
            </PullToRefresh>
                    </ul>
                  </div>
               </div>
        )
    }
}
