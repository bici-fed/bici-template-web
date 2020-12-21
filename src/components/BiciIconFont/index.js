// we are using iconfont.cn (https://www.iconfont.cn/) in this project,
// we use the quote as symbol, it supports multi-color and IE 9+ & modern browsers.

import { createFromIconfontCN } from '@ant-design/icons';

// after @ant-design/icons@4.1.0+, supports multiple iconfont.cn resources,
// if icon with a duplicate name in resources, it will overrided in array order.
const scriptUrl = ['//at.alicdn.com/t/font_1903598_vdwj4xswz4h.js'];

const BiciIconFont = createFromIconfontCN({
  scriptUrl,
});

export default BiciIconFont;
