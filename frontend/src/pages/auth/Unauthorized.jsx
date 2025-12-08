import React from 'react';
import { Link } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-primary text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-secondary/50 border border-accent/20 p-8 backdrop-blur-xl text-center">
          <LockClosedIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-4">Zugriff verweigert</h1>
          <p className="text-slate-350 mb-8">
            Sie haben keine Berechtigung, auf diese Seite zuzugreifen.
          </p>
          
          <div className="space-y-3">
            <Link
              to="/"
              className="block px-8 py-3 rounded-lg bg-accent hover:bg-accent-light text-primary font-semibold transition duration-300 shadow-lg shadow-accent/30"
            >
              Zur Startseite
            </Link>
            <Link
              to="/login"
              className="block px-8 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 font-semibold transition duration-300"
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
