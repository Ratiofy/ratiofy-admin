import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import Dashboard from './pages/Dashboard';
import Instruments from './pages/Instruments';
import Documents from './pages/Documents';
import Settings from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-sans min-h-screen">
        <AdminProtectedRoute>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AdminProtectedRoute>
      </div>
    </QueryClientProvider>
  );
}

export default App;
