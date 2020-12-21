// api for user account

import request from '@/utils/request';

export const fetchLogin = (params) => request.post('/system/account/login', params); // user login

export default { fetchLogin };
