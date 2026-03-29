import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Download, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { MembershipCard } from '../components/MembershipCard';
import { RegistrationForm } from '../components/RegistrationForm';
import { SEO } from '@/shared/components/SEO';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

export const MembershipPage = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [memberData, setMemberData] = useState<any>(null);

  const handleRegistrationComplete = (data: any) => {
    setMemberData({
      ...data,
      uid: `VKC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      category: data.kula || 'Artisan'
    });
    setIsRegistered(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 group">
      <SEO 
        title="Membership Portal" 
        description="Join the VKC global network and claim your Digital Artisan Identity card."
      />
      <ScrollToTop />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Branding & Info */}
          <div className="lg:w-1/3 space-y-10 lg:sticky lg:top-40">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-vermilion/10 px-4 py-1.5 rounded-full text-vermilion">
                 <Shield size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Institutional Recognition</span>
              </div>
              <h1 className="text-5xl font-black text-stone-900 leading-tight font-display">
                Digital <span className="text-vermilion underline decoration-vermilion/20 underline-offset-8">Identity</span> for Artisans
              </h1>
              <p className="text-stone-600 text-lg font-medium leading-relaxed">
                Empowering the 5,000-year legacy with modern digital recognition. Your VKC ID is the key to global markets, mentorship, and government benefits.
              </p>
            </motion.div>

            <div className="space-y-4">
               <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Member Privileges</h4>
               {[
                 { title: 'Global Directory Listing', desc: 'Featured among the worlds finest craftsmen.' },
                 { title: 'Mentorship Access', desc: 'Connect with senior doctors, engineers, and designers.' },
                 { title: 'Export Support', desc: 'Guidance on shipping your masterpieces globally.' }
               ].map((benefit, i) => (
                 <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-vermilion/20 transition-all cursor-default">
                    <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-vermilion shrink-0">
                       <Sparkles size={16} />
                    </div>
                    <div>
                       <h5 className="font-bold text-stone-900 text-sm mb-1">{benefit.title}</h5>
                       <p className="text-stone-500 text-xs leading-relaxed">{benefit.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Side: Interactive Portal */}
          <div className="lg:w-2/3 w-full">
            <AnimatePresence mode="wait">
              {!isRegistered ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <RegistrationForm onComplete={handleRegistrationComplete} />
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-4">
                     <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 10 }}
                        >
                           <Shield size={40} />
                        </motion.div>
                     </div>
                     <h2 className="text-4xl font-black text-stone-900">Registration Successful!</h2>
                     <p className="text-stone-500 font-medium">Your Digital Identity Card is ready for download.</p>
                  </div>

                  <div className="flex flex-col items-center gap-12">
                     <MembershipCard memberData={memberData} />
                     
                     <div className="flex flex-wrap justify-center gap-6 w-full max-w-md">
                        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-stone-900 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-vermilion transition-all active:scale-95 text-xs uppercase tracking-widest">
                          <Download size={20} />
                          Download Digital ID
                        </button>
                        <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 bg-white text-stone-900 font-black py-5 rounded-2xl border border-stone-200 shadow-sm hover:bg-stone-50 transition-all active:scale-95 text-xs uppercase tracking-widest">
                          <Share2 size={20} />
                          Share Verification Link
                        </button>
                     </div>
                  </div>

                  <div className="bg-saffron-50 rounded-[3rem] p-12 border border-saffron-100 flex flex-col md:flex-row items-center gap-8">
                     <div className="flex-1 space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-black text-stone-900">Unlock the Professional Network</h3>
                        <p className="text-stone-600 font-medium">As a registered member, you can now access mentorship from doctors, lawyers, and IT experts in our community.</p>
                     </div>
                     <button className="bg-stone-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:gap-6 transition-all shadow-xl">
                        Go to Network Hub <ArrowRight size={16} />
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
