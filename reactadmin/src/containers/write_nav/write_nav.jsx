import React, { Component } from 'react';
import { Form, Select, Button, Upload, Input, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { reqUpdateNavItem, reqAddNavItem } from '../../api/index';
import { reqNav } from '../../api/index';
import './write_nav.less';
const { Option } = Select;

export default class WriteNav extends Component {
  state = {
    NavList: [],
    title: '',
    body: '',
    icon: '',
    url: '',
    navs: [],
    loading: false,
    type: 'add',
    _id: '',
  };
  UNSAFE_componentWillMount() {
    if (this.props.location.state) {
      const {
        title,
        body,
        icon,
        url,
        navs,
        _id,
      } = this.props.location.state.item;
      this.setState({
        title,
        body,
        icon,
        url,
        navs,
        type: 'update',
        _id,
      });
    }
  }
  componentDidMount() {
    this.getNav();
  }
  getNav = async () => {
    const NavList = await reqNav();
    if (NavList) {
      this.setState({
        NavList,
      });
    }
  };
  onFinish = async (values) => {
    const { _id, type } = this.state;
    if (type === 'update') {
      const result = await reqUpdateNavItem(_id, values);
      if (result) {
        message.success('更新导航列表成功', 1);
        this.props.history.push('/admin/nav/nav_list');
      }
    }
    if (type === 'add') {
      const { icon } = this.state;
      values.icon = icon;
      const result = await reqAddNavItem(values);
      if (result) {
        message.success('新增导航列表成功', 1);
        this.props.history.push('/admin/nav/nav_list');
      }
    }
  };
  //图片上传后的处理
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const icon = info.fileList[0].response.url;
      this.setState({
        icon,
        loading: false,
      });
    }
  };
  render() {
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const valid = 'Zxbzxb ' + localStorage.token;
    const { loading, NavList, title, body, icon, url, navs } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Form
        className="navList"
        name="validate_other"
        {...formItemLayout}
        onFinish={this.onFinish}
      >
        <Form.Item
          name="navs"
          label="请选择导航"
          initialValue={navs}
          rules={[
            {
              required: true,
              message: '请选择一个导航',
              type: 'array',
            },
          ]}
        >
          <Select mode="multiple" placeholder="请选择一个导航">
            {NavList.map((item) => {
              return (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="标题"
          initialValue={title}
          rules={[
            {
              required: true,
              message: '请输入导航项标题',
            },
          ]}
        >
          <Input placeholder="输入导航项的标题" />
        </Form.Item>
        <Form.Item
          name="body"
          label="描述"
          initialValue={body}
          rules={[
            {
              required: true,
              message: '请输入导航项的描述',
            },
          ]}
        >
          <Input placeholder="输入导航项的描述" />
        </Form.Item>
        <Form.Item
          name="url"
          label="链接"
          initialValue={url}
          rules={[
            {
              required: true,
              message: '请输入导航项的链接',
            },
          ]}
        >
          <Input placeholder="输入导航项的链接" />
        </Form.Item>

        <Form.Item initialValue={icon} name="icon" label="File">
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            headers={{
              Authorization: valid,
            }}
            showUploadList={false}
            action="http://localhost:3001/admin/api/upload"
            onChange={this.handleChange}
          >
            {icon ? (
              <img src={icon} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
