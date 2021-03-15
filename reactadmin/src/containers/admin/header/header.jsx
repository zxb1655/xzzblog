import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { withRouter } from 'react-router-dom' //在非路由组件中，要使用路由组件的api，借助withRouter实现
import screenfull from 'screenfull'
import {FullscreenExitOutlined,FullscreenOutlined} from '@ant-design/icons'
import { connect } from 'react-redux'
import dayjs from 'dayjs'
import {menuList} from '../../../config/menu_config'
import { createDeleteUserInfoAction } from '../../../redux/action_creators/login_action'
import './header.less'
const { confirm } = Modal;

@connect(
  state => ({
    userInfo: state.userInfo,
    title: state.title
  }),
  { deleteUser: createDeleteUserInfoAction }
)
@withRouter
class Header extends Component {

  state = {
    isFull: false,
    date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
    title:'',
    weatherInfo: null
  }


  componentDidMount() {
    //给screenfull绑定监听
    screenfull.on('change', () => {
      let isFull = !this.state.isFull
      this.setState({ isFull })
    });
    //更新时间
    this.timeID = setInterval(() => {
      this.setState({ date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss') })
    }, 1000)
    //展示当前菜单名称
    this.getTitle() 
  }

  componentWillUnmount() {
    //清除更新时间定时器
    clearInterval(this.timeID)
  }

  //切换全屏按钮的回调
  fullScreen = () => {
    screenfull.toggle()
  }

  //点击退出登录的回调
  logOut = () => {
    let { deleteUser } = this.props
    confirm({
      title: '确定退出？',
      content: '若退出需要重新登录',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        deleteUser()
      },
    });
  }

  getTitle = ()=>{
    let pathKey = this.props.location.pathname.split('/').reverse()[0]
    let title = ''
    menuList.forEach((item)=>{
      if(item.children instanceof Array){
       let tmp =  item.children.find((citem)=>{
          return citem.key === pathKey
        })
       if(tmp) title = tmp.title
      }else{
        if( pathKey === item.key) title = item.title
      }
    })
    this.setState({title})
  }

  render() {
    const {isFull} = this.state
    const { user } = this.props.userInfo
    console.log(user);
    return (
      <header className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
            {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </Button>
          <span className="username">欢迎，{user.username}</span>
          <Button type="link" onClick={this.logOut} >退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
          {this.props.title || this.state.title}
          </div>
          <div className="header-bottom-right">
            {this.state.date}
          </div>
        </div>
      </header>
    )
  }
}
export default Header
