import { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { AuthLayout } from '../../components/layout';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { authAPI } from '../../utils/api';

const CEOLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const notification = useNotification();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[SECURITY] CEO Login page accessed at:', new Date().toISOString());
    }
    // No auto-redirect - allow users to log in as different account
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    setLoading(true);
    
    console.log('CEO login attempt with:', email);

    try {
      const response = await authAPI.ceoLogin(email, password);
      const data = response.data;
      
      console.log('CEO Login response:', data);

      if (data.success && data.token) {
        // Store auth data (both new and legacy keys for compatibility)
        localStorage.setItem('jnAuthToken', data.token);
        localStorage.setItem('jnUser', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('Auth data saved, redirecting to CEO dashboard...');
        
        window.location.replace('/ceo/dashboard');
        return; // Stop execution after redirect
      } else {
        console.log('CEO Login failed:', data.message);
        notification.error(data.message || 'Zugriff verweigert');
        setLoading(false);
      }
    } catch (error) {
      console.error('CEO login error:', error);
      const errorMsg = error.response?.data?.message || 'Verbindungsfehler';
      notification.error(errorMsg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Systemzugang" subtitle="CEO Login — Beschränkter Bereich">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">E-Mail</label>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full pl-10 pr-4 py-3"
              placeholder="ceo@firma.de"
              required
              autoComplete="off"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Passwort</label>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full pl-10 pr-10 py-3"
              placeholder="••••••••"
              required
              autoComplete="off"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-200">
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Überprüfe...' : 'Zugang freigeben'}
        </button>

        <div className="mt-4 text-xs text-gray-500">Unbefugter Zugriff ist verboten und wird protokolliert</div>
      </form>
    </AuthLayout>
  );
};

export default CEOLogin;
