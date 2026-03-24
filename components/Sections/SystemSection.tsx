import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ShieldCheck } from 'lucide-react';

const ShopifyNotification = () => {
  const [notification, setNotification] = useState<{ amount: number; id: number; orderId: number } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      const amount = Math.floor(Math.random() * (6990 - 1990 + 1)) + 1990;
      const orderId = 105409 + Math.floor(Math.random() * 1000);
      setNotification({ amount, id: Date.now(), orderId });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    };

    const initialTimer = setTimeout(showNotification, 1000);

    const loop = () => {
      const randomInterval = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
      setTimeout(() => {
        showNotification();
        loop();
      }, randomInterval + 4000);
    };

    const loopTimer = setTimeout(loop, 1000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(loopTimer);
    };
  }, []);

  return (
    <div className="w-full h-auto min-h-[80px] relative z-30 mb-4 md:mb-6">
      <AnimatePresence mode="wait">
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-full bg-[#252525]/50 backdrop-blur-xl text-white p-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5"
          >
            <img src="/assets/shopify-logo.png" alt="Shopify" className="w-[42px] h-[42px] rounded-[10px] object-cover shrink-0" />

            <div className="flex flex-col flex-1 min-w-0 justify-center">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-[14px] font-semibold text-white tracking-tight leading-none">#{notification.orderId} adlı sipariş</span>
                <span className="text-[11px] text-[#98989E] leading-none">Şimdi</span>
              </div>
              <p className="text-[13px] text-[#EBEBF5] leading-snug">
                Online Store kaynağından ₺{notification.amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}<span className="hidden md:inline">, </span><br className="md:hidden" />1 ürün • RoaSell
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SystemSection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 bg-roasell-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-roasell-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center">

          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Notification System - Relocated Here */}
              <ShopifyNotification />

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-roasell-gold text-[10px] md:text-sm font-medium mb-3">
                <Database className="w-3 h-3 md:w-4 md:h-4" />
                <span>Operatör Sistemi</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-display mb-3 text-white leading-tight">
                Operasyonu Sıfırdan Kuranlar İçin
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Roasell Operatör Sistemi, ilk günden itibaren ne yapman gerektiğini değil, nasıl yapıldığını gösterir. Kendi operasyonumuzun dökümantasyonları, sistemleri ve adımlarıyla ilerlersin.
              </p>

              <div className="space-y-2 md:space-y-3">
                {[
                  "Adım adım operasyon kurulumu",
                  "Gerçek bir mağazadan alınan kararlar",
                  "Kendi sisteminize entegre edebileceğiniz drive dosyaları"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3 text-gray-300 text-xs md:text-base">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-roasell-gold/20 flex items-center justify-center text-roasell-gold shrink-0">
                      <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Visual - Dashboard Only */}
          <div className="order-1 lg:order-2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 px-2"
            >
              {/* Main Dashboard Card */}
              <div className="bg-roasell-card border border-white/10 rounded-lg md:rounded-xl p-1 md:p-2 shadow-2xl relative z-10 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg md:rounded-lg object-cover"
                >
                  <source src="/assets/V1.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Background Grid Decoration */}
              <div className="absolute -inset-1 md:-inset-4 border border-white/5 rounded-lg -z-10 rotate-2 scale-105"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SystemSection;