import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/fabushangpin.less";
import { Toast,InputItem, Modal,ImagePicker,TextareaItem} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class fabushangpin extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          files:[]
        };
    }
    onChange = (files, type, index) => {
      this.setState({
        files,
      });
    }

    render() {
        const {dispatch,history}=this.props;
        const{files}=this.state;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"发布商品",
      }

        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-image-picker-list .am-image-picker-upload-btn{
                      background-color:#393E48;
                      border:none;
                    }
                    .am-image-picker-list .am-image-picker-upload-btn:before, .am-image-picker-list .am-image-picker-upload-btn:after{
                      background-color:white;
                    }
                    .am-list-item{
                      background-color:#2E323B;
                    }
                    .am-textarea-control textarea{
                      color:white;
                    }
                    .am-list-item .am-input-label{
                      color:white;
                      font-size:0.26rem;
                    }
                    .am-list-item .am-input-control input{
                      color:white;
                      text-align:right;
                    }
                    .am-list-item .am-input-control input:disabled{
                      background-color:#2E323B;
                      padding-right:0.3rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.upImg}>
                    <p>最多上传4张图片</p>
                    <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 4}
                    onAddImageClick={this.onAddImageClick}
                  />
                  </div>
                  <div className={styles.describe}>
                  <TextareaItem
                  rows={3}
                  // count={100}
                  ref='zy_message'
                  placeholder='商品描述：'
                />
                  </div>
                  <div style={{borderBottom:'1px solid #535864'}}>
                    <InputItem
                        type='text'
                        placeholder=''
                        ref="us_name"
                        clear
                    >商品名称：</InputItem>
                     <InputItem
                        type='text'
                        placeholder='如：3600+BUCC'
                        ref="us_name"
                        clear
                    >售价：</InputItem>
                     <InputItem
                        type='text'
                        placeholder=''
                        ref="us_name"
                        clear
                    >原价：</InputItem>
                     <InputItem
                        type='text'
                        placeholder='可选填，可不填'
                        ref="us_name"
                        clear
                    >规格一：</InputItem>
                     <InputItem
                        type='text'
                        placeholder='可选填，可不填'
                        ref="us_name"
                        clear
                    >规格二：</InputItem>
                     <InputItem
                        type='text'
                        // placeholder={mineList.us_name}
                        placeholder='化妆品'
                        ref="us_name"
                        disabled
                        clear
                    >商品类别：</InputItem>
                  </div>
                  <div className={styles.issue}>
                    <span>发布</span>
                  </div>


               </div>
        )
    }
}
