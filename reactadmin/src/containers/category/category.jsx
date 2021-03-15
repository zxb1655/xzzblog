import React,{Component} from 'react'
import {Card, Button,Table, Space, Modal, Form, Input, message} from 'antd'
import {reqCategoryList,reqAddCategory,reqUpdateCategory,reqDeleteCategory} from '../../api/index'
import {ExclamationCircleOutlined} from '@ant-design/icons'
const { confirm } = Modal;
export default class MyComponent extends Component{
  formRef = React.createRef()

  state = {
    categoryList: [],
    operType: 'add',
    visible:false,
    modalCurrentValue: '',
    modalCurrentId: '',
    isLoading: true
  }
  componentDidMount(){
    this.getCategoryList()
  }
  getCategoryList = async()=> {
    const result = await reqCategoryList()
    this.setState({isLoading: false})
    if(result) this.setState({categoryList: result.reverse()})
  }
  showAdd =()=>{
    this.setState({
      operType: 'add',
      modalCurrentValue: '',
      modalCurrentId: '',
      visible: true
    })
  }
  showUpdate =(item) => {
    const {_id, name} = item
    this.setState({
      modalCurrentId: _id,
      modalCurrentValue: name,
      visible: true,
      operType: 'update'
    })
  }
  deleteCategory =(item) => {
    const {_id,name} = item
    confirm({
      title: `是否要删除分类"${name}"`,
      icon: <ExclamationCircleOutlined />,
      cancelText: "取消",
      okText: "确认",
      onOk: async()=> {
        const result = await reqDeleteCategory(_id)
        if(result) {
          message.success('删除分类名称成功',1)
          this.getCategoryList()
        }
      }
    });
  }
  toUpdate =async (_id,{name}) => {
    const result = await reqUpdateCategory(_id,{name})
    if(result) {
      message.success('更新分类名称成功',1)
      this.getCategoryList()
      this.setState({visible: false});
    }
  }
  toAdd = async(name)=> {
    let result = await reqAddCategory({name})
    if(result) {
      message.success('新增分类成功')
      let categoryList = [...this.state.categoryList]
      categoryList.unshift(result)
      this.setState({categoryList,visible: false})
    }
  }
  handleOk =()=> {
    const {operType} = this.state
    const {name} = this.formRef.current.getFieldsValue('name')
    if(operType === 'add') this.toAdd(name)
    if(operType === 'update') {
      const _id = this.state.modalCurrentId
      this.toUpdate(_id,{name})
    }
  }
  handleCancel =()=> {
    this.setState({
      visible: false,
      modalCurrentValue: '',
    })
    this.formRef.current.resetFields();
  }

  render(){
    let {operType,visible,isLoading,modalCurrentValue} = this.state
    const dataSource = this.state.categoryList
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: '_id',
      },
      {
        title: '操作',
        key: 'item_id',
        width: '25%',
        render:(item)=>(
          <Space size="middle">
            <Button type="link" onClick={()=>{this.showUpdate(item)}}>修改分类</Button>
            <Button type="link" onClick={()=>{this.deleteCategory(item)}}>删除分类</Button>
          </Space>
        ),
        align: 'center'
      }
    ];
    return (
        <div>
          <Card type="inner" title="分类"
           extra={<Button type="primary" onClick={this.showAdd}>添加</Button>}>
          <Table 
          dataSource={dataSource} columns={columns}
          bordered loading={isLoading}/>
        </Card>
        {visible && 
        <Modal
        title={operType === 'add' ? '新增分类' : '修改分类'}
        visible={visible}
        okText='确定'
        cancelText='取消'
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form
        ref={this.formRef}
      >
        <Form.Item
          name="name"
          label="分类名"
          rules={[{ required: true, message: '分类名不为空！' }]}
          initialValue={modalCurrentValue}
        >
          <Input placeholder="请输入分类名"/>
        </Form.Item>
      </Form>
      </Modal>
      }
        </div>
    )
  }
}