import * as fetchs from '../utils/fetch';

// 修改密码
export function modify_Pass(params){
  return fetchs.creat_Token(fetchs.APIHost+"/user/pwd",fetchs.getAuth("/user/pwd"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 地址列表
export function getAddressList(params){
  return fetchs.creat_Token(fetchs.APIHost+"/address",fetchs.getAuth("/address"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 设置默认
export function setDefault(params){
  return fetchs.creat_Token(fetchs.APIHost+"/address/setdefault",fetchs.getAuth("/address/setdefault"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 删除地址
export function delAddress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/address/delete",fetchs.getAuth("/address/delete"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
//添加地址
export function addAddress(params){
  return fetchs.creat_Token(fetchs.APIHost+"/address/add",fetchs.getAuth("/address/add"),JSON.stringify(params)).then(response => response.json())
  .then(json => { return json});
}
// 获取省市区列表
export function getAreaList(params){
  return fetchs.read_Token(fetchs.APIHost+"/arealist",fetchs.getAuth("/arealist")).then(response => response.json())
  .then(json => { return json});
}
