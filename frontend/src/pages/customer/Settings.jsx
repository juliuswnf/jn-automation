import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * CUSTOMER SETTINGS & PROFILE PAGE
 * Route: /customer/settings
 */
export default function Settings() {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Deutschland'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    specialOffers: false,
    newsletter: true
  });

  const [bookingHistory, setBookingHistory] = useState([]);

  // Get auth token
  const getToken = () => {
    return localStorage.getItem('jnAuthToken') || localStorage.getItem('token');
  };

  // Fetch user profile and bookings on mount
  useEffect(() => {
    fetchProfileAndBookings();
  }, []);

  const fetchProfileAndBookings = async () => {
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
      // Fetch profile
      const profileRes = await fetch(`${API_URL}/auth/profile`, { headers });
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.success && profileData.user) {
          const user = profileData.user;
          const nameParts = (user.name || '').split(' ');
          setProfile({
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: user.email || '',
            phone: user.phone || '',
            birthDate: user.birthDate || '',
            gender: user.gender || '',
            address: user.address || '',
            city: user.city || '',
            zipCode: user.zipCode || '',
            country: user.country || 'Deutschland'
          });
        }
      }

      // Fetch booking history
      const bookingsRes = await fetch(`${API_URL}/bookings?limit=20`, { headers });
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        if (bookingsData.success && bookingsData.bookings) {
          const formattedBookings = bookingsData.bookings.map(b => ({
            id: b._id,
            service: b.serviceId?.name || 'Service',
            date: new Date(b.bookingDate).toLocaleDateString('de-DE'),
            time: new Date(b.bookingDate).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            employee: b.employeeId?.name || 'Mitarbeiter',
            status: b.status,
            price: b.totalAmount ? `${b.totalAmount}€` : (b.serviceId?.price ? `${b.serviceId.price}€` : '-')
          }));
          setBookingHistory(formattedBookings);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('Fehler beim Laden der Daten', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          phone: profile.phone,
          birthDate: profile.birthDate,
          gender: profile.gender,
          address: profile.address,
          city: profile.city,
          zipCode: profile.zipCode,
          country: profile.country
        })
      });

      if (res.ok) {
        setEditMode(false);
        showNotification('Profil erfolgreich aktualisiert', 'success');
      } else {
        showNotification('Fehler beim Speichern', 'error');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      showNotification('Fehler beim Speichern', 'error');
    }
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      showNotification('Passwörter stimmen nicht überein', 'error');
      return;
    }

    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        })
      });

      if (res.ok) {
        showNotification('Passwort erfolgreich geändert', 'success');
        setPasswords({ current: '', new: '', confirm: '' });
      } else {
        const data = await res.json();
        showNotification(data.message || 'Fehler beim Ändern des Passworts', 'error');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      showNotification('Fehler beim Ändern des Passworts', 'error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Lade Profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">Einstellungen & Profil</h1>
          <p className="text-gray-400 text-sm mt-1">Verwalte dein Konto und deine Präferenzen</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-800 overflow-x-auto">
          {[
            { key: 'profile', label: 'Profil' },
            { key: 'bookings', label: 'Buchungshistorie' },
            { key: 'preferences', label: 'Benachrichtigungen' },
            { key: 'security', label: 'Sicherheit' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-4 font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-purple-600 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Persönliche Daten</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  editMode
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {editMode ? 'Abbrechen' : 'Bearbeiten'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Vorname</label>
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Nachname</label>
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Birth Date */}
              <div>
                <label className="block text-sm font-medium mb-2">Geburtsdatum</label>
                <input
                  type="date"
                  name="birthDate"
                  value={profile.birthDate}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">Geschlecht</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                >
                  <option value="male">Männlich</option>
                  <option value="female">Weiblich</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">Stadt</label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium mb-2">Postleitzahl</label>
                <input
                  type="text"
                  name="zipCode"
                  value={profile.zipCode}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium mb-2">Land</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleProfileChange}
                  disabled={!editMode}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:border-purple-600 focus:outline-none transition"
                />
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSaveProfile}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition"
              >
                Änderungen speichern ✅
              </button>
            )}
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Deine Buchungen</h2>
            {bookingHistory.map(booking => (
              <div key={booking.id} className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{booking.service}</h3>
                    <p className="text-gray-400 text-sm">mit {booking.employee}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-900 text-green-300'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {booking.status === 'confirmed' ? '✅ Bestätigt' : '✓ Abgeschlossen'}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Datum & Zeit</p>
                    <p className="font-semibold">{booking.date} um {booking.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Dauer</p>
                    <p className="font-semibold">30-120 Minuten</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Preis</p>
                    <p className="font-semibold text-purple-400">{booking.price}</p>
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 px-4 py-2 border border-gray-600 hover:bg-gray-800 rounded-lg transition">
                      ✏️ Ändern
                    </button>
                    <button className="flex-1 px-4 py-2 border border-red-600 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-lg transition">
                      ❌ Absagen
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8">
            <h2 className="text-2xl font-bold mb-6">Benachrichtigungseinstellungen</h2>

            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: '📧 E-Mail-Benachrichtigungen', desc: 'Erhalte E-Mails zu deinen Terminen' },
                { key: 'smsNotifications', label: '📱 SMS-Benachrichtigungen', desc: 'Erhalte SMS-Erinnerungen' },
                { key: 'appointmentReminders', label: '⏰ Termin-Erinnerungen', desc: '24h vor dem Termin erinnern' },
                { key: 'specialOffers', label: '🎉 Spezialangebote', desc: 'Informationen über Rabatte und Aktionen' },
                { key: 'newsletter', label: '📬 Newsletter', desc: 'Wöchentliche Tipps und News' }
              ].map(pref => (
                <div key={pref.key} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-semibold">{pref.label}</p>
                    <p className="text-sm text-gray-400">{pref.desc}</p>
                  </div>
                  <button
                    onClick={() => handlePreferenceChange(pref.key)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      preferences[pref.key]
                        ? 'bg-purple-600'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition transform ${
                      preferences[pref.key] ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition">
              Speichern ✅
            </button>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            {/* Change Password */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8">
              <h2 className="text-2xl font-bold mb-6">Passwort ändern</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Aktuelles Passwort</label>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Neues Passwort</label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Passwort bestätigen</label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
              >
                Passwort ändern 🔐
              </button>
            </div>

            {/* Account Status */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8">
              <h2 className="text-2xl font-bold mb-6">Kontostatus</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-900 bg-opacity-20 border border-green-700 rounded-lg">
                  <p className="text-green-300">✅ Konto aktiv</p>
                  <p className="text-sm text-green-300 mt-1">Dein Konto ist in Ordnung.</p>
                </div>
                <button className="w-full px-6 py-3 border border-red-600 text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-lg font-semibold transition">
                  🗑️ Konto löschen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}