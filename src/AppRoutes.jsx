import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './routes/Login';
import Consultation from './routes/Consultation';
import ConsultationDetail from './routes/ConsultationDetail';
import ConsultationPost from './routes/ConsultationPost';
import ConsultationAnswer from './routes/ConsultationAnswer';
import Chat from './routes/Chat';
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
        <Route path="/" element={isAuthenticated ? <Navigate to="/consultation" /> : <Login />} />
        <Route path="/consultation" element={isAuthenticated ? <Consultation /> : <Navigate to="/" />} />
        <Route path="/consultation/:id" element={isAuthenticated ? <ConsultationDetail /> : <Navigate to="/" />} />
        <Route path="/consultation/post" element={isAuthenticated ? <ConsultationPost /> : <Navigate to="/" />} />
        <Route
          path="/consultation/answer/:id"
          element={isAuthenticated ? <ConsultationAnswer /> : <Navigate to="/" />}
        />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
        <Route path="/diagnosis" element={isAuthenticated ? <Diagnosis /> : <Navigate to="/" />} />
        <Route path="/information" element={isAuthenticated ? <Information /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
        <Route path="*" element={isAuthenticated ? <ErrorPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
