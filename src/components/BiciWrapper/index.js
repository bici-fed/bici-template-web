/**
 * @File: a page wrapper based on bicitech design spec
 */
import React from 'react';
import styles from './index.module.css';

function BiciWrapper(props) {
  const { scrollable, children, style } = props;
  const prefixStyle = { overflow: scrollable ? 'auto' : 'hidden', ...style };

  return (
    <div className={styles.wrapper} style={prefixStyle}>
      {children}
    </div>
  );
}

export default BiciWrapper;
