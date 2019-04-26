import React, {Component} from 'react';
import {connect} from 'dva';
import { loginOut, APIHost} from '../utils/fetch';
import {routerRedux} from 'dva/router';
import styles from "./styles/changeInfo.less";
import { Toast,InputItem, Modal,ImagePicker} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import headimg from '../assets/images/jiahao.png';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class changeInfo extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          imgUrl:'',
          DATA:''
        };
    }
    async componentDidMount(){
      const data = await fetch.personalInfo({});
      console.log(data,'123')
      this.setState({
        DATA:data.data,
        imgUrl:APIHost+data.data.headimg
      })
    }
        //头像上传
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
async querenFunc(){
  const {dispatch} = this.props;
  let headimg = this.state.imgUrl;
  let uname = this.refs.name.state.value;
  let tel = this.refs.tel.state.value;
  let sql = {uname,tel,headimg};
  console.log(sql,'111')
  const val = await fetch.xiugaiInfo(sql);
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        dispatch(routerRedux.push('/gerenzhongxin'))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
}

    render() {
        const {dispatch}=this.props;
        const {files}=this.state;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"修改个人资料",
      }

      return (
        <div className={styles.wrapper}>
        <style>
            {
                `
                .am-list-item{
                  background-color:#2E323B;
                }
                .am-list-item .am-input-control input{
                  color:white;
                }
                .am-list-item .am-input-control input:disabled{
                  background-color:#2E323B;
                }
                .zhuce__wrapper___2CZXF .zhuce__neirong___18enS .zhuce__main___3oaLe .zhuce__mains___14jXj input{
                  padding-left: 2rem;
                }
                .am-list-item:not(:last-child) .am-list-line{
                  border-bottom:none !important;
                }
                html:not([data-scale]) .am-list-item:not(:last-child) .am-list-line::after{
                  height:0 !important;
                }
                .changeInfo__wrapper___2wCHU .changeInfo__neirong___2acWY .changeInfo__main___3pCWg .changeInfo__mains___2Z-wz input{
                  padding-left:1.5rem;
                }
                .wrapper___2wCHU .neirong___2acWY .main___3pCWg .mains___2Z-wz input{
                  padding-left:1.5rem;
                }
                .shangc dd{
                  color:white;
                  padding-left:0.3rem;
                }
                .fengmianDiv input{ display:none;}
                .fengmianDiv img{
                width: 1rem;
                height: 1rem;
                // border:1px #ccc dashed;
                position: absolute;
                left: 1.8rem;
                margin-top: 0.24rem;
                }
                `
            }
        </style>
            <MyNavBar {...navBarProps}/>
           <div className={styles.neirong}>
           <div className={styles.main}>
           <div className={styles.mains}>
           <span>账号</span>
                <InputItem type='text' placeholder={this.state.DATA.name} disabled clear></InputItem>
           </div>
           <div className={styles.mains}>
           <span>姓名</span>
                <InputItem type='text' placeholder={this.state.DATA.uname?this.state.DATA.uname:'输入您的姓名'} ref='name' clear></InputItem>
           </div>

           <div className={styles.mains}>
           <span>电话</span>
                <InputItem type='number' maxLength='11' placeholder={this.state.DATA.tel?this.state.DATA.tel:'请输入您的电话'} ref='tel' clear></InputItem>
           </div>
           <div className={styles.mains}>
           <dl class='shangc'>
                    <dt>
                      <label className="fengmianDiv">
                      <input id="imgURl" name="from" ref="files" type="file"
                        onChange={(e) => this.getLocalImg(e)}
                        accept="image/jpeg,image/x-png,image/gif" />
                        <img className="id_card" ref="headIm"   src={this.state.imgUrl?this.state.imgUrl:headimg} />
                        </label>
                    </dt>
                    <dd>头像</dd>
                </dl>
           </div>
            </div>
        </div>
        <div className={styles.denglu}>
                    <span onClick={()=>this.querenFunc()}>上传</span>
                </div>
           </div>
    )
}
}
