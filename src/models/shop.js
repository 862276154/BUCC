// 引入所需请求
import {tokenLogin} from '../services/user';
import {getClassify,getGoods,getShopList,getCarousel,getAddr,getOrder} from '../services/shop';

import { routerRedux } from 'dva/router';
var queryString = require('querystring');
export default {

  //空间对象名称，很重要！
  namespace: 'shop',
  //state 对象，大部分数据存储的位置
  state: {
    user:{},


    // 分页信息，与php对接写法可固定为此写法,部分数据可能不会用到
    pagination:{
      current_page:1,
      last_page:1,
      per_page:0,
      total:0,
      hasMore:false
    }
  },

  //加载组件前执行的请求
  subscriptions: {
    setup ({ dispatch, history }) {

      history.listen(location => {
        // 检测是否登录，
        // if(location.pathname!="/login"&&location.pathname!="/reg"&&location.pathname!="/chgpwd"){
        //   dispatch({
        //     type: 'userRefresh',
        //     payload:{
        //       dispatch
        //     }
        //   });

        // }
        if (location.pathname === '/') {

          // 这里是获取地址栏的参数'parsed'获取后为对象如{id:1}
          location.search=location.search.replace("?","")
          const parsed = queryString.parse(location.search);
          // 获取后的操作
          if(parsed.id){
            // dispatch({
            //   type: 'getShopList',
            //   payload:{
            //     search:parsed.id,
            //     page:1
            //   }
            // });
          }else{
            // ....
          }

          // 调用下面的方法,写法固定.type为方法名,payload为参数
          // dispatch({
          //   type: 'getShopList',
          //   payload:{
          //     is_hot:true,
          //     page:1
          //   }
          // });
        }
      })
    }
  },

  //远程请求信息
  effects: {



  },

  //reducer 改变数据的唯一途径
  reducers: {

    // 基本使用
    getUser(state, action) {
      return { ...state, ...action.payload };
    },

    // 更新列表，通用
    updateList(state,action){
      const {pagination} = action.payload;
      // 判断当前页面是否是最后一页,从而判断是否还有更多,以控制页面是否继续加载,
      if(pagination.current_page<pagination.last_page){
        action.payload.pagination.hasMore=true
      }else{
        action.payload.pagination.hasMore=false
      }
      return {...state,...action.payload}
    },



  }

};
