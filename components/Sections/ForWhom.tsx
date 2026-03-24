import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const FOR_ITEMS = [
  'E-ticarete başlamak istiyorsun ama nereden başlayacağını bilmiyorsun',
  'Teorik bilgilerden sıkıldın, gerçek bir operasyonu içeriden görmek istiyorsun',
  'Sistemi kendine bağlı olmaktan çıkarıp ölçeklendirmek istiyorsun',
  'Ekip kurmak, dökümante etmek ve operasyonu büyütmek istiyorsun',
  'Çalışmaya, emek vermeye hazırsın',
];

const NOT_FOR_ITEMS = [
  'Hızlı para kazanmanın yolunu arıyorsun',
  'Teorik bilgi yeterli geliyorsa sana',
  'Sistemi kurmak için emek vermek istemiyorsun',
  'Sadece başkasının yapmasını bekliyorsun',
];

const ForWhom: React.FC = () => {
  return (
    <section className="py-10 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/8 rounded-full blur-[100px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold font-display text-gray-900">
            Bu Sistem <span className="text-roasell-gold">Kimin İçin?</span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">

          {/* LEFT — For */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-green-50 border border-green-200 p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
              <h3 className="text-base md:text-lg font-bold text-green-700">
                Bu sistem senin için eğer:
              </h3>
            </div>
            <ul className="space-y-4">
              {FOR_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 text-base leading-snug">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Not for */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl bg-red-50 border border-red-200 p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-5">
              <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              <h3 className="text-base md:text-lg font-bold text-red-700">
                Bu sistem senin için değil eğer:
              </h3>
            </div>
            <ul className="space-y-4">
              {NOT_FOR_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-200 text-base leading-snug">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ForWhom;
