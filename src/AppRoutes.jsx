import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './routes/Login';
import Home from './routes/Home';
import Consultation from './routes/Consultation';
import Share from './routes/Share';
import Diagnosis from './routes/Diagnosis';
import Information from './routes/Information';
import Settings from './routes/Settings';
import ErrorPage from './routes/ErrorPage';
import Loading from './components/Loading';

function AppRoutes() {
  const { isLoading, error, isAuthenticated } = useAuth0();

  if (error) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/consultation" element={isAuthenticated ? <Consultation /> : <Navigate to="/" />} />
        <Route path="/share" element={isAuthenticated ? <Share /> : <Navigate to="/" />} />
        <Route path="/diagnosis" element={isAuthenticated ? <Diagnosis /> : <Navigate to="/" />} />
        <Route path="/information" element={isAuthenticated ? <Information /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <ErrorPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
