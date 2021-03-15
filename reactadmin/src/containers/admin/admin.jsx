import React,{Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import {connect} from 'react-redux'
import {Layout} from 'antd'
import './css/admin.less'
import Header from './header/header'
import LeftNav from './left_nav/left_nav'
import Home from '../home/home'
import Category from '../category/category'
import AddArticle from '../add_article/add_article'
import ArticleList from '../article_list/article_list'
import User from '../user/user'
import Comment from '../comment/comment'
import Message from '../message/message'
import NavList from '../nav_list/nav_list'
import WriteNav from '../write_nav/write_nav'
const { Sider, Content } = Layout;
@connect(
  state => ({userInfo:state.userInfo}),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
class Admin extends Component{

  //退出登录的回调
  logout = ()=>{
    //触发redux删除所保存的用户信息
    this.props.deleteUserInfo()
  }
  
  render(){
    const {isLogin} = this.props.userInfo
    if(!isLogin) return <Redirect to="/login"/>
    else{
      return (
        <Layout className="admin">
          <Sider className='sider' theme="light">
          <LeftNav/>
          </Sider>
          <Layout>
            <Header className="header">Header</Header>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home}/>
                <Route path="/admin/category" component={Category}/>
                <Route path="/admin/article/add_article" component={AddArticle}/>
                <Route path="/admin/article/article_list" component={ArticleList}/>
                <Route path="/admin/comment" component={Comment}/>
                <Route path="/admin/message" component={Message}/>
                <Route path="/admin/nav/nav_list" component={NavList}/>
                <Route path="/admin/nav/write_nav" component={WriteNav}/>
                <Route path="/admin/user" component={User}/>
                <Redirect to="/admin/home"/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      )
    }
  }
}

//从redux中获取状态和操作状态的方法
export default Admin