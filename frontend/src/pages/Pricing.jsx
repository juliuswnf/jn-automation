import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQ from '../components/sections/FAQ';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    description: 'Für Einzelstudios und Solo-Selbständige',
    features: [
      { name: 'Buchbare Termine/Monat', value: '100 inklusive', included: true },
      { name: 'Mitarbeiter-Accounts', value: '1 (Solo-Studio)', included: true },
      { name: 'Services verwalten', value: true, included: true },
      { name: 'Online-Widget einbetten', value: true, included: true },
      { name: 'Automatische E-Mails', value: true, included: true },
      { name: 'Google-Review-Link', value: true, included: true },
      { name: 'Studio-Dashboard', value: true, included: true },
      { name: 'Kundendatenbank/History', value: true, included: true },
      { name: 'Kalender-Export (ICS)', value: true, included: true },
      { name: 'Support', value: 'Standard (E-Mail)', included: true },
      { name: 'Branding entfernen/anpassen', value: false, included: false },
      { name: 'Mehrere Standorte', value: false, included: false },
      { name: 'Individuelle E-Mail-Texte', value: false, included: false },
      { name: 'Premium-Integrationen', value: false, included: false },
      { name: 'Erweiterter Statistik-Export', value: false, included: false },
    ],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 69,
    description: 'Für Teams & wachsende Studios',
    features: [
      { name: 'Buchbare Termine/Monat', value: 'Unbegrenzt', included: true },
      { name: 'Mitarbeiter-Accounts', value: 'Bis zu 10', included: true },
      { name: 'Services verwalten', value: true, included: true },
      { name: 'Online-Widget einbetten', value: true, included: true },
      { name: 'Automatische E-Mails', value: true, included: true },
      { name: 'Google-Review-Link', value: true, included: true },
      { name: 'Studio-Dashboard', value: true, included: true },
      { name: 'Kundendatenbank/History', value: true, included: true },
      { name: 'Kalender-Export (ICS)', value: true, included: true },
      { name: 'Support', value: 'Priorisiert (SLA)', included: true },
      { name: 'Branding entfernen/anpassen', value: true, included: true },
      { name: 'Mehrere Standorte', value: true, included: true },
      { name: 'Individuelle E-Mail-Texte', value: true, included: true },
      { name: 'Premium-Integrationen', value: true, included: true },
      { name: 'Erweiterter Statistik-Export', value: true, included: true },
    ],
    highlighted: true,
  },
];

export default function Pricing() {
  const questions = [
    { 
      question: 'Gibt es eine kostenlose Testphase?', 
      answer: 'Ja! Du bekommst 14 Tage kostenlos alle Features deines gewählten Plans. Keine Kreditkarte erforderlich zum Testen.' 
    },
    { 
      question: 'Kann ich jederzeit kündigen?', 
      answer: 'Ja, du kannst monatlich kündigen. Es gibt keine Mindestlaufzeit. Die Kündigung wird zum Ende der aktuellen Abrechnungsperiode wirksam.' 
    },
    { 
      question: 'Was passiert nach 100 Buchungen im Starter-Plan?', 
      answer: 'Du wirst benachrichtigt und kannst einfach auf Pro upgraden. Es entstehen keine automatischen Extrakosten.' 
    },
    { 
      question: 'Brauchen meine Kunden einen Account?', 
      answer: 'Nein. Kunden können ohne Account Termine buchen. Ein Account ist nur für dich und deine Mitarbeiter notwendig.' 
    },
    { 
      question: 'Wie funktioniert die Bezahlung?', 
      answer: 'Wir nutzen Stripe für sichere Zahlungen. Du kannst mit Kreditkarte oder SEPA-Lastschrift bezahlen. Rechnungen werden automatisch erstellt.' 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            14 Tage kostenlos testen
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Einfache, transparente Preise
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Wähle den Plan, der zu deinem Studio passt. Monatlich kündbar, keine versteckten Kosten.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-indigo-900/50 to-gray-900 border-2 border-indigo-500'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Beliebt
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-bold">€{plan.price}</span>
                <span className="text-gray-400">/Monat</span>
                <p className="text-sm text-gray-500 mt-2">zzgl. MwSt. • Monatlich kündbar</p>
              </div>

              <Link
                to={`/checkout/${plan.id}`}
                className={`block w-full py-4 rounded-full text-center font-semibold transition mb-8 ${
                  plan.highlighted
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                }`}
              >
                14 Tage kostenlos testen
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
          <h2 className="text-2xl font-bold text-center mb-8">Feature-Vergleich</h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-6 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold">Starter (€29)</th>
                  <th className="text-center py-4 px-6 font-semibold bg-indigo-900/30">Pro (€69)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Buchbare Termine/Monat', starter: '100', pro: 'Unbegrenzt' },
                  { name: 'Mitarbeiter-Accounts', starter: '1', pro: 'Bis zu 10' },
                  { name: 'Services verwalten', starter: true, pro: true },
                  { name: 'Online-Widget', starter: true, pro: true },
                  { name: 'Automatische E-Mails', starter: true, pro: true },
                  { name: 'Google-Review-Link', starter: true, pro: true },
                  { name: 'Kundendatenbank', starter: true, pro: true },
                  { name: 'Kalender-Export', starter: true, pro: true },
                  { name: 'Branding anpassen', starter: false, pro: true },
                  { name: 'Mehrere Standorte', starter: false, pro: true },
                  { name: 'Individuelle E-Mail-Texte', starter: false, pro: true },
                  { name: 'Premium-Integrationen', starter: false, pro: true },
                  { name: 'Statistik-Export', starter: false, pro: true },
                  { name: 'Support', starter: 'E-Mail', pro: 'Priorisiert' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-800 last:border-0">
                    <td className="py-4 px-6 text-gray-300">{row.name}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-gray-400">{row.starter}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-indigo-900/10">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <svg className="w-5 h-5 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )
                      ) : (
                        <span className="text-white font-medium">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Häufige Fragen</h2>
          <FAQ questions={questions} />
        </div>
      </div>
    </div>
  );
}
