import React, { Component } from 'react';
import { Form, Select, Switch, Button, Upload, Input, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  reqCategoryList,
  reqAddArticle,
  reqUpdateArticle,
} from '../../api/index';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import './add_article.less';
const { Option } = Select;

export default class AddArticle extends Component {
  state = {
    allCategory: [],
    loading: false,
    icon: '',
    categories: [],
    editorState: BraftEditor.createEditorState(),
    body: '',
    isOriginal: false,
    title: '',
    type: 'add',
    _id: '',
  };
  UNSAFE_componentWillMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state.item);
      const {
        title,
        body,
        icon,
        categories,
        _id,
        isOriginal,
      } = this.props.location.state.item;
      const selectCategories = categories.map((item) => {
        return item._id;
      });
      this.setState({
        title,
        body,
        icon,
        categories: selectCategories,
        type: 'update',
        _id,
        isOriginal,
        editorState: BraftEditor.createEditorState(body),
      });
    }
  }
  componentDidMount() {
    this.getCategoryList();
  }
  //请求分类列表
  getCategoryList = async () => {
    const allCategory = await reqCategoryList();
    if (allCategory) {
      this.setState({
        allCategory,
      });
    }
  };
  //提交表单
  onFinish = async (values) => {
    const { body, icon, type, _id, isOriginal } = this.state;
    const { selectTag, title } = values;
    const model = {
      body,
      categories: selectTag,
      icon,
      title,
      isOriginal,
    };
    if (type === 'update') {
      const result = await reqUpdateArticle(_id, model);
      if (result) {
        message.success('更新文章成功', 1);
        this.props.history.push('/admin/article/article_list');
      }
    }
    if (type === 'add') {
      const result = await reqAddArticle(model);
      if (result) {
        message.success('新增文章成功', 1);
        this.props.history.push('/admin/article/article_list');
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
  //5.由于图片上传、视频上传项目中都是单独走的接口，需要一个上传的方法
  myUploadFn = (param) => {
    const serverURL = 'http://localhost:3001/admin/api/upload'; //upload 是接口地址
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      //  console.log('response', response.currentTarget);
      //  console.log('xhr.responseText', xhr.responseText);
      const upLoadObject = JSON.parse(
        response && response.currentTarget && response.currentTarget.response
      );
      param.success({
        url: JSON.parse(xhr.responseText).url,
        meta: {
          id: upLoadObject && upLoadObject.fileName,
          title: upLoadObject && upLoadObject.fileName,
          alt: upLoadObject && upLoadObject.fileName,
          loop: false, // 指定音视频是否循环播放
          autoPlay: false, // 指定音视频是否自动播放
          controls: false, // 指定音视频是否显示控制栏
          poster: '', // 指定视频播放器的封面
        },
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      param.progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      param.error({
        msg: 'unable to upload.',
      });
    };

    xhr.upload.addEventListener('progress', progressFn, false);
    xhr.addEventListener('load', successFn, false);
    xhr.addEventListener('error', errorFn, false);
    xhr.addEventListener('abort', errorFn, false);

    fd.append('file', param.file);
    xhr.open('POST', serverURL, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token); //header中token的设置
    xhr.send(fd);
  };
  contentChange = (editorState) => {
    const body = editorState.toHTML();
    this.setState({
      body,
    });
  };
  //开关是否原创
  onChangeSwitch = (value) => {
    this.setState({
      isOriginal: value,
    });
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
    const {
      loading,
      icon,
      categories,
      isOriginal,
      editorState,
      title,
      allCategory,
    } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div className="AddArticle">
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="selectTag"
            label="选择文章标签"
            initialValue={categories}
            rules={[
              { required: true, message: '请选择一个文章标签!', type: 'array' },
            ]}
          >
            <Select
              style={{ textAlign: 'left' }}
              mode="multiple"
              placeholder="选择您的文章标签"
            >
              {allCategory.map((item) => {
                return (
                  <Option value={item._id} key={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="title"
            initialValue={title}
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入文章标题',
              },
            ]}
          >
            <Input placeholder="输入文章标题" />
          </Form.Item>

          <Form.Item name="isOriginal" label="是否原创">
            <Switch
              onChange={this.onChangeSwitch}
              checkedChildren="原创"
              unCheckedChildren="转载"
              defaultChecked={isOriginal}
            />
          </Form.Item>

          <Form.Item name="icon" label="上传图片">
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
          <BraftEditor
            defaultValue={editorState}
            className="my-editor"
            style={{ border: '1px solid #e8e8e8' }}
            placeholder="请输入正文内容"
            media={{ uploadFn: this.myUploadFn }}
            onChange={this.contentChange}
          />
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
