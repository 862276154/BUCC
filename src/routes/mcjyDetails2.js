import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { loginOut, APIHost} from '../utils/fetch';
import styles from "./styles/mcjyDetails2.less";
import Zmage from 'react-zmage';
import { Toast,InputItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import transferImg from '../assets/images/transferImg.png';
import redHeart from '../assets/images/redHeart.png';
import headimg from '../assets/images/jiahao.png';
import { parse } from 'url';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({shop: state.shop}))
export default class mcjyDetails2 extends Component {

    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
          imgUrl:'',
          DATA:'',
          mr:''
        };
    }
    async componentDidMount(){
      const {location} = this.props;
      const parse = queryString.parse(location.search.replace('?',''));
      console.log(parse.mr,'mrrrrrrrrr');
      this.setState({mr:parse.mr});
      const data = await fetch.mairuxq({id:parse.id});
      console.log(data,'a1a1a1')
      this.setState({DATA:data.data.items[0]})
      const info = await fetch.mairuxq({id:parse.id});
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
            imgUrl:e.target.result
          })
          return this.result
      }.bind(this)
  }
  //打款
  async dakuan(){
    const {location,dispatch} = this.props;
      const parse = queryString.parse(location.search.replace('?',''));
      const id = parse.id;
    const voucher = this.state.imgUrl;
    const val = await fetch.dakuanq({id:parse.id,voucher:this.state.imgUrl});
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        // this.componentDidMount();
        dispatch(routerRedux.push('/guamai'))
      })
    }else{
      Toast.offline(val.msg,1.5);
    }
  }
  //确认打款凭证
  async querenPz(){
    const {location} = this.props;
    const parse = queryString.parse(location.search.replace('?',''));
    console.log(this.state.DATA,parse.id,'333--')
    const val = await fetch.shoukuan({id:parse.id});
    if(val.code ===1){
      Toast.success(val.msg,1.5,()=>{
        this.componentDidMount();
      })
    }else{
      Toast.offline(val.msg,1.5);
    }

  }
    render() {
        const {history,dispatch}=this.props;
        console.log(this.state.mr,'0.0.0')
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
            titleName:"卖出交易详情",
        }
        const {sel} = this.state;
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
                      padding-left: 2rem;
                    }
                    .am-list-item .am-input-control input::-webkit-input-placeholder{
                      color:white;
                    }
                    .shangc{
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

                {
                  this.state.mr?
                  <div className={styles.counterparty}>
                  <p className={styles.adverse}>交易对方</p>
                  <dl>
                        <dt><img src={transferImg} alt=''/></dt>
                        <dd>
                          <p>{this.state.DATA.buyer?this.state.DATA.buyer.name:''}</p>
                          <p>
                            <span style={{marginRight:'0.12rem'}}>电话</span>
                            {this.state.DATA.buyer?this.state.DATA.buyer.tel:''}
                          </p>
                          <p>支付方式:<span>{this.state.DATA.buyer?this.state.DATA.buyer.bank:''}</span></p>
                        </dd>
                      </dl>
                </div>
                :
                <div className={styles.counterparty}>
                    <p className={styles.adverse}>交易对方</p>
                    <dl>
                          <dt><img src={transferImg} alt=''/></dt>
                          <dd>
                            <p>{this.state.DATA.seller?this.state.DATA.seller.name:''}</p>
                            <p>
                              <span style={{marginRight:'0.12rem'}}>电话</span>
                              {this.state.DATA.seller?this.state.DATA.seller.tel:''}
                            </p>
                            <p>支付方式:<span>{this.state.DATA.seller?this.state.DATA.seller.bank:''}</span></p>
                          </dd>
                        </dl>
                  </div>
                }




                  <div className={styles.mains} style={{marginTop:'60px'}}>
                  <span>卖出余额</span>
                        <InputItem type='text' placeholder={this.state.DATA.trade_num} disabled clear></InputItem>
                  </div>
                  <div className={styles.mains}>
                  <span>实际收益</span>
                        <InputItem type='text' placeholder={this.state.DATA.trade_num-this.state.DATA.fee} disabled clear></InputItem>
                  </div>
                  <div className={styles.mains}>
                  <span>交易状态</span>
                        <InputItem type='text' placeholder={
                          this.state.DATA.status ===0?'挂卖中'
                          :this.state.DATA.status ===1?'等待打款'
                          :this.state.DATA.status ===2?'等待收款'
                          :this.state.DATA.status ===3?'交易完成'
                          :this.state.DATA.status === -1?'交易取消'
                          :''
                          } disabled clear></InputItem>
                  </div>
                  <div className={styles.mains}>
                  <span>交易时间</span>
                        <InputItem type='text' placeholder={'2018-12-12 12:00'} disabled clear></InputItem>
                  </div>
                   {
                    this.state.mr&&this.state.DATA.status ===2?
                   <div>
                          <div class='shangc'>
                        <span>查看凭证</span>
                        {
                          this.state.DATA.voucher?
                          <label className="fengmianDiv">
                        <Zmage src={APIHost+this.state.DATA.voucher} alt=''/>
                              </label>
                              :
                              <span style={{marginLeft:'0.83rem'}}>未上传凭证</span>
                        }

                        </div>
                        <div className={styles.confirm}><span onClick={()=>this.querenPz()}>确认</span></div>
                   </div>
                    :''
                  }





                 <div style={this.state.mr?{display:'none'}:null}>
                 {
                    this.state.DATA.status ===1?
                    <div class='shangc'>
                    <span>上传凭证</span>
                    <label className="fengmianDiv">
                        <input id="imgURl" name="from" ref="files" type="file"
                          onChange={(e) => this.getLocalImg(e)}
                          accept="image/jpeg,image/x-png,image/gif" />
                          <img className="id_card" ref="headIm"   src={this.state.imgUrl?this.state.imgUrl:headimg} />
                          </label>
                    </div>
                    :''
                  }
                  <div className={styles.confirm}><span onClick={()=>this.dakuan()}>确认</span></div>





                 </div>
               </div>
        )
    }
}
