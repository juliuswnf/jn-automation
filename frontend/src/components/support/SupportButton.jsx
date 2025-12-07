import { MessageCircle } from 'lucide-react';
import { openTawkToChat } from './TawkToWidget';

/**
 * Floating Support Button
 * Shows a "Need Help?" button that opens live chat
 * Use this on pages where extra help might be needed (Pricing, Checkout)
 */
const SupportButton = ({ 
  text = 'Fragen? Live-Chat',
  className = '',
  position = 'bottom-right' // 'bottom-right' | 'bottom-left' | 'inline'
}) => {
  const handleClick = () => {
    // Try to open Tawk.to chat
    if (window.Tawk_API?.maximize) {
      openTawkToChat();
    } else {
      // Fallback: Open email
      window.location.href = 'mailto:support@jn-automation.de?subject=Frage%20zu%20JN%20Automation';
    }
  };

  if (position === 'inline') {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors ${className}`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{text}</span>
      </button>
    );
  }

  const positionClasses = position === 'bottom-left' 
    ? 'left-6' 
    : 'right-6';

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-24 ${positionClasses} z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default SupportButton;
