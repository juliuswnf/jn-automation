import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section - Clean and simple */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Online-Buchungssystem für Salons
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kunden buchen Termine direkt über Ihre Website. 
            Automatische Erinnerungen, einfache Verwaltung, faire Preise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/register"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              30 Tage kostenlos testen
            </Link>
            <Link
              to="/demo"
              className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Demo ansehen
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Keine Kreditkarte erforderlich · Jederzeit kündbar
          </p>
        </div>
      </section>

      {/* Simple Features */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">So funktioniert es</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Account erstellen</h3>
              <p className="text-gray-600 text-sm">
                Registrieren Sie sich kostenlos und richten Sie Ihr Studio in wenigen Minuten ein.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Services eintragen</h3>
              <p className="text-gray-600 text-sm">
                Fügen Sie Ihre Dienstleistungen mit Preisen und Zeitdauer hinzu.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Buchungen empfangen</h3>
              <p className="text-gray-600 text-sm">
                Kunden buchen über Ihre Website, Sie verwalten alles im Dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Warum JN Business System?</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Keine Provisionen</h3>
                <p className="text-gray-600">Sie zahlen nur den monatlichen Festpreis. Keine versteckten Gebühren pro Buchung.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Automatische Erinnerungen</h3>
                <p className="text-gray-600">Kunden erhalten automatisch Termin-Erinnerungen per E-Mail. Weniger No-Shows.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Einfaches Widget</h3>
                <p className="text-gray-600">Ein Code-Snippet auf Ihrer Website und Kunden können direkt buchen.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Google Bewertungen</h3>
                <p className="text-gray-600">Nach jedem Termin wird automatisch um eine Google-Bewertung gebeten.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">DSGVO-konform</h3>
                <p className="text-gray-600">Server in Deutschland, alle Daten sicher und datenschutzkonform gespeichert.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Einfache Preisgestaltung</h2>
          <p className="text-gray-600 mb-8">
            Ab 49€ pro Monat. Keine versteckten Kosten, keine Provisionen.
          </p>
          
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-4xl font-bold mb-2">ab 49€</div>
            <div className="text-gray-500 mb-6">pro Monat</div>
            <ul className="text-left space-y-3 mb-8">
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Online-Buchungen
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                E-Mail-Erinnerungen
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Eigenes Buchungswidget
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30 Tage kostenlos testen
              </li>
            </ul>
            <Link
              to="/pricing"
              className="block w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition text-center"
            >
              Alle Tarife ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Bereit loszulegen?</h2>
          <p className="text-gray-600 mb-8">
            Testen Sie JN Business System 30 Tage kostenlos. Keine Kreditkarte erforderlich.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Kostenlos registrieren
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2024 JN Business System. Alle Rechte vorbehalten.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/impressum" className="text-gray-500 hover:text-gray-900">Impressum</Link>
              <Link to="/datenschutz" className="text-gray-500 hover:text-gray-900">Datenschutz</Link>
              <Link to="/agb" className="text-gray-500 hover:text-gray-900">AGB</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
