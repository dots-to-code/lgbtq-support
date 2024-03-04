import { Suspense } from 'react';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
