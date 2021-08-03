import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.scss';
import { Routes } from 'routes/Route';

export const App: FC = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};
