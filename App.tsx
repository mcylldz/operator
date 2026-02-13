import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TebriklerPage from './pages/TebriklerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tebrikler" element={<TebriklerPage />} />
      </Routes>
    </Router>
  );
};

export default App;