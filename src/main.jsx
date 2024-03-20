import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorBoundary />}>
      <Auth0Provider
        domain="dev-wfjw7s3fxbkrb37k.jp.auth0.com"
        clientId="RNtJJDAOoOX3PUB5lpW9dKqrr5K4jVfH"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
