import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createSaveTitleAction } from '../../../redux/action_creators/menu_action';
import logo from '../../../assets/images/logo.png';
import { menuList } from '../../../config/menu_config';
import './left_nav.less';
const { SubMenu, Item } = Menu;

@connect((state) => ({}), {
  saveTitle: createSaveTitleAction,
})
@withRouter
class LeftNav extends Component {
  componentDidMount() {
    console.log(this.props.location.pathname.split('/').splice(2));
  }

  //用于创建菜单的函数
  createMenu = (target) => {
    return target.map((item) => {
      if (!item.children) {
        return (
          <Item
            icon={item.icon}
            key={item.key}
            onClick={() => {
              this.props.saveTitle(item.title);
            }}
          >
            <Link to={item.path}>
              <span>{item.title}</span>
            </Link>
          </Item>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={
              <span>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.createMenu(item.children)}
          </SubMenu>
        );
      }
    });
  };

  render() {
    let { pathname } = this.props.location;
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt="" />
        </header>
        <Menu
          defaultSelectedKeys={pathname.split('/').reverse()[0]}
          defaultOpenKeys={pathname.split('/').splice(2)}
          mode="inline"
          theme="light"
        >
          {this.createMenu(menuList)}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
