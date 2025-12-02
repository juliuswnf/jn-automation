# 🚀 JN Automation - Deployment Guide

## Übersicht

Diese Anleitung zeigt dir, wie du JN Automation live schaltest:

| Komponente | Hosting | Kosten |
|------------|---------|--------|
| Frontend | Vercel | **Kostenlos** |
| Backend | Railway | **~5$/Monat** (500h gratis/Monat) |
| Datenbank | MongoDB Atlas | **Kostenlos** (schon eingerichtet) |

---

## 📋 Voraussetzungen

1. **GitHub Account** - https://github.com (für Code-Repository)
2. **Vercel Account** - https://vercel.com (kostenlos mit GitHub)
3. **Railway Account** - https://railway.app (kostenlos mit GitHub)

---

## Schritt 1: Code auf GitHub pushen

### 1.1 Falls noch nicht auf GitHub:

```bash
# Im Hauptordner des Projekts
cd "c:\Users\juliu\Documents\JN Automation\jn-automation"

# Git initialisieren (falls noch nicht geschehen)
git init

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Initial commit - JN Automation MVP"

# GitHub Repository erstellen (auf github.com)
# Dann:
git remote add origin https://github.com/DEIN-USERNAME/jn-automation.git
git branch -M main
git push -u origin main
```

---

## Schritt 2: Backend auf Railway deployen

### 2.1 Railway Account erstellen
1. Gehe zu https://railway.app
2. Klicke **"Login with GitHub"**
3. Autorisiere Railway

### 2.2 Neues Projekt erstellen
1. Klicke **"New Project"**
2. Wähle **"Deploy from GitHub repo"**
3. Wähle dein Repository **jn-automation**
4. Wähle den Ordner **backend** (oder Root wenn nur Backend)

### 2.3 Environment Variables setzen
1. Klicke auf dein Projekt
2. Gehe zu **"Variables"** Tab
3. Füge diese Variablen hinzu:

```
MONGODB_URI=mongodb+srv://jn_automation_user:Julius123@jn-automation.9lulzru.mongodb.net/jn-automation?retryWrites=true&w=majority&appName=jn-automation

JWT_SECRET=dein-super-geheimer-schluessel-hier-aendern

NODE_ENV=production

CORS_ORIGIN=https://deine-frontend-url.vercel.app

FRONTEND_URL=https://deine-frontend-url.vercel.app

# Email (optional - später konfigurieren)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=deine-email@gmail.com
EMAIL_PASS=dein-app-passwort

# Stripe (optional - später konfigurieren)
STRIPE_SECRET_KEY=sk_live_...
```

### 2.4 Domain notieren
1. Gehe zu **"Settings"** Tab
2. Unter **"Domains"** siehst du deine URL
3. Beispiel: `jn-automation-backend.railway.app`
4. **KOPIERE DIESE URL!** Du brauchst sie für das Frontend.

---

## Schritt 3: Frontend auf Vercel deployen

### 3.1 Vercel Account erstellen
1. Gehe zu https://vercel.com
2. Klicke **"Sign up with GitHub"**
3. Autorisiere Vercel

### 3.2 Projekt importieren
1. Klicke **"Add New..."** → **"Project"**
2. Wähle **"Import Git Repository"**
3. Wähle dein Repository **jn-automation**

### 3.3 Build Settings konfigurieren
1. **Framework Preset**: Vite
2. **Root Directory**: `frontend` (WICHTIG!)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.4 Environment Variables setzen
1. Klicke **"Environment Variables"**
2. Füge hinzu:

```
VITE_API_URL=https://DEINE-RAILWAY-URL.railway.app/api
```

**Beispiel:**
```
VITE_API_URL=https://jn-automation-backend.railway.app/api
```

### 3.5 Deploy klicken
1. Klicke **"Deploy"**
2. Warte 1-2 Minuten
3. Deine App ist live! 🎉

---

## Schritt 4: CORS im Backend aktualisieren

Nachdem das Frontend deployed ist:

1. Gehe zurück zu **Railway Dashboard**
2. Öffne dein Backend-Projekt
3. Gehe zu **"Variables"**
4. Aktualisiere `CORS_ORIGIN`:

```
CORS_ORIGIN=https://deine-app.vercel.app
```

5. Railway redeployed automatisch

---

## Schritt 5: Testen

1. Öffne deine Vercel-URL (z.B. `https://jn-automation.vercel.app`)
2. Teste den Login
3. Teste das CEO Dashboard
4. Teste das Booking Widget

---

## 🔧 Troubleshooting

### "API nicht erreichbar"
- Prüfe ob `VITE_API_URL` in Vercel korrekt ist
- Prüfe ob `CORS_ORIGIN` in Railway deine Vercel-URL enthält

### "Login funktioniert nicht"
- Prüfe `JWT_SECRET` in Railway
- Prüfe MongoDB-Verbindung in Railway Logs

### "Seite lädt nicht"
- Prüfe Vercel Build Logs
- Stelle sicher dass `Root Directory` = `frontend`

---

## 📱 Custom Domain (Optional)

### Für Vercel (Frontend):
1. Gehe zu Project Settings → Domains
2. Füge `app.jn-automation.de` hinzu
3. Konfiguriere DNS bei deinem Domain-Anbieter

### Für Railway (Backend):
1. Gehe zu Settings → Domains
2. Füge `api.jn-automation.de` hinzu
3. Konfiguriere DNS bei deinem Domain-Anbieter

---

## 💰 Kosten

| Service | Free Tier | Bezahlt |
|---------|-----------|---------|
| Vercel | Unbegrenzt für Hobby | - |
| Railway | 500h/Monat gratis | $5/Monat |
| MongoDB Atlas | 512MB gratis | $9/Monat für mehr |

**Für den Start reichen die kostenlosen Tiers!**

---

## 📞 Support

Bei Problemen:
1. Prüfe die Logs in Railway/Vercel
2. Prüfe die Browser-Konsole (F12)
3. Teste die API direkt: `https://deine-backend-url.railway.app/health`

---

**Viel Erfolg beim Launch! 🚀**
