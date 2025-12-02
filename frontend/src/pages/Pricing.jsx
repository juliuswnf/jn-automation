import React, { useState } from 'react';
import FAQ from '../components/sections/FAQ';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: 9,
    yearly: 90,
    features: ['Einzelunternehmer', 'Basis-Widget', 'E-Mail-Benachrichtigungen']
  },
  {
    id: 'professional',
    name: 'Professional',
    monthly: 29,
    yearly: 290,
    features: ['Teams & Mitarbeiter', 'Erweitertes Widget', 'Integrationen']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthly: null,
    yearly: null,
    features: ['Custom SLAs', 'Priorisierter Support', 'Onboarding']
  }
];

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  const questions = [
    { question: 'Brauchen meine Kunden einen Account?', answer: 'Nein. Kunden können ohne Account Termine buchen; ein Account ist nur für Studios/Mitarbeiter notwendig.' },
    { question: 'Wie binde ich das Widget ein?', answer: 'Kopiere das Embed-Snippet aus dem Widget-Setup und füge es in deine Webseite ein (Anleitung im Dashboard).' },
    { question: 'Wie funktioniert der Google-Bewertungslink?', answer: 'Wir erzeugen pro Termin einen personalisierten Bewertungslink, der Kunden direkt zu Ihrer Google-Review-Seite führt.' }
  ];

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-3 bg-white/6 text-white rounded-full px-3 py-1 text-sm mb-4">14 Tage kostenlos testen</div>
        <h1 className="text-4xl font-bold">Transparente Preise für jeden Bedarf</h1>
        <p className="mt-4 text-zinc-400">Flexible Abrechnung, monatlich oder jährlich (2 Monate Rabatt).</p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className={`text-sm ${billing === 'monthly' ? 'text-white' : 'text-zinc-400'}`}>Monatlich</span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-14 h-7 bg-zinc-800 rounded-full p-1"
            aria-pressed={billing === 'yearly'}
          >
            <span className={`block w-5 h-5 bg-white rounded-full transform transition ${billing === 'yearly' ? 'translate-x-7' : ''}`} />
          </button>
          <span className={`text-sm ${billing === 'yearly' ? 'text-white' : 'text-zinc-400'}`}>Jährlich</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {plans.map((p) => (
          <div key={p.id} className="border border-zinc-800 rounded-xl p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              {p.id === 'professional' && <div className="text-sm text-zinc-300">Beliebt</div>}
            </div>

            <div className="mt-4 text-3xl font-bold">
              {p.monthly ? (
                billing === 'monthly' ? (
                  <>€{p.monthly}<span className="text-sm">/Monat</span></>
                ) : (
                  <>€{p.yearly}<span className="text-sm">/Jahr</span></>
                )
              ) : (
                <span className="text-sm">auf Anfrage</span>
              )}
            </div>

            <ul className="mt-4 text-sm text-zinc-400 space-y-2 flex-1">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-green-400 mt-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {p.id === 'enterprise' ? (
                <button className="w-full py-2 rounded-full border border-zinc-800 text-zinc-200">Kontakt</button>
              ) : (
                <button className="w-full py-2 rounded-full bg-white text-black font-semibold">Jetzt starten</button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">FAQ zu Preisen</h2>
        <FAQ questions={questions} />
      </div>
    </div>
  );
}
