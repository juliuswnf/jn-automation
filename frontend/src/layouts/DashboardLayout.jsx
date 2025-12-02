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
            <Link to="/dashboard" className="py-2 px-3 rounded hover:bg-zinc-800">Übersicht</Link>
            <Link to="/dashboard/bookings" className="py-2 px-3 rounded hover:bg-zinc-800">Buchungen</Link>
            <Link to="/dashboard/services" className="py-2 px-3 rounded hover:bg-zinc-800">Services</Link>
            <Link to="/dashboard/widget" className="py-2 px-3 rounded hover:bg-zinc-800">Widget</Link>
            <Link to="/dashboard/settings" className="py-2 px-3 rounded hover:bg-zinc-800">Einstellungen</Link>
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
