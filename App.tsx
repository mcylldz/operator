import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HomePage2 from './pages/HomePage2';
import TebriklerPage from './pages/TebriklerPage';

// A/B Test Routing Logic
const VariantRouter = () => {
  const location = window.location;

  // Check if variant is already assigned
  let variant = localStorage.getItem('ab_variant');

  if (!variant) {
    // 50/50 Split
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('ab_variant', variant);
  }

  // Handle Redirection based on variant vs current path
  if (variant === 'B' && location.pathname === '/') {
    window.location.replace('/index2' + location.search);
    return null;
  }

  if (variant === 'A' && location.pathname === '/index2') {
    window.location.replace('/' + location.search);
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/index2" element={<HomePage2 />} />
      <Route path="/tebrikler" element={<TebriklerPage />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <VariantRouter />
    </Router>
  );
};

export default App;