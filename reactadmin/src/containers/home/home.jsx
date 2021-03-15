import React, { Component } from 'react';
import { DualAxes } from '@ant-design/charts';
import { reqCount } from '../../api/index';
import './home.less';
export default class MyComponent extends Component {
  state = {
    list: [],
    articleSum: 0,
    userSum: 0,
    messageSum: 0,
  };

  componentDidMount() {
    this.getCount();
  }
  FmtTime = (time) => {
    const newTime = new Date(time);
    const y = newTime.getFullYear();
    const x = newTime.getMonth() + 1;
    return `${y}年${x}月`;
  };
  getCount = async () => {
    const result = await reqCount();
    const { list, articleSum, userSum, messageSum } = result;
    for (let i = 0; i < list.length; i++) {
      list[i].time = this.FmtTime(list[i].time);
    }
    this.setState({
      list,
      articleSum,
      userSum,
      messageSum,
    });
  };
  render() {
    const { list, articleSum, userSum, messageSum } = this.state;
    const config = {
      data: [list, list],
      autoFit: true,
      xField: 'time',
      yField: ['阅读量', '文章总数'],
      columnWidthRatio: 0.8,
      marginRatio: 0.1,
      geometryOptions: [
        { geometry: 'column' },
        {
          geometry: 'line',
          lineStyle: { lineWidth: 2 },
        },
      ],
    };
    return (
      <div>
        <div className="tip">
          欢迎来到小猪猪博客后台！您的意见是我请进的动力！
        </div>
        <div className="countHead">
          <div className="articleSum">
            <span>{userSum}</span>
            <p>总用户数</p>
          </div>
          <div className="userSum">
            <span>{articleSum}</span>
            <p>总文章数</p>
          </div>
          <div className="messageSum">
            <span>{messageSum}</span>
            <p>总留言数</p>
          </div>
        </div>
        <div className="chart">
          <DualAxes {...config} />;
        </div>
      </div>
    );
  }
}
