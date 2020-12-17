/**
 * @File: Bici Content
 */
import React from 'react';
import { Layout } from 'antd';
import BiciWrapper from '@/components/BiciWrapper';
import styles from './index.module.css';

const { Content } = Layout;

function BiciContent() {
  return (
    <Content className={styles.content}>
      <BiciWrapper />
    </Content>
  );
}

export default BiciContent;
