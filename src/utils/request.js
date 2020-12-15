/**
 * @File: a request wrapper based on axios,
 * axios is a Promise based HTTP client for the browser and node.js,
 * https://github.com/axios/axios.
 */
import axios from 'axios';
import { biciNotification } from 'bici-transformers';
import store from '@/store';
import { startLoading, stopLoading } from '@/store/actions/loading';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const instance = axios.create({ baseURL: '/api', timeout: 45000 });

instance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const { account } = store.getState();
    const { token } = account;
    // fix ie get request cache
    const isIE = !!window.ActiveXObject || 'ActiveXObject' in window;
    const ieCacheHeaders = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
    const extra = isIE ? ieCacheHeaders : {};
    const headers = { ...config.headers, token, ...extra };
    return { ...config, headers };
  },
  (error) => {
    const { status } = error;
    const message = codeMessage[status];
    if (status in codeMessage) {
      biciNotification.error({ message });
    }
    store.dispatch(stopLoading());
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    setTimeout(() => store.dispatch(stopLoading()), 100);
    const { data: res, config, headers } = response;
    const { download = false, downloadName } = config;
    const { code, data, msg, type } = res;
    // resolve the blob response error
    if (res instanceof window.Blob && type === 'application/json') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const { msg: errorMessage } = JSON.parse(content);
        biciNotification.error({ message: errorMessage });
      };
      reader.readAsText(res);
      return Promise.reject();
    }
    if (res instanceof window.Blob) {
      // for a a common requirements,
      // supprot download config for auto downloading，
      // downloadName also support a suffix.
      if (download) {
        const contentDisposition = headers['content-disposition'];
        const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
        const result = patt.exec(contentDisposition);
        let filename = '';
        if (result) {
          filename = result.length > 0 ? result[1] : '';
        }
        filename = window.decodeURIComponent(filename.trim());
        // if browser is ie, use navigator.msSaveOrOpenBlob to download
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          const blob = new Blob([res], { type: 'text/html' });
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } else {
          const objectUrl = window.URL.createObjectURL(res);
          const a = document.createElement('a');
          a.href = objectUrl;
          a.download = downloadName || filename;
          a.click();
          window.URL.revokeObjectURL(objectUrl);
        }
      }
      return Promise.resolve(res);
    }
    switch (code) {
      case 1000:
        return data;
      // other businesss code process logic here,
      // for example, in a project, code `4507` means token is not valid,
      // there would be a jump logic to deal with.
      case 2002:
        // token is out of date or not valid
        window.location.href = '/login';
        return Promise.reject(data);
      default:
        biciNotification.error({ message: msg });
        return Promise.reject(data);
    }
  },
  (error) => {
    store.dispatch(stopLoading());
    biciNotification.error({ message: '服务器响应失败!' });
    return Promise.reject(error);
  },
);

export default instance;
