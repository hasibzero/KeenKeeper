import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="bg-[#2b4d40] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h2 className="text-4xl font-bold tracking-tight mb-4">
          KeenKeeper
        </h2>
        <p className="text-[#a0bba8] text-center max-w-2xl mb-10 text-sm md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="flex flex-col items-center mb-16">
          <span className="font-medium text-[15px] mb-4 tracking-wide">
            Social Links
          </span>
          <div className="flex space-x-3">
            <a 
              href="#" 
              aria-label="Instagram"
              className="bg-white text-[#2b4d40] w-10 h-10 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <FaInstagram size={18} />
            </a>
            <a 
              href="#" 
              aria-label="Facebook"
              className="bg-white text-[#2b4d40] w-10 h-10 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <FaFacebookF size={18} />
            </a>
            <a 
              href="#" 
              aria-label="X (Twitter)"
              className="bg-white text-[#2b4d40] w-10 h-10 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <FaXTwitter size={18} />
            </a>
          </div>
        </div>

        <div className="w-full border-t border-[#3e6353] pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[#a0bba8]">
          <p className="mb-4 md:mb-0">
            © 2026 KeenKeeper. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}