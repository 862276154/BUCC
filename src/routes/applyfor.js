import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./styles/yhklist.less";
import { Toast,TextareaItem, Modal} from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/shop';
import upimgbg from '../assets/walletImg/upimgbg.png';
import no_active from '../assets/walletImg/no_active.png';
import { Tabs,} from 'antd-mobile';
const queryString = require('query-string');
const alert=Modal.alert;
// 把model 传入props
@connect(state => ({user: state.user}))
export default class applyfor extends Component {
    // 构造函数
    constructor(props) {
        super(props);
        this.state = {
            site:"",
            imgUrl:'',
        };
    }
    // 店铺描述
    inputSite(value){
        this.setState({
          site:value
        })
    }
    componentDidMount(){
      const {dispatch} = this.props;
      fetch.shouye({}).then((data)=>{
        console.log(data,'222222')
        if(data.data.is_shop === 1){
          Toast.info('你已成为商家，无需重复申请!',2,()=>{
            dispatch(routerRedux.push('/gerenzhongxin'));
          })
        }
      })
    }
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
    getLocalImga(e) {
        if (!e.target.files[0]) {
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrla: e.target.result
            })
            return this.result
        }.bind(this)
    }
    getLocalImgb(e) {
        if (!e.target.files[0]) {
            return
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function (e) {
            this.setState({
                imgUrlb: e.target.result
            })
            return this.result
        }.bind(this)
    }
// 添加
async addBtn(){
    const {dispatch} = this.props;
        // let siteinfo=this.state.site;
    // let userimg = this.state.imgUrl;
    // let userimga = this.state.imgUrla;
    // let userimgb = this.state.imgUrlb;
    let uname = this.refs.uname.value;
    let shop_name = this.refs.shop_name.value;
    let shop_tel = this.refs.shop_tel.value;
    let shop_address = this.refs.shop_address.value;
    let shop_note = this.refs.shop_note.state.value;
    let card_front = this.state.imgUrl;
    let card_back = this.state.imgUrla;
    let trad = this.state.imgUrlb;
    console.log(uname,shop_name,shop_tel,shop_address,shop_note,card_front,card_back,trad,'1111111')
    if(uname === ''){
      Toast.info('请填写您的姓名',1.5);
      return;
    }
    if(shop_name === ''){
      Toast.info('请填写您的店名',1.5);
      return;
    }
    if(shop_tel === ''){
      Toast.info('请填写您的联系电话',1.5);
      return;
    }
    if(shop_tel.replace(/\s/g,"").length!=11){
      Toast.info("手机号格式不正确!",1.5);
      return;
    }
    if(!(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(shop_tel))){
      Toast.info("手机号格式不正确!", 1.5);
      return;
    }
    if(shop_address === ''){
      Toast.info('请填写您的店铺地址',1.5);
      return;
    }
    if(shop_note === ''){
      Toast.info('描述一下您的店铺',1.5);
      return;
    }
    if(card_front.length === 0){
      Toast.info('请上传身份证正面',1.5);
      return;
    }
    if(card_back.length === 0){
      Toast.info('请上传身份证背面',1.5);
      return;
    }
    if(trad.length === 0){
      Toast.info('请上传营业执照',1.5);
      return;
    }
    let sql = {uname,shop_name,shop_tel,shop_address,shop_note,card_front,card_back,trad};
    const result = await fetch.merchant(sql);
    if(result.code === 1){
      Toast.success(result.msg,1.5,()=>{
        dispatch(routerRedux.push('/gerenzhongxin'))
      })
    }else{
      Toast.offline(result.msg,1.5);
    }
    // const {dispatch}=this.props;
    // var bankName=this.refs.bankName.value;
    // var bankNumber=this.refs.bankNumber.value;
    // var arr=bankName.split(" ");
    // if (bankName==="") {Toast.offline("开户行不能为空!",2); return; }
    // if (bankNumber==="") {Toast.offline("银行卡号不能为空!",2); return; }
    // Toast.loading("正在添加", 0);
    // var regData={
    //   // 开户行
    //   bank:arr.length==2?arr[0]:'',
    //   // 银行卡类型
    //   type:arr.length==2?arr[1]:'',
    //   // 银行卡号
    //   bankCard:bankNumber,
    // }
    // const value =await userServer.AddYhk(regData);
    // Toast.hide();
    // // console.log(value,'value ')
    // if(value.statusCode===101){
    //   Toast.success(value.message,1,await function(){
    //     dispatch(routerRedux.push('/Wallet'))
    //   });
    // }else{
    //   Toast.fail(value.message, 2);
    // }
  }
    render() {
        const {dispatch}=this.props;
        const navBarProps = {
          leftVisible:true,
          leftFunc(){
              dispatch(routerRedux.goBack())
          },
          titleName:"商家申请",
      }


    return (
        <div>
           <style>{`
                body,html{
                    background-color: #2E323B;
                }
                .am-list-item{
                    padding-right:0.3rem;
                    background-color:#2E323B;
                    border: 1px dashed #9196A1;
                    margin-bottom: 0.5rem;
                }
                .am-textarea-count{
                    right: 0.3rem;
                    color: #fff;
                }
                .am-textarea-count span{
                    color: #fff;
                }
                .am-textarea-control textarea{
                    color: #fff;
                    font-size:0.28rem;
                }

            `} </style>
            <MyNavBar {...navBarProps}/>
            <div>
                <ul className={styles.AddYhk} style={{marginBottom:"0.8rem"}}>
                    <li>
                        <span>法人姓名</span>
                        <input type='text' placeholder='请填写您的姓名'  ref='uname'/>
                    </li>
                    <li>
                        <span>商家名称</span>
                        <input type='text' placeholder='请填写您的店名' ref='shop_name' />
                    </li>
                    <li>
                        <span>联系电话</span>
                        <input type='number' placeholder='请填写您的联系电话' ref='shop_tel'/>
                    </li>
                    <li>
                        <span>详细地址</span>
                        <input type='text' placeholder='请填写您的店铺地址' ref='shop_address'/>
                    </li>
                </ul>
                <TextareaItem
                    title=""
                    placeholder="描述一下您的商铺"
                    data-seed="logId"
                    ref='shop_note'
                    rows={4}
                    count={200}
                    onChange={(val)=>this.inputSite(val)}
                    value={this.state.site}/>
                <ul className={styles.applyfor}>
                    <li>
                       <img alt='' style={{width:'100%',height:'100%'}}
                            className="id_card" ref="cover" name="enter_imgsPath"
                            src={this.state.imgUrl ? this.state.imgUrl : upimgbg}/>
                       <input id="imgURl" name="from" ref="files" type="file"
                        onChange={(e) => this.getLocalImg(e)}
                        accept="image/jpeg,image/x-png,image/gif" />
                        <p style={{display:this.state.imgUrl ?'none':'block'}}>上传身份证正面</p>
                    </li>
                    <li>
                       <img alt='' style={{width:'100%',height:'100%'}}
                            className="id_card" ref="cover" name="enter_imgsPath"
                            src={this.state.imgUrla ? this.state.imgUrla : upimgbg}/>
                       <input name="from" ref="files" type="file"
                        onChange={(e) => this.getLocalImga(e)}
                        accept="image/jpeg,image/x-png,image/gif" />
                        <p style={{display:this.state.imgUrla ?'none':'block'}}>上传身份证背面</p>
                    </li>
                    <li>
                       <img alt='' style={{width:'100%',height:'100%'}}
                            className="id_card" ref="cover" name="enter_imgsPath"
                            src={this.state.imgUrlb ? this.state.imgUrlb : upimgbg}/>
                       <input name="from" ref="files" type="file"
                        onChange={(e) => this.getLocalImgb(e)}
                        accept="image/jpeg,image/x-png,image/gif" />
                        <p style={{display:this.state.imgUrlb ?'none':'block'}}>上传营业执照</p>
                    </li>
                </ul>
                <p style={{color:' #fff',marginTop:' 0.3rem',marginLeft: '8%',fontSize:'0.24rem'}}>提示：此证件信息只做商家申请核对，请放心上传</p>



                <div className={styles.AddYhkBtn}
                    onClick={()=>this.addBtn()}
                >提交</div>
            </div>
        </div>
    )
    }
}
