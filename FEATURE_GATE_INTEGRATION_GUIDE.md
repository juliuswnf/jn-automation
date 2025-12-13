# Feature Gate Integration Guide

This guide shows how to protect existing routes with the new pricing tier feature gates.

---

## 🔐 Quick Start

### 1. Import Feature Gate Middleware

```javascript
import { checkFeatureAccess } from '../middleware/checkFeatureAccess.js';
```

### 2. Protect Route

```javascript
// Enterprise-only feature (SMS)
router.post('/send-sms',
  authenticateSalon,
  checkFeatureAccess('smsNotifications'),
  sendSMSController
);

// Professional+ feature (Portfolio)
router.post('/portfolio/upload',
  authenticateSalon,
  checkFeatureAccess('portfolio'),
  uploadPortfolioController
);

// Enterprise-only feature (API Access)
router.get('/api-key',
  authenticateSalon,
  checkFeatureAccess('apiAccess'),
  getAPIKeyController
);
```

---

## 📋 Available Feature Gates

### **Starter Tier Features** (€69/month)
- `onlineBooking` - Online booking calendar
- `customerManagement` - Basic CRM
- `emailNotifications` - Email notifications
- `paymentProcessing` - Stripe payments
- `basicReporting` - Basic reports
- `mobileResponsive` - Mobile-friendly

### **Professional Tier Features** (€169/month)
All Starter features plus:
- `marketingAutomation` - Marketing campaigns
- `advancedAnalytics` - Advanced analytics
- `multiServiceBookings` - Multiple services per booking
- `portfolio` - Artist portfolio/galleries
- `customBranding` - Custom logo/colors
- `packages` - Service packages
- `progressTracking` - Client progress tracking

### **Enterprise Tier Features** (€399/month)
All Professional features plus:
- `smsNotifications` - SMS reminders (500/month)
- `multiLocation` - Multi-location support (5 locations)
- `whiteLabel` - White-label options
- `apiAccess` - REST API access
- `webhooks` - Webhook integrations
- `hipaaCompliance` - HIPAA compliance
- `auditLogs` - Security audit logs
- `prioritySupport` - Priority support

---

## 🛡️ Middleware Variants

### 1. `checkFeatureAccess(featureName)`
Check if salon has access to a specific feature.

```javascript
router.post('/send-sms',
  authenticateSalon,
  checkFeatureAccess('smsNotifications'),
  controller
);
```

**Response on denied (403):**
```json
{
  "success": false,
  "error": "Feature not available in professional tier",
  "code": "FEATURE_NOT_AVAILABLE",
  "feature": "smsNotifications",
  "currentTier": "professional",
  "requiredTier": "enterprise",
  "message": "SMS notifications are only available in Enterprise tier...",
  "upgradeUrl": "/pricing",
  "learnMoreUrl": "/features/smsNotifications"
}
```

### 2. `checkAnyFeatureAccess([features])`
Check if salon has access to ANY of the features (OR condition).

```javascript
import { checkAnyFeatureAccess } from '../middleware/checkFeatureAccess.js';

// Allow if salon has EITHER portfolio OR progress tracking
router.get('/client-gallery',
  authenticateSalon,
  checkAnyFeatureAccess(['portfolio', 'progressTracking']),
  controller
);
```

### 3. `requireActiveSubscription`
Check if salon has any active subscription (any tier).

```javascript
import { requireActiveSubscription } from '../middleware/checkFeatureAccess.js';

// Just require active subscription, any tier
router.get('/dashboard',
  authenticateSalon,
  requireActiveSubscription,
  controller
);
```

### 4. `requireMinimumTier(minimumTier)`
Check if salon is at least a specific tier.

```javascript
import { requireMinimumTier } from '../middleware/checkFeatureAccess.js';

// Require at least Professional tier
router.get('/advanced-analytics',
  authenticateSalon,
  requireMinimumTier('professional'),
  controller
);

// Require Enterprise tier
router.get('/api-docs',
  authenticateSalon,
  requireMinimumTier('enterprise'),
  controller
);
```

### 5. `softFeatureGate(featureName)`
Check feature but allow access anyway (beta features, warnings).

```javascript
import { softFeatureGate } from '../middleware/checkFeatureAccess.js';

// Warn but allow access (for beta features)
router.post('/new-beta-feature',
  authenticateSalon,
  softFeatureGate('newBetaFeature'),
  controller
);
```

**Response on soft gate (200):**
```json
{
  "warning": "FEATURE_NOT_AVAILABLE",
  "message": "This feature is not included in your professional tier...",
  "currentTier": "professional",
  "requiredTier": "enterprise"
}
```

---

## 🎯 Integration Examples

### Example 1: SMS Routes (Enterprise Only)
```javascript
// backend/routes/smsRoutes.js
import express from 'express';
import { checkFeatureAccess } from '../middleware/checkFeatureAccess.js';
import { authenticateSalon } from '../middleware/auth.js';
import { sendSMS, getSMSUsage } from '../controllers/smsController.js';

const router = express.Router();

// All SMS routes require Enterprise tier
router.post('/send',
  authenticateSalon,
  checkFeatureAccess('smsNotifications'),
  sendSMS
);

router.get('/usage',
  authenticateSalon,
  checkFeatureAccess('smsNotifications'),
  getSMSUsage
);

export default router;
```

### Example 2: Portfolio Routes (Professional+)
```javascript
// backend/routes/artistPortfolioRoutes.js
import express from 'express';
import { checkFeatureAccess } from '../middleware/checkFeatureAccess.js';
import { authenticateSalon } from '../middleware/auth.js';
import { uploadImage, getGallery } from '../controllers/portfolioController.js';

const router = express.Router();

// Upload requires Professional or Enterprise
router.post('/upload',
  authenticateSalon,
  checkFeatureAccess('portfolio'),
  uploadImage
);

// Viewing gallery is public (no gate)
router.get('/:salonSlug/gallery', getGallery);

export default router;
```

### Example 3: API Access Routes (Enterprise Only)
```javascript
// backend/routes/apiRoutes.js
import express from 'express';
import { checkFeatureAccess, requireMinimumTier } from '../middleware/checkFeatureAccess.js';
import { authenticateSalon } from '../middleware/auth.js';
import { getAPIKey, createAPIKey, revokeAPIKey } from '../controllers/apiController.js';

const router = express.Router();

// All API routes require Enterprise tier
router.use(authenticateSalon);
router.use(requireMinimumTier('enterprise'));

router.get('/keys', getAPIKey);
router.post('/keys', createAPIKey);
router.delete('/keys/:keyId', revokeAPIKey);

export default router;
```

### Example 4: Multi-Location Routes (Enterprise Only)
```javascript
// backend/routes/locationRoutes.js
import express from 'express';
import { checkFeatureAccess } from '../middleware/checkFeatureAccess.js';
import { authenticateSalon } from '../middleware/auth.js';
import { addLocation, updateLocation, deleteLocation } from '../controllers/locationController.js';

const router = express.Router();

// Multi-location requires Enterprise
router.post('/',
  authenticateSalon,
  checkFeatureAccess('multiLocation'),
  addLocation
);

router.put('/:locationId',
  authenticateSalon,
  checkFeatureAccess('multiLocation'),
  updateLocation
);

router.delete('/:locationId',
  authenticateSalon,
  checkFeatureAccess('multiLocation'),
  deleteLocation
);

export default router;
```

---

## 🧪 Testing Feature Gates

### Test 1: Feature Gate Blocks Access
```javascript
// Professional salon tries to send SMS
const response = await fetch('/api/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${professionalSalonToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+49123456789',
    message: 'Test SMS'
  })
});

// Expected: 403 Forbidden
{
  "success": false,
  "error": "Feature not available in professional tier",
  "currentTier": "professional",
  "requiredTier": "enterprise",
  "upgradeUrl": "/pricing"
}
```

### Test 2: Feature Gate Allows Access
```javascript
// Enterprise salon sends SMS
const response = await fetch('/api/sms/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${enterpriseSalonToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: '+49123456789',
    message: 'Test SMS'
  })
});

// Expected: 200 OK
{
  "success": true,
  "messageId": "abc123",
  "smsRemaining": 499
}
```

### Test 3: Check Feature Access (Programmatic)
```javascript
// In controller - check feature before processing
export const someController = async (req, res) => {
  const { salon } = req;
  
  // Check if salon has feature
  if (!salon.hasFeature('smsNotifications')) {
    return res.status(403).json({
      success: false,
      error: 'Feature not available',
      currentTier: salon.subscription.tier,
      requiredTier: salon.getRequiredTierForFeature('smsNotifications')
    });
  }
  
  // Process request...
};
```

---

## 📊 Monitoring Feature Usage

### Log Feature Access
```javascript
// Feature gate middleware automatically logs access
console.log(`[Feature Gate] Salon ${salon._id} (${salon.subscription.tier}) accessed feature: smsNotifications`);
```

### Track Feature Denials
```javascript
// Middleware logs when access is denied
console.warn(`[Feature Gate] Salon ${salon._id} (${salon.subscription.tier}) denied access to: apiAccess (requires enterprise)`);
```

### Analytics Query
```javascript
// Query denied feature access to identify upgrade opportunities
const denials = await FeatureAccessLog.find({
  result: 'denied',
  feature: 'smsNotifications',
  createdAt: { $gte: new Date('2025-12-01') }
})
.populate('salon', 'name subscription.tier')
.limit(100);

// Identify salons that tried SMS but don't have Enterprise
const upgradeOpportunities = denials
  .filter(d => d.salon.subscription.tier === 'professional')
  .map(d => d.salon.name);
```

---

## 🚀 Migration Checklist

When integrating feature gates into existing routes:

- [ ] Identify all routes that should be tier-restricted
- [ ] Add `checkFeatureAccess()` middleware to protected routes
- [ ] Update API documentation with tier requirements
- [ ] Add upgrade CTAs in frontend when feature blocked
- [ ] Test with all 3 tiers (Starter, Professional, Enterprise)
- [ ] Monitor feature denial logs for upgrade opportunities
- [ ] Update frontend to hide/disable unavailable features

---

## 💡 Best Practices

### 1. **Use Specific Feature Names**
```javascript
// ✅ Good - specific feature
checkFeatureAccess('smsNotifications')

// ❌ Bad - generic feature
checkFeatureAccess('notifications')
```

### 2. **Add Feature Gates Early**
```javascript
// ✅ Good - feature gate before expensive operations
router.post('/api-endpoint',
  authenticateSalon,
  checkFeatureAccess('apiAccess'), // Check first
  expensiveMiddleware,
  controller
);

// ❌ Bad - expensive operations before feature gate
router.post('/api-endpoint',
  authenticateSalon,
  expensiveMiddleware,
  checkFeatureAccess('apiAccess') // Too late
);
```

### 3. **Handle Frontend Gracefully**
```javascript
// Frontend: Check feature before showing UI
const canSendSMS = currentTier === 'enterprise';

{canSendSMS ? (
  <button onClick={sendSMS}>Send SMS</button>
) : (
  <button onClick={() => navigate('/pricing')}>
    Upgrade to Send SMS
  </button>
)}
```

### 4. **Log Feature Usage**
```javascript
// Track feature usage for analytics
if (salon.hasFeature('smsNotifications')) {
  await FeatureUsageLog.create({
    salon: salon._id,
    feature: 'smsNotifications',
    action: 'sms_sent',
    timestamp: new Date()
  });
}
```

---

## 🔗 Related Documentation

- **Pricing Configuration:** `backend/config/pricing.js`
- **Feature Gate Middleware:** `backend/middleware/checkFeatureAccess.js`
- **Salon Model:** `backend/models/Salon.js`
- **SMS Service:** `backend/services/smsService.js`
- **Pricing API:** `backend/routes/pricing.js`
- **Progress Report:** `PRICING_RESTRUCTURE_PROGRESS.md`

---

**Last Updated:** December 13, 2025  
**Status:** Ready for Integration ✅
