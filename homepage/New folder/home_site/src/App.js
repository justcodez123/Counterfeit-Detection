import React from 'react'; 
import Home from './components/HomePage/Home';
import Login from './components/LoginPage/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

function App() {
  return (
    <>
      <Home />
      <Login />
    </>
  );
}

export default App;
