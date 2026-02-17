import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';
import Header from '../components/Sections/Header';

type PageState = 'password' | 'loading' | 'success';

const TebriklerPage: React.FC = () => {
    const [pageState, setPageState] = useState<PageState>('password');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [touched, setTouched] = useState(false);

    const webhookSentRef = useRef(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fire Facebook Pixel Purchase event immediately (but NOT the webhook)
        (async function () {
            const EVENT = 'Purchase';
            const GUARD_KEY = '__PURCHASE_PIXEL_SENT';

            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }

            // @ts-ignore
            if (window[GUARD_KEY]) return;
            // @ts-ignore
            window[GUARD_KEY] = true;

            const event_id = uuidv4();

            // Facebook Pixel only
            // @ts-ignore
            if (typeof fbq === 'function') {
                try {
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
        })();
    }, []);

    const validatePassword = (pw: string): string[] => {
        const errs: string[] = [];
        if (pw.length < 9) errs.push('En az 9 karakter olmalı');
        if (!/[a-z]/.test(pw)) errs.push('Küçük harf içermeli');
        if (!/[A-Z]/.test(pw)) errs.push('Büyük harf içermeli');
        return errs;
    };

    const isValid = password.length >= 9
        && /[a-z]/.test(password)
        && /[A-Z]/.test(password)
        && password === confirmPassword
        && confirmPassword.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);

        const validationErrors = validatePassword(password);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }
        if (password !== confirmPassword) {
            setErrors(['Şifreler eşleşmiyor']);
            return;
        }

        setErrors([]);
        setPageState('loading');

        // Send webhook with password
        if (!webhookSentRef.current) {
            webhookSentRef.current = true;
            await sendWebhookWithPassword(password);
        }

        // 4 second loading
        setTimeout(() => {
            setPageState('success');
        }, 4000);
    };

    const sendWebhookWithPassword = async (pw: string) => {
        const WEBHOOK = 'https://dtt1z7t3.rcsrv.com/webhook/roasell-kit';
        const EVENT = 'Purchase';

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

        const purchaseInfo = JSON.parse(localStorage.getItem('last_purchase_info') || '{}');
        const event_id = uuidv4();
        const event_time = Math.floor(Date.now() / 1000);
        const user_agent = navigator.userAgent || '';

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
            event_name: EVENT,
            event_id,
            event_time,
            fbp: computeFBP() || '',
            fbc: computeFBC() || '',
            ua: user_agent,
            ip: ip,
            url: location.href.split('?')[0],
            ref: document.referrer || '',
            variant: localStorage.getItem('ab_variant') || 'B',
            name: purchaseInfo.name || '',
            email: purchaseInfo.email || '',
            phone: purchaseInfo.phone || '',
            em: hashedEmail,
            ph: hashedPhone,
            fn: hashedFirstName,
            ln: hashedLastName,
            price: 97,
            currency: 'USD',
            utm_source: purchaseInfo.utm_source || null,
            utm_medium: purchaseInfo.utm_medium || null,
            utm_campaign: purchaseInfo.utm_campaign || null,
            password: pw
        };

        localStorage.removeItem('last_purchase_info');

        // IMAGE (GET)
        const img = new Image();
        img.src = WEBHOOK + '?' + new URLSearchParams(data as any).toString();

        // FETCH (POST)
        try {
            fetch(WEBHOOK, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(data)
            });
        } catch (e) { }

        console.log('Purchase tracking sent with password:', event_id);
    };

    const passErrors = touched ? validatePassword(password) : [];
    const matchError = touched && confirmPassword.length > 0 && password !== confirmPassword;

    return (
        <div className="min-h-screen bg-roasell-black text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 pt-24 md:pt-32">
                <div className="max-w-2xl w-full text-center">

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">Tebrikler!</h1>
                    </motion.div>

                    <AnimatePresence mode="wait">

                        {/* PASSWORD FORM STATE */}
                        {pageState === 'password' && (
                            <motion.div
                                key="password-form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                                    <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-8">
                                        Satın alma işleminiz başarıyla tamamlandı. <br className="hidden md:block" />
                                        Lütfen panele giriş yapabilmek için şifrenizi oluşturun.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto text-left">
                                        {/* Password Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => { setPassword(e.target.value); if (touched) setErrors([]); }}
                                                    placeholder="En az 9 karakter"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-roasell-gold/60 focus:ring-1 focus:ring-roasell-gold/30 transition-all pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                            {/* Password Rules */}
                                            <div className="mt-2 space-y-1">
                                                {[
                                                    { label: 'En az 9 karakter', ok: password.length >= 9 },
                                                    { label: 'Büyük harf içermeli', ok: /[A-Z]/.test(password) },
                                                    { label: 'Küçük harf içermeli', ok: /[a-z]/.test(password) },
                                                ].map((rule) => (
                                                    <div key={rule.label} className={`flex items-center gap-2 text-xs transition-colors ${password.length > 0 ? (rule.ok ? 'text-green-400' : 'text-red-400') : 'text-gray-500'}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${password.length > 0 ? (rule.ok ? 'bg-green-400' : 'bg-red-400') : 'bg-gray-500'}`} />
                                                        {rule.label}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Şifre Tekrar</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="Şifrenizi tekrar girin"
                                                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-roasell-gold/60 focus:ring-1 focus:ring-roasell-gold/30 transition-all pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                            {matchError && (
                                                <p className="mt-1.5 text-xs text-red-400">Şifreler eşleşmiyor</p>
                                            )}
                                        </div>

                                        {/* Errors */}
                                        {errors.length > 0 && (
                                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                                {errors.map((err, i) => (
                                                    <p key={i} className="text-red-400 text-sm">{err}</p>
                                                ))}
                                            </div>
                                        )}

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={!isValid}
                                            className={`w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wide transition-all duration-300 ${isValid
                                                ? 'bg-gradient-to-r from-roasell-gold to-yellow-500 text-black hover:shadow-lg hover:shadow-roasell-gold/25 hover:scale-[1.02] active:scale-[0.98]'
                                                : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                                }`}
                                        >
                                            Şifre Oluştur
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}

                        {/* LOADING STATE */}
                        {pageState === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center gap-6 py-12"
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-10 md:p-14 backdrop-blur-sm shadow-2xl w-full flex flex-col items-center gap-6">
                                    <Loader2 className="w-12 h-12 text-roasell-gold animate-spin" />
                                    <p className="text-xl md:text-2xl text-gray-200 font-medium">
                                        Şifreniz oluşturuluyor..
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* SUCCESS STATE */}
                        {pageState === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm shadow-2xl">
                                    <div className="flex justify-center mb-6">
                                        <ShieldCheck className="w-16 h-16 text-green-400" />
                                    </div>
                                    <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
                                        Şifreniz başarılı bir şekilde oluşturuldu. Başta girdiğiniz e-mail adresi ve şimdi oluşturduğunuz şifreniz ile birlikte; <br className="hidden md:block" />
                                        <a href="https://kitlogin.roasell.com" target="_blank" rel="noopener noreferrer" className="text-roasell-gold font-semibold underline underline-offset-4 hover:text-yellow-400 transition-colors">kitlogin.roasell.com</a> adresinden <span className="text-roasell-gold font-bold">Bilgisayar üzerinden</span> sürecinizi başlatabilirsiniz.
                                    </p>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>

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
