/**
 * @File: actions for loading
 */
import * as types from '@/store/actionTypes';

export const startLoading = payload => ({ type: types.loading.START_LOADING, payload });
export const stopLoading = payload => ({ type: types.loading.STOP_LOADING, payload });
export const resetLoading = payload => ({ type: types.loading.RESET_LOADING, payload });

export default { startLoading, stopLoading, resetLoading };
