import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/xiangqing.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shouyedemo from '../assets/images/shouyedemo.png';
import { APIHost } from '../utils/fetch';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class xiangqing extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            data1:""
        };
    }
    async componentWillMount(){
       
        const sta = this.props.location.search.replace("?id=","");
        const data =  await fetch.gonggao_detil({ id:sta });
        console.log(data,"22222222222"); 
        this.setState({
            data1:data.data
        })
        console.log(this)
    }
  //处理富文本
  htmlspecialchars_decode(str, APIHost){
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/\/ueditor/g,APIHost+'/ueditor' );
    return str;
    }
    render() {
        const {history,dispatch}=this.props;
        let value=this.state.data1.n_message?this.state.data1.n_message:"";
        const html=this.htmlspecialchars_decode(value,APIHost)
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"详情",
        }
        
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
                  <h1>{this.state.data1.n_title}</h1>
                  <h2>{this.state.data1.name}  {this.state.data1.create_time}</h2>
                  <p dangerouslySetInnerHTML={{
                  __html: `${html}`
                }} className={styles.detailhtml}/>
                  {/* <p>企业以互联网为依托，通过运用大数据、人工智能等先进技术手段，对商品的生产、流通与销售过程进行升级改造，进而重塑业态结构与生态圈，并对线上服务、线下体验以及现代物流进行深度融合的零售新模式 [1] 。</p>
                  <p>未来电子商务平台即将消失，线上线下和物流结合在一起，才会产生新零售。线上是指云平台，线下是指销售门店或生产商，新物流消灭库存，减少囤货量。</p> */}
                  <img src={APIHost+this.state.data1.img} alt=''/>
                </div>
               </div>
        )
    }
}
