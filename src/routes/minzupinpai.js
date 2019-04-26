import React, {Component} from 'react';
import {connect} from 'dva';
import {APIHost} from '../utils/fetch';
import {routerRedux} from 'dva/router';
import styles from "./styles/minzupinpai.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import shouyedemo from '../assets/images/shouyedemo.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class minzupinpai extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
    componentDidMount(){
      fetch.gonggao({type:4}).then((data)=>{
        console.log(data,'1')
        this.setState({DATA:data.data[0]});
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
        let value=DATA?DATA.n_message:"";
        const html=this.htmlspecialchars_decode(value,APIHost)
        console.log(html,'@@')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"民族品牌",
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
                  <p dangerouslySetInnerHTML={{__html:`${html}`}}></p>
                  <img src={DATA?APIHost+DATA.img:''} alt=''/>
                </div>
               </div>
        )
    }
}
