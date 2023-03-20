import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CustomerList from './CustomerList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CustomerList />
  </React.StrictMode>
);
