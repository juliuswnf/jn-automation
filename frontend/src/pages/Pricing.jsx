import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    yearlyPrice: 39,
    description: 'Für Einzelunternehmer und kleine Studios',
    features: [
      { name: 'Buchungen pro Monat', value: '150' },
      { name: 'Mitarbeiter', value: '1' },
      { name: 'Online-Buchung', included: true },
      { name: 'E-Mail-Erinnerungen', included: true },
      { name: 'Google-Bewertungen', included: true },
      { name: 'Kundendatenbank', included: true },
      { name: 'Kalender-Sync', included: true },
      { name: 'E-Mail Support', included: true },
      { name: 'Eigenes Design', included: false },
      { name: 'Mehrere Standorte', included: false },
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
      { name: 'Buchungen pro Monat', value: 'Unbegrenzt' },
      { name: 'Mitarbeiter', value: 'Bis zu 10' },
      { name: 'Online-Buchung', included: true },
      { name: 'E-Mail-Erinnerungen', included: true },
      { name: 'Google-Bewertungen', included: true },
      { name: 'Kundendatenbank', included: true },
      { name: 'Kalender-Sync', included: true },
      { name: 'Schneller Support (24h)', included: true },
      { name: 'Eigenes Logo und Farben', included: true },
      { name: 'Bis zu 3 Standorte', included: true },
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    yearlyPrice: 159,
    description: 'Für große Unternehmen mit vielen Standorten',
    features: [
      { name: 'Buchungen pro Monat', value: 'Unbegrenzt' },
      { name: 'Mitarbeiter', value: 'Unbegrenzt' },
      { name: 'Online-Buchung', included: true },
      { name: 'E-Mail-Erinnerungen', included: true },
      { name: 'Google-Bewertungen', included: true },
      { name: 'Kundendatenbank', included: true },
      { name: 'Kalender-Sync', included: true },
      { name: 'Persönlicher Ansprechpartner', included: true },
      { name: 'Vollständig anpassbar', included: true },
      { name: 'Unbegrenzte Standorte', included: true },
    ],
    highlighted: false,
  },
];

const faqQuestions = [
  { 
    question: 'Kann ich das System kostenlos testen?', 
    answer: 'Ja. Sie bekommen 30 Tage kostenlos alle Funktionen Ihres gewählten Plans. Sie brauchen keine Kreditkarte zum Starten.'
  },
  { 
    question: 'Was ist der Unterschied zu anderen Anbietern?', 
    answer: 'Andere Anbieter nehmen oft 20% Provision pro Buchung. Bei uns zahlen Sie einen festen Monatspreis ohne versteckte Kosten. Sie behalten 100% Ihrer Einnahmen.'
  },
  { 
    question: 'Kann ich jederzeit kündigen?', 
    answer: 'Ja. Sie können monatlich kündigen, ohne Mindestlaufzeit. Bei Jahreszahlung sparen Sie 20% und können zum Ende der Laufzeit kündigen.'
  },
  { 
    question: 'Brauchen meine Kunden einen Account?', 
    answer: 'Nein. Ihre Kunden können in unter 30 Sekunden buchen, ohne sich zu registrieren. Einfach Name, E-Mail und Termin auswählen.'
  },
  { 
    question: 'Wie kann ich bezahlen?', 
    answer: 'Per Lastschrift, Kreditkarte oder Überweisung. Sie erhalten monatlich eine Rechnung per E-Mail.'
  },
  { 
    question: 'Bekomme ich Hilfe beim Einrichten?', 
    answer: 'Ja. Jeder Neukunde bekommt einen persönlichen Einrichtungs-Termin (ca. 30 Minuten). Wir helfen Ihnen bei allen Schritten.'
  },
  { 
    question: 'Sind meine Daten sicher?', 
    answer: 'Ja. Unsere Server stehen in Deutschland. Wir erfüllen alle DSGVO-Anforderungen. Ihre Daten werden täglich gesichert.'
  },
  {
    question: 'Kann ich mehrere Standorte verwalten?',
    answer: 'Ja. Im Professional-Plan sind bis zu 3 Standorte möglich, im Enterprise-Plan unbegrenzt viele. Alles in einem System.'
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Einfache, faire Preise
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Keine versteckten Kosten. Keine Provisionen.
            <span className="text-white font-medium"> Sie behalten 100% Ihrer Einnahmen.</span>
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-white font-medium' : 'text-gray-500'}`}>
              Monatlich
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${isYearly ? 'bg-indigo-500' : 'bg-gray-700'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isYearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${isYearly ? 'text-white font-medium' : 'text-gray-500'}`}>
              Jährlich <span className="text-indigo-400">(20% sparen)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-zinc-900 border-2 border-indigo-500'
                  : 'bg-zinc-900 border border-zinc-800'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Empfohlen
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">
                    {isYearly ? plan.yearlyPrice : plan.price}€
                  </span>
                  <span className="text-gray-400">/ Monat</span>
                </div>
                {isYearly && (
                  <p className="text-indigo-400 text-sm mt-2">
                    {(plan.price - plan.yearlyPrice) * 12}€ pro Jahr gespart
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  zzgl. MwSt.
                </p>
              </div>

              <Link
                to={`/checkout/${plan.id}${isYearly ? '?billing=yearly' : ''}`}
                className={`block w-full py-4 rounded-xl text-center font-semibold transition mb-8 ${
                  plan.highlighted
                    ? 'bg-indigo-500 text-white hover:bg-indigo-600'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                30 Tage kostenlos testen
              </Link>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-300 text-sm">
                  Das ist enthalten:
                </h3>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {feature.included !== false ? (
                        <svg className="w-5 h-5 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                      <span className={feature.included !== false ? 'text-gray-300' : 'text-gray-500'}>
                        {feature.name}
                        {feature.value && (
                          <span className="text-white font-medium ml-1">({feature.value})</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Feature Comparison */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Alle Pläne beinhalten</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Online-Buchung', desc: 'Kunden buchen direkt über Ihre Website' },
              { title: 'Automatische Erinnerungen', desc: 'E-Mails 24 Stunden vor dem Termin' },
              { title: 'Google-Bewertungen', desc: 'Automatische Anfrage nach dem Termin' },
              { title: 'Kalender-Sync', desc: 'Verbindung mit Google und Apple Kalender' },
              { title: 'Kundendatenbank', desc: 'Alle Kundendaten an einem Ort' },
              { title: 'DSGVO-konform', desc: 'Server in Deutschland, Daten sicher' },
              { title: 'Tägliche Backups', desc: 'Ihre Daten werden täglich gesichert' },
              { title: 'Einrichtungshilfe', desc: 'Wir helfen Ihnen beim Start' },
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Häufige Fragen</h2>
          
          <div className="space-y-3">
            {faqQuestions.map((faq, index) => (
              <div
                key={index}
                className={`bg-zinc-900 border rounded-xl overflow-hidden transition-colors ${
                  openFaq === index ? 'border-indigo-500' : 'border-zinc-800'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-4">Noch Fragen?</h2>
          <p className="text-gray-400 mb-6">
            Wir helfen Ihnen gerne weiter.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:support@jn-automation.de"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-Mail schreiben
            </a>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition-colors"
            >
              Demo ansehen
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
