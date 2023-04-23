import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import React from 'react'
import Transaction from './pages/Transaction/Transaction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/trans" element={<Transaction/>} />
      </Routes>
      </Router>
  );
}

export default App;
