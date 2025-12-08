import { useState } from 'react';
import { Link } from 'react-router-dom';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Für kleine Salons',
    price: 49,
    yearlyPrice: 39,
    features: [
      { name: 'Mitarbeiter', value: 'bis 2' },
      { name: 'Online-Buchungen', value: 'unbegrenzt' },
      { name: 'Automatische Erinnerungen' },
      { name: 'Google-Bewertungen' },
      { name: 'Kalender-Sync' },
      { name: 'E-Mail-Support' },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Für wachsende Salons',
    price: 99,
    yearlyPrice: 79,
    popular: true,
    features: [
      { name: 'Mitarbeiter', value: 'bis 5' },
      { name: 'Online-Buchungen', value: 'unbegrenzt' },
      { name: 'Automatische Erinnerungen' },
      { name: 'Google-Bewertungen' },
      { name: 'Kalender-Sync' },
      { name: 'SMS-Erinnerungen' },
      { name: 'Kundendatenbank' },
      { name: 'Prioritäts-Support' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Für große Betriebe',
    price: 199,
    yearlyPrice: 159,
    features: [
      { name: 'Mitarbeiter', value: 'unbegrenzt' },
      { name: 'Online-Buchungen', value: 'unbegrenzt' },
      { name: 'Automatische Erinnerungen' },
      { name: 'Google-Bewertungen' },
      { name: 'Kalender-Sync' },
      { name: 'SMS-Erinnerungen' },
      { name: 'Kundendatenbank' },
      { name: 'Multi-Standort' },
      { name: 'API-Zugang' },
      { name: 'Dedizierter Ansprechpartner' },
    ],
  },
];

const faq = [
  {
    q: 'Gibt es eine Testphase?',
    a: 'Ja, Sie können jeden Plan 30 Tage kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich.',
  },
  {
    q: 'Kann ich den Plan später wechseln?',
    a: 'Ja, Sie können jederzeit upgraden oder downgraden. Die Abrechnung wird automatisch angepasst.',
  },
  {
    q: 'Gibt es versteckte Kosten?',
    a: 'Nein. Der angezeigte Preis ist alles, was Sie zahlen. Keine Provisionen, keine Einrichtungsgebühren.',
  },
  {
    q: 'Wie funktioniert die Kündigung?',
    a: 'Sie können monatlich kündigen - ohne Mindestlaufzeit und ohne Kündigungsfrist.',
  },
  {
    q: 'Bekomme ich Hilfe bei der Einrichtung?',
    a: 'Ja, wir helfen Ihnen kostenlos bei der Einrichtung. Per Videocall oder E-Mail.',
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Preise</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Keine versteckten Kosten. Keine Provisionen. 
            Sie behalten 100% Ihrer Einnahmen.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={yearly ? 'text-gray-500' : 'text-white'}>Monatlich</span>
          <button
            onClick={() => setYearly(!yearly)}
            className="w-12 h-6 bg-zinc-800 rounded-full relative"
          >
            <div 
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${
                yearly ? 'left-6' : 'left-0.5'
              }`} 
            />
          </button>
          <span className={yearly ? 'text-white' : 'text-gray-500'}>
            Jährlich <span className="text-sm text-gray-400">(20% sparen)</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 ${
                plan.popular 
                  ? 'border-white bg-zinc-900' 
                  : 'border-zinc-800 bg-zinc-900/50'
              }`}
            >
              {plan.popular && (
                <span className="inline-block text-xs font-medium bg-white text-black px-2 py-1 rounded mb-4">
                  Beliebt
                </span>
              )}
              
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {yearly ? plan.yearlyPrice : plan.price}€
                </span>
                <span className="text-gray-500"> / Monat</span>
                <p className="text-xs text-gray-600 mt-1">zzgl. MwSt.</p>
              </div>

              <Link
                to={`/checkout/${plan.id}${yearly ? '?billing=yearly' : ''}`}
                className={`block w-full py-3 rounded text-center text-sm font-medium transition mb-6 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                30 Tage kostenlos testen
              </Link>

              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">
                      {f.name}
                      {f.value && <span className="text-white"> ({f.value})</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* All Plans Include */}
        <div className="mb-20">
          <h2 className="text-xl font-semibold text-center mb-8">
            In allen Plänen enthalten
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'Online-Buchung rund um die Uhr',
              'Automatische Termin-Erinnerungen',
              'Google-Bewertungen sammeln',
              'Kalender-Synchronisation',
              'Kundendatenbank',
              'DSGVO-konform',
              'Tägliche Backups',
              'Kostenlose Einrichtung',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mb-20">
          <h2 className="text-xl font-semibold text-center mb-8">Häufige Fragen</h2>
          <div className="space-y-2">
            {faq.map((item, i) => (
              <div key={i} className="border border-zinc-800 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <span className="text-sm font-medium">{item.q}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-400">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center border border-zinc-800 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-2">Noch Fragen?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Schreiben Sie uns - wir antworten innerhalb von 24 Stunden.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="mailto:support@jn-automation.de"
              className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition"
            >
              E-Mail schreiben
            </a>
            <Link
              to="/demo"
              className="px-5 py-2 bg-white text-black hover:bg-gray-100 rounded text-sm transition"
            >
              Demo ansehen
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
