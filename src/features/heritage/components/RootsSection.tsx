import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Book, Bird, Sun } from 'lucide-react';

export const RootsSection = () => {
  const { t, i18n } = useTranslation();
  
  const isTelugu = i18n.language === 'te';
  const isHindi = i18n.language === 'hi';

  const suktamExcerpt = {
    en: "He who is the world-architect, whose eye is everywhere, whose mouth is everywhere, whose arm is everywhere, whose foot is everywhere...",
    te: "విశ్వకర్మ విశ్వానికి రూపశిల్పి, ఆయన కళ్ళు అన్ని చోట్లా ఉన్నాయి, ఆయన ముఖం అన్ని చోట్లా ఉంది, ఆయన హస్తాలు మరియు పాదాలు సర్వవ్యాప్తమై ఉన్నాయి...",
    hi: "विश्वकर्मा विश्व के वास्तुकार हैं, जिनकी आंखें हर जगह हैं, जिनका मुख हर जगह है, जिनकी भुजाएं और पैर सर्वव्यापी हैं..."
  };

  return (
    <section className="py-32 relative overflow-hidden bg-[#fdfcf6]">
      {/* Parchment Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
      
      {/* Decorative Mandalas */}
      <div className="absolute -top-20 -left-20 w-80 h-80 border-4 border-gold-100 rounded-full opacity-20 animate-spin-slow" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 border-8 border-gold-100 rounded-full opacity-10 animate-reverse-spin" />
      
      {/* Technical Dimension Marker */}
      <div className="absolute top-0 right-12 w-[1px] h-full bg-gold-200/20 hidden xl:block" />
      <div className="absolute top-1/2 right-8 text-[8px] font-black text-gold-400 uppercase tracking-widest vertical-text select-none hidden xl:block">
        Vedic Axis / 10.81
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center"
        >
          <div className="w-20 h-20 bg-gold-50 rounded-full flex items-center justify-center border-2 border-gold-200 shadow-xl shadow-gold-100/50">
            <Sun className="text-gold-600 w-10 h-10 animate-pulse" />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-xs font-black text-gold-700 uppercase tracking-[0.6em]">
              {t('roots.heritage', 'Ancient Heritage')}
            </h2>
            <h3 className={`text-4xl md:text-5xl font-black text-stone-900 font-display 
              ${isTelugu ? 'font-telugu leading-relaxed' : isHindi ? 'font-hindi leading-relaxed' : ''}`}>
              {t('roots.title', 'The Origins: Roots in the Vedas')}
            </h3>
          </div>

          <div className="relative py-12 px-6 md:px-20 bg-white/40 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] border border-gold-100 shadow-inner">
             {/* Quotation Marks */}
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#fdfcf6] px-4 font-serif text-6xl text-gold-200">“</div>
             
             <p className={`text-xl md:text-3xl font-bold text-stone-800 italic leading-relaxed mb-8
               ${isTelugu ? 'font-telugu' : isHindi ? 'font-hindi' : ''}`}>
               {(suktamExcerpt as any)[i18n.language]}
             </p>
             
             <div className="flex flex-col items-center gap-4">
               <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
               <p className="text-sm font-black text-gold-600 uppercase tracking-widest flex items-center gap-3">
                 <Book size={16} />
                 {t('roots.source', 'Rig Veda: Vishwakarma Suktam (10.81)')}
               </p>
             </div>
          </div>

          <p className="text-stone-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {t('roots.description', 'For over five millennia, the Vishwabrahmins have served as the architects of civilization, translating spiritual geometry into the physical wonders of our world.')}
          </p>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-center border-t border-gold-100/50 mt-12">
             {[
               { icon: <Bird className="text-gold-500" />, label: 'Vedic Lineage', en: 'Pancha Brahma Shastras' },
               { icon: <Sun className="text-gold-500" />, label: 'Sacred Architecture', en: 'Vastu Shastras' },
               { icon: <Book className="text-gold-500" />, label: 'Oral Traditions', en: 'Artisan Genealogies' }
             ].map((item, i) => (
               <div key={i} className="space-y-3 p-6 rounded-3xl hover:bg-gold-50 transition-colors group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:shadow-md transition-all">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">{item.label}</p>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reverse-spin {
          animation: reverse-spin 60s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 80s linear infinite;
        }
      `}</style>
    </section>
  );
};
