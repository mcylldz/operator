import React from 'react';
import { BRANDS } from '../../constants';

const Credibility: React.FC = () => {
  return (
    <section className="py-6 md:py-16 bg-[#023a97] relative overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="max-w-4xl mx-auto text-center mb-4 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold font-display mb-2 md:mb-3 text-white">
            Operasyondan Gelen <span className="text-white/80 font-normal">Bilgi</span>
          </h2>
            <p className="text-white/70 text-xs md:text-base leading-relaxed hidden md:block">
             8 yıl önce sıfırdan başladık. Türkiye, Avrupa ve Amerika pazarlarında markalar inşa ettik.
             <span className="text-white font-semibold"> Roasell</span> ve <span className="text-white font-semibold">Romesel</span> çatısı altında kurduğumuz operasyonları bugün hâlâ bizzat yönetiyoruz. Size öğrettiğimiz her şeyi önce kendimiz sahada test ettik.
           </p>
          <p className="text-white/70 text-xs leading-relaxed md:hidden">
            <span className="text-white font-semibold">Roasell</span> ve <span className="text-white font-semibold">Romesel</span> operasyonlarını bugün hâlâ bizzat yönetiyoruz.
          </p>
        </div>

        {/* Brand Logos - Tighter on mobile */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 opacity-70">
          {BRANDS.map((brand, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 brightness-0 invert"
            >
              {brand.image ? (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className={`${brand.className || 'h-8 md:h-12'} w-auto object-contain`}
                />
              ) : (
                <span className="text-base md:text-2xl font-bold text-white/60 group-hover:text-white transition-colors duration-300 font-display cursor-default">
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