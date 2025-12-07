# 🔧 Operations & Monitoring Guide

## Übersicht

Dieses Dokument beschreibt Monitoring, Alerting und Operations für JN Automation in Production.

---

## 📊 Monitoring Endpoints

### Health Check (Public)
```bash
GET /health

# Response
{
  "status": "healthy",           # healthy | degraded | unhealthy
  "timestamp": "2025-12-04T...",
  "uptime": 86400,               # Sekunden
  "version": "2.0.0",
  "services": {
    "mongodb": { "status": "connected" },
    "memory": { "heapUsed": "150MB", "heapTotal": "512MB" }
  },
  "emailWorker": "running"
}
```

### Metrics (Protected)
```bash
GET /api/metrics
Authorization: Bearer <METRICS_SECRET>

# Response
{
  "requests": { "total": 10000, "errors": 50, "successRate": "99.50%" },
  "responseTime": { "average": "120ms", "max": "2500ms" },
  "cache": { "hits": 500, "misses": 100, "hitRate": "83%" },
  "errors": { "byType": { "ValidationError": 30, "NotFoundError": 20 } },
  "topEndpoints": [...]
}
```

---

## 🚨 Alerting System

### Alert Channels

| Channel | Use Case | Setup |
|---------|----------|-------|
| Email | All Critical + High | `ALERT_EMAIL=alerts@company.de` |
| Slack | Team Notifications | `SLACK_WEBHOOK_URL=...` |
| Discord | Alternative | `DISCORD_WEBHOOK_URL=...` |

### Alert Thresholds

```javascript
const THRESHOLDS = {
  errorRate: 0.05,           // 5% → Alert
  responseTime: 2000,        // 2s avg → Alert
  memoryUsage: 0.85,         // 85% → Alert
  consecutiveErrors: 10,     // 10 errors → Alert
  error5xxCount: 5           // 5 in 5min → Alert
};
```

### Alert Severity Levels

| Level | Color | Response Time | Examples |
|-------|-------|---------------|----------|
| 🔴 Critical | Red | < 15 min | DB Down, 10%+ Errors, Payment System |
| 🟠 High | Orange | < 1 hour | Slow Response, High Memory |
| 🟡 Medium | Yellow | < 4 hours | Elevated Error Rate |
| 🟢 Low | Green | Next Business Day | Warning Logs |

---

## 📈 Key Metrics

### Business Metrics
- **Bookings/Day**: Anzahl neue Buchungen
- **Active Salons**: Salons mit Buchungen letzte 7 Tage
- **Revenue**: Stripe MRR (CEO Dashboard)
- **Conversion Rate**: Widget-Views zu Buchungen

### Technical Metrics
- **Uptime**: Ziel 99.9% (8.7h Downtime/Jahr)
- **Response Time**: p50 < 200ms, p99 < 1s
- **Error Rate**: < 1% (Ziel < 0.5%)
- **Memory Usage**: < 80%

---

## 🔍 Logging

### Log Levels
```
ERROR  → Kritische Fehler, sofortige Aktion nötig
WARN   → Potenzielle Probleme, überwachen
INFO   → Wichtige Events (Logins, Bookings, Payments)
DEBUG  → Entwicklung/Troubleshooting
```

### Log Suche (Railway)
```bash
# Letzte Logs
railway logs

# Filter nach Level
railway logs --filter "ERROR"

# Filter nach Zeit
railway logs --since 1h
```

### Strukturiertes Logging
```json
{
  "level": "error",
  "message": "Booking creation failed",
  "timestamp": "2025-12-04T10:30:00Z",
  "userId": "user_123",
  "salonId": "salon_456",
  "error": "Service not found",
  "stack": "..."
}
```

---

## 🔒 Security Monitoring

### Überwachte Events
- Failed Login Attempts
- Rate Limit Hits
- Authorization Failures (403)
- SQL/NoSQL Injection Attempts
- Suspicious IP Patterns

### Automatische Responses
```javascript
// Bei 10+ fehlgeschlagenen Logins von einer IP
→ IP für 1 Stunde blocken
→ Alert an Security Team

// Bei Rate Limit Überschreitung
→ Request blocken
→ Bei 100+ Hits: IP-Ban prüfen
```

---

## 🛠 Runbooks

### 1. High Error Rate (> 5%)

**Symptom**: Alert "High Error Rate Detected"

**Diagnose**:
```bash
# 1. Check Logs
railway logs --filter "ERROR" --since 10m

# 2. Check Metrics
curl -H "Authorization: Bearer $METRICS_SECRET" \
  https://api.jn-automation.de/api/metrics

# 3. Check MongoDB
# In Atlas Dashboard → Metrics prüfen
```

**Lösung**:
1. Letzten Deploy prüfen → ggf. Rollback
2. DB Connection prüfen
3. Externe Services (Stripe, Email) prüfen

---

### 2. Database Connection Lost

**Symptom**: Alert "Database Connection Issue"

**Diagnose**:
```bash
# Health Check
curl https://api.jn-automation.de/health
# → services.mongodb.status sollte "connected" sein
```

**Lösung**:
1. Atlas Dashboard → Cluster Status prüfen
2. IP Whitelist prüfen (neue Server-IP?)
3. Connection String in Railway Env prüfen
4. Bei Cluster-Problem: Atlas Support kontaktieren

---

### 3. Slow Response Times (> 2s)

**Symptom**: Alert "Slow Response Times"

**Diagnose**:
```bash
# Top slow endpoints prüfen
curl -H "Authorization: Bearer $METRICS_SECRET" \
  https://api.jn-automation.de/api/metrics | jq '.topEndpoints'

# Memory prüfen
curl https://api.jn-automation.de/health | jq '.services.memory'
```

**Lösung**:
1. High-Traffic Endpoints identifizieren
2. Cache-Hit-Rate prüfen
3. DB Indexes prüfen
4. Bei Memory-Problem: Server Restart

---

### 4. Payment Failure

**Symptom**: Alert "Payment Processing Failed"

**Diagnose**:
1. Stripe Dashboard → Payments → Failed prüfen
2. Webhook Logs in Stripe prüfen
3. Backend Logs nach Stripe-Errors durchsuchen

**Lösung**:
1. Stripe API Status prüfen (status.stripe.com)
2. Webhook Secret verifizieren
3. Kunden kontaktieren wenn nötig

---

## 📊 Dashboard Setup

### Empfohlene Tools

| Tool | Purpose | Integration |
|------|---------|-------------|
| **Sentry** | Error Tracking | `SENTRY_DSN` env var |
| **Grafana** | Metrics Visualization | Prometheus endpoint |
| **UptimeRobot** | Uptime Monitoring | Ping `/health` |
| **LogRocket** | Frontend Monitoring | Frontend SDK |

### Sentry Setup
```javascript
// Backend
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN });

// Frontend
import * as Sentry from '@sentry/react';
Sentry.init({ dsn: process.env.VITE_SENTRY_DSN });
```

---

## 🔄 Incident Response

### Severity Classification

| Severity | Definition | Response |
|----------|------------|----------|
| **SEV-1** | Full Outage | Alle Hände an Deck, sofort |
| **SEV-2** | Major Feature Down | 15 min Response |
| **SEV-3** | Minor Issue | 1h Response |
| **SEV-4** | Low Impact | Next Business Day |

### Incident Process

1. **Detect** → Alert kommt rein
2. **Triage** → Severity bestimmen
3. **Respond** → Runbook folgen
4. **Resolve** → Fix deployen
5. **Review** → Post-Mortem (bei SEV-1/2)

---

## 📞 Eskalation

| Level | Wer | Wann |
|-------|-----|------|
| L1 | On-Call Dev | Erste 15 min |
| L2 | Tech Lead | Wenn L1 nicht lösen kann |
| L3 | External Support | DB/Stripe/Infra Probleme |

---

## 🔧 Wartung

### Regelmäßige Tasks

| Task | Frequenz | Wer |
|------|----------|-----|
| Security Updates | Wöchentlich | CI/CD automatisch |
| Dependency Audit | Monatlich | `npm audit` |
| Log Rotation | Automatisch | Railway |
| DB Backup Verify | Monatlich | Manual Check |
| Load Test | Quartalsweise | Performance Team |

### Maintenance Window
- **Wann**: Sonntags 03:00-05:00 UTC
- **Notify**: 48h vorher per Email an aktive Salons
- **Process**: 
  1. Banner in App anzeigen
  2. Wartung durchführen
  3. Health Check
  4. Banner entfernen
