import React from 'react';

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Transparente Preise für jeden Bedarf</h1>
        <p className="mt-4 text-zinc-400">14 Tage kostenlos testen. Monatlich kündbar.</p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        <div className="border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold">Starter</h3>
          <div className="mt-4 text-3xl font-bold">€9<span className="text-sm">/Monat</span></div>
          <ul className="mt-4 text-sm text-zinc-400 space-y-2">
            <li>Einzelunternehmer</li>
            <li>Basis-Widget</li>
            <li>Email-Benachrichtigungen</li>
          </ul>
        </div>

        <div className="border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold">Professional</h3>
          <div className="mt-4 text-3xl font-bold">€29<span className="text-sm">/Monat</span></div>
          <ul className="mt-4 text-sm text-zinc-400 space-y-2">
            <li>Teams & Mitarbeiter</li>
            <li>Erweitertes Widget</li>
            <li>Integrationen</li>
          </ul>
        </div>

        <div className="border border-zinc-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold">Enterprise</h3>
          <div className="mt-4 text-3xl font-bold">auf Anfrage</div>
          <ul className="mt-4 text-sm text-zinc-400 space-y-2">
            <li>Custom SLAs</li>
            <li>Priorisierter Support</li>
            <li>Onboarding</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
