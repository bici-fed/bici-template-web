/**
 * @File: Bici Header
 */
import React from 'react';
import { connect } from 'react-redux';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import * as types from '@/store/actionTypes';
import styles from './index.module.css';

const { Header } = Layout;

function BiciHeader(props) {
  const { collapsed, setCollapsed, dispatch } = props;
  const toggle = () => setCollapsed(!collapsed);
  const collapsedIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  const siderCollapsedIcon = React.createElement(collapsedIcon, { className: styles.trigger, onClick: toggle });

  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch({ type: types.RESET });
    }
  };

  return (
    <Header className={styles.header}>
      {siderCollapsedIcon}
      <span className={styles.headerRight}>
        <BellOutlined className={styles.notificationIcon} />
        <Dropdown
          placement="bottomCenter"
          trigger={['click']}
          overlay={
            <Menu onClick={onMenuClick}>
              <Menu.Item key="userinfo">Userinfo</Menu.Item>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu>
          }
        >
          <span className={styles.userInfo}>
            <UserOutlined className={styles.userIcon} />
            <span className={styles.userName}>Admin</span>
          </span>
        </Dropdown>
      </span>
    </Header>
  );
}

export default connect()(BiciHeader);
