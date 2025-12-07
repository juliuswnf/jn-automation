import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [clickCount, setClickCount] = useState(0);

  // Triple-click on logo to access CEO login
  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount >= 3) {
      window.location.href = '/_.admin';
      setClickCount(0);
    }
    
    // Reset after 2 seconds
    setTimeout(() => setClickCount(0), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2 cursor-default select-none"
            onClick={handleLogoClick}
          >
            Willkommen bei JN Business System
          </h1>
          <p className="text-gray-600">
            Wählen Sie Ihre Rolle aus, um fortzufahren
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/login/customer"
            className="block w-full px-6 py-4 border-2 border-primary text-center font-medium rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Ich bin Kunde
          </Link>

          <Link
            to="/login/business"
            className="block w-full px-6 py-4 border-2 border-secondary text-center font-medium rounded-lg text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            Ich bin Geschäftsinhaber
          </Link>

          <Link
            to="/login/employee"
            className="block w-full px-6 py-4 border-2 border-gray-400 text-center font-medium rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Mitarbeiter Login
          </Link>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Kein Account? <Link to="/register" className="text-primary hover:underline">Jetzt registrieren</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
