import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import VideoLite from '../ui/VideoLite';

interface HeroProps {
  variant?: 'A' | 'B';
}

const Hero: React.FC<HeroProps> = ({ variant = 'A' }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [preCountdown, setPreCountdown] = useState(3);
  const [lockTimer, setLockTimer] = useState(180); // 3 minutes
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  const lockCheckRef = useRef(false);

  useEffect(() => {
    if (variant === 'B' && !lockCheckRef.current) {
      const completed = localStorage.getItem('video_lock_completed');
      if (!completed) {
        setIsLocked(true);
        setIsCountingDown(true);
      }
      lockCheckRef.current = true;
    }
  }, [variant]);

  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('lock-scroll');
      document.documentElement.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
      document.documentElement.classList.remove('lock-scroll');
    }
    return () => {
      document.body.classList.remove('lock-scroll');
      document.documentElement.classList.remove('lock-scroll');
    };
  }, [isLocked]);

  useEffect(() => {
    let preInterval: any;
    if (isCountingDown && preCountdown > 0) {
      preInterval = setInterval(() => {
        setPreCountdown(prev => prev - 1);
      }, 1000);
    } else if (preCountdown === 0 && isCountingDown) {
      setIsCountingDown(false);
      setVideoStarted(true);
    }
    return () => clearInterval(preInterval);
  }, [isCountingDown, preCountdown]);

  useEffect(() => {
    let lockInterval: any;
    if (videoStarted && lockTimer > 0) {
      lockInterval = setInterval(() => {
        setLockTimer(prev => prev - 1);
      }, 1000);
    } else if (lockTimer === 0 && isLocked) {
      setIsLocked(false);
      localStorage.setItem('video_lock_completed', 'true');
      document.body.style.overflow = 'unset';
    }
    return () => clearInterval(lockInterval);
  }, [videoStarted, lockTimer, isLocked]);

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="hero" className="relative flex flex-col pt-20 md:pt-28 pb-4 overflow-hidden bg-roasell-black">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-roasell-gold/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Global Dimming Overlay for Variant B */}
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[40] pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 relative flex flex-col items-center text-center">

        {/* Eyebrow Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-0.5 md:mb-1"
        >
          <span className="text-[10px] md:text-xs font-semibold text-gray-400 tracking-widest uppercase">
            “Ne yapacağım ? Nereden başlayacağım ?” Diyenler
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight tracking-tight font-display max-w-5xl uppercase"
        >
          Her gün ne yapacağını söyleyen <br /> <span className="text-roasell-gold font-extrabold">bir sistem ister misin?</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-xl text-gray-400 mb-2 md:mb-6 max-w-xl mx-auto leading-normal px-2"
        >
          8 yıldır Türkiye, Avrupa ve Amerika'da markalar kuruyoruz. Şimdi bu deneyimi <span className="text-gray-200 font-medium">Roasell Kit</span> üzerinde birleştirdik.
        </motion.p>

        {/* Video Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`relative w-full max-w-[95%] md:max-w-4xl mt-4 md:mt-8 mb-2 flex flex-col items-center ${isLocked ? 'z-[50]' : ''}`}
        >
          <div className="relative p-[6px] md:p-[7px] bg-[#DC2626] rounded-sm w-full">
            <div className="absolute top-[1px] -translate-y-full left-1/2 -translate-x-1/2 bg-[#DC2626] text-white text-[9px] md:text-xs font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-t-md md:rounded-t-lg uppercase tracking-wider z-20 whitespace-nowrap leading-none">
              SATIN ALMADAN ÖNCE İZLE
            </div>

            {/* Unmute Instruction (Variant B only) */}
            {isLocked && (
              <div className="absolute top-[-45px] md:top-[-60px] left-0 right-0 text-center">
                <p className="text-white bg-black/40 backdrop-blur-sm px-3 py-1 rounded inline-block text-[10px] md:text-xs font-medium border border-white/10 uppercase tracking-tighter">
                  Eğer sesi duymuyorsanız <span className="text-roasell-gold font-bold">"UNMUTE"</span> butonuna basın.
                </p>
              </div>
            )}

            <div className="relative w-full aspect-video bg-black rounded-[1px] overflow-hidden z-10">
              <VideoLite
                videoId="1156517904"
                platform="vimeo"
                title="Kurucu Tanıtım Videosu"
                autoPlay={videoStarted}
                isLocked={isLocked}
              />

              {/* Pre-countdown Overlay */}
              <AnimatePresence>
                {isCountingDown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 z-30"
                  >
                    <motion.span
                      key={preCountdown}
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-white text-7xl md:text-9xl font-bold"
                    >
                      {preCountdown}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Lock Instructions & Timer (Only for variant B when locked) */}
          <AnimatePresence>
            {isLocked && videoStarted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full flex flex-col items-center gap-2"
              >
                <div
                  className="bg-[#DC2626] text-white px-6 py-3 font-bold text-sm md:text-lg text-center leading-tight"
                  style={{ textShadow: '2px 2px 0px rgba(0,0,0,1)' }}
                >
                  Lütfen videoyu izleyin. <br /> Ekran kilidi 3 dakika sonra kaybolacak.
                </div>
                <div className="text-[#DC2626] font-display text-4xl md:text-5xl font-black">
                  {formatTime(lockTimer)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Disclaimer Note (Visible only when unlocked or for variant A) */}
          {!isLocked && (
            <div className="mt-2 text-[10px] md:text-xs text-gray-500 max-w-3xl text-center leading-relaxed px-2">
              <span className="font-bold text-red-500">Not:</span> RoaSell'de hızlı para kazanma ve sistem açıklarından bahsetmiyoruz. Sürdürülebilir, değer odaklı bir marka kurmanız için kendi markalarımızda ne yapıyorsak; aynısını size de uyarlatıyoruz.
            </div>
          )}
        </motion.div>

        {/* CTA Area (Visible only when unlocked or for variant A) */}
        {!isLocked && (
          <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto relative z-20 mt-2">
            <div className="group w-full px-4 md:px-0">
              <Button variant="primary" size="lg" withArrow onClick={scrollToOffer} className="w-full shadow-roasell-gold/20 py-4 font-bold uppercase">
                ŞİMDİ KATIL
              </Button>
              <div className="mt-2 text-center animate-pulse">
                <span className="bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold border border-red-500/20 shadow-sm inline-flex items-center gap-1.5 whitespace-nowrap">
                  🎁 $499'lık Bonus Paket Hediye!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Scroll Indicator */}
        {!isLocked && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 hidden md:block"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Hero;
