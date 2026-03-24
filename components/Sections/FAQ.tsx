import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Hiç e-ticaret deneyimim yoksa bu sistem bana uygun mu?',
    a: 'Evet, sıfır deneyimle başlamak için ideal bir temel. Buradan edineceğin her tecrübeyi en efektif şekilde kullanabilmek için gereken altyapıyı kuruyorsun.',
  },
  {
    q: 'Türkiye pazarı için mı, Amerika pazarı için mi geçerli?',
    a: 'Tüm pazarlar için geçerli. Hangi pazarda olursan ol, şartlara göre nasıl aksiyon alman ve nasıl düşünmen gerektiğini görüyorsun.',
  },
  {
    q: 'Ne kadar sermaye ile başlayabilirim?',
    a: 'Net bir tutar vermek doğru olmaz. Ancak 300 ila 3.000 dolar arasında bir bütçen varsa reklam vermeye ve ilk sonuçları almaya hazırsın.',
  },
  {
    q: 'Operasyonumu ne kadar sürede kurabilirim?',
    a: 'Hızlı ve disiplinli çalışırsan 1 ila 4 hafta içinde operasyonunun bir şekil almaya başladığını görürsün.',
  },
  {
    q: 'İçeriye girince gerçekten sizin operasyonunuzu mu görüyorum?',
    a: 'Evet. Bizim ve ekibimizin bizzat yönettiği, ciddi kârlara sahip mağazaların arka planında neler döndüğünü doğrudan izleyebiliyorsun.',
  },
  {
    q: 'Ekibim yok, tek başıma uygulayabilir miyim?',
    a: 'Tam olarak bunu öğretiyoruz. İleride işini ekibe veya farklı uzmanlara devredebilmek için önce iyi bir operatör olman gerekiyor. Bu eğitimde devredilebilir bir e-ticaret operasyonunun nasıl kurulduğunu adım adım görüyorsun.',
  },
  {
    q: 'Daha önce başka eğitimler aldım, bu onlardan ne farkı var?',
    a: 'E-ticarette tek bir çalışan yöntem yok. Her gün güncellenen metodlar, değişen regülasyonlar, bütçeye göre farklı yol haritaları. Sürekli güncel kalmak için sürekli yeni bilgi tüketmek gerekiyor. Roasell Operatör Eğitimi sana yeni bilgileri kaosa dönüşmeden sisteminle bütünleştirebileceğin çalışma kültürünü ve disiplini veriyor.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className="py-12 md:py-20 bg-[#080d23] border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-bold font-display text-white">
            Sıkça Sorulan <span className="text-roasell-gold">Sorular</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-roasell-gold/40 bg-white/5'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                >
                  <span className={`font-semibold text-base md:text-lg leading-snug ${isOpen ? 'text-roasell-gold' : 'text-white'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-roasell-gold' : 'text-gray-400'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-gray-300 text-base leading-relaxed border-t border-white/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
