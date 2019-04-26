import * as fetchs from '../utils/fetch';
// 登录
export function denglu(params){
  return fetchs.creat_Token(fetchs.APIHost+"/login",fetchs.getAuth("/login",params.name,params.pwd),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//注册用户
export function registered(params){
  return fetchs.create(fetchs.APIHost+"/reg",params).then(response => response.json())
    .then(json => {return json});
}
// 验证码
export function smscode(params){
  return fetchs.creat_Token(fetchs.APIHost+"/smscode",fetchs.getAuth("/smscode"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 忘记密码
export function forget(params){
  return fetchs.creat_Token(fetchs.APIHost+"/pwd",fetchs.getAuth("/pwd"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 个人信息
export function personalInfo(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/get",fetchs.getAuth("/user/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 修改个人资料
export function xiugaiInfo(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/put",fetchs.getAuth("/user/put"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 首页
export  function shouye(params){
  return fetchs.read_Token(fetchs.APIHost+"/home",fetchs.getAuth("/home")).then(response => response.json())
    .then(json => {return json});
}
// 转账
export function transfer(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/agent",fetchs.getAuth("/user/agent"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 转账记录(转出)
export function transferList(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/transList",fetchs.getAuth("/user/transList"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 转账记录(转入)
export function transferzr(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/intList",fetchs.getAuth("/user/intList"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 转换规则
export function transferRule(params){
  return fetchs.creat_Token(fetchs.APIHost+"/coin/rules",fetchs.getAuth("/coin/rules"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 转换
export function ltzcx(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/coin",fetchs.getAuth("/user/coin"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 转换记录
export function conRecord(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/acclog",fetchs.getAuth("/user/acclog"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 挂卖（创建订单）
export function creadeOrder(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/sell",fetchs.getAuth("/user/sell"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 挂卖（卖出中心）
export function salesCenter(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/get",fetchs.getAuth("/sell/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 卖出交易详情
export function maichuQuxiao(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/canclesell",fetchs.getAuth("/user/canclesell"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 卖出交易详情2
export function maichuQueding(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/buy",fetchs.getAuth("/user/buy"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 卖出记录
export function maichuDetail(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/sellList",fetchs.getAuth("/sell/sellList"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 买入记录
export function mairuDetail(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/buyList",fetchs.getAuth("/sell/buyList"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 买入记录详情
export function mairuxq(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/sellDetails",fetchs.getAuth("/sell/sellDetails"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 打款
export function dakuanq(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/confirm",fetchs.getAuth("/sell/confirm"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 确认收款
export function shoukuan(params){
  return fetchs.creat_Token(fetchs.APIHost+"/sell/getfirm",fetchs.getAuth("/sell/getfirm"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 商城轮播图
export function shopLunbo(params){
  return fetchs.creat_Token(fetchs.APIHost+"/mallpic",fetchs.getAuth("/mallpic"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 报单商品分类
export function billClassify(params){
  return fetchs.creat_Token(fetchs.APIHost+"/goods/cate",fetchs.getAuth("/goods/cate"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 报单商品分类列表
export function ClassifyList(params){
  return fetchs.creat_Token(fetchs.APIHost+"/goods",fetchs.getAuth("/goods"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}

// 我的直推
export function gropupZhitui(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/team",fetchs.getAuth("/user/team"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
  }
// 团队业绩
export function gropupteam(params){
return fetchs.read_Token(fetchs.APIHost+"/user/yeji",fetchs.getAuth("/user/yeji")).then(response => response.json())
.then(json => { return json});
}
// 报单商品详情
export function baodanDetails(params){
  return fetchs.creat_Token(fetchs.APIHost+"/goods/get",fetchs.getAuth("/goods/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
  }
// 我的订单
export function wodedingdan(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order",fetchs.getAuth("/order"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 首页新闻
export function gonggao(params){
  return fetchs.creat_Token(fetchs.APIHost+"/notice/list",fetchs.getAuth("/notice/list"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 新闻详情
export function gonggao_detil(params){
  return fetchs.creat_Token(fetchs.APIHost+"/notice/get",fetchs.getAuth("/notice/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 加入购车
export function shopcar(params){
  return fetchs.creat_Token(fetchs.APIHost+"/cart/add",fetchs.getAuth("/cart/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 购物车
export function shopcarList(params){
  return fetchs.creat_Token(fetchs.APIHost+"/cart",fetchs.getAuth("/cart"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 创建订单
export function cjdingdan(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order/create",fetchs.getAuth("/order/create"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 添加订单
export function tjdingdan(params){
  return fetchs.creat_Token(fetchs.APIHost+"/cart/get",fetchs.getAuth("/cart/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 订单选择地址
export function changeDizhi(params){
  return fetchs.creat_Token(fetchs.APIHost+"/address",fetchs.getAuth("/address"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 获取订单信息
export function huoquDEtail(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order/get",fetchs.getAuth("/order/get"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 订单支付
export function orderPay(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order/pay",fetchs.getAuth("/order/pay"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 更改购物车数量
export function changeNum(params){
  return fetchs.creat_Token(fetchs.APIHost+"/cart/num",fetchs.getAuth("/cart/num"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 删除购物车商品
export function DeleteCar(params){
  return fetchs.creat_Token(fetchs.APIHost+"/cart/delete",fetchs.getAuth("/cart/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 购物车生成订单
export function CarOrderList(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order/add",fetchs.getAuth("/order/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 确认收货
export function shouhuos(params){
  return fetchs.creat_Token(fetchs.APIHost+"/order/confirm",fetchs.getAuth("/order/confirm"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 收入明细
export function acclog(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/acclogs",fetchs.getAuth("/user/acclogs"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 收入明细(总收益)
export function acclogs(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/total",fetchs.getAuth("/user/total"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 充值信息
export function gathers(params){
  return fetchs.creat_Token(fetchs.APIHost+"/gather",fetchs.getAuth("/gather"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 充值
export function recharge(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/recharge",fetchs.getAuth("/user/recharge"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 充值记录
export function rechargeRecord(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/rechargelog",fetchs.getAuth("/user/rechargelog"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 商家申请
export function merchant(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/toshop",fetchs.getAuth("/user/toshop"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
export function userWarn(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/warn",fetchs.getAuth("/user/warn"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
export function changeMon(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/deal",fetchs.getAuth("/user/deal"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
