import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from './routes/ErrorPage';
import Consultation from './routes/Consultation';
import Information from './routes/Information';
import Diagnosis from './routes/Diagnosis';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/lgbtq-support/' || '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/consultation',
    element: <Consultation />,
  },
  {
    path: '/information',
    element: <Information />,
  },
  {
    path: '/diagnosis',
    element: <Diagnosis />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
