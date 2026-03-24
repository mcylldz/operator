import React from 'react';
import { FEATURES } from '../../constants';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
    return (
        <section className="py-8 md:py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">
                    <div className="mb-2 lg:mb-0">
                        <h2 className="text-xl md:text-4xl font-bold font-display mb-2 md:mb-4">
                            Neden <span className="text-roasell-gold">Roasell Operatör Sistemi?</span>
                        </h2>
                        <p className="text-gray-500 text-sm md:text-lg leading-relaxed">
                                Çoğu eğitim size ne yapmanız gerektiğini söyler. Biz size nasıl yapıldığını gösteriyoruz. Kendi operasyonumuzun içine giriyorsunuz, sistemimizi görüyorsunuz, dökümantasyonlarımıza erişiyorsunuz ve bunu kendi operasyonunuza uyguluyorsunuz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {FEATURES.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -2 }}
                                className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-roasell-gold/50 transition-all duration-300"
                            >
                                <div className="mb-2 md:mb-3 p-1.5 md:p-2 bg-roasell-gold/10 rounded-md inline-block border border-roasell-gold/20">
                                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-6 md:h-6 text-roasell-gold" })}
                                </div>
                                <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1">{feature.title}</h3>
                                <p className="text-xs md:text-sm text-gray-500 leading-snug">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;