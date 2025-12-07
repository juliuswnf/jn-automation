import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Tawk.to Live Chat Widget
 * 
 * Free live chat for customer support
 * 
 * To configure:
 * 1. Create account at https://www.tawk.to
 * 2. Get your Property ID and Widget ID from Dashboard > Administration > Channels > Chat Widget
 * 3. Set environment variables:
 *    VITE_TAWKTO_PROPERTY_ID=your_property_id
 *    VITE_TAWKTO_WIDGET_ID=your_widget_id
 * 
 * Features:
 * - Only shows on public pages (not admin/ceo dashboards)
 * - Passes user data if logged in
 * - Customizable appearance
 */

// Pages where chat should NOT appear
const EXCLUDED_PATHS = [
  '/admin',
  '/ceo',
  '/dashboard',
  '/employee',
  '/_.admin',
  '/onboarding'
];

const TawkToWidget = () => {
  const location = useLocation();
  
  // Get Tawk.to credentials from environment
  const propertyId = import.meta.env.VITE_TAWKTO_PROPERTY_ID;
  const widgetId = import.meta.env.VITE_TAWKTO_WIDGET_ID;

  useEffect(() => {
    // Don't load if credentials are missing
    if (!propertyId || !widgetId) {
      console.log('Tawk.to: Missing credentials, widget disabled');
      return;
    }

    // Check if current path should show chat
    const shouldShow = !EXCLUDED_PATHS.some(path => 
      location.pathname.startsWith(path)
    );

    // Hide/show based on path
    if (window.Tawk_API) {
      if (shouldShow) {
        window.Tawk_API.showWidget?.();
      } else {
        window.Tawk_API.hideWidget?.();
      }
      return;
    }

    // Don't initialize on excluded paths
    if (!shouldShow) {
      return;
    }

    // Initialize Tawk.to
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Set initial visibility
    window.Tawk_API.onLoad = function() {
      // Customize widget appearance
      window.Tawk_API.setAttributes({
        'name': 'Besucher',
        'hash': ''
      }, function(error) {
        if (error) {
          console.error('Tawk.to setAttributes error:', error);
        }
      });
    };

    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Insert script
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    // Cleanup
    return () => {
      // Note: Tawk.to doesn't provide a clean unload method
      // The widget will persist until page refresh
    };
  }, [propertyId, widgetId, location.pathname]);

  // Update visibility when path changes
  useEffect(() => {
    if (!window.Tawk_API?.showWidget) return;

    const shouldShow = !EXCLUDED_PATHS.some(path => 
      location.pathname.startsWith(path)
    );

    if (shouldShow) {
      window.Tawk_API.showWidget();
    } else {
      window.Tawk_API.hideWidget();
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

/**
 * Set visitor info for Tawk.to (call after login)
 */
export const setTawkToVisitor = (user) => {
  if (!window.Tawk_API?.setAttributes) return;

  window.Tawk_API.setAttributes({
    'name': user.name || user.email?.split('@')[0] || 'Kunde',
    'email': user.email || '',
    'hash': '' // For secure mode, generate server-side hash
  }, function(error) {
    if (error) {
      console.error('Tawk.to visitor error:', error);
    }
  });
};

/**
 * Open chat window programmatically
 */
export const openTawkToChat = () => {
  if (window.Tawk_API?.maximize) {
    window.Tawk_API.maximize();
  }
};

/**
 * Close chat window
 */
export const closeTawkToChat = () => {
  if (window.Tawk_API?.minimize) {
    window.Tawk_API.minimize();
  }
};

/**
 * Check if chat is currently open
 */
export const isTawkToChatOpen = () => {
  return window.Tawk_API?.isChatMaximized?.() || false;
};

export default TawkToWidget;
