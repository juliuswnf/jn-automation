import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & CTAs */}
            <div className="space-y-8">
              {/* Trust badge above headline */}
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 rounded-full px-4 py-2 text-sm font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Jetzt 30 Tage kostenlos testen
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Mehr Buchungen.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Weniger Aufwand.
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                Das Buchungssystem für Salons & Studios. Kunden buchen online in 30 Sekunden — 
                <span className="text-white font-semibold"> ohne App, ohne Registrierung.</span>
              </p>

              {/* Value proposition bullets */}
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Keine Provisionen — du behältst 100% deiner Einnahmen</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Automatische E-Mail-Erinnerungen & Google Reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>In 5 Minuten eingerichtet — keine IT-Kenntnisse nötig</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all"
                >
                  30 Tage kostenlos testen
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link
                  to="/demo"
                  className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-700 text-gray-200 hover:bg-white/5 hover:border-gray-600 transition-all"
                >
                  <svg className="w-5 h-5 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Live Demo ansehen
                </Link>
              </div>

              {/* Micro-trust */}
              <p className="text-sm text-gray-500">
                Keine Kreditkarte erforderlich • Jederzeit kündbar • DSGVO-konform
              </p>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main dashboard preview */}
                <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                  {/* Header bar */}
                  <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                        <span className="text-indigo-400 font-bold text-sm">JN</span>
                      </div>
                      <span className="text-sm font-medium text-gray-300">Studio Dashboard</span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-gray-700" />
                      <div className="w-3 h-3 rounded-full bg-gray-700" />
                      <div className="w-3 h-3 rounded-full bg-gray-700" />
                    </div>
                  </div>
                  
                  {/* Dashboard content */}
                  <div className="p-4 space-y-4">
                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-white">47</div>
                        <div className="text-xs text-gray-400">Buchungen</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-400">€2.340</div>
                        <div className="text-xs text-gray-400">Umsatz</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-yellow-400">4.8</div>
                        <div className="text-xs text-gray-400">Rating</div>
                      </div>
                    </div>
                    
                    {/* Upcoming bookings */}
                    <div>
                      <div className="text-xs text-gray-400 mb-2">Heute</div>
                      <div className="space-y-2">
                        <div className="bg-gray-800/30 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-medium">MH</div>
                            <div>
                              <div className="text-sm font-medium text-white">Maria H.</div>
                              <div className="text-xs text-gray-400">Haarschnitt • 10:30</div>
                            </div>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Bestätigt</span>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-3 flex items-center justify-between animate-pulse">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-medium">SK</div>
                            <div>
                              <div className="text-sm font-medium text-white">Sophie K.</div>
                              <div className="text-xs text-gray-400">Färben • 14:00</div>
                            </div>
                          </div>
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">Neu</span>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 text-xs font-medium">LM</div>
                            <div>
                              <div className="text-sm font-medium text-white">Lisa M.</div>
                              <div className="text-xs text-gray-400">Styling • 16:30</div>
                            </div>
                          </div>
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Bestätigt</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification card */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-900">Neue Buchung!</div>
                      <div className="text-xs text-gray-500">vor 2 Minuten</div>
                    </div>
                  </div>
                </div>

                {/* Floating review card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-900">+12 Reviews</span>
                  </div>
                </div>

                {/* Custom animation */}
                <style>{`
                  @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                  }
                  .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-white">DSGVO-konform</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
              </svg>
              <span className="font-medium text-white">Server in Deutschland</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium text-white">Deutscher Support</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-white">30 Tage Geld-zurück</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              In 3 Schritten startklar
            </h2>
            <p className="text-gray-400 text-lg">
              Keine IT-Kenntnisse nötig. Wir helfen dir beim Einrichten.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-500/50 flex items-center justify-center text-2xl font-bold text-indigo-400 mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Account erstellen</h3>
              <p className="text-gray-400">
                30 Tage kostenlos. Keine Kreditkarte. In 2 Minuten eingerichtet.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-500/50 flex items-center justify-center text-2xl font-bold text-purple-400 mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Services & Zeiten eintragen</h3>
              <p className="text-gray-400">
                Deine Dienstleistungen, Preise und Verfügbarkeiten hinterlegen.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center text-2xl font-bold text-green-400 mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Widget einbinden</h3>
              <p className="text-gray-400">
                Code-Snippet kopieren, auf deine Website einfügen — fertig!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
            >
              Jetzt kostenlos starten
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Warum Studios zu JN wechseln
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Das sagen Studio-Inhaber über die häufigsten Probleme mit anderen Buchungssystemen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem 1 */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-red-400">Das Problem mit Fresha & Co.</h3>
              <p className="text-gray-300 leading-relaxed">
                "Provisionen von 20% pro Buchung. Bei 100 Buchungen à €50 sind das <span className="text-white font-semibold">€1.000/Monat</span> die du verlierst."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  JN: 0% Provision — fester Monatspreis
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-orange-400">Das Problem mit Apps</h3>
              <p className="text-gray-300 leading-relaxed">
                "Kunden müssen eine App installieren und einen Account erstellen. <span className="text-white font-semibold">Viele brechen ab</span> bevor sie buchen."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  JN: Buchung in 30 Sek. — ohne Account
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">Das Problem mit Reviews</h3>
              <p className="text-gray-300 leading-relaxed">
                "Du musst Kunden manuell nach Bewertungen fragen. <span className="text-white font-semibold">Die meisten vergessen es</span> einfach."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  JN: Automatische Review-Anfrage nach Termin
                </div>
              </div>
            </div>
          </div>

          {/* Honest CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Werde einer der ersten 50 Studios</div>
                <div className="text-sm text-gray-400">Early Adopter bekommen persönlichen Onboarding-Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Bereit, mehr zu verdienen?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Starte heute mit 30 Tagen kostenlos. Keine Kreditkarte. 
            Kein Risiko. Jederzeit kündbar.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors"
            >
              Kostenlos starten
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-gray-600 text-gray-200 hover:bg-white/5 transition-colors"
            >
              Preise ansehen
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30 Tage kostenlos
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keine Kreditkarte
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Geld-zurück-Garantie
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
