import React, {Component} from 'react';
import {connect} from 'dva';
import {APIHost} from '../utils/fetch';
import {routerRedux} from 'dva/router';
import styles from "./styles/gonggao.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class gonggao extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          DATA:''
        };
    }
    componentDidMount(){
      fetch.gonggao({type:3}).then((data)=>{
        console.log(data,'1')
        this.setState({DATA:data.data})
      })
    }
    render() {
        const {dispatch,history}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"公  告",
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
                <ul className={styles.information}>
                {
                  this.state.DATA?this.state.DATA.map((item,index)=>(
                    <li onClick={()=>history.push('/ggxiangqing?id='+item.id)} key={index}>
                    <p>{item.n_title}<span>{item.create_time}</span></p>
                    {/* 截取p标签 */}
                    <p>{(item.n_message.replace(/<p>|<\/p>/g,''))}</p>
                  </li>
                  )):''
                }

                </ul>
               </div>
        )
    }
}
