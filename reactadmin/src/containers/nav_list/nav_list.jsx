import React, { Component } from 'react';
import {
  reqDeleteNavItem,
  reqNavList,
  reqNav,
  reqAddNav,
  reqUpdateNav,
  reqDeleteNav,
} from '../../api/index';
import {
  Card,
  Button,
  Collapse,
  Table,
  Avatar,
  message,
  Space,
  Modal,
  Input,
} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
const { confirm } = Modal;
export default class NavList extends Component {
  inputRef = React.createRef();
  state = {
    navList: [], //导航栏列表
    navs: [], //导航栏标题
    isShow: false, //是否显示弹框
    isNavList: false, //是否显示选择项
    currentInput: '', //当前弹框输入框的值
    currentSelect: '', //当前选择的值
    currentId: '', //当前选择的_id
    openType: '', //请求接口类型
  };
  componentDidMount() {
    this.getNavList();
    this.getNav();
  }
  getNavList = async () => {
    const navList = await reqNavList();
    this.setState({
      navList,
    });
  };
  getNav = async () => {
    const navs = await reqNav();
    this.setState({
      navs,
    });
  };
  //编辑导航标题
  updateNav = (item) => {
    this.setState({
      currentInput: item.name,
      currentId: item._id,
      isShow: true,
      openType: 'updateNav',
    });
  };
  //删除导航标题
  deleteNav = (item) => {
    const { _id, name } = item;
    confirm({
      title: `是否要删除导航"${name}"`,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        const result = await reqDeleteNav(_id);
        if (result) {
          message.success('删除导航成功', 1);
          this.getNavList();
        }
      },
    });
  };
  updateNavItem = (item) => {
    this.props.history.push({
      pathname: '/admin/nav/write_nav',
      state: {
        item,
      },
    });
  };
  //点击新建导航标题
  goAdd = () => {
    this.setState({
      isShow: true,
      openType: 'addNav',
    });
  };
  //点击新建导航子项
  goAddList = () => {
    this.props.history.push({
      pathname: '/admin/nav/write_nav',
    });
  };
  //删除导航列表
  deleteNavItem = (item) => {
    const { _id, title } = item;
    confirm({
      title: `是否要删除导航"${title}"`,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        const result = await reqDeleteNavItem(_id);
        if (result) {
          message.success('删除导航成功', 1);
          this.getNavList();
        }
      },
    });
  };
  //取消弹框
  handleCancel = () => {
    this.setState({
      isShow: false,
      currentInput: '',
    });
  };
  //确认弹框
  handleOk = () => {
    const name = this.refs.inputRef.state.value;
    const { openType, currentId } = this.state;
    switch (openType) {
      case 'addNav':
        this.sendAddNav(name);
        break;
      case 'updateNav':
        this.sendUpdateNav(currentId, name);
        break;
      default:
        break;
    }
  };
  //发送新增Nav请求
  sendAddNav = async (name) => {
    const value = await reqAddNav({ name });
    if (value) {
      message.success('更新导航成功', 1);
      this.getNavList();
      this.setState({ isShow: false });
    }
  };
  //发送编辑Nav请求
  sendUpdateNav = async (_id, name) => {
    const value = await reqUpdateNav(_id, { name });
    if (value) {
      message.success('更新导航成功', 1);
      this.getNavList();
      this.setState({ isShow: false });
    }
  };
  render() {
    const columns = [
      {
        title: '图标',
        dataIndex: 'icon',
        render: (icon) => <Avatar shape="square" size="large" src={icon} />,
      },
      {
        title: '描述',
        dataIndex: 'body',
        key: 'body',
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        render: (urls) => (
          <Button type="text" href={urls} target="_blank">
            {urls}
          </Button>
        ),
      },
      {
        title: '操作',
        key: '_id',
        render: (item) => (
          <Space key={item._id} size="middle">
            <Button type="primary" onClick={() => this.updateNavItem(item)}>
              编辑
            </Button>
            <Button type="primary" onClick={() => this.deleteNavItem(item)}>
              删除
            </Button>
          </Space>
        ),
      },
    ];
    const { navList, isShow, currentInput } = this.state;
    console.log(navList);
    return (
      <div>
        <Card
          type="inner"
          title="导航"
          extra={
            <Space>
              <Button type="primary" onClick={this.goAdd}>
                新建导航标题
              </Button>
              <Button type="primary" onClick={this.goAddList}>
                新建导航子项
              </Button>
            </Space>
          }
        >
          <Collapse accordion>
            {navList.map((item, index) => {
              return (
                <Panel
                  header={item.name}
                  key={index}
                  extra={
                    <Space>
                      <Button
                        type="primary"
                        onClick={() => this.updateNav(item)}
                      >
                        编辑
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => this.deleteNav(item)}
                      >
                        删除
                      </Button>
                    </Space>
                  }
                >
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={item.navsList}
                  />
                </Panel>
              );
            })}
          </Collapse>
        </Card>
        {isShow && (
          <Modal
            title="默认"
            cancelText="取消"
            okText="确定"
            visible={isShow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Input
              defaultValue={currentInput}
              allowClear="true"
              ref="inputRef"
            ></Input>
          </Modal>
        )}
      </div>
    );
  }
}
