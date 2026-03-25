import { Routes, Route } from 'react-router-dom';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import Dashboard from './pages/Dashboard';
import DocumentIngestion from './pages/DocumentIngestion';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="font-sans min-h-screen">
      <AdminProtectedRoute>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentIngestion />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AdminProtectedRoute>
    </div>
  );
}

export default App;
