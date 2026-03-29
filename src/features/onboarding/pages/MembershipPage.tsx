import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Download, Share2, CreditCard } from 'lucide-react';
import { MembershipCard } from '../components/MembershipCard';

export const MembershipPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-vermilion/10 rounded-full mb-6">
            <Shield className="w-8 h-8 text-vermilion" />
          </div>
          <h1 className="text-4xl font-black text-stone-900 mb-4 font-display">
            {t('membership.title', 'Digital Artisan Identity')}
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            {t('membership.subtitle', 'Your official recognition as a member of the Vishwakarma Knowledge Centre ecosystem.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center justify-center space-y-8">
             <MembershipCard />
             <div className="flex gap-4 w-full">
               <button className="flex-1 flex items-center justify-center gap-2 bg-white text-stone-900 font-bold py-4 rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all active:scale-95 shadow-sm">
                 <Download size={20} />
                 {t('membership.download', 'Download PDF')}
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 bg-white text-stone-900 font-bold py-4 rounded-2xl border border-stone-200 hover:bg-stone-50 transition-all active:scale-95 shadow-sm">
                 <Share2 size={20} />
                 {t('membership.share', 'Share ID')}
               </button>
             </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
              <CreditCard className="text-vermilion" />
              {t('membership.benefitsTitle', 'Member Privileges')}
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Institutional Recognition', desc: 'Official certification of your craft and lineage.' },
                { title: 'Government Liaison', desc: 'Direct support for PM Vishwakarma scheme applications.' },
                { title: 'Toolkit Access', desc: 'Preferential access to precision engineering tools.' },
                { title: 'Digital Presence', desc: 'Featured listing in the global Artisan Directory.' }
              ].map((benefit, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm"
                >
                  <h3 className="font-bold text-stone-900 mb-1">{benefit.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
