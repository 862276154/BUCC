import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
function RouterConfig({ history,app }) {
  // // 首页
  // const IndexPage = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/shop'),
  //   ],
  //   component: () => import('./routes/IndexPage'),
  // });
  // 登录
 const denglu = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/denglu'),
});
 // 忘记密码
 const wangjimima = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/wangjimima'),
});
 // 注册
 const zhuce = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/zhuce'),
});
// 首页
const shouye = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/shouye'),
});
// 司城天下
const sichengtianxia = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/sichengtianxia'),
});
// 矿机
const kuangji = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/kuangji'),
});
// 购物车
const gouwuche = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/gouwuche'),
});
// 个人中心
const gerenzhongxin = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/gerenzhongxin'),
});
// 个人中心
const xiaoxi = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xiaoxi'),
});
// 修改个人资料
const changeInfo = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/changeInfo'),
});
// 完善个人资料
const perfectInfo = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/perfectInfo'),
});
// 转账
const zhuanzhang = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/zhuanzhang'),
});
// 转账记录
const zhuanzhangjilu = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/zhuanzhangjilu'),
});
// 转换
const zhuanhuan = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/zhuanhuan'),
});
// 转换
const zhuanhuanjilu = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/zhuanhuanjilu'),
});
// 挂卖
const guamai = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/guamai'),
});
// 卖出交易详情
const mcjyDetails = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/mcjyDetails'),
});
// 查看卖出交易详情
const mcjyDetails2 = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/mcjyDetails2'),
});
// 充值
const chongzhi = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/chongzhi'),
});
// 充值记录
const chongzhijilu = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/chongzhijilu'),
});
// 民族品牌
const minzupinpai = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/minzupinpai'),
});
// 新商业
const xinshangye = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xinshangye'),
});
// 新零售
const xinlingshou = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xinlingshou'),
});
// 公告
const gonggao = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/gonggao'),
});
// 公告详情
const ggxiangqing = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/ggxiangqing'),
});
// 详情
const xiangqing = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xiangqing'),
});
// 二级分类
const reclassify = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/reclassify'),
});
// 全部分类
const allSale = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/allSale'),
});
// 报单商品详情
const shopDetail = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/shopDetail'),
});
// 立即下单
const lijiOrders = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/lijiOrders'),
});
// 我的店铺
const wodedianpu = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/wodedianpu'),
});
// 发布商品
const fabushangpin = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/fabushangpin'),
});
// 发布广告
const fabuguanggao = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/fabuguanggao'),
});
const wallet = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/wallet'),
});
const yhklist = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/yhklist'),
});
const xgmm = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xgmm'),
});
const xgmmCon = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/xgmmCon'),
});
const ticket = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/ticket'),
});
const incomelist = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/incomelist'),
});
const group = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/group'),
});
const addsite = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/Addsite'),
});
const applyfor = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/applyfor'),
});
const addyhk = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/addyhk'),
});
const address = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/Address'),
});
const fenxiang = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/fenxiang'),
});
// 商家订单
const shangjiadingdan = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/shangjiadingdan'),
});
// 我的订单
const wodedingdan = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/wodedingdan'),
});
// 收款码
const shoukuanma = dynamic({
  app,
  models: () => [
    import('./models/shop'),
  ],
  component: () => import('./routes/shoukuanma'),
});
return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/" exact component={IndexPage} /> */}
        <Route path="/" exact component={denglu} />
        <Route path="/wangjimima" component={wangjimima} />
        <Route path="/zhuce" component={zhuce} />
        <Route path="/shouye" component={shouye} />
        <Route path="/sichengtianxia" component={sichengtianxia} />
        <Route path="/kuangji" component={kuangji} />
        <Route path="/gouwuche" component={gouwuche} />
        <Route path="/gerenzhongxin" component={gerenzhongxin} />
        <Route path="/xiaoxi" component={xiaoxi} />
        <Route path="/changeInfo" component={changeInfo} />
        <Route path="/perfectInfo" component={perfectInfo} />
        <Route path="/zhuanzhang" component={zhuanzhang} />
        <Route path="/zhuanzhangjilu" component={zhuanzhangjilu} />
        <Route path="/zhuanhuan" component={zhuanhuan} />
        <Route path="/zhuanhuanjilu" component={zhuanhuanjilu} />
        <Route path="/guamai" component={guamai} />
        <Route path="/mcjyDetails" component={mcjyDetails} />
        <Route path="/mcjyDetails2" component={mcjyDetails2} />
        <Route path="/chongzhi" component={chongzhi} />
        <Route path="/chongzhijilu" component={chongzhijilu} />
        <Route path="/minzupinpai" component={minzupinpai} />
        <Route path="/xinshangye" component={xinshangye} />
        <Route path="/xinlingshou" component={xinlingshou} />
        <Route path="/gonggao" component={gonggao} />
        <Route path="/ggxiangqing" component={ggxiangqing} />
        <Route path="/xiangqing" component={xiangqing} />
        <Route path="/reclassify" component={reclassify} />
        <Route path="/allSale" component={allSale} />
        <Route path="/shopDetail" component={shopDetail} />
        <Route path="/lijiOrders" component={lijiOrders} />
        <Route path="/wodedianpu" component={wodedianpu} />
        <Route path="/fabushangpin" component={fabushangpin} />
        <Route path="/fabuguanggao" component={fabuguanggao} />
        <Route path="/shangjiadingdan" component={shangjiadingdan} />
        <Route path="/wodedingdan" component={wodedingdan} />
        <Route path="/shoukuanma" component={shoukuanma} />



        <Route path="/fenxiang" component={fenxiang} />
        <Route path="/wallet" component={wallet} />
        <Route path="/address" component={address} />
        <Route path="/addsite" component={addsite} />
        <Route path="/addyhk" component={addyhk} />
        <Route path="/applyfor" component={applyfor} />
        <Route path="/group" component={group} />
        <Route path="/incomelist" component={incomelist} />
        <Route path="/ticket" component={ticket} />
        <Route path="/xgmmCon" component={xgmmCon} />
        <Route path="/xgmm" component={xgmm} />
        <Route path="/yhklist" component={yhklist} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
