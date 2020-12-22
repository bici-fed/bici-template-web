import React from 'react';
import dayjs from 'dayjs';
import { DatePicker, Button } from 'antd';

function UserInfo() {
  return (
    <div>
      <DatePicker defaultValue={dayjs()} />
      <Button type="primary">Button</Button>
    </div>
  );
}

export default UserInfo;
