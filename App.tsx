import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TebriklerPage from './pages/TebriklerPage';

/* ───── A/B Variant Assignment (cookie-based, persistent) ───── */
function getOrAssignVariant(): 'A' | 'B' {
  const cookieName = 'ab_variant';
  const match = document.cookie.match(/(?:^|; )ab_variant=([^;]*)/);
  if (match) return match[1] as 'A' | 'B';
  const variant = Math.random() < 0.5 ? 'A' : 'B';
  // 30-day cookie
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${cookieName}=${variant}; expires=${expires}; path=/; SameSite=Lax`;
  localStorage.setItem(cookieName, variant);
  return variant;
}

const RedirectToIndex2: React.FC = () => {
  const location = useLocation();
  return <Navigate to={`/${location.search}`} replace />;
};

/* Redirect /variation-a and /variation-b to homepage and set the variant */
const VariantGate: React.FC<{ variant: 'A' | 'B' }> = ({ variant }) => {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `ab_variant=${variant}; expires=${expires}; path=/; SameSite=Lax`;
  localStorage.setItem('ab_variant', variant);
  return <Navigate to="/" replace />;
};

const App: React.FC = () => {
  // Assign variant on first load if not yet set
  getOrAssignVariant();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tebrikler" element={<TebriklerPage />} />
        <Route path="/index2" element={<RedirectToIndex2 />} />
        {/* A/B explicit entry points */}
        <Route path="/variation-a" element={<VariantGate variant="A" />} />
        <Route path="/variation-b" element={<VariantGate variant="B" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;