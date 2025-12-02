import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../components/common/UserMenu';

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Icons als SVG Components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ErrorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SubscriptionIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const CustomersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const PlayIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const StopIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CEODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Stats State
  const [stats, setStats] = useState({
    totalCustomers: 0,
    starterAbos: 0,
    proAbos: 0,
    trialAbos: 0,
    totalRevenue: 0
  });
  
  // Error Logs State
  const [errors, setErrors] = useState([]);
  
  // Customers State (Unternehmen die das Tool kaufen)
  const [customers, setCustomers] = useState([]);
  
  // Subscriptions State
  const [subscriptions, setSubscriptions] = useState([]);

  // Get auth token
  const getToken = () => {
    return localStorage.getItem('jnAuthToken') || localStorage.getItem('token');
  };

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const token = getToken();
      if (!token) {
        setError('Nicht autorisiert');
        setLoading(false);
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        // Fetch stats
        const statsRes = await fetch(`${API_URL}/ceo/stats`, { headers });
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success) {
            setStats(statsData.stats);
          }
        }

        // Fetch errors
        const errorsRes = await fetch(`${API_URL}/ceo/errors?limit=50`, { headers });
        if (errorsRes.ok) {
          const errorsData = await errorsRes.json();
          if (errorsData.success) {
            setErrors(errorsData.errors || []);
          }
        }

        // Fetch customers
        const customersRes = await fetch(`${API_URL}/ceo/customers?limit=100`, { headers });
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          if (customersData.success) {
            setCustomers(customersData.customers || []);
          }
        }

        // Fetch subscriptions
        const subsRes = await fetch(`${API_URL}/ceo/ceo-subscriptions?limit=100`, { headers });
        if (subsRes.ok) {
          const subsData = await subsRes.json();
          if (subsData.success) {
            setSubscriptions(subsData.subscriptions || []);
          }
        }

      } catch (err) {
        console.error('Error fetching CEO data:', err);
        setError('Fehler beim Laden der Daten');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mark error as resolved
  const markErrorAsResolved = async (errorId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/ceo/errors/${errorId}/resolve`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notes: 'Vom CEO Dashboard als gelöst markiert' })
      });

      if (response.ok) {
        setErrors(errors.map(e => e.id === errorId ? { ...e, resolved: true, resolvedAt: new Date().toISOString() } : e));
      }
    } catch (err) {
      console.error('Error resolving error:', err);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Übersicht', icon: DashboardIcon },
    { id: 'errors', label: 'Fehlermeldungen', icon: ErrorIcon, badge: errors.filter(e => !e.resolved).length },
    { id: 'customers', label: 'Kunden', icon: CustomersIcon },
    { id: 'subscriptions', label: 'Abonnements', icon: SubscriptionIcon },
    { id: 'system', label: 'System Control', icon: ServerIcon },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
          <div className="text-red-400 text-xl mb-2">⚠️ Fehler</div>
          <p className="text-gray-400">{error}</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <OverviewTab stats={stats} errors={errors} setActiveTab={setActiveTab} />;
      case 'errors':
        return <ErrorsTab errors={errors} onResolve={markErrorAsResolved} />;
      case 'customers':
        return <CustomersTab customers={customers} />;
      case 'subscriptions':
        return <SubscriptionsTab subscriptions={subscriptions} />;
      case 'system':
        return <SystemControlTab />;
      default:
        return <OverviewTab stats={stats} errors={errors} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CEO</span>
            </div>
            <div>
              <span className="text-white font-semibold block">JN Automation</span>
              <span className="text-xs text-gray-500">CEO Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-white border-l-2 border-red-500'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon />
                  <span className="flex-1">{item.label}</span>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
              J
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Julius</p>
              <p className="text-xs text-gray-500">CEO</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-900/50 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {navItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Willkommen im CEO Control Center
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-red-400 text-sm font-medium px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">
                🔐 CEO Modus
              </span>
              <UserMenu />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// ==================== TAB COMPONENTS ====================

const OverviewTab = ({ stats, errors, setActiveTab }) => {
  const unresolvedErrors = errors.filter(e => !e.resolved).length;
  
  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {unresolvedErrors > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
            <ErrorIcon />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-400">Achtung: Ungelöste Fehler</h3>
            <p className="text-gray-400 text-sm">{unresolvedErrors} Fehler erfordern Ihre Aufmerksamkeit</p>
          </div>
          <button 
            onClick={() => setActiveTab('errors')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Ansehen
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Gesamte Kunden"
          value={stats.totalCustomers}
          icon="👥"
          color="blue"
          subtitle="Unternehmen"
        />
        <StatCard
          title="Starter Abos"
          value={stats.starterAbos}
          icon="🚀"
          color="green"
          subtitle="€29/Monat"
        />
        <StatCard
          title="Pro Abos"
          value={stats.proAbos}
          icon="⭐"
          color="purple"
          subtitle="€69/Monat"
        />
        <StatCard
          title="Trial Accounts"
          value={stats.trialAbos}
          icon="🎯"
          color="orange"
          subtitle="Testphase"
        />
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Monatlicher Umsatz (MRR)</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">€{stats.totalRevenue}</p>
            <p className="text-gray-500 text-sm mt-1">
              {stats.starterAbos}x Starter (€{stats.starterAbos * 29}) + {stats.proAbos}x Pro (€{stats.proAbos * 69})
            </p>
          </div>
          <div className="text-6xl opacity-20">💰</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-2">Conversion Rate</h3>
          <p className="text-2xl font-bold text-white">
            {stats.totalCustomers > 0 ? Math.round(((stats.starterAbos + stats.proAbos) / stats.totalCustomers) * 100) : 0}%
          </p>
          <p className="text-gray-500 text-xs mt-1">Trial → Bezahlt</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-2">Durchschnittlicher Umsatz</h3>
          <p className="text-2xl font-bold text-white">
            €{(stats.starterAbos + stats.proAbos) > 0 ? Math.round(stats.totalRevenue / (stats.starterAbos + stats.proAbos)) : 0}
          </p>
          <p className="text-gray-500 text-xs mt-1">Pro Kunde/Monat</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h3 className="text-gray-400 text-sm mb-2">System Status</h3>
          <p className="text-2xl font-bold text-green-400">Online</p>
          <p className="text-gray-500 text-xs mt-1">Alle Systeme laufen</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const colors = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
    green: 'from-green-500/10 to-green-600/10 border-green-500/20',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
    orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20',
  };

  const textColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className={`text-3xl font-bold ${textColors[color]} mt-1`}>{value}</p>
          <p className="text-gray-500 text-xs mt-1">{subtitle}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};

const ErrorsTab = ({ errors, onResolve }) => {
  const handleResolve = (id) => {
    onResolve(id);
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">System Fehlermeldungen</h2>
          <p className="text-gray-500 text-sm">Überwachen Sie alle Fehler und Warnungen im System</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">
            {errors.filter(e => !e.resolved && e.type === 'error').length} Fehler
          </span>
          <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
            {errors.filter(e => !e.resolved && e.type === 'warning').length} Warnungen
          </span>
        </div>
      </div>

      {errors.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-semibold text-white">Keine Fehler</h3>
          <p className="text-gray-500 mt-2">Alle Systeme laufen einwandfrei</p>
        </div>
      ) : (
        <div className="space-y-3">
          {errors.map((error) => (
            <div
              key={error.id}
              className={`bg-gray-900 border rounded-xl p-4 flex items-center gap-4 ${
                error.resolved
                  ? 'border-gray-800 opacity-50'
                  : error.type === 'error' || error.type === 'critical'
                  ? 'border-red-500/30'
                  : 'border-yellow-500/30'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  error.resolved
                    ? 'bg-gray-800 text-gray-500'
                    : error.type === 'error' || error.type === 'critical'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {error.resolved ? '✓' : error.type === 'error' || error.type === 'critical' ? '!' : '⚠'}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${error.resolved ? 'text-gray-500' : 'text-white'}`}>
                  {error.message}
                </p>
                <div className="flex gap-4 text-gray-500 text-sm">
                  <span>{formatTimestamp(error.timestamp)}</span>
                  {error.source && <span className="capitalize">Quelle: {error.source}</span>}
                  {error.salon && <span>Salon: {error.salon.name}</span>}
                </div>
              </div>
              {!error.resolved && (
                <button
                  onClick={() => handleResolve(error.id)}
                  className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/20 transition"
                >
                  Als gelöst markieren
                </button>
              )}
              {error.resolved && (
                <span className="px-3 py-1 bg-gray-800 text-gray-500 rounded-full text-sm">
                  Gelöst
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CustomersTab = ({ customers }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => {
    // Filter by status/plan
    let matchesFilter = true;
    if (filter === 'active') matchesFilter = c.status === 'active';
    else if (filter === 'trial') matchesFilter = c.status === 'trial';
    else if (filter === 'starter') matchesFilter = c.plan === 'starter';
    else if (filter === 'pro') matchesFilter = c.plan === 'pro';
    
    // Filter by search
    const matchesSearch = searchTerm === '' || 
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Aktive Kunden</h2>
          <p className="text-gray-500 text-sm">Alle Unternehmen die JN Automation nutzen ({customers.length} gesamt)</p>
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'trial', 'starter', 'pro'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Alle' : f === 'active' ? 'Aktiv' : f === 'trial' ? 'Trial' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Suche nach Name oder Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-white">Keine Kunden gefunden</h3>
          <p className="text-gray-500 mt-2">
            {customers.length === 0 ? 'Es gibt noch keine registrierten Unternehmen.' : 'Keine Ergebnisse für diese Filterkriterien.'}
          </p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Unternehmen</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">E-Mail</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Kunde seit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {customer.name?.charAt(0) || '?'}
                      </div>
                      <span className="font-medium text-white">{customer.name || 'Unbekannt'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{customer.email || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.plan === 'pro'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {customer.plan === 'pro' ? '⭐ Pro' : '🚀 Starter'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : customer.status === 'trial'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {customer.status === 'active' ? '✓ Aktiv' : customer.status === 'trial' ? '🎯 Trial' : '⏸ Inaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(customer.since)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const SubscriptionsTab = ({ subscriptions }) => {
  const [filter, setFilter] = useState('all');

  const filteredSubs = subscriptions.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'active') return s.status === 'active';
    if (filter === 'trial') return s.status === 'trial';
    return true;
  });

  const totalMRR = subscriptions
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + (s.amount || 0), 0);

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Abonnements</h2>
          <p className="text-gray-500 text-sm">Alle laufenden Subscriptions verwalten ({subscriptions.length} gesamt)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
            <span className="text-green-400 font-semibold">MRR: €{totalMRR}</span>
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'trial'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'Alle' : f === 'active' ? 'Aktiv' : 'Trial'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredSubs.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-white">Keine Abonnements gefunden</h3>
          <p className="text-gray-500 mt-2">
            {subscriptions.length === 0 ? 'Es gibt noch keine aktiven Abonnements.' : 'Keine Ergebnisse für diesen Filter.'}
          </p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Kunde</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Betrag</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Startdatum</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Nächste Abrechnung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredSubs.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-800/30 transition">
                  <td className="px-6 py-4 font-medium text-white">{sub.customer || 'Unbekannt'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      sub.plan === 'Pro'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={sub.amount > 0 ? 'text-green-400 font-semibold' : 'text-gray-500'}>
                      {sub.amount > 0 ? `€${sub.amount}/Mo` : 'Kostenlos'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      sub.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : sub.status === 'trial'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {sub.status === 'active' ? '✓ Aktiv' : sub.status === 'trial' ? '🎯 Trial' : '⏸ Inaktiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(sub.startDate)}</td>
                  <td className="px-6 py-4 text-gray-400">{formatDate(sub.nextBilling)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ==================== SYSTEM CONTROL TAB ====================

const SystemControlTab = () => {
  const [services, setServices] = useState([
    { 
      id: 'mongodb', 
      name: 'MongoDB', 
      description: 'Datenbank-Container',
      status: 'unknown',
      port: 27017,
      type: 'database',
      command: 'docker'
    },
    { 
      id: 'backend', 
      name: 'Backend Server', 
      description: 'Node.js API Server',
      status: 'unknown',
      port: 5000,
      type: 'server',
      command: 'node'
    },
    { 
      id: 'frontend', 
      name: 'Frontend', 
      description: 'React Development Server',
      status: 'unknown',
      port: 3000,
      type: 'server',
      command: 'vite'
    },
    { 
      id: 'redis', 
      name: 'Redis', 
      description: 'Cache & Queue Service',
      status: 'unknown',
      port: 6379,
      type: 'cache',
      command: 'docker'
    }
  ]);
  
  const [actionLoading, setActionLoading] = useState({});
  const [logs, setLogs] = useState([]);
  const [allStarting, setAllStarting] = useState(false);
  const [allStopping, setAllStopping] = useState(false);

  // Get auth token
  const getToken = () => {
    return localStorage.getItem('jnAuthToken') || localStorage.getItem('token');
  };

  // Check service status
  const checkServiceStatus = async (serviceId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/ceo/system/status/${serviceId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setServices(prev => prev.map(s => 
          s.id === serviceId ? { ...s, status: data.status } : s
        ));
      }
    } catch (err) {
      console.error(`Error checking ${serviceId} status:`, err);
    }
  };

  // Check all services on mount
  useEffect(() => {
    services.forEach(s => checkServiceStatus(s.id));
    
    // Poll status every 10 seconds
    const interval = setInterval(() => {
      services.forEach(s => checkServiceStatus(s.id));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Add log entry
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString('de-DE');
    setLogs(prev => [...prev, { timestamp, message, type }].slice(-50));
  };

  // Start service
  const startService = async (serviceId) => {
    setActionLoading(prev => ({ ...prev, [serviceId]: 'starting' }));
    addLog(`Starte ${serviceId}...`, 'info');
    
    const token = getToken();
    if (!token) {
      addLog('Nicht autorisiert', 'error');
      setActionLoading(prev => ({ ...prev, [serviceId]: null }));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/ceo/system/start/${serviceId}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addLog(`✅ ${serviceId} erfolgreich gestartet`, 'success');
        setServices(prev => prev.map(s => 
          s.id === serviceId ? { ...s, status: 'running' } : s
        ));
      } else {
        addLog(`❌ Fehler beim Starten von ${serviceId}: ${data.message}`, 'error');
      }
    } catch (err) {
      addLog(`❌ Verbindungsfehler: ${err.message}`, 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [serviceId]: null }));
    }
  };

  // Stop service
  const stopService = async (serviceId) => {
    setActionLoading(prev => ({ ...prev, [serviceId]: 'stopping' }));
    addLog(`Stoppe ${serviceId}...`, 'info');
    
    const token = getToken();
    if (!token) {
      addLog('Nicht autorisiert', 'error');
      setActionLoading(prev => ({ ...prev, [serviceId]: null }));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/ceo/system/stop/${serviceId}`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addLog(`⏹ ${serviceId} gestoppt`, 'success');
        setServices(prev => prev.map(s => 
          s.id === serviceId ? { ...s, status: 'stopped' } : s
        ));
      } else {
        addLog(`❌ Fehler beim Stoppen von ${serviceId}: ${data.message}`, 'error');
      }
    } catch (err) {
      addLog(`❌ Verbindungsfehler: ${err.message}`, 'error');
    } finally {
      setActionLoading(prev => ({ ...prev, [serviceId]: null }));
    }
  };

  // Start all services
  const startAllServices = async () => {
    setAllStarting(true);
    addLog('🚀 Starte alle Services...', 'info');
    
    const token = getToken();
    if (!token) {
      addLog('Nicht autorisiert', 'error');
      setAllStarting(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/ceo/system/start-all`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addLog('✅ Alle Services werden gestartet...', 'success');
        // Update all service statuses
        data.results?.forEach(result => {
          if (result.success) {
            setServices(prev => prev.map(s => 
              s.id === result.service ? { ...s, status: 'running' } : s
            ));
            addLog(`  ✓ ${result.service} gestartet`, 'success');
          } else {
            addLog(`  ✗ ${result.service}: ${result.message}`, 'error');
          }
        });
      } else {
        addLog(`❌ Fehler: ${data.message}`, 'error');
      }
    } catch (err) {
      addLog(`❌ Verbindungsfehler: ${err.message}`, 'error');
    } finally {
      setAllStarting(false);
      // Refresh status after a delay
      setTimeout(() => services.forEach(s => checkServiceStatus(s.id)), 3000);
    }
  };

  // Stop all services
  const stopAllServices = async () => {
    setAllStopping(true);
    addLog('⏹ Stoppe alle Services...', 'info');
    
    const token = getToken();
    if (!token) {
      addLog('Nicht autorisiert', 'error');
      setAllStopping(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/ceo/system/stop-all`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        addLog('⏹ Alle Services werden gestoppt...', 'success');
        setServices(prev => prev.map(s => ({ ...s, status: 'stopped' })));
      } else {
        addLog(`❌ Fehler: ${data.message}`, 'error');
      }
    } catch (err) {
      addLog(`❌ Verbindungsfehler: ${err.message}`, 'error');
    } finally {
      setAllStopping(false);
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'starting': return 'bg-yellow-500 animate-pulse';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch (status) {
      case 'running': return 'Läuft';
      case 'stopped': return 'Gestoppt';
      case 'starting': return 'Startet...';
      case 'error': return 'Fehler';
      default: return 'Unbekannt';
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'database': return '🗄️';
      case 'server': return '🖥️';
      case 'cache': return '⚡';
      default: return '📦';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">System Control</h2>
          <p className="text-gray-500 text-sm">Starten und Stoppen Sie alle Services der WebApp</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={startAllServices}
            disabled={allStarting || allStopping}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              allStarting 
                ? 'bg-green-500/20 text-green-400 cursor-wait' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {allStarting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Startet...
              </>
            ) : (
              <>
                <PlayIcon />
                Alle Starten
              </>
            )}
          </button>
          <button
            onClick={stopAllServices}
            disabled={allStarting || allStopping}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              allStopping 
                ? 'bg-red-500/20 text-red-400 cursor-wait' 
                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
            }`}
          >
            {allStopping ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-400 border-t-transparent"></div>
                Stoppt...
              </>
            ) : (
              <>
                <StopIcon />
                Alle Stoppen
              </>
            )}
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div 
            key={service.id}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(service.type)}</span>
                <div>
                  <h3 className="font-semibold text-white">{service.name}</h3>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                <span className="text-sm text-gray-400">{getStatusText(service.status)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">
                Port: <span className="text-gray-400 font-mono">{service.port}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startService(service.id)}
                  disabled={actionLoading[service.id] || service.status === 'running'}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                    service.status === 'running'
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : actionLoading[service.id] === 'starting'
                      ? 'bg-green-500/20 text-green-400 cursor-wait'
                      : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  }`}
                >
                  {actionLoading[service.id] === 'starting' ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-green-400 border-t-transparent"></div>
                  ) : (
                    <PlayIcon />
                  )}
                  Start
                </button>
                <button
                  onClick={() => stopService(service.id)}
                  disabled={actionLoading[service.id] || service.status === 'stopped'}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                    service.status === 'stopped'
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : actionLoading[service.id] === 'stopping'
                      ? 'bg-red-500/20 text-red-400 cursor-wait'
                      : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  }`}
                >
                  {actionLoading[service.id] === 'stopping' ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-400 border-t-transparent"></div>
                  ) : (
                    <StopIcon />
                  )}
                  Stop
                </button>
                <button
                  onClick={() => checkServiceStatus(service.id)}
                  className="px-2 py-1.5 rounded-lg text-sm bg-gray-800 text-gray-400 hover:text-white transition"
                  title="Status aktualisieren"
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-5">
        <h3 className="font-semibold text-white mb-3">🚀 Schnellstart</h3>
        <p className="text-gray-400 text-sm mb-4">
          Mit "Alle Starten" werden in der richtigen Reihenfolge gestartet:<br/>
          1. MongoDB (Datenbank) → 2. Redis (Cache) → 3. Backend (API) → 4. Frontend (UI)
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => window.open('http://localhost:3000', '_blank')}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-sm hover:bg-blue-500/20 transition"
          >
            🌐 Frontend öffnen
          </button>
          <button
            onClick={() => window.open('http://localhost:5000/api/health', '_blank')}
            className="px-4 py-2 bg-green-500/10 text-green-400 rounded-lg text-sm hover:bg-green-500/20 transition"
          >
            🔌 Backend API testen
          </button>
        </div>
      </div>

      {/* Logs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white">📋 System Logs</h3>
          <button
            onClick={() => setLogs([])}
            className="text-xs text-gray-500 hover:text-gray-400"
          >
            Leeren
          </button>
        </div>
        <div className="bg-black rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs">
          {logs.length === 0 ? (
            <div className="text-gray-600">Keine Logs vorhanden...</div>
          ) : (
            logs.map((log, index) => (
              <div 
                key={index} 
                className={`py-1 ${
                  log.type === 'error' ? 'text-red-400' :
                  log.type === 'success' ? 'text-green-400' :
                  'text-gray-400'
                }`}
              >
                <span className="text-gray-600">[{log.timestamp}]</span> {log.message}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CEODashboard;