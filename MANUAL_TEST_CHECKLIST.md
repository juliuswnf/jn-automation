# 🧪 Kritische Flows - Manuelle Test-Checkliste

## Testumgebung
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Safari Mobile (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Langsames Netz (3G Throttling)

---

## Flow 1: Owner Registration → Onboarding → Erste Buchung

### 1.1 Registration
- [ ] `/pricing` - Plan auswählen (Starter/Pro)
- [ ] `/checkout/:planId` - Checkout-Seite lädt
- [ ] Formular: Alle Pflichtfelder validiert
- [ ] Formular: E-Mail Format wird geprüft
- [ ] Formular: Passwort min. 8 Zeichen
- [ ] Formular: AGBs müssen akzeptiert werden
- [ ] Submit: Loading-State sichtbar
- [ ] Submit: Erfolg → Weiterleitung zu `/onboarding`
- [ ] Submit: Fehler → Fehlermeldung sichtbar
- [ ] Doppelklick auf Submit verhindert

### 1.2 Onboarding Wizard
- [ ] Schritt 1: Studio-Info (Name*, Email*, Telefon)
- [ ] Schritt 2: Adresse (Straße, PLZ, Stadt*)
- [ ] Schritt 3: Öffnungszeiten (Checkbox + Zeiten)
- [ ] Schritt 4: Services (Name, Dauer, Preis)
- [ ] Schritt 4: Service-Vorlage funktioniert
- [ ] Schritt 5: Google Review Link (optional)
- [ ] Schritt 6: Widget-Code kopieren funktioniert
- [ ] "Zurück"-Button funktioniert
- [ ] "Später fortsetzen" speichert Fortschritt
- [ ] Fertig → Weiterleitung zu `/dashboard`

### 1.3 Dashboard & Widget
- [ ] Dashboard zeigt Onboarding-Checklist (falls unvollständig)
- [ ] `/dashboard/widget` - Widget-Code sichtbar
- [ ] Buchungs-URL funktioniert: `/s/{slug}`
- [ ] Widget-Embed-Code funktioniert auf externer Seite

### 1.4 Erste Buchung empfangen
- [ ] Buchung erscheint in `/dashboard/bookings`
- [ ] Buchungsdetails korrekt (Service, Zeit, Kunde)
- [ ] Status: "Ausstehend" oder "Bestätigt"
- [ ] Bestätigungs-Email an Kunden gesendet

---

## Flow 2: Kunde bucht über Public Widget

### 2.1 Public Booking Page `/s/{slug}`
- [ ] Seite lädt ohne Login
- [ ] Salon-Info sichtbar (Name, Adresse)
- [ ] Services werden geladen
- [ ] Mindestens 1 Service wählbar

### 2.2 Buchungsprozess
- [ ] Service auswählen → weiter
- [ ] Kalender zeigt verfügbare Tage
- [ ] Zeiten werden basierend auf Öffnungszeiten angezeigt
- [ ] Bereits gebuchte Zeiten sind blockiert
- [ ] Datum wählen → weiter
- [ ] Zeit wählen → weiter

### 2.3 Kundendaten
- [ ] Name Pflichtfeld
- [ ] Email Pflichtfeld + Format-Validierung
- [ ] Telefon Pflichtfeld
- [ ] Fehlermeldungen bei leeren Feldern
- [ ] Fehlermeldung bei ungültiger Email

### 2.4 Fehlerfälle
- [ ] Abbruch und erneuter Versuch möglich
- [ ] Zurück-Navigation funktioniert
- [ ] Doppelte Buchung verhindert
- [ ] Zeitslot bereits gebucht → Fehlermeldung
- [ ] Server-Fehler → saubere Fehlermeldung

### 2.5 Erfolg
- [ ] Bestätigungsseite angezeigt
- [ ] Buchungsdetails sichtbar
- [ ] Email-Bestätigung gesendet
- [ ] Option: Termin zum Kalender hinzufügen

---

## Flow 3: No-Show & Reminder Flow

### 3.1 Buchung erstellen
- [ ] Buchung für morgen erstellen
- [ ] Buchung in DB mit Status "confirmed"

### 3.2 Reminder (24h vorher)
- [ ] Cronjob läuft: `sendBookingReminders`
- [ ] Reminder-Email wird gesendet
- [ ] Email enthält: Datum, Zeit, Service, Adresse
- [ ] Link zum Stornieren/Umbuchen (falls implementiert)

### 3.3 Stornierung
- [ ] Kunde kann stornieren (falls Link vorhanden)
- [ ] Owner kann stornieren im Dashboard
- [ ] Status ändert sich zu "cancelled"
- [ ] Stornierungsmail an Kunden

### 3.4 No-Show markieren
- [ ] Owner kann Buchung als "no-show" markieren
- [ ] Status wird gespeichert
- [ ] (Future: No-Show-Statistik)

### 3.5 Review Request (2h nach Termin)
- [ ] Cronjob läuft: `sendReviewRequests`
- [ ] Review-Email wird gesendet
- [ ] Email enthält Google Review Link
- [ ] Nur bei completed Bookings

---

## Flow 4: Stripe Subscription

### 4.1 Plan wählen
- [ ] `/pricing` zeigt Starter & Pro
- [ ] Features klar unterscheidbar
- [ ] "14 Tage kostenlos" sichtbar
- [ ] CTA führt zu Checkout

### 4.2 Checkout
- [ ] Stripe Checkout lädt
- [ ] Testmodus: 4242 4242 4242 4242
- [ ] Erfolg → Webhook empfangen
- [ ] User-Status: subscription.status = 'active'

### 4.3 Abo aktiv
- [ ] Dashboard zeigt Plan-Info
- [ ] Starter: Max 100 Buchungen/Monat
- [ ] Pro: Unbegrenzte Buchungen
- [ ] Upgrade-Option sichtbar (Starter)

### 4.4 Limits
- [ ] Starter: 100 Buchungen erreicht → Warnung
- [ ] Starter: >100 → Upgrade erforderlich
- [ ] Pro: Keine Limits

### 4.5 Kündigung
- [ ] Kündigen-Button im Dashboard
- [ ] Stripe Subscription cancelled
- [ ] Zugriff bis Periodenende
- [ ] Nach Ablauf: subscription.status = 'canceled'

---

## Flow 5: Rollen & Berechtigungen

### 5.1 Customer Role
- [ ] Login: `/login/customer`
- [ ] Sieht nur: `/customer/dashboard`
- [ ] Kann NICHT auf `/dashboard` zugreifen
- [ ] Kann NICHT auf `/ceo/dashboard` zugreifen
- [ ] Sieht nur eigene Buchungen
- [ ] Kann eigene Daten bearbeiten

### 5.2 Salon Owner Role
- [ ] Login: `/login/business`
- [ ] Sieht: `/dashboard`, `/dashboard/*`
- [ ] Kann NICHT auf `/ceo/dashboard` zugreifen
- [ ] Sieht nur eigene Salon-Daten
- [ ] Kann Services/Bookings/Settings bearbeiten
- [ ] Kann Mitarbeiter einladen (Pro)

### 5.3 Employee Role
- [ ] Login: `/login/business` (oder Employee-Login)
- [ ] Eingeschränkte Dashboard-Ansicht
- [ ] Sieht nur zugewiesene Buchungen
- [ ] Kann NICHT Settings ändern
- [ ] Kann NICHT Services löschen

### 5.4 CEO Role
- [ ] Login: `/system/admin` (versteckt)
- [ ] Sieht: `/ceo/dashboard`
- [ ] Sieht ALLE Salons
- [ ] Sieht ALLE Buchungen
- [ ] Kann Salons suspendieren
- [ ] Kann Subscriptions verwalten

### 5.5 API Security
- [ ] Unautorisierter Zugriff → 401
- [ ] Falscher Role → 403
- [ ] Tenant-Isolation: Kein Cross-Salon Zugriff
- [ ] Rate Limiting funktioniert

---

## Flow 6: Mobile Responsiveness

### 6.1 Landing Page `/`
- [ ] Hero-Section lesbar
- [ ] Navigation: Hamburger-Menu
- [ ] CTA-Buttons klickbar
- [ ] Keine horizontale Scrollbar

### 6.2 Dashboard (Mobile)
- [ ] Sidebar als Overlay/Drawer
- [ ] Stats-Cards gestapelt
- [ ] Tabellen scrollbar
- [ ] Actions erreichbar

### 6.3 Booking Widget (Mobile)
- [ ] Volle Breite
- [ ] Touch-freundliche Buttons
- [ ] Kalender-Picker funktioniert
- [ ] Formular-Inputs nicht zu klein

### 6.4 Onboarding (Mobile)
- [ ] Steps-Indicator sichtbar
- [ ] Inputs volle Breite
- [ ] Weiter/Zurück Buttons erreichbar

---

## Flow 7: Error Handling & Edge Cases

### 7.1 Netzwerkfehler
- [ ] Offline → Fehlermeldung
- [ ] Timeout → Retry-Option
- [ ] 500 Error → User-freundliche Meldung

### 7.2 Session/Token
- [ ] Token abgelaufen → Auto-Refresh
- [ ] Refresh Token abgelaufen → Logout
- [ ] Parallele Tabs → Keine Konflikte

### 7.3 Formulare
- [ ] XSS-Schutz (Script-Tags in Inputs)
- [ ] SQL/NoSQL Injection verhindert
- [ ] Große Eingaben limitiert

### 7.4 Daten
- [ ] Leere Listen → "Keine Daten" Message
- [ ] Lange Texte → Truncation/Ellipsis
- [ ] Sonderzeichen in Namen → Korrekt angezeigt

---

## 🐛 Bug-Tracking

| # | Flow | Beschreibung | Priorität | Status |
|---|------|-------------|-----------|--------|
| 1 | Flow 2 | Public Booking Route `/s/:slug` fehlte in App.jsx | 🔴 Kritisch | ✅ Fixed |
| 2 | Flow 2 | PublicBooking.jsx unterstützte nur Query-Param, nicht Route-Param | 🔴 Kritisch | ✅ Fixed |
| 3 | Flow 3 | Booking Reminder Cronjob fehlte komplett | 🔴 Kritisch | ✅ Fixed |
| 4 | Flow 3 | Review Request Cronjob fehlte komplett | 🔴 Kritisch | ✅ Fixed |
| 5 | Flow 4 | Booking-Limit für Starter-Plan nicht implementiert | 🔴 Kritisch | ✅ Fixed |
| 6 | Flow 4 | Dashboard zeigt keine Limit-Warnung | 🟠 Hoch | ✅ Fixed |
| 7 | Flow 4 | Public Booking prüft nicht auf Plan-Limits | 🔴 Kritisch | ✅ Fixed |
| 8 |      |             |           | ⬜ Open |

**Prioritäten:** 🔴 Kritisch | 🟠 Hoch | 🟡 Mittel | 🟢 Niedrig

---

## Tester-Notizen

```
Datum: _______________
Tester: _______________
Browser: _______________
Device: _______________

Notizen:
_______________________
_______________________
_______________________
```
