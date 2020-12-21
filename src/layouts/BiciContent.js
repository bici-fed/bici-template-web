/**
 * @File: Bici Content
 */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import _ from 'lodash';
import { routes } from '@/configs/routes';
import NotFound from '@/pages/Errors/404';
import styles from './index.module.css';

const { Content } = Layout;

function BiciContent(props) {
  const { account } = props;
  const { menuList = [] } = account.info;
  const authorisedCodes = menuList.map((menu) => menu.code);
  const authorisedRoutes = routes.filter((route) => authorisedCodes.includes(route.code));

  return (
    <Content className={styles.content}>
      <Switch>
        {authorisedRoutes.map((route) => (
          <Route key={route.path} {..._.pick(route, ['path', 'exact', 'component'])} />
        ))}
        <Route exact component={NotFound} />
      </Switch>
    </Content>
  );
}

const mapStateToProps = (state) => _.pick(state, 'account');

export default connect(mapStateToProps)(BiciContent);
