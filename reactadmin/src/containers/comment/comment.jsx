import React,{Component} from 'react'
import {Card, Button,Table, Space, Modal, Avatar, message} from 'antd'
import {reqComment,reqDeleteComment} from '../../api/index'
import {ExclamationCircleOutlined} from '@ant-design/icons'
const { confirm } = Modal;
export default class comment extends Component{

  state = {
    CommentList: [],
    isLoading: true
  }
  componentDidMount(){
    this.getComment()
  }
  getComment = async()=> {
    const result = await reqComment()
    this.setState({isLoading: false})
    if(result) this.setState({CommentList: result})
  }
  deleteComment =(item) => {
    const {_id} = item
    confirm({
      title: `是否要删除该评论`,
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确认",
      onOk: async()=> {
        const result = await reqDeleteComment(_id)
        if(result) {
          message.success('删除分类名称成功',1)
          this.getComment()
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
    const dataSource = this.state.CommentList
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
          title: '评论内容',
          dataIndex: 'content',
        },
        {
          title: '评论时间',
          dataIndex: 'createdAt',
          render: time => this.FmtTime(time)
        },
        {
          title: '评论的文章',
          render: (item) => (
            <span>{item.relateBlogId.title}</span>
          )
        },
      {
        title: '操作',
        key: 'item_id',
        width: '25%',
        render:(item)=>(
          <Space key={item._id} size="middle">
            <Button type="link" onClick={()=>{this.deleteComment(item)}}>删除评论</Button>
          </Space>
        ),
        align: 'center'
      }
    ];
    return (
        <div>
          <Card type="inner" title="评论">
          <Table 
          dataSource={dataSource} columns={columns}
          bordered loading={isLoading}/>
        </Card>
       
        </div>
    )
  }
}