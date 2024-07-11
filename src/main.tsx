import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <BrowserRouter>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <App /></PersistGate></Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
