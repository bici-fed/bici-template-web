/**
 * @File: loading controller
 */
import * as types from '@/store/actionTypes';
import preloadedState from '@/store/preloadedState';

export default function loadingReducer(state = preloadedState.loading, action) {
  const { count } = state;
  switch (action.type) {
    case types.loading.START_LOADING:
      return { ...state, isLoading: true, count: count + 1 };
    case types.loading.STOP_LOADING:
      return { ...state, isLoading: count - 1 !== 0, count: count - 1 };
    case types.loading.RESET_LOADING:
      return { ...state, isLoading: false, count: 0 };
    default:
      return state;
  }
}
