import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { RootsSection } from '../components/RootsSection';
import { PanchaKulaExhibits } from '../components/PanchaKulaExhibits';
import { SEO } from '../../../shared/components/SEO';
import { EngineeringSecrets } from '../components/EngineeringSecrets';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

export const HeritagePage = () => {
  const { t, i18n } = useTranslation();
  const isTelugu = i18n.language === 'te';
  const isHindi = i18n.language === 'hi';

  const sections = [
    { id: 'roots', title: t('heritage.nav.roots', 'Vedic Roots') },
    { id: 'exhibits', title: t('heritage.nav.exhibits', 'Gallery of Mastery') },
    { id: 'engineering', title: t('heritage.nav.engineering', 'Engineering Secrets') }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={t('heritage.nav', 'Heritage')} 
        description="Explore the 15 peak technical masterpieces of the Vishwakarma legacy across the Five Kulas."
      />
      <ScrollToTop />
      
      {/* Header Splash */}
      <section className="relative pt-40 pb-20 bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full"
           >
             <div className="w-2 h-2 bg-vermilion rounded-full animate-pulse" />
             <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em]">Heritage Repository</span>
           </motion.div>
           <h1 className={`text-5xl md:text-7xl font-black text-white font-display leading-[1.1]
             ${isTelugu ? 'font-telugu' : isHindi ? 'font-hindi' : ''}`}>
             The <span className="text-vermilion">Legacy</span> of Five Millennia
           </h1>
           <p className="text-stone-400 text-xl font-medium max-w-2xl mx-auto italic">
             "Documenting the structural, spiritual, and technical mastery of the Vishwakarma lineage."
           </p>
        </div>
      </section>

      {/* Main Content Layout */}
      {/* Main Content Layout */}
      <div className="max-w-[1700px] mx-auto px-6 py-32 grid lg:grid-cols-12 gap-16 relative">
        
        {/* Sticky Nav - Technical Sidebar */}
        <aside className="hidden lg:block lg:col-span-2 lg:sticky lg:top-40 h-fit space-y-12">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] border-b border-stone-100 pb-4">
                Heritage Chapters
              </h4>
              <div className="flex flex-col gap-6 relative">
                {/* Vertical Drafting Line */}
                <div className="absolute left-[3px] top-0 w-[1px] h-full bg-stone-100" />
                
                {sections.map((s, i) => (
                   <a 
                     key={s.id} 
                     href={`#${s.id}`} 
                     className="flex items-center gap-4 text-stone-500 hover:text-vermilion transition-all group relative z-10"
                   >
                      <div className="w-2 h-2 rounded-full bg-stone-200 border-2 border-white group-hover:bg-vermilion group-hover:scale-150 transition-all shadow-sm" />
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black font-mono text-stone-300 group-hover:text-vermilion/50 transition-colors">0{i + 1}</span>
                         <span className="text-xs font-bold uppercase tracking-widest">{s.title}</span>
                      </div>
                   </a>
                ))}
              </div>
           </div>

           <div className="pt-12 border-t border-stone-100 space-y-4">
              <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-relaxed">
                Technical Repository<br/>
                v1.0.4 / 2024
              </p>
              <div className="flex gap-1">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className="w-1 h-1 bg-stone-200 rounded-full" />
                 ))}
              </div>
           </div>
        </aside>

        {/* Content Stream */}
        <div className="lg:col-span-10 space-y-48 relative">
           {/* Section Blueprint Markers */}
           {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="relative">
                 <div className="absolute -top-12 left-0 flex items-center gap-4 opacity-30 select-none">
                    <span className="text-[10px] font-black font-mono text-vermilion tracking-widest">[ SEC_0{i + 1} ]</span>
                    <div className="h-[1px] w-24 bg-vermilion/50" />
                 </div>
                 {i === 0 && <RootsSection />}
                 {i === 1 && <PanchaKulaExhibits />}
                 {i === 2 && <EngineeringSecrets />}
              </section>
           ))}

           {/* Call to Action */}
           <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-stone-900 rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 text-center text-white space-y-10 relative overflow-hidden border border-white/5 shadow-3xl"
           >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vermilion to-transparent" />
              
              <div className="space-y-4 relative z-10">
                 <h3 className="text-4xl md:text-6xl font-black font-display tracking-tight">Preserve the Legacy</h3>
                 <p className="text-stone-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                   Are you a descendant of the Pancha Brahma lineage or a researcher of ancient engineering? Join our digital archive initiative.
                 </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 pt-6 relative z-10">
                 <button className="bg-vermilion text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-vermilion/20 active:scale-95">
                    Submit Historical Data
                 </button>
                 <button className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all backdrop-blur-md">
                    Volunteer for Documentation
                 </button>
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};
