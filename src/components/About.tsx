import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  BookOpen, 
  ArrowLeft,
  Hammer,
  ShoppingBag,
  Award
} from 'lucide-react';

export function About({ onBack, onJoinClick }: { onBack: () => void, onJoinClick: () => void }) {
  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-saffron-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-saffron-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-stone-600 hover:text-saffron-600 transition-colors font-bold group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-saffron-600 p-1.5 rounded-lg">
                <Hammer className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-saffron-900 uppercase">VKC About</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/30 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full bg-saffron-50 text-saffron-700 text-xs font-black uppercase tracking-widest mb-6"
          >
            Preserving Heritage, Powering Futures
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 mb-8 font-display">
            Vishwa Karma <span className="text-saffron-600">Knowledge Centre</span>
          </h1>
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-medium">
            Dedicated to the recognition, skill upgradation, and holistic support of traditional artisans and craftspeople in South India.
          </p>
        </div>
      </section>

      {/* AP & Telangana Focus */}
      <section className="py-24 bg-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-black text-stone-900 font-display">
                Empowering <span className="text-gold-600">Andhra Pradesh & Telangana</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="bg-saffron-600 p-4 rounded-2xl h-fit">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-stone-900">Telangana Registration Hub</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      With over 2.8 lakh registrations and 85+ active training centers across 26 districts, we are leading the transformation of traditional trades in Telangana.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="bg-gold-600 p-4 rounded-2xl h-fit">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-stone-900">Andhra Pradesh Outreach</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">
                      Deeply rooted in districts like Konaseema and Vizianagaram, focusing on specialized training for Malakaar, Washermen, and other essential heritage trades.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-4">
                  <div className="aspect-[4/5] bg-saffron-100 rounded-[2rem] overflow-hidden">
                     <div className="p-8 h-full flex flex-col justify-end text-saffron-900">
                        <span className="text-4xl font-black">2.8L+</span>
                        <span className="text-xs font-bold uppercase tracking-wider">Registrations</span>
                     </div>
                  </div>
                  <div className="aspect-square bg-stone-900 rounded-[2rem] p-8 text-white flex flex-col justify-center gap-2">
                     <Award className="text-gold-500 w-10 h-10" />
                     <span className="text-lg font-bold leading-tight">Certified Recognition</span>
                  </div>
               </div>
               <div className="pt-12 space-y-4">
                  <div className="aspect-square bg-gold-600 rounded-[2rem] p-8 text-white flex flex-col justify-center gap-2">
                     <Users className="text-white w-10 h-10" />
                     <span className="text-lg font-bold leading-tight">Skill Upgradation</span>
                  </div>
                  <div className="aspect-[4/5] bg-stone-100 rounded-[2rem] p-8 flex flex-col justify-end text-stone-900">
                     <span className="text-4xl font-black">85+</span>
                     <span className="text-xs font-bold uppercase tracking-wider">Centers</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 underline decoration-saffron-200 underline-offset-8">
            <h2 className="text-3xl md:text-4xl font-black text-stone-900 font-display">Mission Benefits</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Recognition", desc: "PM Vishwakarma Certificate and ID Card for every artisan." },
              { icon: BookOpen, title: "Training", desc: "Basic and Advanced skill training with ₹500/day stipend." },
              { icon: ShoppingBag, title: "Toolkit Grant", desc: "₹15,000 grant for purchasing modern toolkits." },
              { icon: Award, title: "Credit Support", desc: "Collateral-free loans up to ₹3 Lakh at 5% interest." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 hover:border-saffron-200 transition-all group"
              >
                <item.icon className="text-saffron-600 mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-xl font-bold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-saffron-600 relative overflow-hidden text-center text-white">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)]" />
         <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-black mb-8 font-display">Join the Vishwakarma Mission</h2>
            <p className="text-lg text-saffron-100 mb-10 leading-relaxed font-medium">
              We invite artisans from all 18 traditional trades to join the Knowledge Centre and build a prosperous future together.
            </p>
            <button 
              onClick={onJoinClick}
              className="bg-white text-saffron-600 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-stone-50 active:scale-95 transition-all focus:ring-offset-saffron-600"
            >
              Register Now
            </button>
         </div>
      </section>
    </div>
  );
}
