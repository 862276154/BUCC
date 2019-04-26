import React, { Component } from 'react';
import * as fetch from "../services/user";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { loggedIn } from "../utils/fetch";
import arrayTreeFilter from 'array-tree-filter';
import MyNavBar from "../components/MyNavBar";
import { List, InputItem, TextareaItem, Toast, Picker } from 'antd-mobile';
import styles from './styles/Addsite.less';
const queryString = require('query-string');
const cityData = require('../ssx');

@connect(state => ({
  user: state.user
}))

export default class Addsite extends Component {
  state = {
    data: [],
    allAreaList:[],
    pickerValue: [],
    visible: false,

    tel: "",
    username: "",
    site: "",
    id: '',

    is_edit: '',  //1添加 2修改
    current_editAddres:{},  //要编辑的话，根据id拿地址
  }

  componentWillMount  = async ()=> {
    const { location, dispatch } = this.props;
    const user = loggedIn();
    if (!user) {
      dispatch(routerRedux.push('/login'));
    }
    const type_info = location.search.replace("?", "")
    const type = queryString.parse(type_info);
    this.setState({
      is_edit: type.is_edit
    })
    if(type.is_edit==='2'){
      const result = await fetch.getAddressList({id:type.id});
      if(result.code===1){
        this.setState({
          current_editAddres:result.data,
        })
      }
    }
    const result = await fetch.getAreaList();
    if(result.code===1){
      this.setState({
        allAreaList:result.data
      })
    }

  }
  imputUsername(value) {
    this.setState({
      username: value
    })
  };
  inputTel(value) {
    this.setState({
      tel: value
    })
  };
  inputSite(value) {
    this.setState({
      site: value
    })
  }
  onClick = () => {
    setTimeout(() => {
      this.setState({
        data: cityData.globalData,
      });
    }, 120);
  }
  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(cityData.globalData, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }
  // 返回
  returnGoBack = () => {
    const { dispatch } = this.props;
    dispatch(
      routerRedux.goBack()
    )
  }
  //添加地址  或者是修改地址
  addsite = async () => {
    const {dispatch} = this.props;
    const { username, tel, pickerValue, site } = this.state;
    if (username === '') {
      Toast.info("收货人不能为空", 1);
      return;
    }
    if (tel === '') {
      Toast.info("收货人电话不能为空", 1);
      return;
    }
    if (pickerValue === []) {
      Toast.info("请选择省份", 1);
      return;
    }
    if (site === []) {
      Toast.info("请填写具体地址", 1);
      return;
    }
    const parameter = {
      name: username,
      tel,
      area_code:pickerValue,
      province:pickerValue[0],
      city:pickerValue[1],
      dist:pickerValue[2]?pickerValue[2]:"",
      address: site,
    }
    const result = await fetch.addAddress(parameter);
    if(result.code===1){
      Toast.info(result.msg, 1,()=>{
        dispatch(routerRedux.push('/address'))
      });
      return;
    }else{
      Toast.info(result.msg, 1);
      return;
    }
  }
  render() {
    const { dispatch, history } = this.props;
    const { pickerValue, is_edit,allAreaList,current_editAddres } = this.state;
    const navBarProps = {
      leftVisible: true,
      leftFunc() {
        dispatch(routerRedux.goBack())
      },
      titleName: is_edit === '1' ? "添加收货地址" : "编辑收货地址",
    }
    console.log(current_editAddres.area_name)
    return (

      <div>
        <style>
          {`
            .am-list,.am-list-item,.am-list-body{
              background: #2E323B;
            }
            .am-list{
              width: 100%;
            }
              .am-list-item.am-input-item{
                height: 0.9rem;
                padding-left: 0;
                padding-right: 0;
              }
              .am-list-item .am-list-line{
                padding-right: 0;
              }
              .am-list-item{
                min-height: 0.9rem;
              }
              .am-list-item .am-input-label{
                color:#B0B0B0;
                font-size: 0.28rem;
              }

              .am-list-item .am-input-label.am-input-label-5,
              .am-textarea-label.am-textarea-label-5{
                width: 1.3rem;
                margin-left: 0.3rem;
              }
              .am-list-item .am-input-label{
                margin-right: 0.4rem;
              }
              .am-list-item .am-input-control input{
                font-size: 0.26rem !important;
                padding-left: 0.2rem;
                box-sizing: border-box;
                height: 0.7rem;
                line-height: 0.7rem;
                color:#fff;
              }
              .am-list-item{
                padding-left:0.3rem;
                padding-right:0.3rem;
              }
              .am-list-item .am-list-line .am-list-content{
                font-size: 0.26rem;
                padding-top:0;
                padding-bottom:0;
                width: 1.3rem;
                color:#B0B0B0;
                flex:none;
                margin-right: 0.4rem;

              }
              .am-list-item .am-list-line .am-list-extra{
                padding-top:0;
                padding-bottom:0;
                font-size: 0.26rem;
                flex-basis: 100%;
                text-align: left;
                padding-left: 0.2rem;
                box-sizing: border-box;
                height: 0.7rem;
                line-height: 0.7rem;
                color:#B0B0B0;
              }
              .am-textarea-label{
                color: #B0B0B0;
                font-size: 0.26rem;
                min-height: 0.7rem;
                line-height: 0.7rem;
                margin-top: 0.3rem;
                margin-right: 0.4rem;
              }
              .am-textarea-control textarea{
                font-size: 0.26rem;
                padding-left: 0.2rem;
                box-sizing: border-box;
                color: #fff;
              }
              .am-textarea-count span{
                color:#fff;
              }
              html:not([data-scale]) .am-list-body::before{
                height: 0;
              }
              .srkCon .am-list-item{
                padding-left: 0!important;
              }
            `}
        </style>
        { /* 顶部title */}
        <MyNavBar {...navBarProps} />
        <div className={styles.main}>
          <List>
            <InputItem
              clear
              onChange={(val) => this.imputUsername(val)}
              placeholder={is_edit==='2'?current_editAddres.name:"请输入收货人姓名"}
              value={this.state.username}
            >收货人</InputItem>
            <InputItem
              type="number"
              placeholder={is_edit==='2'?current_editAddres.tel:"请输入收货人电话"}
              maxLength='11'
              onChange={(val) => this.inputTel(val)}
              clear
              value={this.state.tel}
            >联系电话</InputItem>
          </List>

          <div style={{ borderBottom: '1px solid #ddd' }}>
            <Picker
              visible={this.state.visible}
              data={allAreaList}
              value={this.state.pickerValue}
              extra={current_editAddres.area_name?current_editAddres.area_name:''}
              onChange={v => this.setState({ pickerValue: v })}
              onOk={() => this.setState({ visible: false })}
              onDismiss={() => this.setState({ visible: false })}>
              <List.Item ref="cityInfo"
                onClick={() => this.setState({ visible: true })}
              >收货地址</List.Item>
            </Picker>
          </div>
          <div className='srkCon'>
            <TextareaItem
              title="详细地址"
              placeholder={is_edit==='2'?current_editAddres.address:"请输入详细地址"}
              data-seed="logId"
              rows={3}
              count={40}
              onChange={(val) => this.inputSite(val)}
              value={this.state.site} />
          </div>
        </div>
        <div className={styles.menus} onClick={this.addsite}>保存</div>
      </div>
    )

  }
}




