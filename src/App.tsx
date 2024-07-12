// src/App.tsx
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Thing from './sections/Thing';
import Login from './sections/Login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Home from './sections/Home';
import Header from './components/Header';

const App: React.FC = () => {

  const profile = useSelector((state: RootState) => state.user.currentUser);

  return (
  <>
<Header/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/thing" element={<Thing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
   </>
  );
};

export default App;
