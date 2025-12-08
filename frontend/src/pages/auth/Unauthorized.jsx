import React from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-8 text-center">
          <LockClosedIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Zugriff verweigert</h1>
          <p className="text-gray-400 mb-8">
            Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
          </p>
          
          <div className="space-y-3">
            <Link
              to="/"
              className="block px-6 py-3 rounded bg-white text-black font-medium hover:bg-gray-100 transition"
            >
              Zur Startseite
            </Link>
            <Link
              to="/login"
              className="block px-6 py-3 rounded border border-zinc-700 text-white hover:bg-zinc-800 font-medium transition"
            >
              Zum Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
