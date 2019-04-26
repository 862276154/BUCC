import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/group.less";
import { Toast,PullToRefresh, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import wallet_navbga from '../assets/walletImg/wallet_navbga.png';
import wallet_navbgb from '../assets/walletImg/wallet_navbgb.png';
import { Tabs,} from 'antd-mobile';
import logo from '../assets/images/logo.png';

const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class group extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            height: document.documentElement.clientHeight,
            refreshing:false,
            ZhituiList:[],
            page:2,
            teamData:[],
        };
    }
    async componentDidMount(){
        // 我的推荐人
        const data = await fetch.gropupZhitui({page:1,size:10});
        console.log(data,'111111')
        this.setState({
            ZhituiList:data.data.items,
        })
        // 团队业绩
        const dataa = await fetch.gropupteam();
        console.log(dataa,'22222')
        this.setState({
            teamData:dataa.data,
        })
      }
 // 上拉刷新
 async getShopList(){
    this.setState({
      refreshing:true
    })
    let _this=this;
    let page=this.state.page;
    console.log(page,'page')
    // if(page==1){
    //   this.setState({
    //     ZhituiList:[]
    //   })
    // }
    const value = await fetch.gropupZhitui({page:page,size:10});
    console.log(value,'value')
    if (value.code==1) {
      this.setState({
        page:Number(_this.state.page)+1,
        ZhituiList:this.state.ZhituiList.concat(value.data.items)
      })
    }
    // 关闭加载效果
    this.setState({
      refreshing:false
    })
  }


    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"我的好友",
      }
      const ZhituiList=this.state.ZhituiList?this.state.ZhituiList:'';
      const teamData=this.state.teamData?this.state.teamData:'';

      const tabs = [
        { title: '我的推荐人' },
        { title: '团队业绩' },
    ];
    return (
        <div>
            <style>{`
               .am-tabs-default-bar{
                    background-color: transparent !important;
               }
               .am-tabs-default-bar-underline{
                    border:0;
                    width:0 !important;
               }
               .am-tabs-default-bar-top .am-tabs-default-bar-tab{
                    color:#fff;
                    font-size: 0.26rem;
                    width: 28% !important;
                    font-size: 0.26rem;
                }
                .am-tabs-default-bar-top .am-tabs-default-bar-content>div:nth-child(1){
                    margin-right:17%;
                }
                .am-tabs-default-bar-tab-active{
                    color: #3790FF !important;
                }
                .am-tabs-default-bar-top .am-tabs-default-bar-content{
                    justify-content: center;
                }
                .am-tabs-default-bar-tab{
                    height: 0.6rem;
                    line-height: 0.6rem;
                    background: #3B404C;
                    border-radius: 0.1rem;
                }
                html:not([data-scale]) .am-tabs-default-bar-top .am-tabs-default-bar-tab::after{
                    height:0;
                }
                .am-tabs-tab-bar-wrap {
                    margin-top: 0.2rem;
                }
            `} </style>
            <MyNavBar {...navBarProps}/>
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
            <Tabs tabs={tabs}
                initalPage={'t2'}
            >
                <div className={styles.tjrWrap}>

                {
                    ZhituiList?ZhituiList.map((val,index)=>{
                        return(

                            <ul key={index}>
                                <div>
                                <img src={logo} alt=""/>
                                </div>
                                <p>{val.grade===0?'体验会员'
                                        :val.grade===1?'会员'
                                        :val.grade===2?'玩家'
                                        :val.grade===3?'白领'
                                        :val.grade===4?'精英'
                                        :''}</p>
                                <li>
                                    <span>用户账号</span>
                                    <span>{val.name}</span>
                                </li>
                                <li>
                                    <span>用户姓名</span>
                                    <span>{val.uname}</span>
                                </li>
                                <li>
                                    <span>手机号</span>
                                    <span>{val.tel}</span>
                                </li>
                                {/* <li>
                                    <span>我的推荐人</span>
                                    <span>3600</span>
                                </li> */}
                                <li>
                                    <span>加入时间</span>
                                    <span>{val.create_time}</span>
                                </li>
                            </ul>
                        )
                    }):''
                }


                </div>

                <div>
                   <ul className={styles.yejiWrap}>
                       <li>
                           <p>团队人数</p>
                           <p>{teamData.count}</p>
                       </li>
                       <li>
                           <p>团队业绩</p>
                           <p>{teamData.yeji}</p>
                       </li>
                   </ul>
                </div>
            </Tabs>
            </PullToRefresh>
        </div>
    )
    }
}
