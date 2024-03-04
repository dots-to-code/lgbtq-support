import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
