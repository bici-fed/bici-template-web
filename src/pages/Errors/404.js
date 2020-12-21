/**
 * @File: the default 404 page if route not match
 */
import React from 'react';
import { Result } from 'antd';

const notFoundText = 'Sorry, the page you visited does not exist.';

function NotFound() {
  return <Result status="404" title="404" subTitle={notFoundText} />;
}

export default NotFound;
