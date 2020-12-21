/**
 * @File: Bici Sider
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import _ from 'lodash';
import BiciIconFont from '@/components/BiciIconFont';
import { menus, routes } from '@/configs/routes';
import styles from './index.module.css';

const { Sider } = Layout;

const { SubMenu } = Menu;

function BiciSider(props) {
  const { account, collapsed, openKeys, selectedKeys, setOpenKeys, setSelectedKeys } = props;
  const { menuList } = account.info;
  const authorizedCodes = menuList.map((menu) => menu.code);
  const authorizedMenus = menus.filter((menu) => authorizedCodes.includes(menu.code));
  const menuTree = authorizedMenus.map((menu) => {
    const children = routes.filter((route) => route.path.includes(menu.path) && authorizedCodes.includes(route.code));
    return { ...menu, children };
  });

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
              return path ? (
                <Menu.Item
                  key={item.code}
                  onClick={() => {
                    // if don't need subMenu auto close, comment out the following code
                    setOpenKeys([code]);
                    setSelectedKeys([item.code]);
                  }}
                >
                  <Link to={path}>{item.name}</Link>
                </Menu.Item>
              ) : null;
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );

  return (
    <Sider trigger={null} collapsed={collapsed} className={styles.sider}>
      {renderLogo}
      {renderMenus}
    </Sider>
  );
}

const mapStateToProps = (state) => _.pick(state, 'account');

export default connect(mapStateToProps)(BiciSider);
