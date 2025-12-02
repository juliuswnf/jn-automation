/* eslint-disable no-console */
// Simple logger wrapper to centralize logs and satisfy ESLint (no-console)
export default {
  info: (...args) => console.log('[INFO]', ...args),
  warn: (...args) => console.warn('[WARN]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  debug: (...args) => console.debug('[DEBUG]', ...args),
};
