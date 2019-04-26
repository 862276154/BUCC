import React, { Component } from 'react';
import * as fetch from "../services/user";
import { loggedIn } from "../utils/fetch";
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import styles from './styles/Address.less';
import address_active from '../assets/walletImg/address_active.png';
import address_none from '../assets/walletImg/address_none.png';
import edit from '../assets/walletImg/edit.png';
import delect from '../assets/walletImg/delect.png';

@connect(state => ({
  user: state.user
}))

export default class Address extends Component {
  state = {
    src: 1,
    srcflag: 1,
    selectedTabBar: 'mine',
    addList: [],   //地址列表
  }
  async  componentWillMount() {
    const { dispatch } = this.props;
    const user = loggedIn();
    if (!user) {
      dispatch(routerRedux.push({ pathname: '/login' }));
    }
    const result = await fetch.getAddressList();
    if (result.code === 1) {
      this.setState({
        addList: result.data
      })
    }
  }
  //修改地址
  async edit(list, e) {
    //   // console.log(list,'list')
    //   e.stopPropagation();
    //   const {dispatch,} = this.props;
    //   let arr=(list.region).split(" ");
    //   // console.log(arr,'arr')
    //   if(arr.length===2){
    //     let province = arr[0];
    //     let city = arr[1];
    //     dispatch(routerRedux.push('/addsite?name='+list.name+'&mobile='+list.mobile+'&address='+list.address+'&province='+province+'&city='+city+'&id='+list._id));
    //   }else if(arr.length===3){
    //     let province = arr[0];
    //     let city = arr[1];
    //     let area = arr[2];
    //     dispatch(routerRedux.push('/addsite?name='+list.name+'&mobile='+list.mobile+'&address='+list.address+'&province='+province+'&city='+city+'&area='+area+'&id='+list._id));
    //   }
  }
  //删除地址
  async del_address(id) {
   const result = await fetch.delAddress({id});
   if(result.code===1){
    Toast.info(result.msg,2,()=>{
      this.componentWillMount()
    });
    return;
   }else{
    Toast.info(result.msg,2);
    return;
   }
  }

  //选择地址
  async selsetitem(val) {
    //   // console.log(val,'val')
    //   const {dispatch,location} = this.props;
    //   const queryString = require('query-string');
    //   if(location.search!==""){
    //     location.search=location.search.replace("?","")
    //     const parsed = queryString.parse(location.search);
    //     // console.log(parsed,"//*/*/")
    //     if(parsed.id==1){
    //       dispatch(routerRedux.push('/payment?id='+parsed.id+'&dizhiId='+val._id));
    //     }else{
    //       // let dd_id=parsed.id;
    //       // var data = {
    //       //   dd_id: dd_id*1,
    //       //   dz_id: val,
    //       // }
    //       // // console.log(data,'data购物车支付')
    //       // const datas =await user.Order(data);
    //       // // console.log('datasaaa购物车支付1',datas)
    //       // if(datas.code===1){
    //       //   dispatch(routerRedux.push('/shoppay?id='+dd_id));
    //       // }
    //       // console.log('购物车支付')
    //     }
    //   }
  }
  //设置默认地址
  setDefault =async  (id)=>{
     const result = await fetch.setDefault({addr_id:id});
     if(result.code===1){
      Toast.info(result.msg,2,()=>{
        this.componentWillMount()
      });
      return;
     }else{
      Toast.info(result.msg,2);
      return;
     }
  }

  render() {
    const { dispatch, history } = this.props;
    const navBarProps = {
      leftVisible: true,
      leftFunc() {
        dispatch(routerRedux.goBack())
      },
      titleName: "管理收货地址",
    }
    const { addList } = this.state;
    return (
      <div>
        <style>{`
          .text_hidden2{
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
            line-height:.4rem;
        }`}</style>
        { /* 顶部title */}
        <MyNavBar {...navBarProps} />
        <div className={styles.main}>
          {
            addList.length > 0 ? addList.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.content}>
                    <div className={styles.top}>
                      <span>{item.name}</span>
                      <span>{item.tel}</span>
                    </div>
                    <p>
                      <span>收货地址：</span>
                      <span>{item.area_name}{item.address}</span>
                    </p>
                  </div>
                  <div className={styles.menu}>
                    <p onClick={this.setDefault.bind(this,item.id)}>
                      <img src={item.is_default?address_active:address_none} alt="" />
                      <span>默认地址</span>
                    </p>
                    <p>
                      {/* <span onClick={() => history.push('/addsite?is_edit=' + 2+"&id="+item.id)}>
                        <img src={edit} alt="" />
                        <span>编辑</span>
                      </span> */}
                      <span onClick={this.del_address.bind(this,item.id)}>
                        <img src={delect} alt="" />
                        <span>删除</span>
                      </span>
                    </p>
                  </div>
                </div>
              )
            }) : ''
          }

        </div>
        <div className={styles.menus} onClick={() => history.push('/addsite?is_edit=' + 1)}>添加新地址</div>
      </div>
    )

  }
}





