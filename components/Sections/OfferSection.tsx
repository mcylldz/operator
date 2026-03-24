import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Zap,
  Play,
  Tag,
  Clock,
  Shield,
  CreditCard,
} from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const COURSE_MODULES = [
  { name: 'Temeller', duration: '1 Saat 5 Dakika' },
  { name: 'Satışın Anatomisi', duration: '1 Saat 25 Dakika' },
  { name: 'Ürün Sayfası Mastermind', duration: '24 Dakika' },
  { name: 'Reklam Metodolojisi ve Meta', duration: '2 Saat 4 Dakika' },
  { name: 'Meta Andromeda Güncellemesi ve Zekice Kreatif Üretmenin Yolu', duration: '32 Dakika' },
  { name: 'AMERİKA PAZARI — Hayat Kurtarıcı Ürün: Baştan Sona Marka Mutfağı', duration: '1 Saat' },
];

const BONUSES = [
  'RoaSell Pro Mağaza Tema',
  'Roasell Gempages Tema',
  'Kâr - Zarar tablosu',
  'Başabaş Noktası Hesaplama Şablonu',
  'RoaSell Ads Creative - Şablonları',
  'İngiltere Şirket Kurulum Rehberi',
  'Wise Kurulum Rehberi',
  'Stripe Kurulum Rehberi',
];

/* ─────────── Step Indicator ─────────── */
const StepIndicator = ({ step }: { step: 'info' | 'payment' }) => (
  <div className="flex items-center gap-0 mb-6">
    {/* Step 1 */}
    <div className="flex items-center gap-1.5">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'info' ? 'bg-[#023a97] text-white' : 'bg-green-500 text-white'}`}>
        {step === 'info' ? '1' : <CheckCircle2 className="w-3.5 h-3.5" />}
      </div>
      <span className={`text-xs font-semibold ${step === 'info' ? 'text-[#023a97]' : 'text-green-600'}`}>Bilgiler</span>
    </div>
    {/* Line */}
    <div className={`w-10 h-0.5 mx-2 ${step === 'payment' ? 'bg-[#023a97]' : 'bg-gray-200'}`} />
    {/* Step 2 */}
    <div className="flex items-center gap-1.5">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'bg-[#023a97] text-white' : 'bg-gray-200 text-gray-500'}`}>
        2
      </div>
      <span className={`text-xs font-semibold ${step === 'payment' ? 'text-[#023a97]' : 'text-gray-400'}`}>Ödeme</span>
    </div>
  </div>
);

/* ─────────── Trust Bar ─────────── */
const TrustBar = () => (
  <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Lock className="w-3 h-3" /> 256-bit SSL
    </span>
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <Shield className="w-3 h-3" /> Güvenli Ödeme
    </span>
    <span className="flex items-center gap-1 text-[11px] text-gray-400">
      <CreditCard className="w-3 h-3" /> Stripe ile İşlenir
    </span>
  </div>
);

/* ─────────── Checkout Form ─────────── */
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/tebrikler` },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'Bir hata oluştu.');
    } else {
      setMessage('Beklenmeyen bir hata oluştu.');
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {message && <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">{message}</div>}
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="cta-glow w-full bg-[#023a97] hover:bg-[#012d78] disabled:opacity-60 text-white rounded-xl py-4 text-[15px] font-bold tracking-wide flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
      >
        {isLoading ? 'İşleniyor...' : (<>SİPARİŞİ TAMAMLA — $97 <ArrowRight className="w-4 h-4" /></>)}
      </button>
      <TrustBar />
    </form>
  );
};

/* ─────────── Main OfferSection ─────────── */
const OfferSection: React.FC = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [step, setStep] = useState<'info' | 'payment'>('info');

  const [utmParams] = useState({
    utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
    utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
    utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null,
  });

  // Countdown — 24 dakika
  const [timeLeft, setTimeLeft] = useState(24 * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);
  const formatNum = (num: number) => num.toString().padStart(2, '0');
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      (function () {
        const leadWebhook = 'https://dtt1z7t3.rcsrv.com/webhook/kitlead';
        const leadData = {
          ...customerInfo,
          ...utmParams,
          variant: localStorage.getItem('ab_variant') || 'A',
          event_name: 'Lead',
          event_id: crypto.randomUUID(),
          event_time: Math.floor(Date.now() / 1000),
          url: window.location.href,
          ua: navigator.userAgent,
        };
        const img = new Image();
        img.src = leadWebhook + '?' + new URLSearchParams(leadData as any).toString();
        fetch(leadWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(leadData),
        }).catch(() => {});
      })();
      localStorage.setItem('last_purchase_info', JSON.stringify({ ...customerInfo, ...utmParams }));
      const res = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: 'roasell-kit' }], customer: customerInfo }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (err) {
      console.error('Error creating payment intent', err);
    }
  };

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#023a97',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#ef4444',
      fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '10px',
    },
  };

  return (
    <section id="offer" className="pt-4 pb-16 md:pt-8 md:pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 bg-[#023a97] text-white rounded-full px-3 py-1 text-xs uppercase tracking-wider font-bold mb-4">
            <Zap className="w-3 h-3" /> Erken Erişim Teklifi
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-3 leading-tight">
            "Nasıl yapılıyor?" sorusunun<br className="hidden md:block" /> cevabı içeride.
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Operasyonumuzu, sistemlerimizi ve kararlarımızı şeffaf şekilde paylaşıyoruz. İçeri gir, gör, uygula.
          </p>
        </motion.div>

        {/* ── Offer Card ── */}
        <div className="flex justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-2xl"
          >
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-[#023a97]" />

              {/* ── Ürün Görseli ── */}
              <div className="bg-[#f8f9fb] p-5">
                <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src="/assets/thumbnail.webp"
                    alt="Roasell Operatör Sistemi"
                    className="w-full h-auto block"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/f3f4f6/1f2937?text=Roasell+Operatör+Sistemi'; }}
                  />
                </div>
              </div>

              {/* ── Fiyat + Zamanlayıcı ── */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 bg-[#f8f9fb] border-y border-gray-100">
                {/* Left: Price */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5 fill-green-600 stroke-none" /> %60 İndirim Uygulandı
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-lg text-gray-400 line-through font-medium">$245</span>
                    <span className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-none">$97</span>
                  </div>
                  <span className="text-[11px] text-gray-500">tek seferlik ödeme</span>
                </div>

                {/* Right: Timer */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold">Teklif süresi</span>
                  <div className="flex items-center gap-1">
                    <div className="timer-box-animate bg-[#023a97] text-white rounded-lg w-10 h-10 text-lg font-bold flex items-center justify-center">
                      {formatNum(mins)}
                    </div>
                    <span className="text-[#023a97] font-bold text-lg">:</span>
                    <div className="timer-box-animate bg-[#023a97] text-white rounded-lg w-10 h-10 text-lg font-bold flex items-center justify-center">
                      {formatNum(secs)}
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <span className="text-[9px] text-gray-500 uppercase w-10 text-center">dakika</span>
                    <span className="text-[9px] text-gray-500 uppercase w-10 text-center">saniye</span>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8">

                {/* ── Eğitim Modülleri ── */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-[3px] h-4 bg-[#023a97] rounded-full" />
                    <Clock className="w-3.5 h-3.5 text-[#023a97]" />
                    <span className="text-[11px] font-bold text-[#023a97] uppercase tracking-wider">Eğitim Modülleri — 6+ Saat İçerik</span>
                  </div>
                  <div className="space-y-1.5">
                    {COURSE_MODULES.map((mod, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-2 bg-[#f8f9fb] rounded-lg border border-gray-200 hover:border-[#023a97] transition-colors"
                      >
                        <div className="w-6 h-6 bg-[#023a97] rounded-md flex items-center justify-center shrink-0">
                          <Play className="w-3 h-3 text-white fill-white" />
                        </div>
                        <span className="text-[13px] font-medium text-gray-900 flex-1 leading-snug">{mod.name}</span>
                        <span className="text-[11px] text-gray-500 bg-white border border-gray-200 rounded px-1.5 py-0.5 font-medium whitespace-nowrap shrink-0">
                          {mod.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-right text-[11px] text-[#023a97] font-semibold mt-1.5 pt-1.5 border-t border-dashed border-gray-200">
                    Toplam: 6 Saat 30 Dakika
                  </div>
                </div>

                {/* ── Bonuslar ── */}
                <div>
                  <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg mb-1.5">
                    <span className="text-[12px] font-bold text-red-600">$499 Değerinde 8 Bonus — HEDİYE</span>
                    <span className="text-[10px] font-semibold text-red-800 bg-red-100 px-2 py-0.5 rounded shrink-0">ÜCRETSİZ</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {BONUSES.map((bonus, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-700 bg-[#f8f9fb] border border-gray-100 rounded-md px-2 py-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                        <span className="leading-tight">{bonus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── 2-Step Form ── */}
                <div>
                  <StepIndicator step={step} />

                  <AnimatePresence mode="wait">
                    {step === 'info' ? (
                      <motion.form
                        key="info"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        onSubmit={handleInfoSubmit}
                        className="space-y-4"
                      >
                        {[
                          { label: 'Ad Soyad', type: 'text', key: 'name', placeholder: 'Adınız Soyadınız' },
                          { label: 'E-posta Adresi', type: 'email', key: 'email', placeholder: 'ornek@email.com' },
                          { label: 'Telefon Numarası', type: 'tel', key: 'phone', placeholder: '05XX XXX XX XX' },
                        ].map(({ label, type, key, placeholder }) => (
                          <div key={key}>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
                            <input
                              type={type}
                              required
                              placeholder={placeholder}
                              value={(customerInfo as any)[key]}
                              onChange={e => setCustomerInfo({ ...customerInfo, [key]: e.target.value })}
                              className="w-full bg-[#f8f9fb] border-[1.5px] border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-[#023a97] focus:bg-white focus:ring-2 focus:ring-[#023a97]/10 outline-none transition-all"
                            />
                          </div>
                        ))}

                        <button
                          type="submit"
                          className="cta-glow w-full bg-[#023a97] hover:bg-[#012d78] text-white rounded-xl py-4 text-[15px] font-bold tracking-wide flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
                        >
                          ÖDEMEYE GEÇ <ArrowRight className="w-4 h-4" />
                        </button>
                        <TrustBar />
                      </motion.form>
                    ) : (
                      <motion.div
                        key="payment"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-500">Ödenecek Tutar</span>
                          <span className="text-xl font-bold text-green-600">$97.00</span>
                        </div>
                        {clientSecret && (
                          <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                            <CheckoutForm />
                          </Elements>
                        )}
                        <button
                          onClick={() => setStep('info')}
                          className="w-full text-center text-gray-400 text-sm mt-3 hover:text-gray-600 transition-colors underline"
                        >
                          Bilgileri Düzenle
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
