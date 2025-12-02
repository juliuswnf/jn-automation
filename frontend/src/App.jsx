import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Landing Page & Login
import Home from './pages/Home';
import LoginSelection from './pages/LoginSelection';
import CustomerLogin from './pages/auth/CustomerLogin';
import BusinessLogin from './pages/auth/BusinessLogin';
import CEOLogin from './pages/auth/CEOLogin';

// Layouts
import AppLayout from './layouts/AppLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public pages
import Pricing from './pages/Pricing';
import Impressum from './pages/legal/Impressum';
import Datenschutz from './pages/legal/Datenschutz';
import AGB from './pages/legal/AGB';

// Dashboards
// Dashboard pages (placeholders)
import StudioDashboard from './pages/dashboard/StudioDashboard';
import Bookings from './pages/dashboard/Bookings';
import Services from './pages/dashboard/Services';
import WidgetSetup from './pages/dashboard/WidgetSetup';
import Settings from './pages/dashboard/Settings';

// Error Pages
import NotFound from './pages/NotFound';

/**
 * Global Keyboard Shortcuts Handler
 * Ctrl+Shift+C = Opens hidden CEO Login
 */
const KeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Shift+C -> CEO Login
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        console.log('[SECURITY] CEO Login shortcut triggered');
        navigate('/system/admin');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return null;
};

/**
 * Protected Route Component
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * JN Business System - Main App Component
 * Version: 2.0.0 MVP Professional
 */
function App() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('\n==============================================');
      console.log('  JN BUSINESS SYSTEM - Frontend Started  ');
      console.log('==============================================');
      console.log('Version: 2.0.0 MVP Professional');
      console.log('Environment:', import.meta.env.MODE);
      console.log('Backend API:', import.meta.env.VITE_API_URL || 'http://localhost:5000');
      console.log('==============================================\n');
    }
  }, []);

  return (
    <Router>
      <KeyboardShortcuts />
      <Routes>
        {/* ==================== PUBLIC ROUTES (wrapped in AppLayout) ==================== */}
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>} />
        <Route path="/login" element={<AppLayout><LoginSelection /></AppLayout>} />
        <Route path="/login/customer" element={<AppLayout><CustomerLogin /></AppLayout>} />
        <Route path="/login/business" element={<AppLayout><BusinessLogin /></AppLayout>} />
        <Route path="/impressum" element={<AppLayout><Impressum /></AppLayout>} />
        <Route path="/datenschutz" element={<AppLayout><Datenschutz /></AppLayout>} />
        <Route path="/agb" element={<AppLayout><AGB /></AppLayout>} />
        
        {/* ==================== HIDDEN CEO LOGIN ==================== */}
        {/* Access via: /system/admin OR Ctrl+Shift+C */}
        <Route path="/system/admin" element={<CEOLogin />} />
        <Route path="/_.admin" element={<CEOLogin />} />
        
        {/* ==================== CUSTOMER ROUTES ==================== */}
        {/* ==================== STUDIO DASHBOARD (protected) ==================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <StudioDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Bookings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Services />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/widget"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WidgetSetup />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        
        {/* ==================== BUSINESS ROUTES ==================== */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* ==================== CEO ROUTES ==================== */}
        <Route 
          path="/ceo/dashboard" 
          element={
            <ProtectedRoute requiredRole="ceo">
              <CEODashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* ==================== ERROR ROUTES ==================== */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
