// route configs

import UserInfo from '@/pages/System/UserInfo';
import Dictionary from '@/pages/System/Dictionary';
import Device from '@/pages/BasicData/Device';
import DeviceCreate from '@/pages/BasicData/Device/DeviceCreate';
import DeviceDetail from '@/pages/BasicData/Device/DeviceDetail';
import DataPoint from '@/pages/BasicData/DataPoint';

// configs for sider primary menu,
// "icon" is required and would be apply to `BiciIconFont`(for more customized, we suggested use iconfont replace),
// for authority verifying, each menu config should provide a "code" value.
export const menus = [
  { path: '/system', name: '系统管理', code: 'XTGL', icon: 'iconxitongguanli1' },
  { path: '/basicdata', name: '基础数据', code: 'JCSJ', icon: 'iconjichushuju1' },
];

// the following items would be rendered as the real react-router "Route",
// each route should provide an agreed "code" value from back-end for authority verifying.
export const routes = [
  { path: '/system/account', name: '个人信息', code: 'XTGL_GRXX', exact: false, component: UserInfo },
  { path: '/system/dictionary', name: '数据字典', code: 'XTGL_SJZD', exact: false, component: Dictionary },
  { path: '/basicdata/device', name: '设备', code: 'JCSJ_SB', exact: true, component: Device },
  { path: '/basicdata/device/create', name: '新建', code: 'JCSJ_SBXJ', exact: false, component: DeviceCreate },
  { path: '/basicdata/device/detail/:id', name: '详情', code: 'JCSJ_SBXQ', exact: false, component: DeviceDetail },
  { path: '/basicdata/datapoint', name: '数据点', code: 'JCSJ_SJD', exact: false, component: DataPoint },
];

export default { menus, routes };
