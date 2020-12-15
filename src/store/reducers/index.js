/**
 * @File: root redux reducers
 */
import { combineReducers } from 'redux';

import loading from '@/store/reducers/loading';

const appReducer = combineReducers({ loading });

const rootReducer = (state, action) => {
  const pureState = action.type === 'RESET' ? undefined : state;
  return appReducer(pureState, action);
};

export default rootReducer;
