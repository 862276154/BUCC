import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from "./styles/yhklist.less";
import { Toast, InputItem, Modal } from 'antd-mobile';
import MyNavBar from "../components/MyNavBar";
import * as fetch from '../services/user';
import active from '../assets/walletImg/active.png';
import no_active from '../assets/walletImg/no_active.png';
import { Tabs, } from 'antd-mobile';
const queryString = require('query-string');
const alert = Modal.alert;
// 把model 传入props
@connect(state => ({ user: state.user }))
export default class xgmm extends Component {
    state = {
        is_login: '',   //1登录密码修改， 2  支付密码修改
    }
    UNSAFE_componentWillMount() {
        const type_info = this.props.location.search.replace("?", "")
        const type = queryString.parse(type_info);
        this.setState({
            is_login: type.id
        })
    }
    // 点击确定
    modify_pass = async () =>{
        const {dispatch} = this.props;
        const {is_login} = this.state;
        const oldP = this.refs.oldP.value;
        const newP = this.refs.newP.value;
        const s_newP = this.refs.s_newP.value;
        if(oldP===''){
            Toast.info("旧密码不能为空",1);
            return;
        }
        if(newP===''){
            Toast.info("新密码不能为空",1);
            return;
        }
        if(s_newP===''){
            Toast.info("确认新密码不能为空",1);
            return;
        }
        if(newP!==s_newP){
            Toast.info("两次密码输入要一致",1);
            return;
        }
        const parameter = {
            old_pwd:oldP,
            pwd:newP,
            type:is_login==='1'?1:2
        }
        const result = await fetch.modify_Pass(parameter);
        if(result.code===1){
            Toast.info(result.msg,1,()=>{
                if(is_login==='1'){
                    dispatch(routerRedux.push('/'))
                }else{
                    dispatch(routerRedux.push('/xgmmCon'))
                }
            });
            return;
        }else{
            Toast.info(result.msg,1);
            return;
        }
    }
    render() {
        const { dispatch } = this.props;
        const { is_login } = this.state;
        const navBarProps = {
            leftVisible: true,
            leftFunc() {
                dispatch(routerRedux.goBack())
            },
            titleName: is_login === '1' ? "修改登录密码" : "修改支付密码",
        }
        return (
            <div>
                <style>{`
                body,html{
                    background-color: #2E323B;
                }
            `} </style>
                <MyNavBar {...navBarProps} />
                <div>
                    <ul className={styles.AddYhk} style={{ width: '77%', margin: 'auto', marginTop: '1rem' }}>
                        <li>
                            <span>旧登录密码</span>
                            <input type='text' placeholder='请输入旧密码' ref='oldP' />
                        </li>
                        <li style={{ marginTop: '0.2rem' }}>
                            <span>新登录密码</span>
                            <input type='password' placeholder='请输入新密码' ref='newP' />
                        </li>
                        <li>
                            <span>确认密码</span>
                            <input type='password' placeholder='请再次输入新密码' ref='s_newP' />
                        </li>
                    </ul>
                    <div className={styles.AddYhkBtn}
                        onClick={this.modify_pass}
                    >确定</div>
                </div>
            </div>
        )
    }
}
