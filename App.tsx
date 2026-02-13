import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TebriklerPage from './pages/TebriklerPage';

const RedirectToIndex2: React.FC = () => {
  const location = useLocation();
  return <Navigate to={`/${location.search}`} replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tebrikler" element={<TebriklerPage />} />
        <Route path="/index2" element={<RedirectToIndex2 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;