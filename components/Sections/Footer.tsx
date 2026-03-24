import React from 'react';
import { Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <img src="/assets/logo.png" alt="RoaSell" className="h-8 w-auto object-contain" loading="lazy" />
          </div>
          <p className="text-gray-500 text-sm">© RoaSell 2025. Tüm hakları saklıdır.</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-roasell-gold transition-colors">Gizlilik Politikası</a>
          <a href="#" className="hover:text-roasell-gold transition-colors">Kullanım Şartları</a>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://www.instagram.com/gurkanzone/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-roasell-gold hover:text-white transition-all">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://www.youtube.com/@gurkanzone" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-roasell-gold hover:text-white transition-all">
            <Youtube className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;