# 🚀 JN Business System - Production Launch Checklist

## Pre-Deployment Validation

Run these scripts before deployment:

```bash
# Validate environment variables
cd backend
npm run validate-env

# Run comprehensive pre-launch check
npm run pre-launch
```

---

## ✅ Infrastructure Checklist

### Database (MongoDB Atlas)
- [ ] Production cluster created (M10+ recommended)
- [ ] Database user with minimal required permissions
- [ ] IP whitelist configured for production servers
- [ ] Automatic backups enabled (daily)
- [ ] Connection string uses `mongodb+srv://`
- [ ] Read preference set for your use case

### Hosting Platform
- [ ] Production environment configured (Railway/Render/Vercel)
- [ ] Auto-scaling enabled
- [ ] SSL/TLS certificates active
- [ ] Custom domain configured
- [ ] Health check endpoint verified (`/api/health`)

---

## ✅ Security Checklist

### Secrets & Keys
- [ ] `JWT_SECRET` - 64+ random characters
- [ ] `JWT_REFRESH_SECRET` - 64+ random characters (different from JWT_SECRET)
- [ ] `STRIPE_SECRET_KEY` - Live key (`sk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` - Webhook endpoint verified
- [ ] All secrets rotated from development

### Configuration
- [ ] `NODE_ENV=production`
- [ ] `CORS_ORIGIN` set to production frontend URL only
- [ ] Rate limiting enabled (default: 100 req/15min for auth)
- [ ] Session cookies use `secure: true`
- [ ] HTTP Strict Transport Security (HSTS) enabled
- [ ] Debug/verbose logging disabled in production

### Verification
```bash
# Test security headers
curl -I https://your-api.com/api/health

# Expected headers:
# x-content-type-options: nosniff
# x-frame-options: DENY
# x-xss-protection: 1; mode=block
# strict-transport-security: max-age=...
```

---

## ✅ Payment (Stripe) Checklist

- [ ] Live API keys configured
- [ ] Webhook endpoint registered: `POST /api/payments/webhook`
- [ ] Webhook secret configured
- [ ] Test transactions completed
- [ ] Subscription products created in live mode
- [ ] Tax configuration verified (if applicable)
- [ ] Receipt emails configured

---

## ✅ Email Checklist

- [ ] SMTP credentials configured
- [ ] Sender email verified with provider
- [ ] Test email sent and received
- [ ] Email templates reviewed
- [ ] Unsubscribe link functional
- [ ] SPF/DKIM/DMARC configured for deliverability

---

## ✅ Monitoring Checklist

### Error Tracking
- [ ] Sentry project created
- [ ] `SENTRY_DSN` configured (backend + frontend)
- [ ] Source maps uploaded for frontend
- [ ] Alert rules configured

### Logging
- [ ] Log level set to `info` or `warn`
- [ ] Log rotation configured
- [ ] Sensitive data excluded from logs
- [ ] Log retention policy defined

### Health Monitoring
- [ ] Uptime monitoring configured (UptimeRobot, etc.)
- [ ] Health endpoint: `GET /api/health`
- [ ] Metrics endpoint: `GET /api/metrics` (protected)
- [ ] Alert notifications configured

---

## ✅ Performance Checklist

### Backend
- [ ] Database indexes verified
- [ ] Caching enabled for static data
- [ ] Gzip compression enabled
- [ ] Connection pooling configured

### Frontend
- [ ] Production build created (`npm run build`)
- [ ] Bundle size verified (< 250KB gzipped main bundle)
- [ ] Lazy loading implemented for dashboard routes
- [ ] Images optimized
- [ ] CDN configured (optional)

---

## ✅ Legal & Compliance

- [ ] Privacy Policy published
- [ ] Terms of Service published
- [ ] Cookie consent implemented (if EU)
- [ ] GDPR data export/delete capabilities
- [ ] Data Processing Agreement (if applicable)

---

## ✅ Final Steps

### Before Going Live
```bash
# 1. Run full test suite
npm test

# 2. Validate environment
cd backend && npm run validate-env

# 3. Run pre-launch check
npm run pre-launch

# 4. Build frontend
cd frontend && npm run build

# 5. Deploy to staging first
# 6. Run smoke tests on staging
# 7. Deploy to production
```

### Post-Launch
- [ ] Verify all routes accessible
- [ ] Test booking flow end-to-end
- [ ] Test payment flow (small amount)
- [ ] Test login flow (all roles)
- [ ] Verify email delivery
- [ ] Check error tracking receiving events
- [ ] Monitor performance metrics

---

## 🆘 Rollback Plan

If issues arise:

1. **Immediate**: Switch traffic to previous version
2. **Database**: Restore from backup if data corrupted
3. **Communication**: Notify affected users via email/SMS
4. **Investigation**: Check Sentry for error details

### Rollback Commands
```bash
# Railway
railway rollback

# Render
# Use dashboard to select previous deploy

# Docker
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

---

## 📞 Emergency Contacts

| Role | Contact |
|------|---------|
| DevOps Lead | [Your contact] |
| Database Admin | [Your contact] |
| Stripe Support | support@stripe.com |
| MongoDB Atlas | https://support.mongodb.com |

---

*Last updated: December 2024*
*Version: 1.0.0*
