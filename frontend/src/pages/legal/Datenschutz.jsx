import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, ServerIcon, LockClosedIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline';

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 inline-block">
            ← Zurück zur Startseite
          </Link>
          <h1 className="text-4xl font-bold mb-4">Datenschutzerklärung</h1>
          <p className="text-gray-400">
            Stand: Dezember 2025 | Zuletzt aktualisiert: 07.12.2025
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <ShieldCheckIcon className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">DSGVO-konform</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <ServerIcon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">Server in Deutschland</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <LockClosedIcon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">SSL-verschlüsselt</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <GlobeEuropeAfricaIcon className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-white">EU-Datenhaltung</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Verantwortlicher</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">JN Automation</strong><br />
                Julius Wagenfeldt<br />
                [Adresse einfügen]<br />
                [PLZ Stadt]<br />
                Deutschland
              </p>
              <p className="text-gray-300">
                E-Mail: <a href="mailto:datenschutz@jn-automation.de" className="text-indigo-400 hover:text-indigo-300">datenschutz@jn-automation.de</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Welche Daten wir erheben</h2>
            
            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.1 Bei der Registrierung (Salon-Betreiber)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Name und E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Studio-Name und Adresse</li>
              <li>Zahlungsinformationen (über Stripe verarbeitet)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.2 Bei der Terminbuchung (Endkunden)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Name und E-Mail-Adresse</li>
              <li>Telefonnummer (optional)</li>
              <li>Gebuchter Service und Zeitpunkt</li>
              <li>Eventuelle Notizen zum Termin</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">2.3 Automatisch erfasste Daten</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>IP-Adresse (anonymisiert nach 7 Tagen)</li>
              <li>Browser-Typ und Betriebssystem</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Referrer-URL</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">3. Zweck der Datenverarbeitung</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO)</h4>
                <p className="text-gray-300 text-sm">Bereitstellung der Buchungsplattform, Terminverwaltung, Versand von Bestätigungs- und Erinnerungs-E-Mails</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)</h4>
                <p className="text-gray-300 text-sm">Verbesserung unserer Dienste, Betrugsprävention, technische Sicherheit</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)</h4>
                <p className="text-gray-300 text-sm">Marketing-E-Mails (nur mit expliziter Zustimmung, jederzeit widerrufbar)</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Speicherdauer</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left py-3 text-white">Datentyp</th>
                    <th className="text-left py-3 text-white">Speicherdauer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="py-3">Buchungsdaten</td>
                    <td className="py-3">3 Jahre nach letztem Termin</td>
                  </tr>
                  <tr>
                    <td className="py-3">Account-Daten</td>
                    <td className="py-3">Bis zur Kontolöschung + 30 Tage</td>
                  </tr>
                  <tr>
                    <td className="py-3">Rechnungsdaten</td>
                    <td className="py-3">10 Jahre (gesetzliche Aufbewahrungspflicht)</td>
                  </tr>
                  <tr>
                    <td className="py-3">Server-Logs</td>
                    <td className="py-3">7 Tage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Datenempfänger & Auftragsverarbeiter</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Hosting & Infrastruktur</h4>
                <p className="text-gray-300 text-sm">Server in Frankfurt, Deutschland (EU)</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">Stripe (Zahlungsabwicklung)</h4>
                <p className="text-gray-300 text-sm">Stripe Payments Europe, Ltd. (Irland) - PCI-DSS zertifiziert</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">E-Mail-Versand</h4>
                <p className="text-gray-300 text-sm">Transaktionale E-Mails über EU-Server</p>
              </div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Mit allen Auftragsverarbeitern wurden Verträge gemäß Art. 28 DSGVO geschlossen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Ihre Rechte</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">📋 Auskunftsrecht</h4>
                <p className="text-gray-300 text-sm">Sie können jederzeit Auskunft über Ihre gespeicherten Daten verlangen.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">✏️ Berichtigung</h4>
                <p className="text-gray-300 text-sm">Sie können die Berichtigung unrichtiger Daten verlangen.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🗑️ Löschung</h4>
                <p className="text-gray-300 text-sm">Sie können die Löschung Ihrer Daten verlangen.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">📦 Datenübertragbarkeit</h4>
                <p className="text-gray-300 text-sm">Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">🚫 Widerspruch</h4>
                <p className="text-gray-300 text-sm">Sie können der Verarbeitung Ihrer Daten widersprechen.</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">⚖️ Beschwerde</h4>
                <p className="text-gray-300 text-sm">Sie können sich bei einer Aufsichtsbehörde beschweren.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies</h2>
            <p className="text-gray-300 mb-4">
              Wir verwenden ausschließlich technisch notwendige Cookies:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="text-left py-3 text-white">Cookie</th>
                    <th className="text-left py-3 text-white">Zweck</th>
                    <th className="text-left py-3 text-white">Dauer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="py-3 font-mono text-sm">jnAuthToken</td>
                    <td className="py-3">Login-Session</td>
                    <td className="py-3">7 Tage</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono text-sm">cookieConsent</td>
                    <td className="py-3">Cookie-Einwilligung</td>
                    <td className="py-3">1 Jahr</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Wir verwenden keine Marketing- oder Tracking-Cookies von Drittanbietern.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">8. Datensicherheit</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>SSL/TLS-Verschlüsselung für alle Datenübertragungen</li>
              <li>Verschlüsselte Passwort-Speicherung (bcrypt)</li>
              <li>Regelmäßige Sicherheits-Updates</li>
              <li>Tägliche automatische Backups</li>
              <li>Zwei-Faktor-Authentifizierung für Admin-Accounts</li>
              <li>Zugriffsbeschränkung nach dem Prinzip der minimalen Rechte</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Kontakt für Datenschutzanfragen</h2>
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                Für alle Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte:
              </p>
              <p className="text-white">
                <strong>E-Mail:</strong>{' '}
                <a href="mailto:datenschutz@jn-automation.de" className="text-indigo-400 hover:text-indigo-300">
                  datenschutz@jn-automation.de
                </a>
              </p>
              <p className="text-gray-400 text-sm mt-4">
                Wir werden Ihre Anfrage innerhalb von 30 Tagen bearbeiten.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex justify-between items-center">
          <Link to="/impressum" className="text-indigo-400 hover:text-indigo-300">
            Impressum
          </Link>
          <Link to="/agb" className="text-indigo-400 hover:text-indigo-300">
            AGB
          </Link>
        </div>
      </div>
    </div>
  );
}
