import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import VideoLite from '../components/ui/VideoLite';
import Header from '../components/Sections/Header';

const TebriklerPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);

        // --- ENHANCED PURCHASE TRACKING (Webhook + Pixel CAPI Ready) ---
        (async function () {
            const WEBHOOK = 'https://dtt1z7t3.rcsrv.com/webhook/roasell-kit';
            const EVENT = 'Purchase';
            const GUARD_KEY = '__PURCHASE_SENT';

            // Helpers
            function getCookie(name: string) {
                const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.*+?^${}()|[\]\\])/g, '\\$1') + '=([^;]*)'));
                return m ? decodeURIComponent(m[1]) : null;
            }
            function getParam(k: string) { return new URLSearchParams(location.search).get(k); }
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
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

            // Single use guard
            // @ts-ignore
            if (window[GUARD_KEY]) return;
            // @ts-ignore
            window[GUARD_KEY] = true;

            const purchaseInfo = JSON.parse(localStorage.getItem('last_purchase_info') || '{}');
            const event_id = uuidv4();
            const event_time = Math.floor(Date.now() / 1000);
            const user_agent = navigator.userAgent || '';

            // Get IP Address
            let ip = '';
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                ip = ipData.ip;
            } catch (e) { }

            // Process Name
            const nameParts = (purchaseInfo.name || '').trim().split(' ');
            const firstName = nameParts[0] || '';
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            // Hashing for Privacy & Pixel
            const hashedEmail = await sha256(purchaseInfo.email);
            const hashedPhone = await sha256(purchaseInfo.phone);
            const hashedFirstName = await sha256(firstName);
            const hashedLastName = await sha256(lastName);

            const data = {
                event_name: EVENT,
                event_id,
                event_time,
                fbp: computeFBP() || '',
                fbc: computeFBC() || '',
                ua: user_agent,
                ip: ip,
                url: location.href.split('?')[0],
                ref: document.referrer || '',
                variant: localStorage.getItem('ab_variant') || 'A',
                // Customer Details
                name: purchaseInfo.name || '',
                email: purchaseInfo.email || '',
                phone: purchaseInfo.phone || '',
                // Hashed Details
                em: hashedEmail,
                ph: hashedPhone,
                fn: hashedFirstName,
                ln: hashedLastName,
                // Transaction
                price: 97,
                currency: 'USD',
                // UTM Parameters
                utm_source: purchaseInfo.utm_source || null,
                utm_medium: purchaseInfo.utm_medium || null,
                utm_campaign: purchaseInfo.utm_campaign || null
            };

            // Clear temporary storage
            localStorage.removeItem('last_purchase_info');

            // 1) FACEBOOK PIXEL
            // @ts-ignore
            if (typeof fbq === 'function') {
                try {
                    // Standard Track with basic data
                    fbq('track', EVENT, {
                        value: 97,
                        currency: 'USD',
                        content_type: 'product',
                        content_ids: ['roasell-kit']
                    }, {
                        eventID: event_id
                    });
                } catch (e) { }
            }

            // 2) IMAGE (GET) - Reliable Fallback
            const img = new Image();
            img.src = WEBHOOK + '?' + new URLSearchParams(data as any).toString();

            // 3) FETCH (POST) - CORS friendly 'no-cors'
            try {
                fetch(WEBHOOK, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify(data)
                });
            } catch (e) { }

            console.log('Purchase tracking sent with full context:', event_id);
        })();
    }, []);

    return (
        <div className="min-h-screen bg-roasell-black text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 pt-24 md:pt-32">
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">Tebrikler!</h1>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                            <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
                                Birazdan panel ve giriş bilgileriniz mail adresinize iletilecektir. <br className="hidden md:block" />
                                <span className="text-roasell-gold font-semibold">Bilgisayar üzerinden</span> sürecinizi başlatabilirsiniz.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-gray-500 text-sm"
                    >
                        Herhangi bir sorun yaşamanız durumunda destek ekibimizle iletişime geçebilirsiniz.
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TebriklerPage;
