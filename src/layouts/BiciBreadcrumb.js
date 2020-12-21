/**
 * @File: breadcrumb for basic data application layout
 */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { menus, routes } from '@/configs/routes';

function BiciBreadcrumb(props) {
  const { location } = props;
  const { pathname } = location;
  const pathSnippets = pathname.split('/').filter((i) => i);
  const breadcrumbMap = [...menus, ...routes].reduce((acc, cur) => {
    const { path, name } = cur;
    const primaryPath = cur.path.replace(/\/:.*/g, '');
    const canReplace = path.match(/\/:.*/g) && pathname.includes(primaryPath);
    return { ...acc, [canReplace ? pathname : path]: name };
  }, {});
  const breadcrumbItems = pathSnippets.slice(0, 3).map((_, index) => {
    const url = index === 2 ? pathname : `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const breadcrumbName = breadcrumbMap[url];
    return (
      <Breadcrumb.Item key={url}>
        {index >= 1 ? <Link to={url}>{breadcrumbName}</Link> : breadcrumbName}
      </Breadcrumb.Item>
    );
  });
  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}

export default withRouter(BiciBreadcrumb);
