// src/App.tsx
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Thing from './sections/Thing';
import Layout from './layout/Layout';
import Header from './components/Header';
import Login from './sections/Login';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App: React.FC = () => {

  const profile = useSelector((state: RootState) => state.user.currentUser);
console.log(profile)
  return (
    <Layout header={<Header />}>
   
      <Routes>
        <Route path="/thing" element={<Thing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
};

export default App;
