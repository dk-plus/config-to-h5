import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "dva/router";

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class MyMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMenu(menu) {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={
            <>
              <Icon type={item.icon} /> <span>{item.title}</span>
            </>
          }>
            {
              item.children && this.renderMenu(item.children)
            }
          </SubMenu>
        );
      } else {
        return <MenuItem key={item.key}>
          <Link to={item.url}><Icon type={item.icon} /><span>{item.title}</span></Link>
        </MenuItem>
      }
    });
  }

  getSelectKey(path) {
    return path.split('/')[1]
  }

  render() {
    const { menu, location } = this.props;

    return <>
      <Menu
        mode="inline"
        defaultSelectedKeys={[this.getSelectKey(location.pathname)]}
        style={{ height: '100%', borderRight: 0 }}
        theme="dark"
      >
      {
        this.renderMenu(menu)
      }
      </Menu>
    </>
  }
}

export default MyMenu;