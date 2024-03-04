import { Routes, Route } from 'react-router-dom';
import Login from './routes/Login';
import Consultation from './routes/Consultation';
import Information from './routes/Information';
import Diagnosis from './routes/Diagnosis';
import ErrorPage from './routes/ErrorPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/information" element={<Information />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AppRoutes;
