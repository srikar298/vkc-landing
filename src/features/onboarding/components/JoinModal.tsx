import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Phone, 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Hammer
} from 'lucide-react';
import { supabase } from '@/infrastructure/config/supabaseClient';

const TRADES = [
  "Carpenter (Suthar)", "Boat Maker", "Armourer", "Blacksmith (Lohar)", 
  "Hammer and Tool Kit Maker", "Locksmith", "Goldsmith (Sonar)", 
  "Potter (Kumhaar)", "Sculptor / Stone Carver", "Cobbler (Charmakar)", 
  "Mason (Rajmistri)", "Basket/Mat/Broom Maker", "Doll & Toy Maker", 
  "Barber (Naai)", "Garland maker (Malakaar)", "Washerman (Dhobi)", 
  "Tailor (Darzi)", "Fishing Net Maker"
];

const STATES = ["Andhra Pradesh", "Telangana"];

export function JoinModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    trade: '',
    state: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('inquiries')
      .insert([formData]);

    if (error) {
      alert("Error submitting registration: " + error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-stone-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-900 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {success ? (
          <div className="p-12 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-20 h-20 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle2 className="text-saffron-600 w-10 h-10" />
            </motion.div>
            <h2 className="text-3xl font-black text-stone-900 mb-4 font-display">Registration Received!</h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Jai Vishwakarma! Thank you for joining the mission. Our local representative will contact you soon for further verification.
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-saffron-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-saffron-600/20 active:scale-95 transition-all"
            >
              Back to Community
            </button>
          </div>
        ) : (
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-saffron-600 p-2 rounded-lg">
                <Hammer className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-stone-900 uppercase tracking-tight text-xs">Mission Registration</span>
            </div>

            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-saffron-600' : 'bg-stone-100'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-saffron-600' : 'bg-stone-100'}`} />
              </div>
              <h2 className="text-2xl font-black text-stone-900 font-display">
                {step === 1 ? "Basic Information" : "Trade & Location"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <User size={12} className="text-saffron-500" /> Full Name
                       </label>
                       <input 
                         type="text" 
                         required
                         placeholder="e.g. Ramesh Kumar"
                         className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-50/50 outline-none transition-all font-medium"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <Phone size={12} className="text-saffron-500" /> Mobile Number
                       </label>
                       <input 
                         type="tel" 
                         required
                         placeholder="e.g. +91 98765 43210"
                         className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-50/50 outline-none transition-all font-medium"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       />
                    </div>
                    <button 
                      type="button"
                      disabled={!formData.name || !formData.phone}
                      onClick={() => setStep(2)}
                      className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-stone-800 disabled:opacity-50 transition-all active:scale-95 group"
                    >
                      Next Step <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <Briefcase size={12} className="text-saffron-500" /> Traditional Trade
                       </label>
                       <select 
                         required
                         className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-50/50 outline-none transition-all font-medium appearance-none bg-white"
                         value={formData.trade}
                         onChange={(e) => setFormData({...formData, trade: e.target.value})}
                       >
                         <option value="">Select your trade</option>
                         {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={12} className="text-saffron-500" /> State
                       </label>
                       <select 
                         required
                         className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:border-saffron-500 focus:ring-4 focus:ring-saffron-50/50 outline-none transition-all font-medium appearance-none bg-white"
                         value={formData.state}
                         onChange={(e) => setFormData({...formData, state: e.target.value})}
                       >
                         <option value="">Select State</option>
                         {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        type="button"
                        onClick={() => setStep(1)}
                        className="bg-stone-100 text-stone-500 p-5 rounded-2xl font-black hover:bg-stone-200 transition-all active:scale-95"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <button 
                        type="submit"
                        disabled={loading || !formData.trade || !formData.state}
                        className="flex-1 bg-saffron-600 text-white py-5 rounded-2xl font-black hover:bg-saffron-700 transition-all shadow-lg shadow-saffron-600/20 active:scale-95 disabled:opacity-50"
                      >
                        {loading ? 'Submitting...' : 'Complete Registration'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
