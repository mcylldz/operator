import React from 'react';
import { BRANDS } from '../../constants';

const Credibility: React.FC = () => {
  return (
    <section className="py-6 md:py-16 bg-roasell-black relative overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto text-center mb-4 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold font-display mb-2 md:mb-3">
            Operasyondan Gelen <span className="text-roasell-gold">Bilgi</span>
          </h2>
            <p className="text-gray-500 text-xs md:text-base leading-relaxed hidden md:block">
             8 yıl önce sıfırdan başladık. Türkiye, Avrupa ve Amerika pazarlarında markalar inşa ettik.
             <span className="text-gray-900 font-semibold"> Roasell</span> ve <span className="text-gray-900 font-semibold">Romesel</span> çatısı altında kurduğumuz operasyonları bugün hâlâ bizzat yönetiyoruz. Size öğrettiğimiz her şeyi önce kendimiz sahada test ettik.
           </p>
          <p className="text-gray-500 text-xs leading-relaxed md:hidden">
            <span className="text-gray-900 font-semibold">Roasell</span> ve <span className="text-gray-900 font-semibold">Romesel</span> operasyonlarını bugün hâlâ bizzat yönetiyoruz.
          </p>
        </div>

        {/* Brand Logos - Tighter on mobile */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 opacity-70">
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              {brand.image ? (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className={`${brand.className || 'h-8 md:h-12'} w-auto object-contain`}
                />
              ) : (
                <span className="text-base md:text-2xl font-bold text-gray-400 group-hover:text-gray-900 transition-colors duration-300 font-display cursor-default">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credibility;