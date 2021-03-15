import React, { Component } from 'react';
import {
  Modal,
  Table,
  Tag,
  Space,
  Button,
  Card,
  Input,
  Menu,
  Dropdown,
  message,
} from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  reqArticleList,
  reqArticleSearch,
  reqDeleteArticle,
  reqCategoryList,
} from '../../api/index';
const { confirm } = Modal;
export default class ArticleList extends Component {
  inputRef = React.createRef();
  state = {
    articleList: [],
    pageNum: 1, //当前页数
    totalArticles: 0, //总文章数
    totalPage: 0, //总页数
    CategoryList: [],
    currentTag: '全部', //标签名
    searchContent: '', //搜索的内容
    type: 0, //0表示分类或者全部, 1表示搜索
  };
  componentDidMount() {
    this.getArticleList();
    this.getCategoryList();
  }
  //请求标签列表
  getCategoryList = async () => {
    const CategoryList = await reqCategoryList();
    if (CategoryList) {
      this.setState({
        CategoryList,
        currentTag: '全部',
      });
    }
  };
  //请求文章列表
  getArticleList = async () => {
    const { pageNum, currentTag } = this.state;
    const result = await reqArticleList(pageNum, currentTag);
    this.setState({
      type: 0,
      articleList: result.articles,
      totalArticles: result.count,
    });
  };
  //格式化时间
  FmtTime = (time) => {
    return time.split('T')[0];
  };
  updateArticle = async (item) => {
    this.props.history.push({
      pathname: '/admin/article/add_article',
      state: {
        item,
      },
    });
  };
  //删除文章
  deleteArticle = (item) => {
    const { _id, title } = item;
    confirm({
      title: `是否要删除文章"${title}"`,
      icon: <ExclamationCircleOutlined />,
      cancelText: '取消',
      okText: '确认',
      onOk: async () => {
        const result = await reqDeleteArticle(_id);
        if (result) {
          message.success('删除文章成功', 1);
          this.getArticleList();
        }
      },
    });
  };
  //选择某个分类
  selectTag = async (name) => {
    this.setState(
      {
        pageNum: 1,
        currentTag: name,
      },
      () => {
        this.getArticleList();
      }
    );
  };
  selectAll = async () => {
    this.setState(
      {
        pageNum: 1,
        currentTag: '全部',
      },
      () => {
        this.getArticleList();
      }
    );
  };
  //搜索文章
  search = () => {
    const content = this.refs.inputRef.state.value;
    this.setState(
      {
        type: 1,
        pageNum: 1,
        searchContent: content,
      },
      async () => {
        this.goSearch();
      }
    );
  };
  goSearch = async () => {
    const { pageNum, searchContent } = this.state;
    const result = await reqArticleSearch(pageNum, searchContent);
    this.setState({
      articleList: result.articles,
      totalArticles: result.count,
    });
  };
  //改变页码
  changePage = (value) => {
    this.setState(
      {
        pageNum: value,
      },
      () => {
        if (this.state.type === 0) {
          this.getArticleList();
        } else {
          this.goSearch();
        }
      }
    );
  };
  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: (text) => <Button type="text">{text}</Button>,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (time) => this.FmtTime(time),
      },
      {
        title: '标签',
        key: 'index',
        dataIndex: 'categories',
        render: (tags) => (
          <>
            {tags.map((tag) => {
              let color = tag.name.length > 2 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag._id}>
                  {tag.name}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: '_id',
        render: (item) => (
          <Space key="item._id" size="middle">
            <Button onClick={() => this.updateArticle(item)}>编辑</Button>
            <Button onClick={() => this.deleteArticle(item)}>删除</Button>
          </Space>
        ),
      },
    ];
    const menu = (
      <Menu>
        <Menu.Item key="100">
          <Button type="text" onClick={() => this.selectAll()}>
            全部
          </Button>
        </Menu.Item>
        {this.state.CategoryList.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <Button
                key={index}
                type="text"
                onClick={() => this.selectTag(item.name)}
              >
                {item.name}
              </Button>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    const { articleList, currentTag, totalArticles, pageNum } = this.state;
    return (
      <div>
        <Card
          type="inner"
          title="分类"
          extra={
            <Space>
              <Dropdown overlay={menu} trigger={['click']}>
                <Button
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  {currentTag} <DownOutlined />
                </Button>
              </Dropdown>
              ,<Input ref="inputRef"></Input>
              <Button onClick={this.search}>搜索</Button>
            </Space>
          }
        >
          <Table
            pagination={{
              total: totalArticles,
              defaultPageSize: 6,
              onChange: this.changePage,
              defaultCurrent: pageNum,
              current: pageNum,
            }}
            columns={columns}
            dataSource={articleList}
          />
        </Card>
      </div>
    );
  }
}
