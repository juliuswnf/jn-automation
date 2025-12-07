import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportButton from '../components/support/SupportButton';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    yearlyPrice: 39,
    description: 'Perfekt für Solo-Studios & Einzelunternehmer',
    features: [
      { name: 'Termine pro Monat', value: '150 inklusive', included: true },
      { name: 'Mitarbeiter-Accounts', value: '1', included: true },
      { name: 'Online-Buchungswidget', value: true, included: true },
      { name: 'Automatische E-Mail-Erinnerungen', value: true, included: true },
      { name: 'Google-Review Integration', value: true, included: true },
      { name: 'Kundendatenbank', value: true, included: true },
      { name: 'Kalender-Sync (Google, Apple)', value: true, included: true },
      { name: 'DSGVO-konforme Datenhaltung', value: true, included: true },
      { name: 'E-Mail Support', value: true, included: true },
      { name: 'Eigenes Branding', value: false, included: false },
      { name: 'Mehrere Standorte', value: false, included: false },
      { name: 'WhatsApp-Benachrichtigungen', value: false, included: false },
      { name: 'DATEV-Export', value: false, included: false },
    ],
    highlighted: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    yearlyPrice: 79,
    description: 'Für wachsende Teams mit mehreren Mitarbeitern',
    features: [
      { name: 'Termine pro Monat', value: 'Unbegrenzt', included: true },
      { name: 'Mitarbeiter-Accounts', value: 'Bis zu 10', included: true },
      { name: 'Online-Buchungswidget', value: true, included: true },
      { name: 'Automatische E-Mail-Erinnerungen', value: true, included: true },
      { name: 'Google-Review Integration', value: true, included: true },
      { name: 'Kundendatenbank', value: true, included: true },
      { name: 'Kalender-Sync (Google, Apple)', value: true, included: true },
      { name: 'DSGVO-konforme Datenhaltung', value: true, included: true },
      { name: 'Priorisierter Support (24h)', value: true, included: true },
      { name: 'Eigenes Branding & Logo', value: true, included: true },
      { name: 'Bis zu 3 Standorte', value: true, included: true },
      { name: 'WhatsApp-Benachrichtigungen', value: true, included: true },
      { name: 'DATEV-Export', value: false, included: false },
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    yearlyPrice: 159,
    description: 'Für Salon-Ketten & Multi-Location Unternehmen',
    features: [
      { name: 'Termine pro Monat', value: 'Unbegrenzt', included: true },
      { name: 'Mitarbeiter-Accounts', value: 'Unbegrenzt', included: true },
      { name: 'Online-Buchungswidget', value: true, included: true },
      { name: 'Automatische E-Mail-Erinnerungen', value: true, included: true },
      { name: 'Google-Review Integration', value: true, included: true },
      { name: 'Kundendatenbank', value: true, included: true },
      { name: 'Kalender-Sync (Google, Apple)', value: true, included: true },
      { name: 'DSGVO-konforme Datenhaltung', value: true, included: true },
      { name: 'Dedicated Account Manager', value: true, included: true },
      { name: 'Eigenes Branding & Logo', value: true, included: true },
      { name: 'Unbegrenzte Standorte', value: true, included: true },
      { name: 'WhatsApp-Benachrichtigungen', value: true, included: true },
      { name: 'DATEV-Export & Buchhaltung', value: true, included: true },
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  const questions = [
    { 
      question: 'Gibt es eine kostenlose Testphase?', 
      answer: 'Ja! Du bekommst 30 Tage kostenlos alle Features deines gewählten Plans. Keine Kreditkarte erforderlich zum Starten. Wir richten dein Studio gemeinsam ein und du kannst alle Funktionen unverbindlich testen.',
      icon: '🎁'
    },
    { 
      question: 'Warum JN statt Fresha oder Treatwell?', 
      answer: 'Fresha nimmt 20% Provision pro Buchung - bei 100 Buchungen à €50 sind das €1.000/Monat! Bei uns zahlst du einen festen Preis ohne versteckte Kosten. Außerdem: Deutsche Server, deutscher Support, DSGVO-konform. Du behältst 100% deiner Einnahmen.',
      icon: '💰'
    },
    { 
      question: 'Kann ich jederzeit kündigen?', 
      answer: 'Ja, monatlich kündbar ohne Mindestlaufzeit. Keine versteckten Gebühren, keine Kündigungsfrist. Bei Jahreszahlung sparst du 20% und kannst trotzdem jederzeit zum Ende der Laufzeit kündigen.',
      icon: '✅'
    },
    { 
      question: 'Brauchen meine Kunden einen Account?', 
      answer: 'Nein! Das ist unser großer Vorteil. Deine Kunden buchen in unter 30 Sekunden ohne Registrierung. Einfach Name, E-Mail, Termin - fertig. Keine App-Downloads, keine Passwörter. Das reduziert Buchungsabbrüche um bis zu 60%.',
      icon: '⚡'
    },
    { 
      question: 'Wie funktioniert die Bezahlung?', 
      answer: 'SEPA-Lastschrift, Kreditkarte oder Sofortüberweisung - du wählst. Automatische Rechnungen werden monatlich per E-Mail zugestellt. Im Enterprise-Plan gibt es zusätzlich DATEV-Export für deine Buchhaltung.',
      icon: '💳'
    },
    { 
      question: 'Bekomme ich Hilfe beim Einrichten?', 
      answer: 'Absolut! Jeder Neukunde bekommt einen persönlichen Onboarding-Call (ca. 30 Min). Wir richten gemeinsam deine Services, Öffnungszeiten und das Buchungswidget ein. Danach läuft alles automatisch.',
      icon: '🤝'
    },
    { 
      question: 'Sind meine Kundendaten sicher?', 
      answer: 'Höchste Sicherheit garantiert: Server in Deutschland (Frankfurt), volle DSGVO-Konformität, SSL-Verschlüsselung, automatische tägliche Backups. Deine Daten gehören dir - bei Kündigung kannst du sie jederzeit exportieren.',
      icon: '🔒'
    },
    {
      question: 'Kann ich mehrere Standorte verwalten?',
      answer: 'Ja! Im Professional-Plan sind bis zu 3 Standorte enthalten, im Enterprise-Plan unbegrenzt viele. Jeder Standort hat eigene Services, Mitarbeiter und Öffnungszeiten - alles in einem Dashboard übersichtlich verwaltet.',
      icon: '📍'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            30 Tage kostenlos • Keine Kreditkarte
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Faire Preise, keine Provisionen
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Anders als Fresha oder Treatwell: Keine versteckten Kosten, keine Buchungsgebühren. 
            <span className="text-white font-semibold"> Du behältst 100% deiner Einnahmen.</span>
          </p>
          
          {/* Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monatlich</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-green-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Jährlich <span className="text-green-400 font-semibold">(-20%)</span>
            </span>
          </div>

          {/* Demo CTA */}
          <div className="flex justify-center">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 rounded-full hover:bg-indigo-500/20 transition-colors"
            >
              <span>🎮</span>
              <span>Erst Demo testen?</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-gray-400">
          <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-green-300">DSGVO-konform</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
            </svg>
            <span className="font-medium text-blue-300">Server in Deutschland</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-medium text-yellow-300">Deutscher Support</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-emerald-300">30 Tage Geld-zurück</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-purple-300">Tägliche Backups</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-indigo-900/50 to-gray-900 border-2 border-indigo-500 scale-105'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Meist gewählt
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">€{isYearly ? plan.yearlyPrice : plan.price}</span>
                  <span className="text-gray-400">/Monat</span>
                </div>
                {isYearly && (
                  <p className="text-green-400 text-sm mt-1">
                    €{(plan.price - plan.yearlyPrice) * 12} pro Jahr gespart
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {isYearly ? 'Jährliche Abrechnung' : 'Monatlich kündbar'} • zzgl. MwSt.
                </p>
              </div>

              <Link
                to={`/checkout/${plan.id}${isYearly ? '?billing=yearly' : ''}`}
                className={`block w-full py-4 rounded-full text-center font-semibold transition mb-8 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                }`}
              >
                30 Tage kostenlos starten
              </Link>

              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">
                  Was ist enthalten:
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                        {feature.name}
                        {typeof feature.value === 'string' && (
                          <span className="text-gray-400 ml-1">({feature.value})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-4">Detaillierter Feature-Vergleich</h2>
          <p className="text-gray-400 text-center mb-8 max-w-2xl mx-auto">
            Alle Features im Überblick – finde den perfekten Plan für dein Studio
          </p>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-5 px-6 font-semibold text-gray-300">Feature</th>
                  <th className="text-center py-5 px-6 font-semibold">
                    <div className="text-white">Starter</div>
                    <div className="text-sm text-gray-400 font-normal">€{isYearly ? '39' : '49'}/Monat</div>
                  </th>
                  <th className="text-center py-5 px-6 font-semibold bg-indigo-900/30 border-x border-indigo-500/30">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-white">Professional</span>
                      <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">Beliebt</span>
                    </div>
                    <div className="text-sm text-gray-400 font-normal">€{isYearly ? '79' : '99'}/Monat</div>
                  </th>
                  <th className="text-center py-5 px-6 font-semibold">
                    <div className="text-white">Enterprise</div>
                    <div className="text-sm text-gray-400 font-normal">€{isYearly ? '159' : '199'}/Monat</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Kapazität */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-purple-400 text-sm uppercase tracking-wider">
                    📊 Kapazität & Limits
                  </td>
                </tr>
                {[
                  { name: 'Buchungen pro Monat', starter: '150', professional: 'Unbegrenzt', enterprise: 'Unbegrenzt' },
                  { name: 'Mitarbeiter-Accounts', starter: '1', professional: 'Bis zu 10', enterprise: 'Unbegrenzt' },
                  { name: 'Standorte', starter: '1', professional: 'Bis zu 3', enterprise: 'Unbegrenzt' },
                  { name: 'Services/Behandlungen', starter: 'Unbegrenzt', professional: 'Unbegrenzt', enterprise: 'Unbegrenzt' },
                  { name: 'Kundendatenbank', starter: 'Unbegrenzt', professional: 'Unbegrenzt', enterprise: 'Unbegrenzt' },
                ].map((row, idx) => (
                  <tr key={`cap-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row.starter}</td>
                    <td className="py-4 px-6 text-center bg-indigo-900/10 text-white font-medium border-x border-indigo-500/10">{row.professional}</td>
                    <td className="py-4 px-6 text-center text-white font-medium">{row.enterprise}</td>
                  </tr>
                ))}

                {/* Buchungssystem */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-blue-400 text-sm uppercase tracking-wider">
                    📅 Buchungssystem
                  </td>
                </tr>
                {[
                  { name: 'Online-Buchungswidget', starter: true, professional: true, enterprise: true },
                  { name: 'Website-Integration (Embed)', starter: true, professional: true, enterprise: true },
                  { name: 'Mobile-optimierte Buchung', starter: true, professional: true, enterprise: true },
                  { name: 'Buchung ohne Kundenregistrierung', starter: true, professional: true, enterprise: true },
                  { name: 'Kalender-Sync (Google, Apple)', starter: true, professional: true, enterprise: true },
                  { name: 'Puffer-Zeiten zwischen Terminen', starter: true, professional: true, enterprise: true },
                  { name: 'Individuelle Öffnungszeiten', starter: true, professional: true, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`book-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan, i) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        {row[plan] === true ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row[plan] === false ? (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className={plan === 'professional' || plan === 'enterprise' ? 'text-white font-medium' : 'text-gray-400'}>{row[plan]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Kommunikation */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-green-400 text-sm uppercase tracking-wider">
                    📧 Kommunikation & Erinnerungen
                  </td>
                </tr>
                {[
                  { name: 'Automatische Buchungsbestätigung', starter: true, professional: true, enterprise: true },
                  { name: 'E-Mail-Erinnerungen (24h vorher)', starter: true, professional: true, enterprise: true },
                  { name: 'Google-Review Anfrage', starter: true, professional: true, enterprise: true },
                  { name: 'Individuelle E-Mail-Templates', starter: false, professional: true, enterprise: true },
                  { name: 'WhatsApp-Benachrichtigungen', starter: false, professional: true, enterprise: true },
                  { name: 'SMS-Erinnerungen', starter: false, professional: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`comm-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        {row[plan] === true ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row[plan] === false ? (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className={plan === 'professional' || plan === 'enterprise' ? 'text-white font-medium' : 'text-gray-400'}>{row[plan]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Branding & Design */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-pink-400 text-sm uppercase tracking-wider">
                    🎨 Branding & Anpassung
                  </td>
                </tr>
                {[
                  { name: 'Eigenes Logo im Widget', starter: false, professional: true, enterprise: true },
                  { name: 'Farbschema anpassen', starter: false, professional: true, enterprise: true },
                  { name: 'Eigene Domain (CNAME)', starter: false, professional: false, enterprise: true },
                  { name: 'White-Label (kein JN-Logo)', starter: false, professional: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`brand-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        {row[plan] === true ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Reporting */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-yellow-400 text-sm uppercase tracking-wider">
                    📈 Statistiken & Reporting
                  </td>
                </tr>
                {[
                  { name: 'Buchungsstatistiken', starter: true, professional: true, enterprise: true },
                  { name: 'Umsatz-Übersicht', starter: true, professional: true, enterprise: true },
                  { name: 'Mitarbeiter-Performance', starter: false, professional: true, enterprise: true },
                  { name: 'Excel/CSV-Export', starter: false, professional: true, enterprise: true },
                  { name: 'DATEV-Export', starter: false, professional: false, enterprise: true },
                  { name: 'Individuelle Reports', starter: false, professional: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`report-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        {row[plan] === true ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Support */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-cyan-400 text-sm uppercase tracking-wider">
                    🛟 Support & Service
                  </td>
                </tr>
                {[
                  { name: 'E-Mail-Support', starter: 'Standard', professional: 'Priorisiert', enterprise: 'Priorisiert' },
                  { name: 'Antwortzeit', starter: '48h', professional: '24h', enterprise: '4h' },
                  { name: 'Onboarding-Call', starter: true, professional: true, enterprise: true },
                  { name: 'Telefon-Support', starter: false, professional: false, enterprise: true },
                  { name: 'Dedicated Account Manager', starter: false, professional: false, enterprise: true },
                  { name: 'SLA-Garantie', starter: false, professional: false, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`support-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors last:border-0">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        {row[plan] === true ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : row[plan] === false ? (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className={plan === 'professional' || plan === 'enterprise' ? 'text-white font-medium' : 'text-gray-400'}>{row[plan]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Sicherheit */}
                <tr className="bg-gray-800/50">
                  <td colSpan={4} className="py-3 px-6 font-semibold text-red-400 text-sm uppercase tracking-wider">
                    🔒 Sicherheit & Compliance
                  </td>
                </tr>
                {[
                  { name: 'DSGVO-konforme Datenhaltung', starter: true, professional: true, enterprise: true },
                  { name: 'SSL-Verschlüsselung', starter: true, professional: true, enterprise: true },
                  { name: 'Server in Deutschland', starter: true, professional: true, enterprise: true },
                  { name: 'Automatische Backups', starter: true, professional: true, enterprise: true },
                  { name: 'Zwei-Faktor-Authentifizierung', starter: true, professional: true, enterprise: true },
                ].map((row, idx) => (
                  <tr key={`sec-${idx}`} className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors last:border-0">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    {['starter', 'professional', 'enterprise'].map((plan) => (
                      <td key={plan} className={`py-4 px-6 text-center ${plan === 'professional' ? 'bg-indigo-900/10 border-x border-indigo-500/10' : ''}`}>
                        <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
              {/* CTA Row */}
              <tfoot>
                <tr className="border-t border-gray-700 bg-gray-800/50">
                  <td className="py-6 px-6"></td>
                  <td className="py-6 px-6 text-center">
                    <Link
                      to={`/checkout/starter${isYearly ? '?billing=yearly' : ''}`}
                      className="inline-block px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium transition-colors"
                    >
                      Starter wählen
                    </Link>
                  </td>
                  <td className="py-6 px-6 text-center bg-indigo-900/10 border-x border-indigo-500/10">
                    <Link
                      to={`/checkout/professional${isYearly ? '?billing=yearly' : ''}`}
                      className="inline-block px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-500/25"
                    >
                      Professional wählen
                    </Link>
                  </td>
                  <td className="py-6 px-6 text-center">
                    <Link
                      to={`/checkout/enterprise${isYearly ? '?billing=yearly' : ''}`}
                      className="inline-block px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-medium transition-colors"
                    >
                      Enterprise wählen
                    </Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mb-20 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            SSL-verschlüsselt
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Sichere Zahlung via Stripe
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            DSGVO-konform
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Monatlich kündbar
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Häufig gestellte Fragen</h2>
            <p className="text-gray-400 text-lg">Alles, was du vor dem Start wissen musst</p>
          </div>
          
          <div className="space-y-4">
            {questions.map((faq, index) => (
              <div
                key={index}
                className={`bg-gray-900/50 border rounded-xl overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'border-indigo-500/50' : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{faq.icon}</span>
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions? */}
          <div className="mt-10 text-center bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-2xl p-8 border border-indigo-500/20">
            <p className="text-gray-300 mb-4">Deine Frage war nicht dabei?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:support@jn-automation.de"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-Mail schreiben
              </a>
              <SupportButton text="Live-Chat starten" position="inline" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Support Button */}
      <SupportButton />
    </div>
  );
}
