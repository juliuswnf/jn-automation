/**
 * SMS Templates fÃƒÂ¼r JN Business System
 *
 * Branchen-spezifische SMS-Templates fÃƒÂ¼r verschiedene Workflows
 */

export const SMS_TEMPLATES = {
  // ==================== STANDARD BOOKING ====================
  booking_confirmation: {
    name: 'BuchungsbestÃƒÂ¤tigung',
    text: `Hey {{customerName}}! Ã°Å¸â€˜â€¹

Dein Termin ist bestÃƒÂ¤tigt:
Ã°Å¸â€œâ€¦ {{date}} um {{time}}
Ã¢ÂÂ±Ã¯Â¸Â Dauer: {{duration}} Min
Ã°Å¸â€œÂ {{salonName}}

Bei Fragen: {{salonPhone}}

Bis bald! Ã°Å¸â€™Âª`
  },

  booking_reminder_24h: {
    name: 'Erinnerung 24h vorher',
    text: `Hey {{customerName}}! Ã°Å¸â€â€

Morgen ist dein Termin:
Ã°Å¸â€œâ€¦ {{date}} um {{time}}
Ã¢ÂÂ±Ã¯Â¸Â {{duration}} Min
Ã°Å¸â€œÂ {{salonName}}

Nicht vergessen! Ã°Å¸ËœÅ `
  },

  booking_reminder_2h: {
    name: 'Erinnerung 2h vorher',
    text: `Hey {{customerName}}! Ã¢ÂÂ°

In 2 Stunden ist dein Termin:
Ã°Å¸â€œâ€¦ {{time}}
Ã°Å¸â€œÂ {{salonName}}

Wir freuen uns auf dich! Ã°Å¸â€™Âª`
  },

  // ==================== TATTOO STUDIO ====================
  tattoo_session_reminder: {
    name: 'Tattoo Session Erinnerung',
    text: `Hey {{customerName}}! Ã°Å¸Å½Â¨

Morgen ist deine Tattoo-Session {{sessionNumber}}/{{totalSessions}}!

Ã°Å¸â€œâ€¦ {{date}} um {{time}}
Ã¢ÂÂ±Ã¯Â¸Â Dauer: {{duration}}h
Ã°Å¸â€œÂ {{salonName}}

Bring bitte mit:
{{checklist}}

Wichtig:
Ã¢ÂÅ’ Kein Alkohol 24h vorher
Ã¢ÂÅ’ Keine BlutverdÃƒÂ¼nner

Bis morgen! Ã°Å¸â€™Âª
{{salonName}}`
  },

  tattoo_aftercare_reminder: {
    name: 'Tattoo Nachsorge',
    text: `Hey {{customerName}}! Ã°Å¸Å½Â¨

Wichtige Nachsorge fÃƒÂ¼r dein Tattoo:

Ã¢Å“â€¦ 3x tÃƒÂ¤glich waschen (pH-neutral)
Ã¢Å“â€¦ DÃƒÂ¼nn eincremen (Panthenol)
Ã¢ÂÅ’ Keine Sonneneinstrahlung
Ã¢ÂÅ’ Keine Sauna/Schwimmen (2 Wochen)

Bei Fragen: {{salonPhone}}

{{salonName}}`
  },

  tattoo_followup_appointment: {
    name: 'Tattoo Follow-up Termin',
    text: `Hey {{customerName}}! Ã°Å¸Å½Â¨

Dein Tattoo sollte jetzt gut verheilt sein!

NÃƒÂ¤chster Termin fÃƒÂ¼r Session {{nextSession}}/{{totalSessions}}:
Ã°Å¸â€œâ€¦ In {{weeks}} Wochen empfohlen

Jetzt buchen: {{bookingLink}}

{{salonName}}`
  },

  // ==================== MEDICAL AESTHETICS ====================
  treatment_follow_up: {
    name: 'Behandlungs-Follow-up',
    text: `Hey {{customerName}}! Ã°Å¸â€™â€°

Deine {{treatmentType}}-Behandlung wirkt bald aus.

Empfohlener Nachtermin:
Ã¢ÂÂ° In {{weeks}} Wochen

Jetzt buchen: {{bookingLink}}

Fragen? {{salonPhone}}

{{salonName}}`
  },

  treatment_aftercare: {
    name: 'Behandlungs-Nachsorge',
    text: `Hey {{customerName}}! Ã°Å¸â€™â€°

Wichtige Nachsorge nach {{treatmentType}}:

Ã¢Å“â€¦ KÃƒÂ¼hlen bei Schwellung (24h)
Ã¢Å“â€¦ Nicht massieren (48h)
Ã¢ÂÅ’ Keine Sauna/Sport (24h)
Ã¢ÂÅ’ Kein Alkohol (24h)

Bei Komplikationen sofort melden: {{salonPhone}}

{{salonName}}`
  },

  treatment_confirmation: {
    name: 'Behandlungs-BestÃƒÂ¤tigung',
    text: `Hey {{customerName}}! Ã°Å¸â€™â€°

Deine {{treatmentType}}-Behandlung ist bestÃƒÂ¤tigt:

Ã°Å¸â€œâ€¦ {{date}} um {{time}}
Ã¢ÂÂ±Ã¯Â¸Â ca. {{duration}} Min
Ã°Å¸â€œÂ {{salonName}}

Bitte mitbringen:
Ã¢Å“â€¦ AusgefÃƒÂ¼llte Anamnesebogen
Ã¢Å“â€¦ Personalausweis

Bei Fragen: {{salonPhone}}

Bis bald! Ã°Å¸â€™Âª`
  },

  // ==================== SPA & WELLNESS ====================
  package_reminder: {
    name: 'Package Erinnerung',
    text: `Hey {{customerName}}! Ã°Å¸Å½Â

Du hast noch {{creditsRemaining}} Credits ÃƒÂ¼brig in deinem "{{packageName}}"!

Ã¢Å¡Â Ã¯Â¸Â VerfÃƒÂ¤llt am {{expiryDate}}

Jetzt buchen: {{bookingLink}}

{{salonName}}`
  },

  package_expiring_soon: {
    name: 'Package lÃƒÂ¤uft ab',
    text: `Hey {{customerName}}! Ã¢ÂÂ°

Dein "{{packageName}}" lÃƒÂ¤uft in {{daysLeft}} Tagen ab!

Noch {{creditsRemaining}} Credits verfÃƒÂ¼gbar.

Schnell buchen: {{bookingLink}}

{{salonName}}`
  },

  package_purchase_confirmation: {
    name: 'Package Kauf bestÃƒÂ¤tigt',
    text: `Hey {{customerName}}! Ã°Å¸Å½Â

Danke fÃƒÂ¼r deinen Kauf!

"{{packageName}}"
Ã¢Å“â€¦ {{creditsTotal}} Credits
Ã°Å¸â€œâ€¦ GÃƒÂ¼ltig bis {{expiryDate}}

Jetzt buchen: {{bookingLink}}

{{salonName}}`
  },

  // ==================== MEMBERSHIP ====================
  membership_welcome: {
    name: 'Membership Willkommen',
    text: `Hey {{customerName}}! Ã°Å¸Å½â€°

Willkommen bei "{{membershipName}}"!

Deine Benefits:
{{benefits}}

NÃƒÂ¤chste Abrechnung: {{nextBillingDate}}

Jetzt buchen: {{bookingLink}}

{{salonName}}`
  },

  membership_billing_reminder: {
    name: 'Membership Abrechnung',
    text: `Hey {{customerName}}! Ã°Å¸â€™Â³

Deine "{{membershipName}}"-Abrechnung steht an:

Ã°Å¸â€œâ€¦ {{nextBillingDate}}
Ã°Å¸â€™Â° {{priceMonthly}}Ã¢â€šÂ¬

Zahlungsmethode: {{paymentMethod}}

{{salonName}}`
  },

  membership_credits_reset: {
    name: 'Membership Credits erneuert',
    text: `Hey {{customerName}}! Ã°Å¸â€â€ž

Deine monatlichen Credits wurden erneuert!

Ã¢Å“â€¦ {{creditsMonthly}} Credits verfÃƒÂ¼gbar
Ã°Å¸â€œâ€¦ GÃƒÂ¼ltig bis {{nextReset}}

Jetzt buchen: {{bookingLink}}

{{salonName}}`
  },

  membership_paused: {
    name: 'Membership pausiert',
    text: `Hey {{customerName}}! Ã¢ÂÂ¸Ã¯Â¸Â

Deine "{{membershipName}}" wurde pausiert.

Keine Abrechnung wÃƒÂ¤hrend der Pause.

Fortsetzen: {{resumeLink}}

{{salonName}}`
  },

  // ==================== WAITLIST ====================
  waitlist_spot_available: {
    name: 'Warteliste - Termin verfÃƒÂ¼gbar',
    text: `Hey {{customerName}}! Ã°Å¸Å½â€°

Ein Termin ist frei geworden!

Ã°Å¸â€œâ€¦ {{date}} um {{time}}
Ã¢ÂÂ±Ã¯Â¸Â {{duration}} Min
Ã°Å¸â€œÂ {{salonName}}

Schnell buchen: {{bookingLink}}

Angebot gilt 2h!

{{salonName}}`
  },

  // ==================== NO-SHOW PREVENTION ====================
  booking_confirmation_required: {
    name: 'BestÃƒÂ¤tigung erforderlich',
    text: `Hey {{customerName}}! Ã¢ÂÂ°

Bitte bestÃƒÂ¤tige deinen Termin:
Ã°Å¸â€œâ€¦ {{date}} um {{time}}

BestÃƒÂ¤tigen: {{confirmLink}}
Absagen: {{cancelLink}}

Ohne BestÃƒÂ¤tigung wird der Termin storniert.

{{salonName}}`
  },

  no_show_warning: {
    name: 'No-Show Warnung',
    text: `Hey {{customerName}}! Ã¢Å¡Â Ã¯Â¸Â

Du hast deinen letzten Termin verpasst.

Bei 3 No-Shows mÃƒÂ¼ssen wir leider:
- Vorauszahlung verlangen
- Terminbuchung einschrÃƒÂ¤nken

VerstÃƒÂ¤ndnis? Ã°Å¸â„¢Â

{{salonName}}`
  }
};

/**
 * Get template by key
 */
export function getTemplate(key) {
  return SMS_TEMPLATES[key] || null;
}

/**
 * Get all templates
 */
export function getAllTemplates() {
  return Object.keys(SMS_TEMPLATES).map(key => ({
    key,
    name: SMS_TEMPLATES[key].name,
    preview: SMS_TEMPLATES[key].text.substring(0, 100) + '...'
  }));
}

/**
 * Render template with variables
 *
 * @param {string} templateKey - Template key (e.g., 'tattoo_session_reminder')
 * @param {object} variables - Variables to replace (e.g., { customerName: 'Max' })
 * @returns {string} Rendered message
 */
export function renderTemplate(templateKey, variables = {}) {
  const template = getTemplate(templateKey);

  if (!template) {
    throw new Error(`Template "${templateKey}" not found`);
  }

  let message = template.text;

  // Replace all variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    message = message.replace(regex, value || '');
  });

  return message.trim();
}

/**
 * Get industry-specific templates
 */
export function getTemplatesByIndustry(industry) {
  const industryTemplates = {
    tattoo: [
      'tattoo_session_reminder',
      'tattoo_aftercare_reminder',
      'tattoo_followup_appointment'
    ],
    medical_aesthetics: [
      'treatment_follow_up',
      'treatment_aftercare',
      'treatment_confirmation'
    ],
    spa_wellness: [
      'package_reminder',
      'package_expiring_soon',
      'package_purchase_confirmation',
      'membership_welcome',
      'membership_billing_reminder',
      'membership_credits_reset'
    ]
  };

  const keys = industryTemplates[industry] || [];

  return keys.map(key => ({
    key,
    ...SMS_TEMPLATES[key]
  }));
}

export default SMS_TEMPLATES;
