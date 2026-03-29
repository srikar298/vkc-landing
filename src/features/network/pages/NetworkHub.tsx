import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Briefcase, 
  Heart, 
  Gavel, 
  Search, 
  GraduationCap
} from 'lucide-react';
import { SEO } from '@/shared/components/SEO';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

// Sub-components
import { ProfessionalsHub, OfficialsDirectory, MatrimonyPortal, EducationHub } from '../components';

export const NetworkHub = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'professionals' | 'officials' | 'matrimony' | 'education'>('professionals');

  const tabs = [
    { id: 'professionals', label: 'Professionals Hub', icon: <Briefcase size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'officials', label: 'Officials Directory', icon: <Gavel size={18} />, color: 'text-saffron-600', bg: 'bg-saffron-50' },
    { id: 'education', label: 'Education & Career', icon: <GraduationCap size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'matrimony', label: 'Community Matrimony', icon: <Heart size={18} />, color: 'text-pink-600', bg: 'bg-pink-50' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 group">
      <SEO 
        title="Professional Network Hub" 
        description="Connect with Vishwakarma professionals, community leaders, and mentors across the globe."
      />
      <ScrollToTop />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
           <div className="space-y-4">
              <div className="flex items-center gap-3 bg-stone-900 text-white w-fit px-4 py-1 rounded-full">
                 <Users size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Global Community Network</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-stone-900 leading-tight font-display tracking-tight">
                The <span className="text-vermilion underline decoration-vermilion/20 underline-offset-8">Unity</span> Engine
              </h1>
              <p className="text-stone-600 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                A strategic ecosystem connecting our master artisans with the modern professional elite—doctors, engineers, and visionary leaders.
              </p>
           </div>
           
           {/* Global Search Bar (Strategic) */}
           <div className="w-full md:w-96 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-vermilion transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Find a mentor or leader..."
                className="w-full h-14 pl-14 pr-6 bg-white rounded-2xl border border-stone-200 focus:ring-2 focus:ring-vermilion transition-all font-medium text-stone-800 shadow-sm"
              />
           </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto pb-4 hide-scrollbar">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap
                 ${activeTab === tab.id 
                   ? `${tab.bg} ${tab.color} shadow-lg shadow-black/5 ring-1 ring-stone-900/5` 
                   : 'bg-white text-stone-400 hover:bg-stone-100 hover:text-stone-600'
                 }
               `}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </div>

        {/* Dynamic Content Layer */}
        <div className="min-h-[600px] relative">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.3 }}
               className="w-full"
             >
                {activeTab === 'professionals' && <ProfessionalsHub />}
                {activeTab === 'officials' && <OfficialsDirectory />}
                {activeTab === 'education' && <EducationHub />}
                {activeTab === 'matrimony' && <MatrimonyPortal />}
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Call to Action (Strategic Integration) */}
        <div className="mt-24 bg-stone-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
           <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                Is Your Expertise <span className="text-turmeric">Missing?</span>
              </h2>
              <p className="text-stone-400 text-lg font-medium leading-relaxed">
                Whether you are a Doctor, Engineer, or Community Leader, your mentorship can shape the next generation of Vishwakarma talent.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="bg-vermilion text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-vermilion/90 transition-all shadow-xl shadow-vermilion/20 active:scale-95">
                   List Your Profile
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 backdrop-blur-md">
                   Register as Mentor
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
