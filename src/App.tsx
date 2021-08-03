import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import { Routes } from 'routes/Route';
import appStore from 'store';
import { AuthContainer } from 'containers/AuthContainer';

export const App: FC = () => {
  return (
    <Provider store={appStore}>
      <Router>
        <AuthContainer>
          <Routes />
        </AuthContainer>
      </Router>
    </Provider>
  );
};
