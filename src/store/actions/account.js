/**
 * @File: actions for account
 */
import * as types from '@/store/actionTypes';

export const updateAccount = (payload) => ({ type: types.account.UPDATE_ACCOUNT, payload });

export default { updateAccount };
