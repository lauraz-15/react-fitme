import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import { CurrUserProvider } from './contexts/CurrUserContext';
import { AccountDataProvider } from './contexts/AccountDataContext';

ReactDOM.render(
    <Router>
      <CurrUserProvider>
        <AccountDataProvider>
          <App />
        </AccountDataProvider>
      </CurrUserProvider>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
