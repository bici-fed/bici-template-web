/**
 * @File: entry page for login
 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { updateToken } from '@/store/actions/account';
import styles from './index.module.css';

function Login(props) {
  const { dispatch, history } = props;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = () => {
    dispatch(updateToken('1GXdrzqLaNumPYUeUBc2fu'));
    history.push('/');
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.login}>
        <Form {...layout} name="login" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Input your name" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Input password" />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default withRouter(connect()(Login));
