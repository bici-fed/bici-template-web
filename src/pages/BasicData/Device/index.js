import React from 'react';
import { Link } from 'react-router-dom';

function Device() {
  return (
    <div>
      <Link to="/basicdata/device/create">Create</Link>
      <br />
      <Link to="/basicdata/device/detail/1">Detail</Link>
    </div>
  );
}

export default Device;
