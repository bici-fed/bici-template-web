/**
 * @File: actions for account
 */
import * as types from '@/store/actionTypes';

export const updateToken = (payload) => ({ type: types.account.UPDATE_TOKEN, payload });

export default { updateToken };
