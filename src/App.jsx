import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { asyncPreloadProcess } from './states/isPreload/thunks';

export default function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);
  const authUser = useSelector((state) => state.authUser);
  const loading = useSelector((state) => state.loading); // GLOBAL LOADING

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  // 🔥 Saat preload user, tampilkan loading
  if (isPreload) {
    return <p style={{ textAlign: 'center' }}>Loading aplikasi...</p>;
  }

  return (
    <div>
      {/* Loading Global */}
      {loading && (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading...</p>
      )}

      <Navbar authUser={authUser} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />

          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />

          <Route
            path="/register"
            element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
          />

          <Route path="/leaderboards" element={<LeaderboardPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
