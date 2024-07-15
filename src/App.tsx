// src/App.tsx
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Thing from './sections/Thing';
import Login from './sections/Login';

import Home from './sections/Home';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';


const App: React.FC = () => {


  return (
  <>
  <div className='dark:bg-slate-950 bg-white h-screen'>
<Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/thing" element={
            <ProtectedRoute>
          <Thing /></ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
      </Routes></div>
   </>
  );
};

export default App;
