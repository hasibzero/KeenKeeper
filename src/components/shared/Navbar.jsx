import Link from 'next/link';
import NavLinks from './NavLinks';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl tracking-tight flex items-center">
          <span className="font-extrabold text-slate-800">Keen</span>
          <span className="font-semibold text-emerald-800">Keeper</span>
        </Link>

        <NavLinks />
      </div>
    </nav>
  );
}