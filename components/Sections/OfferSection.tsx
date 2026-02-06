import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../ui/Button';

// Using the key from env or a placeholder if missing for dev safety
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

const PRODUCTS_INCLUDED = [
    "Ürün bulma",
    "Rakip araştırması & analizi",
    "Mağaza oluşturma",
    "Reklam kreatifi hazırlama",
    "Şirket kurulumu & ödeme yöntemleri",
    "Pazar belirleme",
    "Reklam ve pazarlama dahil 28 günlük süreç rehberliği"
];

const BONUSES = [
    "Ürün Araştırma Tablosu",
    "RoaSell Pro Mağaza Tema",
    "Roasell Gempages Tema",
    "Kâr - Zarar tablosu",
    "Başabaş Noktası Hesaplama Şablonu",
    "RoaSell Ads Creative - Şablonları",
    "İngiltere Şirket Kurulum Rehberi",
    "Wise Kurulum Rehberi",
    "Stripe Kurulum Rehberi",
    "Yasal Sayfalar"
];

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean; titleClassName?: string }> = ({ title, children, defaultOpen = false, titleClassName = "text-gray-900" }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <div className={`flex items-center gap-2 font-bold ${titleClassName}`}>
                    <ShieldCheck className={`w-5 h-5 ${titleClassName.includes('text-red') ? 'text-red-600' : 'text-roasell-gold'}`} />
                    <span>{title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4 bg-white border-t border-gray-100">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

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
            confirmParams: {
                return_url: `${window.location.origin}/tebrikler`,
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message || "An error occurred.");
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            {message && <div className="text-red-500 text-sm">{message}</div>}
            <Button
                variant="primary"
                size="lg"
                disabled={isLoading || !stripe || !elements}
                className="w-full font-bold py-4 mt-4 shadow-xl shadow-roasell-gold/20 text-white"
                withArrow
            >
                {isLoading ? "İşleniyor..." : "SİPARİŞİ TAMAMLA - $97"}
            </Button>
            <div className="mt-2 text-center animate-pulse">
                <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold border border-red-100 shadow-sm inline-flex items-center gap-1.5">
                    🎁 $499'lık Bonus Paket Hediye!
                </span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL ile güvenli ödeme</span>
            </div>
        </form>
    );
};

const OfferSection: React.FC = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
    const [step, setStep] = useState<'info' | 'payment'>('info');

    // UTM Params
    const [utmParams, setUtmParams] = useState({
        utm_source: new URLSearchParams(window.location.search).get('utm_source') || null,
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || null,
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || null
    });

    // Countdown logic: 24 minutes
    const [timeLeft, setTimeLeft] = useState(24 * 60);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatNum = (num: number) => num.toString().padStart(2, '0');
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    const handleInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // --- LEAD TRACKING WEBHOOK (Optimized) ---
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
                    ua: navigator.userAgent
                };

                // 1) IMAGE (GET) - Most reliable for webhooks
                const img = new Image();
                img.src = leadWebhook + '?' + new URLSearchParams(leadData as any).toString();

                // 2) FETCH (POST) - CORS friendly
                fetch(leadWebhook, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(leadData)
                }).catch(() => { });
            })();

            // Save info for the success page webhook
            localStorage.setItem('last_purchase_info', JSON.stringify({ ...customerInfo, ...utmParams }));

            const res = await fetch('/.netlify/functions/create-payment-intent', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: [{ id: "roasell-kit" }], customer: customerInfo }),
            });
            const data = await res.json();
            setClientSecret(data.clientSecret);
            setStep('payment');
        } catch (err) {
            console.error("Error creating payment intent", err);
        }
    };

    const appearance = {
        theme: 'stripe' as const, // Light theme for white background
        variables: {
            colorPrimary: '#4598b7',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#df1b41',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '6px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <section id="offer" className="pt-4 pb-16 md:pt-8 md:pb-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">

                {/* HEADLINE - Funnel Style Centered */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 mb-4 leading-tight">
                        Her gün ne yapacağını söyleyen <br />
                        <span className="text-roasell-gold">bir sistem ister misin?</span>
                    </h2>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        Bahane sayılabilecek herşeyin çözümünü ttek bir pakette topladık, artık tek yapman gereken Roasell Kit'e kayıt olup süreci başlatmak olacak.
                    </p>
                </div>

                <div className="flex justify-center items-start">

                    {/* CENTERED FOCUS COLUMN */}
                    <div className="w-full max-w-2xl">
                        <div className="bg-white border-2 border-roasell-gold/20 rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden">

                            {/* Product Image */}
                            <div className="relative group mb-6 -mx-2 md:mx-0">
                                <div className="absolute -inset-1 bg-roasell-gold/20 rounded-xl blur-xl group-hover:bg-roasell-gold/30 transition-all duration-500"></div>
                                <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src="/assets/thumbnail.webp"
                                        alt="RoaSell Kit Product"
                                        className="w-full h-auto block"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://placehold.co/600x400/f3f4f6/1f2937?text=RoaSell+Kit";
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="text-center mb-6 bg-gray-50 -mx-8 p-4 border-y border-gray-100">
                                <div className="black-friday-component mb-16">
                                    <div className="coupon">
                                        <div className="box"><span>60%</span><span>İNDİRİM</span></div>
                                        <div className="diver"></div>
                                        <div className="content">
                                            <h3>
                                                <span>E</span><span>R</span><span>K</span><span>E</span>
                                                <span className="end">N </span>
                                                <span>E</span><span>R</span><span>İ</span><span>Ş</span><span>İ</span><span>M</span><span>🎉</span>
                                            </h3>
                                            <p>
                                                Fazlaca geri bildirim toplayabilmek adına ilk alanlar için <strong>60% indirim</strong> geçerlidir.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timer">
                                        <div className="item">
                                            <div className="num-box">00</div>
                                            <p>gün</p>
                                        </div>
                                        <span className="colon">:</span>
                                        <div className="item">
                                            <div className="num-box">00</div>
                                            <p>saat</p>
                                        </div>
                                        <span className="colon">:</span>
                                        <div className="item">
                                            <div className="num-box">{formatNum(mins)}</div>
                                            <p>dakika</p>
                                        </div>
                                        <span className="colon">:</span>
                                        <div className="item">
                                            <div className="num-box">{formatNum(secs)}</div>
                                            <p>saniye</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-red-500 line-through text-2xl font-medium">$245.00</span>
                                    <div className="text-5xl font-bold text-green-600">$97</div>
                                </div>
                            </div>

                            {/* Accordions - Immediately below price */}
                            <div className="space-y-4 mb-8">
                                <AccordionItem title="28 Günlük Challenge" defaultOpen={false}>
                                    <div className="space-y-4 text-gray-700 leading-relaxed">
                                        <p>
                                            Şunu net söyleyelim: Dropshipping’i izleyerek öğrenemezsin. İzlersin, gaza gelirsin, 2 gün sonra yine “ne yapacağım?” diye kalırsın.
                                        </p>
                                        <p>
                                            RoaSell Kit ise bunu bitirir. Çünkü 28 gün boyunca sana sadece bilgi vermez; seni yönlendirir. Gün gün görevleri uygularsın, kontrol listeleriyle ilerlersin, doğru sırayla mağazanı kurar ve reklama çıkarsın.
                                        </p>
                                        <p>
                                            Bu kit, kafası karışık insanlar için netlik üretir. Takıldığın noktada dönüp tekrar bakarsın, rastgele deneme yapmazsın. Amacımız motivasyon değil; sonuç.
                                        </p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="499$ Değerindeki Bonus İçerikler HEDİYE!" titleClassName="text-red-600 text-lg" defaultOpen={false}>
                                    <ul className="space-y-3">
                                        {BONUSES.map((item, idx) => (
                                            <li key={idx} className="text-gray-600 text-sm md:text-base flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                <span>
                                                    {item} <span className="text-red-600 font-bold ml-1">- HEDİYE</span>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionItem>
                            </div>

                            {step === 'info' ? (
                                <form onSubmit={handleInfoSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ad Soyad</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-roasell-gold focus:ring-1 focus:ring-roasell-gold outline-none transition-all"
                                            value={customerInfo.name}
                                            onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                            placeholder="Adınız Soyadınız"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-posta Adresi</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-roasell-gold focus:ring-1 focus:ring-roasell-gold outline-none transition-all"
                                            value={customerInfo.email}
                                            onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon Numarası</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:border-roasell-gold focus:ring-1 focus:ring-roasell-gold outline-none transition-all"
                                            value={customerInfo.phone}
                                            onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                            placeholder="05XX XXX XX XX"
                                        />
                                    </div>
                                    <Button type="submit" variant="primary" size="lg" className="w-full font-bold py-4 mt-4 shadow-lg shadow-roasell-gold/20 text-white" withArrow>
                                        ÖDEMEYE GEÇ →
                                    </Button>
                                    <div className="mt-2 text-center animate-pulse">
                                        <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold border border-red-100 shadow-sm inline-flex items-center gap-1.5">
                                            🎁 $499'lık Bonus Paket Hediye!
                                        </span>
                                    </div>
                                    <p className="text-center text-xs text-gray-400 mt-3">Bilgileriniz 256-bit SSL sertifikası ile korunmaktadır.</p>
                                </form>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                        <div className="text-sm font-medium text-gray-500">Ödenecek Tutar</div>
                                        <div className="text-xl font-bold text-green-600">$97.00</div>
                                    </div>
                                    {clientSecret && (
                                        <Elements options={options} stripe={stripePromise}>
                                            <CheckoutForm />
                                        </Elements>
                                    )}
                                    <button
                                        onClick={() => setStep('info')}
                                        className="w-full text-center text-gray-400 text-sm mt-4 hover:text-gray-600 transition-colors underline"
                                    >
                                        Bilgileri Düzenle
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;
