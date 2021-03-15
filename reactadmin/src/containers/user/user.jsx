import React, { Component } from 'react';
import {
  Table,
  Space,
  Avatar,
  Card,
  Button,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import { reqUserList, reqSendEmail, reqDeleteUser } from '../../api/index';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default class User extends Component {
  formRef = React.createRef();
  state = {
    userList: [],
    visible: false,
    emailArr: [],
  };
  componentDidMount() {
    this.UserList();
  }
  //获取用户列表
  UserList = async () => {
    const userList = await reqUserList();
    if (userList) {
      this.setState({
        userList,
      });
    }
  };
  //获取选择的行
  handleChange = (selectedRows, value) => {
    const emailArr = value.map((v) => {
      return { email: v.email, subject: v.nickName };
    });
    this.setState({
      emailArr,
    });
  };
  //提交表单批量发送邮件
  handleOk = async () => {
    const { name } = this.formRef.current.getFieldsValue('name');
    const { emailArr } = this.state;
    const promiseArr = [];
    emailArr.forEach((e) => {
      let replayObj = {
        recipient: e.email,
        subject: e.subject,
        html: name,
      };
      promiseArr.push(reqSendEmail(replayObj));
    });
    const res = await Promise.all(promiseArr);
    console.log(res);
    this.setState({
      visible: false,
    });
  };

  //取消弹框
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  //点击发送邮件弹框
  showSend = () => {
    if (this.state.emailArr.length === 0) {
      message.warning('请选择一个用户');
      return;
    }
    this.setState({
      visible: true,
    });
  };
  deleteCategory = (item) => {
    const { _id } = item;
    confirm({
      title: `是否要删除该用户`,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        const result = await reqDeleteUser(_id);
        if (result) {
          message.success('删除用户成功', 1);
          this.UserList();
        }
      },
    });
  };
  render() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'avatarImg',
        render: (avatarImg) => (
          <Avatar shape="square" size="large" src={avatarImg} />
        ),
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '博客/github网址',
        dataIndex: 'url',
      },
      {
        title: '操作',
        key: 'item_id',
        width: '25%',
        render: (item) => (
          <Space key={item._id} size="middle">
            <Button
              type="link"
              onClick={() => {
                this.deleteCategory(item);
              }}
            >
              删除用户
            </Button>
          </Space>
        ),
        align: 'center',
      },
    ];
    const { userList, visible } = this.state;
    return (
      <div>
        <Card
          type="inner"
          title="用户"
          extra={
            <Button type="primary" onClick={this.showSend}>
              发送邮箱
            </Button>
          }
        >
          <Table
            rowSelection={{
              onChange: this.handleChange,
            }}
            columns={columns}
            dataSource={userList}
            rowKey="_id"
            pagination={{ pageSize: 6, showQuickJumper: true }}
          />
        </Card>
        {visible && (
          <Modal
            title="发送邮件"
            visible={visible}
            okText="确定"
            cancelText="取消"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form ref={this.formRef}>
              <Form.Item
                name="name"
                label="内容"
                rules={[{ required: true, message: '内容不能为空' }]}
              >
                <Input placeholder="请输入内容" />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}
