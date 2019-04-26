import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/incomelist.less";
import { Toast,PullToRefresh, Modal,Tabs,Badge} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transition from '../assets/walletImg/transition.png';
import wallet_navbga from '../assets/walletImg/wallet_navbga.png';
import wallet_navbgb from '../assets/walletImg/wallet_navbgb.png';
// import { Tabs,} from 'antd-mobile';


const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class incomelist extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          page:1,
          total:0,
          size:10,
          dataInfo:[],
          dataInfo2:[],
          DATA:'',
          height:document.documentElement.clientHeight,
          refreshing:false
        };
    }
     componentDidMount(){
       //静态明细
      fetch.acclog({size:this.state.size,type:2}).then((data)=>{
        console.log(data,'111...')
        if(data.code === 1){
          let objarrs = [];
            for(let key in data.data){
            let tobj = {};
            tobj['time']=key;
            tobj['tz_coin']=(data.data[key]['tz_coin']);
            tobj['xf_coin']=(data.data[key]['xf_coin']);
            tobj['xj_coin']=(data.data[key]['xj_coin']);
            tobj['sx_coin']=(data.data[key]['sx_coin']);
            objarrs.push(tobj);
            }
            this.setState({
              dataInfo:objarrs
            })
            // console.log(objarrs,'fuck  ')
          if(objarrs.length<1){
          }else{
            this.setState({dataInfo:objarrs})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
      });
      fetch.acclog({size:this.state.size,type:3}).then((data)=>{
        console.log(data,'4234...')
        if(data.code === 1){
          let objarrs = [];
            for(let key in data.data){
            let tobj = {};
            tobj['time']=key;
            tobj['tz_coin']=(data.data[key]['tz_coin']);
            tobj['xf_coin']=(data.data[key]['xf_coin']);
            tobj['xj_coin']=(data.data[key]['xj_coin']);
            tobj['sx_coin']=(data.data[key]['sx_coin']);
            objarrs.push(tobj);
            }
            this.setState({
              dataInfo2:objarrs
            })
            // console.log(objarrs,'fuck  ')
          if(objarrs.length<1){
          }else{
            this.setState({dataInfo2:objarrs})
          }
        }else{
          Toast.offline(data.msg,2); return;
        }
      });
    }
    getShopList(){
      const {page} = this.state;   // 页数
      let pageNum = page*1+1;
      this.setState({ refreshing: true, isLoading: true });
      fetch.acclog({page:pageNum}).then((result)=>{
        console.log(result,'user/acclogs11111')
        if(result.code === 1){
          let objarrs = [];
            for(let key in result.data){
            let tobj = {};
            tobj['time']=key;
            tobj['tz_coin']=(result.data[key]['tz_coin']);
            tobj['xf_coin']=(result.data[key]['xf_coin']);
            tobj['xj_coin']=(result.data[key]['xj_coin']);
            tobj['sx_coin']=(result.data[key]['sx_coin']);
            objarrs.push(tobj);
            }
            this.setState({
              dataInfo:objarrs
            })
            // console.log(objarrs,'fuck11111  ')
          if(objarrs.length<1){
          }else{
            this.setState({dataInfo:objarrs})
          }
          if(result.data){
            this.setState({ refreshing: false, isLoading: false});
          }else{
            var newArr = this.state.dataInfo.concat(result.data);

            this.setState({dataInfo:newArr, refreshing: false, isLoading: false});
          }
        }else{
          Toast.offline(result.msg,2); return;
        }
      });
    }
    getShopList2(){
      const {page} = this.state;   // 页数
      let pageNum = page*1+1;
      this.setState({ refreshing: true, isLoading: true });
      fetch.acclog({page:pageNum}).then((result)=>{
        console.log(result,'user/acclogs11111')
        if(result.code === 1){
          let objarrs = [];
            for(let key in result.data){
            let tobj = {};
            tobj['time']=key;
            tobj['tz_coin']=(result.data[key]['tz_coin']);
            tobj['xf_coin']=(result.data[key]['xf_coin']);
            tobj['xj_coin']=(result.data[key]['xj_coin']);
            tobj['sx_coin']=(result.data[key]['sx_coin']);
            objarrs.push(tobj);
            }
            this.setState({
              dataInfo2:objarrs
            })
            // console.log(objarrs,'fuck11111  ')
          if(objarrs.length<1){
          }else{
            this.setState({dataInfo2:objarrs})
          }
          if(result.data){
            this.setState({ refreshing: false, isLoading: false});
          }else{
            var newArr = this.state.dataInfo2.concat(result.data);

            this.setState({dataInfo2:newArr, refreshing: false, isLoading: false});
          }
        }else{
          Toast.offline(result.msg,2); return;
        }
      });
    }
    render() {
        const {dispatch}=this.props;
        const {dataInfo,dataInfo2} = this.state;
        console.log(dataInfo,dataInfo2,'001')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"收入明细",
      }
      const tabs = [
        { title:<Badge>静态明细</Badge> },
        { title:<Badge>动态明细</Badge> },
      ];


    return (
        <div>
            <style>{`
            .am-tabs-default-bar-content{
              background-color:#2e323b;
              color:white;
            }
            .am-tabs-default-bar-top .am-tabs-default-bar-tab{
              border-bottom:none;
            }
            .am-tabs-default-bar-tab-active{
              color:#3790ff;
            }
            .am-tabs-default-bar-underline{
              border: 0.01rem #3790ff solid;
            }

            `} </style>
            <MyNavBar {...navBarProps}/>
            <Tabs tabs={tabs}
                  initialPage={0}
                  onChange={(tab, index) => { console.log('onChange', index, tab); }}
                  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                 <div style={{marginTop:'20px'}}>
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
                <table className={styles.incomelista}>
                    <tbody>
                        <tr>
                            <th>流通钱包</th>
                            <th>通证钱包</th>
                            <th>消费钱包</th>
                            <th>生息钱包</th>
                            <th>收益时间</th>
                        </tr>
                        {
                          dataInfo?dataInfo.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.xj_coin?item.xj_coin:''}</td>
                                <td>{item.tz_coin?item.tz_coin:''}</td>
                                <td>{item.xf_coin?item.xf_coin:''}</td>
                                <td>{item.sx_coin?item.sx_coin:''}</td>
                                <td>{item.time?item.time:''}</td>
                            </tr>
                          )):""
                        }
                    </tbody>
                </table>
                </PullToRefresh>
            </div>
            <div style={{marginTop:'20px'}}>
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
                <table className={styles.incomelista}>
                    <tbody>
                        <tr>
                            <th>流通钱包</th>
                            <th>通证钱包</th>
                            <th>消费钱包</th>
                            <th>生息钱包</th>
                            <th>收益时间</th>
                        </tr>
                        {
                          dataInfo2?dataInfo2.map((item,index)=>(
                            <tr key={index}>
                                <td>{item.xj_coin?item.xj_coin:''}</td>
                                <td>{item.tz_coin?item.tz_coin:''}</td>
                                <td>{item.xf_coin?item.xf_coin:''}</td>
                                <td>{item.sx_coin?item.sx_coin:''}</td>
                                <td>{item.time?item.time:''}</td>
                            </tr>
                          )):""
                        }
                    </tbody>
                </table>
                </PullToRefresh>
            </div>
            </Tabs>
        </div>
    )
    }
}
