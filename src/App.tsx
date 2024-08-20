// src/App.tsx
import React, { useState } from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Thing from './sections/Thing';
import Login from './sections/Login';

import Home from './sections/Home';
import Header from './components/Header';
import ProtectedRoute from './ProtectedRoute';


const App: React.FC = () => {

  const [showModal, setShowModal] = useState(false);

  return (
  <>
  <div className='dark:bg-slate-950 bg-white h-screen'>
  <Header setShowModal={setShowModal} showModal={showModal} />     
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/thing" element={
            <ProtectedRoute>
          <Thing  showModal={showModal}/></ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
      </Routes></div>
   </>
  );
};

export default App;
