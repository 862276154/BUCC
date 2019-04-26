import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/fabuguanggao.less";
import { Toast,InputItem, Modal,ImagePicker,TextareaItem,List} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import upimgbg from '../assets/walletImg/upimgbg.png';
import * as fetch from '../services/shop';
import guamaijia from '../assets/images/guamaijia.png';
import you from '../assets/images/tright.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class fabuguanggao extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          files:[],
          titl:"",
          ad_content:"",
          imgURl:"",
        };
    }
    // onChange = (files, type, index) => {
    //   this.setState({
    //     files,
    //   });
    // }
    // 上传图片
    getLocalImg(e) {
      if (!e.target.files[0]) {
          return
      }
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (e) {
          this.setState({
              imgUrl: e.target.result
          })
          return this.result
      }.bind(this)
  }
//   广告标题
  change_title(value){
      this.setState({titl:value})
  }
//   广告内容
  xixi(value) {
    this.setState({ ad_content: value });
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
          titleName:"发布广告",
          rightContent:'发布',
          rightFunc(){
            // dispatch(routerRedux.push('/'))
        },
      }

        return (
            <div className={styles.wrapper}>
            <style>
                {
                    `
                    .am-list-item {
     
                        background-color: #393E48;
       
                    }
                    .am-list-item.am-input-item {
                        height: 1rem;
                        padding-left: 0.3rem;
                        margintop: .4rem;
                    }
                    .am-list-item .am-input-control input {
                        color: #fff;
                        font-size: 0.34rem;
                       
                    }
                    .am-textarea-control textarea {
                        color: #fff;
                        font-size: 0.34rem;
                        line-height: 0.51rem;
                        height: 5rem;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        width: 100%;
                        padding: 0;
                        border: 0;
                        background-color: transparent;
                        overflow: visible;
                        display: block;
                        resize: none;
                        word-break: break-all;
                        word-wrap: break-word;
                    }
                    .fabuguanggao__wrapper___13pXF .fabuguanggao__top___12HwT {
                        width: 100%;
                        height: auto;
                        padding:0;
                        /* padding: 0.33rem 0.53rem; */
                        margin-bottom: .2rem;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                <ul className={styles.applyfor}>
                <li>
                       <img alt='' style={{width:'100%',height:'100%'}}
                            className="id_card" ref="cover" name="enter_imgsPath"
                            src={this.state.imgUrl ? this.state.imgUrl : upimgbg}/>
                       <input id="imgURl" name="from" ref="files" type="file"
                        onChange={(e) => this.getLocalImg(e)}
                        accept="image/jpeg,image/x-png,image/gif" />
                        <p style={{display:this.state.imgUrl ?'none':'block'}}>添加封面</p>
                    </li>
                    </ul>
                <div className={styles.top}>
                  {/* <div className={styles.tianjia}>
                  <img src={guamaijia} alt='' />
                  <input id="imgURl" name="from" ref="files" type="file"
                  
                    onChange={(e) => this.getLocalImg(e)}
                    accept="image/jpeg,image/x-png,image/gif" />
                    <span style={{display:this.state.imgUrl ?'none':'block'}}>添加封面</span>
                  </div> */}
              
                  
                  <InputItem
                type='text'
                maxLength='11'
                value={this.state.titl}
                onChange={this.change_title.bind(this)}
                placeholder="请在这里输入广告标题"
                ref="Retel"
              ></InputItem>
                </div>
                <List>
              <TextareaItem
            placeholder="请在这里输入广告内容"
            data-seed="logId"
            value = {this.state.ad_content}
            onChange={this.xixi.bind(this)}
            autoHeight
            ref={el => this.customFocusInst = el}
          />
            </List>
            <section></section>
            <p>插入图片<img src={you}></img></p>
            <p>插入链接<img src={you}></img></p>

               </div>
        )
    }
}
