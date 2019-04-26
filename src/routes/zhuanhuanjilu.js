import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/zhuanhuanjilu.less";
import { Toast,InputItem, Modal,PullToRefresh} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transferImg from '../assets/images/transferImg.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class zhuanhuanjilu extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          sel:'1',
          acc_type:'',
          shopList:[],
          page:1,
          total:0,
          size:6,
          height:document.documentElement.clientHeight,
          refreshing:false
        };
    }
      /*切换选项*/
  handleNavSel = (sel) => {
    if (sel === undefined) return;
    this.setState({sel});
    console.log(sel,'111-+')
      fetch.conRecord({acc_type:sel,page:this.state.page,size:this.state.size}).then((data)=>{
        console.log(data,'234')
        if(data.code === 1){
          if(data.data.length<1){
          }else{
            this.setState({shopList:data.data.items, page: data.data.current_page, total: data.data.total})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
        })
    // this.setState({sel});
  };
  componentDidMount(){
    const {location}=this.props;
    const parse=queryString.parse(location.search.replace('?',''));
    this.setState({sel:parse.index})
    if(parse.index){
      console.log(parse.index,'qq2')
      fetch.conRecord({acc_type:parse.index,page:this.state.page,size:this.state.size}).then((data)=>{
        console.log(data,'qq')
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
  }
  getShopList(){
    const {page,size} = this.state;   // 页数
    let pageNum = page*1+1;
    this.setState({ refreshing: true, isLoading: true });
    fetch.conRecord({page:pageNum,size:this.state.size}).then((result)=>{
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
            titleName:"转换记录",
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
                    <p><span data-type='1' style={sel==='1'?{color:'#3790FF'}:null}>储蓄钱包</span></p>
                    <p><span data-type='2' style={sel==='2'?{color:'#3790FF'}:null}>流通钱包</span></p>
                    <p><span data-type='5' style={sel==='5'?{color:'#3790FF'}:null}>生息钱包</span></p>
                  </div>
                  <div className={styles.matter} style={{display: sel === '1' ? 'block' : 'none'}}>
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
                          <dd>
                            <p><span>详情</span>      {item.note}</p>
                            <p><span>时间</span>   {item.create_time}</p>
                          </dd>
                        </dl>
                        <font className={styles.amount}>{item.num}</font>
                      </li>
                  )):''
                }
            </PullToRefresh>
                    </ul>
                  </div>
                  <div style={{display: sel === '2' ? 'block' : 'none'}}>
                    <ul className={styles.matter}>
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
                          <dd>
                            <p><span>详情</span>      {item.note}</p>
                            <p><span>时间</span>   {item.create_time}</p>
                          </dd>
                        </dl>
                        <font className={styles.amount}>{item.num}</font>
                      </li>
                  )):''
                }
            </PullToRefresh>
                    </ul>
                  </div>
                  <div style={{display: sel === '5' ? 'block' : 'none'}}>
                    <ul className={styles.matter}>
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
                          <dd>
                            <p><span>详情</span>      {item.note}</p>
                            <p><span>时间</span>   {item.create_time}</p>
                          </dd>
                        </dl>
                        <font className={styles.amount}>{item.num}</font>
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
