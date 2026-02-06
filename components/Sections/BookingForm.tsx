import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, ArrowRight, ChevronRight } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  timeAvailability: string;
  longTermGoal: string;
  budget: string;
  preferredTime: string;
  [key: string]: string;
}

const BookingForm: React.FC = () => {
  const [step, setStep] = useState<'idle' | 'loading' | 'form' | 'submitting' | 'success'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    timeAvailability: '',
    longTermGoal: '',
    budget: '',
    preferredTime: ''
  });

  const questions = [
    {
      id: 'timeAvailability',
      question: 'Sürdürülebilir bir operasyon kurabilmeniz için haftada ~15 saat veya daha fazla zamanınız var mı?*',
      type: 'select',
      options: ['Evet', 'Hayır']
    },
    {
      id: 'longTermGoal',
      question: 'E-ticaret ile ilgili uzun vadeli hedefin nedir?*',
      type: 'select',
      options: [
        'Maaşlı işimden ayrılmak.',
        'Ek bir gelir kalemi oluşturmak.',
        'Daha büyük projeler için sermaye oluşturmak.',
        'Mevcut mağazamı ölçeklendirmek.',
        'Diğer'
      ]
    },
    {
      id: 'budget',
      question: 'Kendinize ve işinize yatırım yapmak için ne kadar sermaye ayırdınız? Bu soru gereklidir.**',
      description: 'Bir iş kurmak istiyorsunuz ve E-ticaret ile başlamak için belirli bir sermayeye ve ayrıca doğru becerilere ihtiyacınız olacak.',
      type: 'select',
      options: [
        "2000$'ın altında",
        "2000$ - 3000$ arası",
        "3000$ - 4000$ arası",
        "4000$ ve üzeri"
      ]
    },
    {
      id: 'preferredTime',
      question: 'Yol haritanızı çizebilmek için günün hangi saat aralığında daha müsaitsiniz?*',
      type: 'select',
      options: [
        '09:00-11:00',
        '11:00-13:00',
        '13:00-15:00',
        '15:00-17:00',
        '17:00-19:00',
        '19:00-21:00',
        '21:00-23:00'
      ]
    },
    {
      id: 'contactDetails',
      question: 'Lütfen adınızı ve telefon numaranızı doldurun.',
      description: 'Eğer randevularda boş yer bulamazsanız sizlere yer açıldığında bilgilendirme yapacağız.',
      type: 'form_group',
      fields: [
        { id: 'firstName', label: 'Adı', placeholder: 'Canan' },
        { id: 'lastName', label: 'Soyadı', placeholder: 'Sever' },
        { id: 'phone', label: 'Telefon numarası', placeholder: '0501 234 56 78', type: 'tel' }
      ]
    }
  ];

  const handleStart = () => {
    setStep('loading');
    setTimeout(() => {
      setStep('form');
    }, 2000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const isCurrentStepValid = () => {
    const q = questions[currentQuestion];
    if (q.type === 'form_group') {
      return q.fields?.every(f => formData[f.id] && formData[f.id].length > 1);
    }
    return !!formData[q.id];
  };

  const handleSubmit = async () => {
    setStep('submitting');

    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get('utm_source') || null;
    const utmMedium = searchParams.get('utm_medium') || null;
    const utmCampaign = searchParams.get('utm_campaign') || null;

    const payload = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      submittedAt: new Date().toISOString()
    };

    try {
      // Send to webhook - using keepalive to ensure it survives redirects if any
      await fetch('https://dtt1z7t3.rcsrv.com/webhook/information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      });
    } catch (error) {
      console.error('Webhook error:', error);
      // We continue even if webhook fails, or you might want to show an error
    }

    // Check budget condition
    if (formData.budget === "2000$'ın altında") {
      setStep('success');
      return;
    }

    // Redirect to Calendly for other budgets
    const calendlyUrl = new URL('https://calendly.com/roasell/roasell-analiz-gorusmesi');
    if (utmSource) calendlyUrl.searchParams.set('utm_source', utmSource);
    if (utmMedium) calendlyUrl.searchParams.set('utm_medium', utmMedium);
    if (utmCampaign) calendlyUrl.searchParams.set('utm_campaign', utmCampaign);
    calendlyUrl.searchParams.set('month', '2025-12');
    calendlyUrl.searchParams.set('name', `${formData.firstName} ${formData.lastName}`);

    window.location.href = calendlyUrl.toString();
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-xl mx-auto min-h-[400px] md:min-h-[450px] relative rounded-xl overflow-hidden bg-[#0b141a] border border-white/10 shadow-2xl flex flex-col font-sans">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-roasell-gold/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* IDLE STATE */}
      {step === 'idle' && (
        <div className="absolute inset-0 z-20 backdrop-blur-md bg-black/60 flex items-center justify-center p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="bg-black text-white border border-white/20 px-6 py-3 rounded-lg font-bold text-base md:text-lg tracking-wider shadow-2xl hover:border-roasell-gold/50 hover:shadow-roasell-gold/20 transition-all group flex items-center gap-3"
          >
            RANDEVU ALMAYA HAZIRIM
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      )}

      {/* LOADING STATE */}
      {step === 'loading' && (
        <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <Loader2 className="w-8 h-8 text-roasell-gold animate-spin" />
            <h3 className="text-lg font-medium text-white/90">Seni daha iyi tanımak istiyoruz...</h3>
          </motion.div>
        </div>
      )}

      {/* SUCCESS STATE (Low Budget) */}
      {step === 'success' && (
        <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Tebrikler!</h3>
            <p className="text-gray-300 leading-relaxed">
              Ekibimiz sizlere kısa süre içerisinde ulaşacaktır.
            </p>
          </motion.div>
        </div>
      )}

      {/* FORM STATE */}
      {(step === 'form' || step === 'submitting') && (
        <div className="relative z-10 flex flex-col h-full p-5 md:p-8">

          {/* Progress Bar */}
          <div className="w-full h-0.5 bg-white/10 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-roasell-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              {/* Question Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center justify-center min-w-[18px] h-[18px]">
                    {currentQuestion + 1}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                    {currentQ.question}
                  </h3>
                </div>
                {currentQ.description && (
                  <p className="text-xs text-gray-400 ml-7 leading-relaxed">{currentQ.description}</p>
                )}
              </div>

              {/* Input Area */}
              <div className="space-y-2.5 ml-1">
                {currentQ.type === 'form_group' ? (
                  <div className="space-y-4">
                    {currentQ.fields?.map((field) => (
                      <div key={field.id}>
                        <label className="block text-xs font-medium text-white mb-1.5 ml-1">{field.label}</label>
                        <input
                          type={field.type || 'text'}
                          placeholder={field.placeholder}
                          value={formData[field.id]}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 px-1 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                        />
                      </div>
                    ))}
                    <div className="pt-4">
                      <button
                        onClick={handleNext}
                        disabled={!isCurrentStepValid()}
                        className="bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Tamam
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    {currentQ.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          handleChange(currentQ.id, option);
                          setTimeout(handleNext, 150);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded border transition-all flex items-center gap-3 group ${formData[currentQ.id] === option
                          ? 'bg-blue-500/20 border-blue-500 text-blue-100'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-blue-500/50'
                          }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold border ${formData[currentQ.id] === option
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'border-white/20 text-gray-500 group-hover:border-blue-500/50'
                          }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs md:text-sm">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer */}
          {currentQuestion > 0 && currentQ.type !== 'form_group' && (
            <div className="mt-6 flex justify-start">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
              >
                ← Geri
              </button>
            </div>
          )}

        </div>
      )}

      {/* SUBMITTING OVERLAY */}
      {step === 'submitting' && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-roasell-gold animate-spin mx-auto mb-3" />
            <p className="text-white text-sm font-medium">İşleminiz yapılıyor...</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default BookingForm;
