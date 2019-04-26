import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/tabBar.less";

// 图标资源
import Tab1 from "../assets/images/tab1.png";
import Tab01 from "../assets/images/tab01.png";
import Tab2 from "../assets/images/tab2.png";
import Tab02 from "../assets/images/tab02.png";
import Tab3 from "../assets/images/tab3.png";
import Tab03 from "../assets/images/tab03.png";
import Tab4 from "../assets/images/tab4.png";
import Tab04 from "../assets/images/tab04.png";
import Tab5 from "../assets/images/tab5.png";
import Tab05 from "../assets/images/tab05.png";

// 子项可增删,样式自适应
// selectedTabBar:活动的tab,string
// history ,传入history用于点击跳转
const MyTabBar=({selectedTabBar,history}) =>{
  return(
    <div className={styles.tabBarBox}>

    <div className={styles.tabBarItem} onClick={()=>history.push('/shouye')}>
        <img src={selectedTabBar=='shouye'?Tab1:Tab01}></img>
        <span className={selectedTabBar=='shouye'?styles.textActive:""}>首页</span>
    </div>

    <div className={styles.tabBarItem} onClick={()=>history.push('/sichengtianxia')}>
        <img src={selectedTabBar=='sichengtianxia'?Tab2:Tab02}></img>
        <span className={selectedTabBar=='sichengtianxia'?styles.textActive:""}>司城天下</span>
    </div>

    <div className={styles.tabBarItem} onClick={()=>history.push('/kuangji')}>
        <img src={selectedTabBar=='kuangji'?Tab3:Tab03}></img>
        <span className={selectedTabBar=='kuangji'?styles.textActive:""}>矿机</span>
    </div>

    <div className={styles.tabBarItem} onClick={()=>history.push('/gouwuche')} >
        <img src={selectedTabBar=='gouwuche'?Tab4:Tab04}></img>
        <span className={selectedTabBar=='gouwuche'?styles.textActive:""}>购物车</span>
    </div>

     <div className={styles.tabBarItem} onClick={()=>history.push('/gerenzhongxin')}>
        <img src={selectedTabBar=='gerenzhongxin'?Tab5:Tab05}></img>
        <span className={selectedTabBar=='gerenzhongxin'?styles.textActive:""}>个人中心</span>
    </div>
</div>
  )
}
MyTabBar.propTypes = {

}
export default MyTabBar
