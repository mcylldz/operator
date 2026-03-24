
import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-roasell-black/80 backdrop-blur-md border-white/5 py-3'
        : 'bg-transparent border-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 relative flex items-center justify-between h-14">

        {/* Left Side - placeholder for layout balance */}
        <div className="hidden md:block w-24" />

        {/* Logo - Absolutely Centered */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-50"
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <img
            src="/assets/logo.png"
            alt="RoaSell"
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        {/* Right Side - empty */}
        <div className="hidden md:block w-24" />
      </div>
    </header >
  );
};

export default Header;
