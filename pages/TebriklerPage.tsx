import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, ShieldCheck } from 'lucide-react';
import Header from '../components/Sections/Header';

const TebriklerPage: React.FC = () => {
    const webhookSentRef = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        // ── Facebook Pixel Purchase ──────────────────────────────
        (async function () {
            const GUARD_KEY = '__PURCHASE_PIXEL_SENT';
            // @ts-ignore
            if (window[GUARD_KEY]) return;
            // @ts-ignore
            window[GUARD_KEY] = true;

            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            const purchaseInfo = JSON.parse(localStorage.getItem('last_purchase_info') || '{}');
            const priceValue = purchaseInfo.price ?? 97;
            const event_id = uuidv4();

            // @ts-ignore
            if (typeof fbq === 'function') {
                try {
                    fbq('track', 'Purchase', {
                        value: priceValue,
                        currency: 'USD',
                        content_type: 'product',
                        content_ids: ['roasell-operator'],
                        client_user_agent: navigator.userAgent,
                    }, { eventID: event_id });
                } catch (e) { }
            }
        })();

        // ── Purchase Webhook ─────────────────────────────────────
        if (!webhookSentRef.current) {
            webhookSentRef.current = true;
            sendPurchaseWebhook();
        }
    }, []);

    const sendPurchaseWebhook = async () => {
        const WEBHOOK = 'https://dtt1z7t3.rcsrv.com/webhook/operator';

        function getCookie(name: string) {
            const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1') + '=([^;]*)'));
            return m ? decodeURIComponent(m[1]) : null;
        }
        function getParam(k: string) { return new URLSearchParams(location.search).get(k); }
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        function computeFBC() {
            const c = getCookie('_fbc'); if (c) return c;
            const fbclid = getParam('fbclid'); if (!fbclid) return null;
            return `fb.1.${Math.floor(Date.now() / 1000)}.${fbclid}`;
        }
        function computeFBP() { return getCookie('_fbp') || null; }

        async function sha256(string: string) {
            if (!string) return '';
            const utf8 = new TextEncoder().encode(string.trim().toLowerCase());
            const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        const purchaseInfo = JSON.parse(localStorage.getItem('last_purchase_info') || '{}');

        let ip = '';
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            ip = ipData.ip;
        } catch (e) { }

        const nameParts = (purchaseInfo.name || '').trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

        const hashedEmail = await sha256(purchaseInfo.email);
        const hashedPhone = await sha256(purchaseInfo.phone);
        const hashedFirstName = await sha256(firstName);
        const hashedLastName = await sha256(lastName);

        const data = {
            // Customer info (clear)
            name: purchaseInfo.name || '',
            email: purchaseInfo.email || '',
            phone: purchaseInfo.phone || '',
            price: purchaseInfo.price ?? 97,
            currency: 'USD',
            // Hashed fields (FB CAPI)
            em: hashedEmail,
            ph: hashedPhone,
            fn: hashedFirstName,
            ln: hashedLastName,
            // Tracking
            event_name: 'Purchase',
            event_id: uuidv4(),
            event_time: Math.floor(Date.now() / 1000),
            fbp: computeFBP() || '',
            fbc: computeFBC() || '',
            ua: navigator.userAgent,
            ip,
            url: location.href.split('?')[0],
            ref: document.referrer || '',
            variant: purchaseInfo.variant || localStorage.getItem('ab_variant') || 'A',
            utm_source: purchaseInfo.utm_source || null,
            utm_medium: purchaseInfo.utm_medium || null,
            utm_campaign: purchaseInfo.utm_campaign || null,
        };

        localStorage.removeItem('last_purchase_info');

        // Dual send: image (GET) + fetch (POST)
        const img = new Image();
        img.src = WEBHOOK + '?' + new URLSearchParams(data as any).toString();

        try {
            fetch(WEBHOOK, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data),
            });
        } catch (e) { }
    };

    return (
        <div className="min-h-screen bg-[#080d23] text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 pt-32 md:pt-40">
                <div className="max-w-2xl w-full text-center">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="flex justify-center mb-8"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl scale-150" />
                            <CheckCircle className="w-20 h-20 text-green-400 relative z-10" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold font-display mb-4"
                    >
                        Tebrikler! 🎉
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">

                            {/* Email icon */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-[#023a97]/30 border border-[#023a97]/50 rounded-2xl p-4">
                                    <Mail className="w-10 h-10 text-[#4a8af4]" />
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl font-semibold text-white mb-3">
                                Satın alma işleminiz başarıyla tamamlandı.
                            </p>

                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                                Giriş bilgileriniz <span className="text-white font-semibold">{' '}kısa süre içinde{' '}</span>
                                e-posta adresinize gönderilecektir. Lütfen spam klasörünüzü de kontrol edin.
                            </p>

                            <div className="bg-[#023a97]/20 border border-[#023a97]/30 rounded-xl p-4 text-sm text-gray-300 text-left space-y-2">
                                <div className="flex items-start gap-2">
                                    <ShieldCheck className="w-4 h-4 text-[#4a8af4] shrink-0 mt-0.5" />
                                    <span>Erişim genellikle <strong className="text-white">15 dakika</strong> içinde sağlanır.</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ShieldCheck className="w-4 h-4 text-[#4a8af4] shrink-0 mt-0.5" />
                                    <span>Herhangi bir sorun yaşarsanız destek ekibimizle iletişime geçebilirsiniz.</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-10"
                    >
                        <a
                            href="https://app.roasell.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#023a97] hover:bg-[#012d78] text-white font-bold px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#023a97]/30"
                        >
                            Platforma Git →
                        </a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 text-gray-500 text-sm"
                    >
                        Herhangi bir sorun yaşamanız durumunda destek ekibimizle iletişime geçebilirsiniz.
                    </motion.p>

                </div>
            </div>
        </div>
    );
};

export default TebriklerPage;
