import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  Star,
  BarChart3,
  PieChart,
  RefreshCcw,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Target,
  Repeat,
  Award
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Success Metrics Dashboard for Salon Owners
 * Shows KPIs and value they get from JN Automation
 */
const SuccessMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [trends, setTrends] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [peakHours, setPeakHours] = useState({ hourly: [], daily: [] });
  const [customerInsights, setCustomerInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

  const getToken = () => localStorage.getItem('jnAuthToken') || localStorage.getItem('token');

  useEffect(() => {
    fetchAllData();
  }, [period]);

  const fetchAllData = async () => {
    setLoading(true);
    const token = getToken();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    try {
      // Fetch all data in parallel
      const [metricsRes, trendsRes, servicesRes, peakRes, customersRes] = await Promise.all([
        fetch(`${API_URL}/salons/analytics/overview`, { headers }),
        fetch(`${API_URL}/salons/analytics/trends?period=${period}`, { headers }),
        fetch(`${API_URL}/salons/analytics/top-services`, { headers }),
        fetch(`${API_URL}/salons/analytics/peak-hours`, { headers }),
        fetch(`${API_URL}/salons/analytics/customers`, { headers })
      ]);

      if (metricsRes.ok) {
        const data = await metricsRes.json();
        setMetrics(data.metrics);
      }

      if (trendsRes.ok) {
        const data = await trendsRes.json();
        setTrends(data.data || []);
      }

      if (servicesRes.ok) {
        const data = await servicesRes.json();
        // Calculate percentages
        const total = data.services?.reduce((sum, s) => sum + s.bookings, 0) || 1;
        setTopServices(data.services?.map(s => ({
          ...s,
          percentage: Math.round((s.bookings / total) * 100)
        })) || []);
      }

      if (peakRes.ok) {
        const data = await peakRes.json();
        setPeakHours(data);
      }

      if (customersRes.ok) {
        const data = await customersRes.json();
        setCustomerInsights(data.insights);
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value || 0);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('de-DE').format(value || 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCcw className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Lade Statistiken...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-7 h-7 text-indigo-600" />
                Erfolgs-Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">Deine KPIs auf einen Blick</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="7d">Letzte 7 Tage</option>
                <option value="30d">Letzte 30 Tage</option>
                <option value="90d">Letzte 90 Tage</option>
                <option value="1y">Letztes Jahr</option>
              </select>
              <button
                onClick={fetchAllData}
                className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 border-b border-gray-200 -mb-px">
            {[
              { id: 'overview', label: 'Übersicht', icon: Target },
              { id: 'services', label: 'Services', icon: Star },
              { id: 'customers', label: 'Kunden', icon: Users },
              { id: 'timing', label: 'Stoßzeiten', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Value Highlight */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium opacity-90">Dein Erfolg mit JN Automation</h2>
                  <div className="text-3xl font-bold mt-1">
                    {metrics?.timeSavedHours || 0} Stunden gespart
                  </div>
                  <p className="text-sm opacity-80 mt-1">
                    Durch {formatNumber(metrics?.totalBookings)} Online-Buchungen (ca. 5 Min. pro Anruf)
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(metrics?.totalBookings)}</div>
                    <div className="text-sm opacity-80">Buchungen</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(metrics?.totalRevenue)}</div>
                    <div className="text-sm opacity-80">Umsatz</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatNumber(metrics?.totalCustomers)}</div>
                    <div className="text-sm opacity-80">Kunden</div>
                  </div>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* This Month Bookings */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Buchungen (Monat)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatNumber(metrics?.thisMonthBookings)}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    (metrics?.bookingGrowth || 0) >= 0 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {(metrics?.bookingGrowth || 0) >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(metrics?.bookingGrowth || 0)}%
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">vs. Vormonat ({metrics?.lastMonthBookings || 0})</p>
              </div>

              {/* This Month Revenue */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Umsatz (Monat)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(metrics?.thisMonthRevenue)}
                    </p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Ø {formatCurrency(metrics?.avgBookingValue)} pro Buchung</p>
              </div>

              {/* New Customers */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Neue Kunden (Monat)</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatNumber(metrics?.newCustomersThisMonth)}
                    </p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">von {metrics?.totalCustomers || 0} gesamt</p>
              </div>

              {/* No-Show Rate */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Stornierungsrate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {metrics?.noShowRate || 0}%
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${(metrics?.noShowRate || 0) < 10 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Calendar className={`w-5 h-5 ${(metrics?.noShowRate || 0) < 10 ? 'text-green-600' : 'text-yellow-600'}`} />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {(metrics?.noShowRate || 0) < 10 ? '✓ Sehr gut!' : 'Erinnerungen aktiviert?'}
                </p>
              </div>
            </div>

            {/* Booking Trend Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buchungsverlauf</h3>
              {trends.length > 0 ? (
                <div className="h-48 flex items-end gap-1">
                  {trends.map((point, idx) => {
                    const maxBookings = Math.max(...trends.map(t => t.bookings), 1);
                    const height = (point.bookings / maxBookings) * 100;
                    return (
                      <div 
                        key={idx}
                        className="flex-1 bg-indigo-100 hover:bg-indigo-200 rounded-t transition-colors relative group"
                        style={{ height: `${Math.max(height, 5)}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {point.bookings} Buchungen
                          <br />
                          {formatCurrency(point.revenue)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400">
                  Noch keine Daten verfügbar
                </div>
              )}
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{trends[0]?.date || '-'}</span>
                <span>{trends[trends.length - 1]?.date || '-'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Top Services
              </h3>
              {topServices.length > 0 ? (
                <div className="space-y-4">
                  {topServices.map((service, idx) => (
                    <div key={service.id || idx} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                        idx === 1 ? 'bg-gray-100 text-gray-700' :
                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-50 text-gray-500'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 truncate">{service.name}</span>
                          <span className="text-sm text-gray-500">{service.bookings} Buchungen</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all"
                            style={{ width: `${service.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">{formatCurrency(service.revenue)}</div>
                        <div className="text-xs text-gray-400">{service.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Noch keine Service-Daten verfügbar</p>
              )}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            {/* Customer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{customerInsights?.totalCustomers || 0}</p>
                    <p className="text-sm text-gray-500">Gesamtkunden</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Repeat className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{customerInsights?.repeatRate || 0}%</p>
                    <p className="text-sm text-gray-500">Wiederkehrend</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerInsights?.avgLifetimeValue)}</p>
                    <p className="text-sm text-gray-500">Ø Kundenwert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Kunden</h3>
              {customerInsights?.topCustomers?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                        <th className="pb-3 font-medium">Kunde</th>
                        <th className="pb-3 font-medium text-center">Buchungen</th>
                        <th className="pb-3 font-medium text-right">Umsatz</th>
                        <th className="pb-3 font-medium text-right">Letzter Besuch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customerInsights.topCustomers.map((customer, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                {customer.name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{customer.name}</div>
                                <div className="text-xs text-gray-400">{customer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span className="inline-flex items-center px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                              {customer.bookings}
                            </span>
                          </td>
                          <td className="py-3 text-right font-medium text-gray-900">
                            {formatCurrency(customer.totalSpent)}
                          </td>
                          <td className="py-3 text-right text-sm text-gray-500">
                            {customer.lastVisit 
                              ? new Date(customer.lastVisit).toLocaleDateString('de-DE')
                              : '-'
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Noch keine Kundendaten verfügbar</p>
              )}
            </div>
          </div>
        )}

        {/* Timing Tab */}
        {activeTab === 'timing' && (
          <div className="space-y-6">
            {/* Peak Hours */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buchungen nach Uhrzeit</h3>
              {peakHours.hourly?.length > 0 ? (
                <div className="h-48 flex items-end gap-1">
                  {Array.from({ length: 12 }, (_, i) => i + 8).map(hour => {
                    const data = peakHours.hourly.find(h => h.hour === hour);
                    const maxBookings = Math.max(...peakHours.hourly.map(h => h.bookings), 1);
                    const height = data ? (data.bookings / maxBookings) * 100 : 0;
                    return (
                      <div key={hour} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full rounded-t transition-colors ${height > 60 ? 'bg-indigo-500' : height > 30 ? 'bg-indigo-300' : 'bg-indigo-100'}`}
                          style={{ height: `${Math.max(height, 5)}%` }}
                        />
                        <span className="text-xs text-gray-400 mt-2">{hour}h</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Noch keine Daten verfügbar</p>
              )}
            </div>

            {/* Peak Days */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buchungen nach Wochentag</h3>
              {peakHours.daily?.length > 0 ? (
                <div className="grid grid-cols-7 gap-2">
                  {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, idx) => {
                    const data = peakHours.daily.find(d => d.day === idx + 2 || (idx === 6 && d.day === 1));
                    const maxBookings = Math.max(...peakHours.daily.map(d => d.bookings), 1);
                    const intensity = data ? (data.bookings / maxBookings) : 0;
                    return (
                      <div key={day} className="text-center">
                        <div 
                          className={`h-16 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${
                            intensity > 0.6 ? 'bg-indigo-500 text-white' :
                            intensity > 0.3 ? 'bg-indigo-200 text-indigo-800' :
                            'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {data?.bookings || 0}
                        </div>
                        <span className="text-sm text-gray-500 mt-1">{day}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Noch keine Daten verfügbar</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessMetrics;
