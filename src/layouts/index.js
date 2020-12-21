/**
 * @File: basic data application layout, best practice for bici design spec,
 * in most case, it contains header, sider, routes content and a spin for loading state.
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import _ from 'lodash';
import BiciSider from '@/layouts/BiciSider';
import BiciHeader from '@/layouts/BiciHeader';
import BiciContent from '@/layouts/BiciContent';
import styles from './index.module.css';

function BiciBasicDataApplicationLayout(props) {
  const { loading, account, history } = props;
  const { isLoading } = loading;
  const { token } = account;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const spining = isLoading && (
    <div className={styles.spin}>
      <Spin tip="页面加载中..." spinning />
    </div>
  );

  useEffect(() => !token && history.push('/login'), [token]);

  return (
    <Layout className={styles.wrapper}>
      {spining}
      <BiciSider
        collapsed={collapsed}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        setOpenKeys={setOpenKeys}
        setSelectedKeys={setSelectedKeys}
      />
      <Layout>
        <BiciHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <BiciContent />
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => _.pick(state, ['account', 'loading']);

export default withRouter(connect(mapStateToProps)(BiciBasicDataApplicationLayout));
