import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from '../components/common/UserMenu';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <aside className="w-72 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4 hidden md:block">
          <div className="mb-8">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center">JN</div>
              <div className="text-white font-semibold">Studio</div>
            </Link>
          </div>

          <nav className="flex flex-col gap-2 text-sm text-zinc-300">
            <Link to="/dashboard" data-tour="dashboard" className="py-2 px-3 rounded hover:bg-zinc-800">Übersicht</Link>
            <Link to="/dashboard/bookings" data-tour="bookings" className="py-2 px-3 rounded hover:bg-zinc-800">Buchungen</Link>
            <Link to="/dashboard/services" data-tour="services" className="py-2 px-3 rounded hover:bg-zinc-800">Services</Link>
            <Link to="/dashboard/employees" className="py-2 px-3 rounded hover:bg-zinc-800">Mitarbeiter</Link>
            <Link to="/dashboard/success-metrics" className="py-2 px-3 rounded hover:bg-zinc-800">Erfolgsmetriken</Link>
            <Link to="/dashboard/widget" data-tour="widget" className="py-2 px-3 rounded hover:bg-zinc-800">Widget</Link>
            <Link to="/dashboard/settings" data-tour="settings" className="py-2 px-3 rounded hover:bg-zinc-800">Einstellungen</Link>
            <hr className="border-zinc-800 my-2" />
            <Link to="/dashboard/help" data-tour="help" className="py-2 px-3 rounded hover:bg-zinc-800 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hilfe & Tutorials
            </Link>
          </nav>
        </aside>

        <div className="flex-1">
          <div className="md:pl-72">
            <div className="bg-black/20 border-b border-zinc-800 p-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Dashboard</h2>
                <UserMenu />
              </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
