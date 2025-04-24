import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Products } from './components/Products';
import { SellerDashboard } from './components/SellerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login isSeller={false} />} />
        <Route path="/seller/login" element={<Login isSeller={true} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App