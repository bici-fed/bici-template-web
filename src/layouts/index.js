/**
 * @File: a common basic data application layout
 */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Layout, Spin, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, BellOutlined } from '@ant-design/icons';
import BiciWrapper from '@/components/BiciWrapper';
import _ from 'lodash';
import BiciSider from './BiciSider';
import styles from './index.module.css';

const { Header, Content } = Layout;

function BiciBasicDataApplicationLayout(props) {
  const { loading } = props;
  const { isLoading } = loading;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState('');
  const toggle = () => setCollapsed(!collapsed);
  const collapsedIcon = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;
  const siderCollapsedIcon = React.createElement(collapsedIcon, { className: styles.trigger, onClick: toggle });
  const spining = isLoading && <Spin tip="页面加载中..." spinning className={styles.spin} />;

  const userInfoMenu = (
    <Menu>
      <Menu.Item key="userinfo">个人信息</Menu.Item>
      <Menu.Item key="loginout">退出登录</Menu.Item>
    </Menu>
  );

  const header = (
    <Header className={styles.header}>
      {siderCollapsedIcon}
      <span className={styles.headerRight}>
        <BellOutlined className={styles.notificationIcon} />
        <Dropdown placement="bottomCenter" trigger={['click']} overlay={userInfoMenu}>
          <span className={styles.userInfo}>
            <UserOutlined className={styles.userIcon} />
            <span className={styles.userName}>管理员</span>
          </span>
        </Dropdown>
      </span>
    </Header>
  );
  const content = (
    <Content className={styles.content}>
      <BiciWrapper />
    </Content>
  );

  return (
    <Layout className={styles.wrapper}>
      <BiciSider
        collapsed={collapsed}
        menus={[]}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        setOpenKeys={setOpenKeys}
        setSelectedKeys={setSelectedKeys}
      />
      {spining}
      <Layout>
        {header}
        {content}
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => _.pick(state, ['account', 'loading']);

export default connect(mapStateToProps)(BiciBasicDataApplicationLayout);
