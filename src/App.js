import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import store, { persistor } from '@/store';
import Routes from '@/layouts';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
