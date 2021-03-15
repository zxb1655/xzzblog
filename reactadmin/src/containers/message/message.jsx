import React,{Component} from 'react'
import {Card, Button,Table, Space, Modal, Avatar, message} from 'antd'
import {reqMessage,reqDeleteMessage} from '../../api/index'
import {ExclamationCircleOutlined} from '@ant-design/icons'
const { confirm } = Modal;
export default class Message extends Component{

  state = {
    MessageList: [],
    isLoading: true
  }
  componentDidMount(){
    this.getMessage()
  }
  getMessage = async()=> {
    const result = await reqMessage()
    this.setState({isLoading: false})
    if(result) this.setState({MessageList: result})
  }
  deleteCategory =(item) => {
    const {_id} = item
    confirm({
      title: `是否要删除该留言`,
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确认",
      onOk: async()=> {
        const result = await reqDeleteMessage(_id)
        if(result) {
          message.success('删除分类名称成功',1)
          this.getMessage()
        }
      }
    });
  }
  //格式化时间
  FmtTime = (time)=> {
    return time.split('T')[0]
  }
  render(){
    let {isLoading} = this.state
    const dataSource = this.state.MessageList
    const columns = [
        {
          title: '头像',
          dataIndex: 'avatarImg',
          render: (avatarImg) => <Avatar shape="square" size="large" src={avatarImg} />,
        },
        {
          title: '昵称',
          dataIndex: 'nickName',
        },
        {
          title: '回复谁',
          dataIndex: 'byAiteName',
        },
        {
          title: '留言内容',
          dataIndex: 'content',
        },
        {
          title: '留言时间',
          dataIndex: 'createdAt',
          render: time => this.FmtTime(time)
        },
      {
        title: '操作',
        key: 'item_id',
        width: '25%',
        render:(item)=>(
          <Space key={item._id} size="middle">
            <Button type="link" onClick={()=>{this.deleteCategory(item)}}>删除留言</Button>
          </Space>
        ),
        align: 'center'
      }
    ];
    return (
        <div>
          <Card type="inner" title="分类">
          <Table 
          dataSource={dataSource} columns={columns}
          bordered loading={isLoading}/>
        </Card>
       
        </div>
    )
  }
}