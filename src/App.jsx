import { Suspense } from 'react';
import AppRoutes from './AppRoutes';
import Loading from './components/Loading';

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;
