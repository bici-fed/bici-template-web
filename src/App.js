import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import store, { persistor } from '@/store';
import BiciLayout from '@/layouts';
import BiciLogin from '@/pages/Login';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/login" component={BiciLogin} />
              <Route component={BiciLayout} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
