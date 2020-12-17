/**
 * @File: Bici Sider
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import BiciIconFont from '@/components/BiciIconFont';
import { routes, configRoutes } from '@/configs/routes';
import styles from './index.module.css';

const { Sider } = Layout;

const { SubMenu } = Menu;

function BiciSider(props) {
  const { collapsed, menus, openKeys, selectedKeys, setOpenKeys, setSelectedKeys } = props;
  const authorizedMenus = menus.filter((menu) => routes.some((route) => route.code === menu.code));

  const renderLogo = <div className={styles.logo}>Logo</div>;

  const renderMenus = (
    <Menu
      theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={(keys) => setOpenKeys(keys)}
    >
      {authorizedMenus.map((menu) => {
        const { code, name, children } = menu;
        const { icon } = routes.filter((route) => route.code === code)[0] || {};
        const title = (
          <>
            <BiciIconFont type={icon} className={styles.menuIcon} />
            <span>{name}</span>
          </>
        );
        return (
          <SubMenu key={code} title={title}>
            {children.map((item) => {
              const { path } = configRoutes.filter((route) => route.code === item.code)[0] || {};
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
    <Sider trigger={null} collapsible collapsed={collapsed} className={styles.sider}>
      {renderLogo}
      {renderMenus}
    </Sider>
  );
}

export default BiciSider;
