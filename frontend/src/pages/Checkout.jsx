import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const plans = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Für Einzelstudios und Solo-Selbständige',
    features: [
      '100 Termine pro Monat',
      '1 Mitarbeiter-Account',
      'Online-Buchungswidget',
      'Automatische E-Mails',
      'Google-Review-Link',
      'Studio-Dashboard',
      'Kundendatenbank',
      'Standard E-Mail-Support',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: 69,
    description: 'Für Teams & wachsende Studios',
    features: [
      'Unbegrenzte Termine',
      'Bis zu 10 Mitarbeiter',
      'Alle Starter-Features',
      'Custom Branding',
      'Mehrere Standorte',
      'Individuelle E-Mail-Texte',
      'Premium-Integrationen',
      'Priorisierter Support (SLA)',
      'Erweiterter Statistik-Export',
    ],
  },
};

export default function Checkout() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const plan = plans[planId];

  useEffect(() => {
    if (!plan) {
      navigate('/pricing');
    }
  }, [plan, navigate]);

  if (!plan) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value.replace('/', ''));
    setFormData((prev) => ({ ...prev, expiry: formatted }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Gültige E-Mail erforderlich';
    }
    if (!formData.name.trim()) {
      newErrors.name = 'Name erforderlich';
    }
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Gültige Kartennummer erforderlich';
    }
    if (!formData.expiry || formData.expiry.length < 5) {
      newErrors.expiry = 'Gültig bis erforderlich';
    }
    if (!formData.cvc || formData.cvc.length < 3) {
      newErrors.cvc = 'CVC erforderlich';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Bitte AGB akzeptieren';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate payment processing
    // In production, this would call Stripe API
    setTimeout(() => {
      // Store selected plan in session for registration
      sessionStorage.setItem('selectedPlan', JSON.stringify({
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        email: formData.email,
        trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }));
      
      // Redirect to registration with plan info
      navigate('/register', { 
        state: { 
          fromCheckout: true, 
          plan: plan.id,
          email: formData.email 
        } 
      });
    }, 2000);
  };

  const vatAmount = (plan.price * 0.19).toFixed(2);
  const totalAmount = (plan.price * 1.19).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Link */}
        <Link 
          to="/pricing" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück zur Preisübersicht
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Payment Form */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-400 mb-8">
              Starte deine 14-tägige kostenlose Testphase
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-Mail Adresse
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-900 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="ihre@email.de"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Card Details */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="font-medium">Kartendaten</span>
                  <div className="flex-1" />
                  <div className="flex gap-2">
                    <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/de.svg" alt="DE" className="w-6 h-4 rounded" />
                    <span className="text-xs text-gray-500">Visa, Mastercard, SEPA</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Name auf der Karte
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="Max Mustermann"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Kartennummer
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-700'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Gültig bis
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.expiry ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="MM/YY"
                      />
                      {errors.expiry && (
                        <p className="text-red-400 text-sm mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleChange}
                        maxLength={4}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.cvc ? 'border-red-500' : 'border-gray-700'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvc && (
                        <p className="text-red-400 text-sm mt-1">{errors.cvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded bg-gray-800 border-gray-700 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-400">
                  Ich stimme den{' '}
                  <Link to="/agb" className="text-white hover:text-indigo-400">
                    AGB
                  </Link>{' '}
                  und der{' '}
                  <Link to="/datenschutz" className="text-white hover:text-indigo-400">
                    Datenschutzerklärung
                  </Link>{' '}
                  zu. Die Testphase endet automatisch nach 14 Tagen, danach wird das Abo aktiv.
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-sm">{errors.agreeToTerms}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird verarbeitet...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    14 Tage kostenlos testen
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sichere Zahlung mit SSL-Verschlüsselung
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 sticky top-8">
              <h2 className="text-xl font-bold mb-6">Bestellübersicht</h2>

              {/* Selected Plan */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name} Plan</h3>
                    <p className="text-gray-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">€{plan.price}</span>
                    <span className="text-gray-400">/Monat</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Enthalten:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trial Info */}
              <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-indigo-300">14 Tage kostenlos testen</h4>
                    <p className="text-sm text-indigo-400/80 mt-1">
                      Du wirst erst nach Ablauf der Testphase belastet. Jederzeit kündbar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>{plan.name} Plan (monatlich)</span>
                  <span>€{plan.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>MwSt. (19%)</span>
                  <span>€{vatAmount}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between font-semibold text-lg">
                  <span>Gesamt nach Testphase</span>
                  <span>€{totalAmount}</span>
                </div>
              </div>

              {/* Today's Charge */}
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-300">Heute zu zahlen:</span>
                  <span className="text-2xl font-bold text-green-400">€0,00</span>
                </div>
                <p className="text-sm text-green-400/70 mt-1">
                  Erste Abbuchung nach 14 Tagen
                </p>
              </div>

              {/* Guarantee */}
              <div className="mt-6 flex items-center gap-3 text-sm text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>30 Tage Geld-zurück-Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
