import React from 'react';

export default function StudioDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Willkommen, Studio Name</h1>
      <p className="text-zinc-400 mt-2">Kurzübersicht und Kennzahlen folgen hier.</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="border border-zinc-800 rounded-xl p-4">Buchungen heute</div>
        <div className="border border-zinc-800 rounded-xl p-4">Buchungen diese Woche</div>
        <div className="border border-zinc-800 rounded-xl p-4">Durchschnittliche Bewertung</div>
        <div className="border border-zinc-800 rounded-xl p-4">Aktive Services</div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium">Letzte Buchungen</h3>
        <div className="mt-3 border border-zinc-800 rounded-lg p-4 text-zinc-400">Keine Einträge</div>
      </div>
    </div>
  );
}
