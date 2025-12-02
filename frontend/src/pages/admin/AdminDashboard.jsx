import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UsersIcon, CogIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    todayBookings: 0,
    upcomingBookings: 0,
    totalCustomers: 0,
    confirmedBookings: 0,
    pendingBookings: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('jnUser') || localStorage.getItem('user') || '{}');

  // Get auth token
  const getToken = () => {
    return localStorage.getItem('jnAuthToken') || localStorage.getItem('token');
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const token = getToken();
    
    if (!token) {
      setLoading(false);
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      // Fetch booking stats
      const statsRes = await fetch(`${API_URL}/bookings/stats`, { headers });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(prev => ({
            ...prev,
            confirmedBookings: statsData.stats?.confirmedBookings || 0,
            pendingBookings: statsData.stats?.pendingBookings || 0,
            upcomingBookings: (statsData.stats?.confirmedBookings || 0) + (statsData.stats?.pendingBookings || 0)
          }));
        }
      }

      // Fetch today's bookings
      const today = new Date().toISOString().split('T')[0];
      const todayRes = await fetch(`${API_URL}/bookings/by-date?date=${today}`, { headers });
      if (todayRes.ok) {
        const todayData = await todayRes.json();
        if (todayData.success) {
          setStats(prev => ({
            ...prev,
            todayBookings: todayData.count || todayData.bookings?.length || 0
          }));
          setRecentBookings(todayData.bookings?.slice(0, 5) || []);
        }
      }

      // Fetch unique customers (count distinct customerEmail from bookings)
      const bookingsRes = await fetch(`${API_URL}/bookings?limit=1000`, { headers });
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success) {
          const uniqueEmails = new Set(bookingsData.bookings?.map(b => b.customerEmail).filter(Boolean));
          setStats(prev => ({
            ...prev,
            totalCustomers: uniqueEmails.size
          }));
        }
      }

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Business Dashboard</h1>
          <p className="text-gray-400 mt-2">Willkommen, {user.name || 'Admin'}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Heute</p>
                    <p className="text-3xl font-bold text-white">{stats.todayBookings}</p>
                    <p className="text-xs text-gray-500 mt-1">Termine</p>
                  </div>
                  <CalendarIcon className="h-12 w-12 text-blue-500" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Bevorstehend</p>
                    <p className="text-3xl font-bold text-white">{stats.upcomingBookings}</p>
                    <p className="text-xs text-gray-500 mt-1">Offene Buchungen</p>
                  </div>
                  <CalendarIcon className="h-12 w-12 text-green-500" />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Kunden</p>
                    <p className="text-3xl font-bold text-white">{stats.totalCustomers}</p>
                    <p className="text-xs text-gray-500 mt-1">Eindeutige Kunden</p>
                  </div>
                  <UsersIcon className="h-12 w-12 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            {recentBookings.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Heutige Termine</h2>
                <div className="space-y-3">
                  {recentBookings.map((booking, index) => (
                    <div key={booking._id || index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{booking.customerName || 'Kunde'}</p>
                        <p className="text-sm text-gray-400">{booking.serviceId?.name || 'Service'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">
                          {new Date(booking.bookingDate).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                          booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {booking.status === 'confirmed' ? 'Bestätigt' : 
                           booking.status === 'pending' ? 'Ausstehend' : booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-4">Schnellaktionen</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  to="/dashboard/bookings"
                  className="flex items-center p-4 border-2 border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
                >
                  <CalendarIcon className="h-6 w-6 text-blue-400 mr-3" />
                  <span className="font-medium text-white">Termine verwalten</span>
                </Link>

                <Link 
                  to="/dashboard/services"
                  className="flex items-center p-4 border-2 border-gray-700 rounded-lg hover:border-green-500 transition-colors"
                >
                  <CogIcon className="h-6 w-6 text-green-400 mr-3" />
                  <span className="font-medium text-white">Services bearbeiten</span>
                </Link>

                <Link 
                  to="/dashboard/customers"
                  className="flex items-center p-4 border-2 border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <UsersIcon className="h-6 w-6 text-purple-400 mr-3" />
                  <span className="font-medium text-white">Kunden ansehen</span>
                </Link>

                <Link 
                  to="/dashboard/widget"
                  className="flex items-center p-4 border-2 border-gray-700 rounded-lg hover:border-yellow-500 transition-colors"
                >
                  <CodeBracketIcon className="h-6 w-6 text-yellow-400 mr-3" />
                  <span className="font-medium text-white">Widget-Code</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
