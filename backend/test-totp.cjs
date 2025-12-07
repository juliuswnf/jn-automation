const { authenticator } = require('otplib');

// Das Secret das wir gesetzt haben
const secret = 'JBSWY3DPEHPK3PXP';

// Generiere den aktuellen Code
const token = authenticator.generate(secret);
console.log('Current TOTP code:', token);

// Verifiziere dass es funktioniert
const isValid = authenticator.verify({ token, secret });
console.log('Verification result:', isValid);

// Zeige auch den nächsten Code
console.log('\nWenn dieser Code nicht funktioniert, warte 30 Sekunden und versuche es erneut.');
