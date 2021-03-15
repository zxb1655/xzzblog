import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import {reqLogin} from '../../api/index.js'
import {createSaveUserInfoAction} from '../../redux/action_creators/login_action'
/*
登陆路由组件
 */
@connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveUserInfoAction,
  }
)
class Login extends Component {

  onFinish = async (values) => {
    const {username, password} = values
    let result = await reqLogin(username,password)
    if(!result){
      message.warning('登录失败',1)
      return
    }
    const {data, msg, status} = result
    if(status === 200) {
      message.success(msg,1)
      this.props.saveUserInfo(data)
      this.props.history.replace('/admin')
    } else {
      message.warning(msg,1)
    }
  }

  render() {
    const {isLogin} = this.props
    if(isLogin) {
      return <Redirect to="/admin"/>
    }
    return (
      <div className='login'>
        <div className="container">
        <section className='login-content'>
          <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{required: true, whitespace: true, message: '必须输入用户名'},
        {min: 4, message: '用户名必须大于4位'},
        {max: 12, message: '用户名必须小于12位'},
        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, whitespace: true, message: '必须输入密码'},
        {min: 4, message: '密码必须大于4位'},
        {max: 12, message: '密码必须小于12位'},
        {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数组或下划线组成'}]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
        </section>
        </div>
      </div>
    )
  }
}

export default Login