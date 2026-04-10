import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Megaphone, ArrowUpRight } from 'lucide-react';

export const AnnouncementTicker = () => {
  const { t, i18n } = useTranslation();
  
  const announcements = [
    { 
      en: "PM Vishwakarma Scheme: New registration cycle open for 2026. Apply now at reach out to VKC admin.",
      te: "పీఎం విశ్వకర్మ పథకం: 2026 కొత్త రిజిస్ట్రేషన్ సైకిల్ ప్రారంభమైంది. వివరాలకు వికెసి అడ్మిన్‌ను సంప్రదించండి.",
      hi: "पीएम विश्वकर्मा योजना: 2026 के लिए नया पंजीकरण चक्र खुला है। अधिक जानकारी के लिए वीकेसी एडमिन से संपर्क करें।"
    },
    {
      en: "Upcoming: State-level Artisan Summit in Hyderabad (August 15th). Stay tuned for details.",
      te: "రాబోయే ఈవెంట్: హైదరాబాద్‌లో రాష్ట్ర స్థాయి కళాకారుల సదస్సు (ఆగస్టు 15). వివరాల కోసం వేచి ఉండండి.",
      hi: "आगामी: हैदराबाद में राज्य स्तरीय शिल्पकार शिखर सम्मेलन (15 अगस्त)। विवरण के लिए बने रहें।"
    }
  ];

  return (
    <div className="bg-vermilion text-white py-2 overflow-hidden border-b border-vermilion-700 relative z-[60]">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 md:gap-4">
        {/* Static Header */}
        <div className="flex items-center gap-2 bg-white/10 px-2 md:px-3 py-1 rounded-full border border-white/20 whitespace-nowrap shrink-0">
          <Megaphone size={12} className="animate-bounce shrink-0" />
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{t('updates.latest', 'Latest Updates')}</span>
        </div>

        {/* Ticker Animation */}
        <div className="flex-1 overflow-hidden relative h-6">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 30, 
              ease: "linear" 
            }}
            className="flex items-center gap-20 whitespace-nowrap"
          >
            {announcements.map((ann, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <span className="text-xs font-bold tracking-wide italic opacity-90 group-hover:opacity-100 transition-opacity">
                  { (ann as any)[i18n.language] }
                </span>
                <div className="bg-white/20 p-1 rounded-full group-hover:bg-white group-hover:text-vermilion transition-all">
                  <ArrowUpRight size={10} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
