/**
 * @File: common header for data application layout
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import * as types from '@/store/actionTypes';
import BiciBreadcrumb from '@/layouts/BiciBreadcrumb';
import styles from './index.module.css';

const { Header } = Layout;

function BiciHeader(props) {
  const { collapsed, setCollapsed, dispatch, history } = props;
  const toggle = () => setCollapsed(!collapsed);
  const collapsedIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  const siderCollapsedIcon = React.createElement(collapsedIcon, { className: styles.trigger, onClick: toggle });

  const onMenuClick = ({ key }) => {
    if (key === 'account') history.push('/system/account');
    if (key === 'logout') dispatch({ type: types.RESET });
  };

  return (
    <Header className={styles.header}>
      {siderCollapsedIcon}
      <BiciBreadcrumb />
      <span className={styles.headerRight}>
        <BellOutlined className={styles.notificationIcon} />
        <Dropdown
          placement="bottomCenter"
          trigger={['click']}
          overlay={
            <Menu onClick={onMenuClick}>
              <Menu.Item key="account">个人信息</Menu.Item>
              <Menu.Item key="logout">退出登录</Menu.Item>
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

export default withRouter(connect()(BiciHeader));
