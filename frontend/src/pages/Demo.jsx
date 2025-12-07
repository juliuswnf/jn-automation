import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Check, 
  ChevronRight, 
  User, 
  Mail, 
  Phone,
  Scissors,
  Sparkles,
  Star,
  Play,
  ArrowRight
} from 'lucide-react';

/**
 * Interactive Demo Page
 * Allows visitors to experience the booking widget without registration
 */

// Demo salon data
const DEMO_SALON = {
  name: 'Muster Salon',
  logo: null,
  services: [
    { id: 1, name: 'Haarschnitt Damen', duration: 45, price: 45 },
    { id: 2, name: 'Haarschnitt Herren', duration: 30, price: 28 },
    { id: 3, name: 'Färben komplett', duration: 120, price: 85 },
    { id: 4, name: 'Balayage / Highlights', duration: 150, price: 120 },
    { id: 5, name: 'Waschen & Föhnen', duration: 30, price: 25 },
    { id: 6, name: 'Styling / Hochsteckfrisur', duration: 60, price: 55 },
  ],
  employees: [
    { id: 1, name: 'Julia M.', avatar: null },
    { id: 2, name: 'Marco S.', avatar: null },
    { id: 3, name: 'Lisa K.', avatar: null },
  ]
};

// Generate demo time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour <= 18; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`);
    if (hour < 18) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }
  return slots;
};

// Generate next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const Demo = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerData, setCustomerData] = useState({ name: '', email: '', phone: '' });
  const [isBooked, setIsBooked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const timeSlots = generateTimeSlots();
  const dates = generateDates();

  const handleBook = () => {
    setIsBooked(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const resetDemo = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedEmployee(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerData({ name: '', email: '', phone: '' });
    setIsBooked(false);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <div 
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  🎮 Interaktive Demo
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Erlebe JN Automation live
              </h1>
              <p className="text-gray-400 mt-2">
                Teste das Buchungswidget – genau so wie deine Kunden es sehen werden
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/pricing"
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                30 Tage kostenlos
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Interactive Widget */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
              {/* Widget Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{DEMO_SALON.name}</h2>
                    <p className="text-white/70 text-sm">Online Terminbuchung</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex border-b border-gray-800">
                {['Service', 'Termin', 'Daten', 'Fertig'].map((label, idx) => (
                  <div 
                    key={label}
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                      step > idx + 1 ? 'bg-green-500/10 text-green-400' :
                      step === idx + 1 ? 'bg-indigo-500/10 text-indigo-400' :
                      'text-gray-500'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2 ${
                      step > idx + 1 ? 'bg-green-500 text-white' :
                      step === idx + 1 ? 'bg-indigo-500 text-white' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {step > idx + 1 ? <Check className="w-3 h-3" /> : idx + 1}
                    </span>
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                ))}
              </div>

              {/* Widget Content */}
              <div className="p-6">
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Wähle eine Behandlung</h3>
                    <div className="space-y-2">
                      {DEMO_SALON.services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setSelectedService(service);
                            setStep(2);
                          }}
                          className={`w-full p-4 rounded-xl border transition-all text-left flex items-center justify-between group hover:border-indigo-500 hover:bg-indigo-500/5 ${
                            selectedService?.id === service.id 
                              ? 'border-indigo-500 bg-indigo-500/10' 
                              : 'border-gray-700 bg-gray-800/50'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-white">{service.name}</div>
                            <div className="text-sm text-gray-400">{service.duration} Min.</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-white">€{service.price}</span>
                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time Selection */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <button onClick={() => setStep(1)} className="hover:text-white">
                        ← Zurück
                      </button>
                      <span>|</span>
                      <span className="text-indigo-400">{selectedService?.name}</span>
                    </div>

                    {/* Employee Selection */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Mitarbeiter (optional)</h4>
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => setSelectedEmployee(null)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            !selectedEmployee ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          Egal
                        </button>
                        {DEMO_SALON.employees.map((emp) => (
                          <button
                            key={emp.id}
                            onClick={() => setSelectedEmployee(emp)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              selectedEmployee?.id === emp.id ? 'bg-indigo-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            {emp.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Datum wählen</h4>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {dates.map((date, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(date)}
                            className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${
                              selectedDate?.toDateString() === date.toDateString()
                                ? 'bg-indigo-500 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                          >
                            <div className="text-xs opacity-70">{date.toLocaleDateString('de-DE', { weekday: 'short' })}</div>
                            <div className="text-lg font-bold">{date.getDate()}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-3">Uhrzeit wählen</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.slice(0, 12).map((time) => (
                            <button
                              key={time}
                              onClick={() => {
                                setSelectedTime(time);
                                setStep(3);
                              }}
                              className={`py-2 rounded-lg text-sm transition-all ${
                                selectedTime === time
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Customer Data */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <button onClick={() => setStep(2)} className="hover:text-white">
                        ← Zurück
                      </button>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-800/50 rounded-xl p-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Deine Auswahl</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Service:</span>
                          <span className="text-white font-medium">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Datum:</span>
                          <span className="text-white">{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Uhrzeit:</span>
                          <span className="text-white">{selectedTime} Uhr</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-700 mt-2">
                          <span className="text-gray-400">Preis:</span>
                          <span className="text-white font-bold">€{selectedService?.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            value={customerData.name}
                            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                            placeholder="Max Mustermann"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">E-Mail *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="email"
                            value={customerData.email}
                            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                            placeholder="max@beispiel.de"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Telefon (optional)</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            value={customerData.phone}
                            onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                            placeholder="+49 123 456789"
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleBook}
                      disabled={!customerData.name || !customerData.email}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Termin verbindlich buchen
                    </button>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {isBooked && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Termin bestätigt! 🎉
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Eine Bestätigung wurde an {customerData.email || 'deine E-Mail'} gesendet.
                    </p>
                    
                    <div className="bg-gray-800/50 rounded-xl p-4 mb-6 text-left">
                      <div className="text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Service:</span>
                          <span className="text-white">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Wann:</span>
                          <span className="text-white">{formatDate(selectedDate)}, {selectedTime} Uhr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Wo:</span>
                          <span className="text-white">{DEMO_SALON.name}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={resetDemo}
                      className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      Demo nochmal starten
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Demo Note */}
            <div className="mt-4 text-center text-sm text-gray-500">
              💡 Dies ist eine Demo – keine echte Buchung wird erstellt
            </div>
          </div>

          {/* Right: Features & CTA */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Video/Screenshot placeholder */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl p-8 border border-indigo-500/20">
              <h3 className="text-xl font-bold mb-4">So einfach geht's</h3>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Widget einbinden', desc: 'Code-Snippet auf deine Website kopieren' },
                  { step: 2, title: 'Services anlegen', desc: 'Behandlungen mit Preisen & Dauer definieren' },
                  { step: 3, title: 'Kunden buchen online', desc: '24/7 ohne Anruf oder WhatsApp' },
                  { step: 4, title: 'Automatische E-Mails', desc: 'Bestätigung, Erinnerung, Bewertungsanfrage' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid gap-4">
              {[
                { icon: Clock, title: '5 Minuten Setup', desc: 'Widget sofort einsatzbereit' },
                { icon: Star, title: 'Mehr Google-Bewertungen', desc: 'Automatische Anfrage nach Termin' },
                { icon: Sparkles, title: 'Keine Provisionen', desc: 'Fixpreis statt % von Buchungen' },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{benefit.title}</div>
                    <div className="text-sm text-gray-400">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Bereit für dein Studio?</h3>
              <p className="text-white/80 mb-4">30 Tage kostenlos testen – keine Kreditkarte nötig</p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Jetzt starten
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Testimonial */}
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-4">
                "Endlich keine verpassten Anrufe mehr. Meine Kunden buchen jetzt online und ich spare 2 Stunden pro Tag."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                  SK
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Sarah K.</div>
                  <div className="text-xs text-gray-500">Kosmetikstudio München</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
