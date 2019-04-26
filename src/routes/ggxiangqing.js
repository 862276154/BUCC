import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { APIHost} from '../utils/fetch';
import styles from "./styles/ggxiangqing.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shouyedemo from '../assets/images/shouyedemo.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class ggxiangqing extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
    componentDidMount(){
      const{location}=this.props;
      const parse=queryString.parse(location.search.replace('?',''));
      fetch.gonggao_detil({id:parse.id}).then((data)=>{
        console.log(data,'1')
        this.setState({DATA:data.data})
      })
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
        const {DATA} = this.state;
        let value=DATA.n_message?DATA.n_message:"";
        const html=this.htmlspecialchars_decode(value,APIHost)
        console.log(html,'22')
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
                  <h1>{DATA.n_title}</h1>
                  <h2>发布人：{DATA.name}  {DATA.create_time}</h2>
                  <p dangerouslySetInnerHTML={{__html:`${html}`}}></p>
                </div>
               </div>
        )
    }
}
