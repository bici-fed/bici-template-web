/**
 * @File: root redux reducers
 */
import { combineReducers } from 'redux';

import loading from '@/store/reducers/loading';
import account from '@/store/reducers/account';

const appReducer = combineReducers({ loading, account });

const rootReducer = (state, action) => {
  const pureState = action.type === 'RESET' ? undefined : state;
  return appReducer(pureState, action);
};

export default rootReducer;
