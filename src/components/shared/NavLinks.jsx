'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, LineChart, Menu, X } from 'lucide-react';

export default function NavLinks() {
  const pathname = usePathname() || '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <div className="hidden md:flex items-center space-x-1">
        <Link
          href="/"
          className={isActive('/') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-emerald-900' : 'flex items-center space-x-2 text-slate-600 px-4 py-2 rounded-md font-medium transition-colors hover:bg-slate-100 hover:text-slate-900'}
        >
          <Home size={18} />
          <span>Home</span>
        </Link>

        <Link
          href="/timeline"
          className={isActive('/timeline') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-emerald-900' : 'flex items-center space-x-2 text-slate-600 px-4 py-2 rounded-md font-medium transition-colors hover:bg-slate-100 hover:text-slate-900'}
        >
          <Clock size={18} />
          <span>Timeline</span>
        </Link>

        <Link
          href="/stats"
          className={isActive('/stats') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-2 rounded-md font-medium transition-colors hover:bg-emerald-900' : 'flex items-center space-x-2 text-slate-600 px-4 py-2 rounded-md font-medium transition-colors hover:bg-slate-100 hover:text-slate-900'}
        >
          <LineChart size={18} />
          <span>Stats</span>
        </Link>
      </div>

      <button
        className="md:hidden text-slate-600 hover:text-slate-900 p-2"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 pb-2">
          <Link
            href="/"
            className={isActive('/') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-3 rounded-md font-medium' : 'flex items-center space-x-2 text-slate-600 px-4 py-3 rounded-md font-medium hover:bg-slate-50'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link
            href="/timeline"
            className={isActive('/timeline') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-3 rounded-md font-medium' : 'flex items-center space-x-2 text-slate-600 px-4 py-3 rounded-md font-medium hover:bg-slate-50'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Clock size={18} />
            <span>Timeline</span>
          </Link>

          <Link
            href="/stats"
            className={isActive('/stats') ? 'flex items-center space-x-2 bg-emerald-800 text-white px-4 py-3 rounded-md font-medium' : 'flex items-center space-x-2 text-slate-600 px-4 py-3 rounded-md font-medium hover:bg-slate-50'}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <LineChart size={18} />
            <span>Stats</span>
          </Link>
        </div>
      )}
    </>
  );
}
