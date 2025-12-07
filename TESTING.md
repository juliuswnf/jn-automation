# 🧪 Test-Dokumentation - JN Automation

## Überblick

Diese Dokumentation beschreibt die automatisierten Tests für das JN Automation Salon-Buchungssystem.

---

## 📁 Test-Struktur

```
jn-automation/
├── backend/
│   ├── jest.config.js           # Jest-Konfiguration
│   └── tests/
│       ├── setup.js             # Test-Setup
│       ├── mocks/
│       │   ├── models.js        # Mock-Datenmodelle
│       │   └── request.js       # Mock Request/Response
│       └── controllers/
│           ├── authController.test.js
│           ├── bookingController.test.js
│           └── paymentController.test.js
│
├── frontend/
│   ├── playwright.config.js     # Playwright-Konfiguration
│   └── e2e/
│       ├── fixtures.js          # Test-Fixtures & Helpers
│       ├── auth.spec.js         # Auth Flow Tests
│       ├── booking.spec.js      # Public Booking Tests
│       └── dashboard.spec.js    # Dashboard Tests
│
└── .github/
    └── workflows/
        └── ci.yml               # CI/CD Pipeline
```

---

## 🔧 Backend Unit Tests (Jest)

### Installation

```bash
cd backend
npm install
```

### Tests ausführen

```bash
# Alle Tests ausführen
npm test

# Tests im Watch-Mode
npm run test:watch

# Tests für CI (mit Coverage)
npm run test:ci
```

### Getestete Controller

#### 1. AuthController (5 Tests)
- ✅ Registrierung mit gültigen Daten
- ✅ Validierung fehlender Felder
- ✅ Passwort-Mindestlänge (8 Zeichen)
- ✅ Login mit gültigen Credentials
- ✅ Ablehnung bei deaktiviertem Account

#### 2. BookingController (8 Tests)
- ✅ Buchung erstellen mit gültigen Daten
- ✅ 400-Fehler bei fehlenden Pflichtfeldern
- ✅ 404-Fehler wenn Service nicht existiert
- ✅ 409-Konflikt bei Doppelbuchung
- ✅ Einzelne Buchung abrufen
- ✅ Buchungsliste mit Paginierung
- ✅ Buchung aktualisieren
- ✅ Buchung stornieren

#### 3. PaymentController (7 Tests)
- ✅ PaymentIntent erstellen
- ✅ Validierung ungültiger Beträge
- ✅ 404-Fehler wenn Booking nicht existiert
- ✅ Zahlung verarbeiten (succeeded)
- ✅ Ablehnung bei nicht erfolgreicher Zahlung
- ✅ Zahlungsstatus abrufen
- ✅ Rückerstattung durchführen

---

## 🎭 Frontend E2E Tests (Playwright)

### Installation

```bash
cd frontend
npm install
npx playwright install chromium
```

### Tests ausführen

```bash
# Alle E2E Tests
npm run test:e2e

# Mit Browser-UI (Debugging)
npm run test:e2e:ui

# Mit sichtbarem Browser
npm run test:e2e:headed

# Report anzeigen
npm run test:e2e:report
```

### Getestete Flows

#### 1. Public Booking Flow (7 Tests)
```
Customer → Salon-Seite → Service wählen → Zeit wählen → Buchung → Bestätigung
```
- ✅ Salon-Informationen anzeigen
- ✅ Verfügbare Services listen
- ✅ Service auswählen
- ✅ Formular-Validierung
- ✅ Vollständige Buchung durchführen
- ✅ Nicht verfügbare Slots blockieren
- ✅ Netzwerk-Fehler abfangen

#### 2. Authentication Flow (9 Tests)
```
User → Login/Register → Dashboard → Logout
```
- ✅ Login-Formular anzeigen
- ✅ Validierungsfehler bei leeren Feldern
- ✅ Fehler bei ungültigen Credentials
- ✅ Redirect zu Dashboard nach Login
- ✅ Registrierung mit E-Mail-Validierung
- ✅ Passwort-Stärke prüfen
- ✅ Session über Reload persistieren
- ✅ Logout funktioniert
- ✅ Geschützte Routen redirecten zu Login

#### 3. Dashboard & Booking Management (10 Tests)
```
Owner Login → Dashboard → Buchungen → Status ändern → Storno
```
- ✅ Dashboard nach Login anzeigen
- ✅ Buchungsstatistiken
- ✅ Onboarding-Checkliste (für neue Salons)
- ✅ Buchungslimit-Warnung
- ✅ Buchungsliste navigieren
- ✅ Nach Status filtern
- ✅ Nach Datum filtern
- ✅ Buchung bestätigen
- ✅ Buchung stornieren
- ✅ Responsive Navigation

---

## 🔄 CI/CD Pipeline

Die GitHub Actions Pipeline führt automatisch bei jedem Push/PR aus:

```yaml
Jobs:
1. backend-test      # Jest Unit Tests
2. frontend-build    # Vite Build
3. e2e-test          # Playwright E2E (nach 1+2)
4. security-scan     # npm audit
5. deploy            # Nur auf main Branch
```

### Trigger
- **Push** auf `main` oder `develop`
- **Pull Request** auf `main`

### Artifacts
- Coverage Report (Codecov)
- E2E Report (HTML)
- Screenshots bei Fehlern

## 📊 Test Coverage Status

### ✅ Backend Unit Tests: 48 Tests bestanden

| Test Suite | Tests | Status |
|------------|-------|--------|
| authLogic.test.js | 19 | ✅ Passed |
| bookingLogic.test.js | 11 | ✅ Passed |
| paymentLogic.test.js | 18 | ✅ Passed |

### 🎭 E2E Tests: 26 Test-Cases definiert

| Spec File | Tests | Flows |
|-----------|-------|-------|
| auth.spec.js | 9 | Login, Register, Session |
| booking.spec.js | 7 | Public Booking |
| dashboard.spec.js | 10 | Dashboard, Bookings |

---

## 📊 Test Coverage Ziele

| Phase | Unit Tests | E2E Tests | Gesamt |
|-------|------------|-----------|--------|
| MVP   | 30%        | 3 Flows   | ✅ Aktuell |
| v1.1  | 50%        | 5 Flows   | 🔄 Nächster Schritt |
| v2.0  | 70%        | 7 Flows   | 📋 Geplant |

---

## 🚀 Schnellstart für Entwickler

```bash
# 1. Backend Tests
cd backend
npm test

# 2. Frontend E2E Tests (Backend muss laufen!)
cd frontend
npm run test:e2e:headed

# 3. Gesamte Pipeline lokal testen
npm run test && cd ../frontend && npm run test:e2e
```

---

## ⚠️ Bekannte Einschränkungen

1. **E2E Tests brauchen laufenden Backend-Server**
2. **Playwright muss Chromium installiert haben**
3. **Test-Datenbank sollte isoliert sein (nicht Produktion!)**
4. **Stripe Tests verwenden Mock-Keys**

---

## 🔮 Roadmap

### Kurzfristig (Sprint 1-2)
- [ ] Integration Tests für API-Routen
- [ ] Visual Regression Tests
- [ ] Performance Tests

### Mittelfristig (Sprint 3-4)
- [ ] Load Tests mit k6
- [ ] Accessibility Tests (axe-core)
- [ ] Mobile App Tests

### Langfristig
- [ ] Chaos Engineering Tests
- [ ] Security Penetration Tests
- [ ] Multi-Tenant Isolation Tests
