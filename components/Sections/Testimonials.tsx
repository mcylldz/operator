import React, { useState } from 'react';
import { TESTIMONIALS } from '../../constants';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoLite from '../ui/VideoLite';

const WhatsAppCard = ({ item }: { item: any }) => (
  <div className="bg-[#0b141a] rounded-lg p-3 shadow-lg border border-[#ffffff10] h-[220px] md:h-[240px] flex flex-col transform rotate-1 hover:rotate-0 transition-transform">
    <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white font-bold text-[10px] md:text-xs shrink-0">
        {item.name[0]}
      </div>
      <div className="min-w-0">
        <div className="text-white font-medium text-[10px] md:text-xs flex items-center gap-1">
          <span className="truncate">{item.name}</span>
          {item.verified && <CheckCircle2 className="w-2.5 h-2.5 text-blue-400 shrink-0" />}
        </div>
        <div className="text-[8px] md:text-[10px] text-gray-500">Online</div>
      </div>
    </div>
    <div className="bg-[#202c33] p-2 rounded-lg rounded-tl-none text-[9px] md:text-[11px] text-gray-200 relative mb-1 flex-1 overflow-y-auto scrollbar-hide">
      {item.content}
      <span className="text-[8px] text-gray-400 absolute bottom-1 right-2">14:32</span>
    </div>
  </div>
);

const VideoThumbCard = ({ item, onClick }: { item: any; onClick: () => void }) => {
  const getVideoData = (src: string) => {
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const match = src.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return { platform: 'youtube' as const, videoId: match?.[1] || '' };
    } else if (src.includes('vimeo.com')) {
      const match = src.match(/video\/(\d+)/);
      return { platform: 'vimeo' as const, videoId: match?.[1] || '' };
    }
    return { platform: 'youtube' as const, videoId: '' };
  };

  const { videoId, platform } = getVideoData(item.videoSrc);
  const thumbUrl = platform === 'youtube'
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : `https://vumbnail.com/${videoId}.jpg`;

  return (
    <div
      className="group relative rounded-lg overflow-hidden bg-black border border-white/10 shadow-xl h-[220px] md:h-[240px] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        <img src={thumbUrl} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black to-transparent">
        <div className="flex flex-col gap-1">
          {item.resultValue && (
            <span className="text-[8px] md:text-[9px] font-bold text-green-400 bg-green-500/20 px-1.5 py-0.5 rounded border border-green-500/30 self-start italic">
              {item.resultValue}
            </span>
          )}
          <h4 className="text-white text-[10px] md:text-xs font-bold truncate leading-tight">
            {item.title || item.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

const ImageThumbCard = ({ item, onClick }: { item: any; onClick: () => void }) => (
  <div
    className="group relative rounded-lg overflow-hidden bg-black border border-white/10 shadow-2xl h-[220px] md:h-[240px] cursor-pointer"
    onClick={onClick}
  >
    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
    <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black to-transparent">
      <h4 className="text-white text-[10px] md:text-xs font-bold truncate">
        {item.title || item.name}
      </h4>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<any>(null);

  return (
    <section className="py-12 md:py-20 bg-roasell-black relative">
      <div className="absolute right-0 top-1/4 w-48 h-48 md:w-96 md:h-96 bg-roasell-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-4xl font-bold font-display mb-2 text-gray-900">
            RoaSell Kullanıcılarının <span className="text-roasell-gold">Tecrübeleri</span>
          </h2>
          <p className="text-gray-400 text-[10px] md:text-sm">Gerçek kullanıcılar, gerçek sonuçlar ve kanıtlanmış başarı.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              {item.type === 'video' ? (
                <VideoThumbCard item={item} onClick={() => setActiveMedia(item)} />
              ) : item.type === 'image' ? (
                <ImageThumbCard item={item} onClick={() => setActiveMedia(item)} />
              ) : (
                <WhatsAppCard item={item} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-xl bg-black/90"
            onClick={() => setActiveMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute -top-12 right-0 text-white hover:text-roasell-gold transition-colors p-2"
                onClick={() => setActiveMedia(null)}
              >
                <X className="w-8 h-8" />
              </button>

              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                {activeMedia.type === 'video' ? (
                  <VideoLite
                    videoId={activeMedia.videoSrc.split('/').pop()?.split('?')[0] || ''}
                    platform={activeMedia.videoSrc.includes('vimeo') ? 'vimeo' : 'youtube'}
                    className="w-full aspect-video"
                  />
                ) : (
                  <img src={activeMedia.image} alt={activeMedia.title} className="w-full h-auto max-h-[80vh] object-contain" />
                )}
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-white font-bold text-lg md:text-xl mb-1">{activeMedia.title || activeMedia.name}</h3>
                {activeMedia.resultValue && <p className="text-green-400 font-bold italic">{activeMedia.resultValue}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;