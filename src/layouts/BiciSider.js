/**
 * @File: sider bar supports authorized menus
 */
import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import BiciIconFont from '@/components/BiciIconFont';
import { menus, routes } from '@/configs/routes';
import styles from './index.module.css';

const { Sider } = Layout;

const { SubMenu } = Menu;

function getDefaultOpenAndSelectedKeys(pathname) {
  const path = pathname.split('/').slice(0, 3).join('/');
  const { code: defaultOpenKey } = menus.filter((menu) => path.includes(menu.path))[0] || {};
  const { code: defaultSelectedKey } = routes.filter((route) => route.path === path)[0] || {};
  return { defaultOpenKey, defaultSelectedKey };
}

function getAuthorizedMenuTree(menuList) {
  const authorizedCodes = menuList.map((menu) => menu.code);
  const authorizedMenus = menus.filter((menu) => authorizedCodes.includes(menu.code));
  return authorizedMenus.map((menu) => {
    const children = routes.filter((route) => {
      const { code, path } = route;
      const authorized = authorizedCodes.includes(code);
      const renderable = path.includes(menu.path) && path.split('/').length === 3;
      return renderable && authorized;
    });
    return { ...menu, children };
  });
}

function BiciSider(props) {
  const { account, collapsed, location } = props;
  const { pathname } = location;
  const { defaultOpenKey, defaultSelectedKey } = getDefaultOpenAndSelectedKeys(pathname);
  const [openKeys, setOpenKeys] = useState([defaultOpenKey]);
  const [selectedKeys, setSelectedKeys] = useState([defaultSelectedKey]);
  const { menuList } = account.info;
  const menuTree = getAuthorizedMenuTree(menuList);

  useEffect(() => {
    const newOpenKeys = collapsed ? [] : [defaultOpenKey];
    setOpenKeys(newOpenKeys);
    setSelectedKeys([defaultSelectedKey]);
  }, [pathname, collapsed]);

  const renderLogo = <div className={styles.logo}>Logo</div>;

  const renderMenus = (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
    >
      {menuTree.map((menu) => {
        const { code, icon, name, children } = menu;
        const title = (
          <>
            <BiciIconFont type={icon} className={styles.menuIcon} />
            <span>{name}</span>
          </>
        );
        return (
          <SubMenu key={code} title={title}>
            {children.map((item) => {
              const { path } = routes.filter((route) => route.code === item.code)[0] || {};
              return (
                <Menu.Item
                  key={item.code}
                  onClick={() => {
                    setOpenKeys(collapsed ? [] : [code]);
                    setSelectedKeys([item.code]);
                  }}
                >
                  <Link to={path}>{item.name}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );

  return (
    <Sider collapsible trigger={null} collapsed={collapsed} className={styles.sider}>
      {renderLogo}
      {renderMenus}
    </Sider>
  );
}

const mapStateToProps = (state) => _.pick(state, 'account');

export default withRouter(connect(mapStateToProps)(BiciSider));
