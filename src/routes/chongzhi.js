import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/chongzhi.less";
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import pitchOn from '../assets/images/pitchOn.png';
import UnpitchOn from '../assets/images/UnpitchOn.png';
import add from '../assets/images/add.png';
import { APIHost } from '../utils/fetch';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class chongzhi extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          sel:'1',
          imgUrl1:'',
          imgUrl2:'',
          imgUrl3:'',
          modal1: false,
          modal2: false,
          modal3: false,
          zfb:'',
          wx:'',
          yhk:'',
          sy:''
        };
    }
     componentDidMount(){
      fetch.shouye({}).then((data)=>{
        console.log(data,'1001111')
        this.setState({sy:data.data.cx_coin})
      })
     fetch.gathers({id:1}).then((data)=>{
       console.log(data,'100')
       this.setState({zfb:data.data})
     })
     fetch.gathers({id:2}).then((data)=>{
      console.log(data,'1001')
      this.setState({wx:data.data})
    })
    fetch.gathers({id:3}).then((data)=>{
      console.log(data,'1002')
      this.setState({yhk:data.data})
    })
    }
     //支付宝上传凭证图片
     getLocalImg1(e) {
      if(!e.target.files[0]){return}
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (result) {
          this.setState({
              imgUrl1: result.target.result
          })
      }.bind(this)
    }
    //微信上传凭证图片
    getLocalImg2(e) {
      if(!e.target.files[0]){return}
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (result) {
          this.setState({
              imgUrl2: result.target.result
          })
      }.bind(this)
    }
    //银行卡上传凭证图片
    getLocalImg3(e) {
      if(!e.target.files[0]){return}
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function (result) {
          this.setState({
              imgUrl3: result.target.result
          })
      }.bind(this)
    }
     // 弹窗
     showModal = key => (e) => {
      e.preventDefault(); // 修复 Android 上点击穿透
      this.setState({
        [key]: true,
      });
    }
    onClose = key => () => {
      this.setState({
        [key]: false,
      });
    }
  /*切换到账方式*/
  handleNavSel = (sel) => {
    if (sel === undefined) return;
    this.setState({sel});
  };
  // 充值
  // 充值方式按钮
  fangshi(){
    if(this.refs.num.state.value === ''){
      Toast.info('请输入充值数量',1.5);
      return;
    }
    if(this.state.sel==1){
        this.setState({
          modal1: true,
        })
    }
    if(this.state.sel==2){
        this.setState({
          modal2: true,
        })
    }
    if(this.state.sel==3){
        this.setState({
          modal3: true,
        })
    }
}
  // 支付宝上传确认
  shangchaung1(){
    console.log(this.refs.num.state.value,'支付宝');
    console.log(this.state.imgUrl1,'支付宝111');
    console.log(this.state.sel,'支付宝111222');
    fetch.recharge({num:this.refs.num.state.value,voucher:this.state.imgUrl1,type:this.state.sel}).then((data)=>{
      if(data.code === 1){
        Toast.success(data.msg,1.5,()=>{
          this.componentDidMount();
          this.clear();
          this.setState({modal1:false});
        });
      }else{
        Toast.offline(data.msg,1.5);
      }
    })
  }
  // 微信上传确认
  shangchaung2(){
    console.log(this.refs.num.state.value,'微信');
    console.log(this.state.imgUrl2,'微信111');
    console.log(this.state.sel,'微信111222');
    fetch.recharge({num:this.refs.num.state.value,voucher:this.state.imgUrl2,type:this.state.sel}).then((data)=>{
      if(data.code === 1){
        Toast.success(data.msg,1.5,()=>{
          this.componentDidMount();
          this.clear();
          this.setState({modal2:false});
        });
      }else{
        Toast.offline(data.msg,1.5);
      }
    })
  }
  // 银行卡上传确认
  shangchaung3(){
    console.log(this.refs.num.state.value,'银行卡');
    console.log(this.state.imgUrl3,'银行卡111');
    console.log(this.state.sel,'银行卡111222');
    fetch.recharge({num:this.refs.num.state.value,voucher:this.state.imgUrl3,type:this.state.sel}).then((data)=>{
      if(data.code === 1){
        Toast.success(data.msg,1.5,()=>{
          this.componentDidMount();
          this.clear();
          this.setState({modal3:false});
        });
      }else{
        Toast.offline(data.msg,1.5);
      }
    })
  }
   //清空
   clear = ()=>{
    this.setState({
      Data:'',
    })
    this.refs.num.state.value = '';
    this.state.imgUrl1 = '';
    this.state.imgUrl2 = '';
    this.state.imgUrl3 = '';
  }
    render() {
        const {history,dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"充值",
            rightContent:"充值记录",
            rightFunc(){
                history.push('/chongzhijilu')
            }
        }
        const {sel,zfb,wx,yhk} = this.state;
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
                    .am-list-item .am-input-control{
                      padding-left:2.07rem;
                    }
                    #imgURl{
                      width:1.6rem;
                      height:1.6rem;
                      display:none;
                    }
                    .am-modal-content{
                      background:#2E323B !important;
                    }
                    `
                }
            </style>
                <MyNavBar {...navBarProps}/>
                  <div className={styles.wallet}>
                  <p>当前剩余余额<span>{this.state.sy?this.state.sy:''}</span></p>
                  </div>
                 <div className={styles.payment} onClick={e => this.handleNavSel(e.target.dataset.type)}>
                  <p>到账方式</p>
                  <p data-type='1'><img src={sel==='1'?pitchOn:UnpitchOn} alt=''/>支付宝</p>
                  <p data-type='2'><img src={sel==='2'?pitchOn:UnpitchOn} alt=''/>微信</p>
                  <p data-type='3'><img src={sel==='3'?pitchOn:UnpitchOn} alt=''/>银行卡</p>
                 </div>
                 <div className={styles.mains}>
                <span>充值数量</span>
                      <InputItem type='number' ref='num' clear></InputItem>
                </div>
                  <div className={styles.confirm}>
                    <span onClick={this.fangshi.bind(this)}>充值</span>
                  </div>
                  <div>
                    <Modal
                        popup
                        visible={this.state.modal1}
                        onClose={this.onClose('modal1')}
                        animationType="slide-up"
                        onOK={(v)=>{console.log(v)}}
                        >
                        <ul className={styles.tanchuang1}>
                            <li><img style={{width:'3rem',height:'3rem',margin:'0 auto'}} src={zfb.code?APIHost+zfb.code:add} alt=""/></li>
                            <li><span>收款账号</span><p>{zfb.card}</p></li>
                            <li><span>收款人</span><p>{zfb.name}</p></li>
                            <li>
                                <span>上传凭证</span>
                                <p>
                                    <label className="fengmianDiv">
                                        <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => {this.getLocalImg1(e)}} accept="image/*" />
                                        < img className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl1 ? this.state.imgUrl1 : add} />
                                    </label>
                                </p>
                            </li>
                            <li><p onClick={this.shangchaung1.bind(this)}>确认</p></li>
                        </ul>
                    </Modal>
                    <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                        onOK={(v)=>{console.log(v)}}
                        >
                        <ul className={styles.tanchuang1}>
                            <li><img style={{width:'3rem',height:'3rem',margin:'0 auto'}} src={wx.code?APIHost+wx.code:add} alt=""/></li>
                            <li><span>微信账号</span><p>{wx.card}</p></li>
                            <li><span>收款人</span><p>{wx.name}</p></li>
                            <li>
                                <span>上传凭证</span>
                                <p>
                                    <label className="fengmianDiv">
                                        <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => {this.getLocalImg2(e)}} accept="image/*" />
                                        < img className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl2 ? this.state.imgUrl2 : add} />
                                    </label>
                                </p>
                            </li>
                            <li><p onClick={this.shangchaung2.bind(this)}>确认</p></li>
                        </ul>
                    </Modal>
                    <Modal
                        popup
                        visible={this.state.modal3}
                        animationType="slide-up"
                        onClose={this.onClose('modal3')}
                        onOK={(v)=>{console.log(v)}}
                        >
                        <ul className={styles.tanchuang}>
                            <li>银行卡充值</li>
                            <li><span>商户银行</span><p>{yhk.bank}</p></li>
                            <li><span>商户名称</span><p>{yhk.name}</p></li>
                            <li><span>银行账号</span><p>{yhk.card}</p></li>
                            <li>
                                <span>上传凭证</span>
                                <p>
                                    <label className="fengmianDiv">
                                        <input id="imgURl" name="from" ref="files" type="file" onChange={(e) => {this.getLocalImg3(e)}} accept="image/*" />
                                        < img className="id_card" ref="cover" name="enter_imgsPath" src={this.state.imgUrl3 ? this.state.imgUrl3 : add} />
                                    </label>
                                </p>
                            </li>
                            <li><p onClick={this.shangchaung3.bind(this)}>确认</p></li>
                        </ul>
                    </Modal>
                </div>
               </div>
        )
    }
}
