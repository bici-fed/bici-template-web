/**
 * @File: account controller
 */
import * as types from '@/store/actionTypes';
import preloadedState from '@/store/preloadedState';

export default function accountReducer(state = preloadedState.account, action) {
  switch (action.type) {
    case types.account.UPDATE_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
}
