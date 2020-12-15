/**
 * @File: store config
 */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import rootReducer from '@/store/reducers';
import initialState from '@/store/preloadedState';

const { NODE_ENV } = process.env;

function configStore(preloadedState) {
  const persistConfig = { key: 'root', storage, whitelist: ['account'] };
  const loggerConfig = { collapsed: true, duration: true };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const logger = createLogger(loggerConfig);
  const middlewares = NODE_ENV === 'development' ? [thunk, logger] : [thunk];
  return createStore(persistedReducer, preloadedState, applyMiddleware(...middlewares));
}

const store = configStore(initialState);

export const persistor = persistStore(store);

export default store;
