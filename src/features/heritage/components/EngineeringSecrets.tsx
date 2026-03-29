import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Ruler, Info, Zap } from 'lucide-react';

export const EngineeringSecrets = () => {
  const [activeSecret, setActiveSecret] = useState(0);
  const { t, i18n } = useTranslation();
  const isTelugu = i18n.language === 'te';
  const isHindi = i18n.language === 'hi';

  const secrets = [
    {
      id: 'ramappa_science',
      title_en: "The Floating Brick Technology",
      title_te: "తేలియాడే ఇటుక సాంకేతికత",
      title_hi: "तैरती ईंट तकनीक",
      location_en: "Ramappa Temple",
      location_te: "రామప్ప దేవాలయం",
      location_hi: "रामप्पा मंदिर",
      data_points: [
        { label: "Density", value: "< 0.9 g/cm³" },
        { label: "Composition", value: "Porous Ceramic" },
        { label: "Property", value: "Buoyant / Anti-Seismic" }
      ],
      description_en: "Vishwabrahmins engineered lightweight bricks that float on water, significantly reducing the load on the foundation and allowing the temple to withstand high-magnitude earthquakes for 800+ years.",
      description_te: "విశ్వకర్మలు నీటిపై తేలే తేలికపాటి ఇటుకలను ఇంజనీర్ చేశారు, దీనివల్ల పునాదిపై భారం తగ్గింది మరియు భూకంపాలను తట్టుకునే సామర్థ్యం పెరిగింది.",
      description_hi: "विश्वकर्माओं ने पानी पर तैरने वाली हल्की ईंटों का निर्माण किया, जिससे नींव पर भार कम हुआ और मंदिर 800+ वर्षों तक भूकंपों को झेलने में सक्षम रहा।",
      visual_hint: "Acoustic & Structural Physics"
    },
    {
      id: 'hampi_acoustics',
      title_en: "Geological Sound Resonance",
      title_te: "భౌగోళిక ధ్వని ప్రతిధ్వని",
      title_hi: "भूवैज्ञानिक ध्वनि प्रतिध्वनि",
      location_en: "Vittala Temple, Hampi",
      location_te: "విఠల దేవాలయం, హంపి",
      location_hi: "विट्ठल मंदिर, हम्पी",
      data_points: [
        { label: "Material", value: "Resonance Granite" },
        { label: "Frequency", value: "Musical Octaves" },
        { label: "Engineering", value: "Hollow Core Precision" }
      ],
      description_en: "The 56 musical pillars emit distinct musical notes when tapped. This was achieved by selecting specific granite types and hollow-carving them to precise geological resonant frequencies.",
      description_te: "56 సంగీత స్తంభాలు తాకినప్పుడు సంగీత స్వరాలను వెలువరిస్తాయి. నిర్దిష్ట గ్రానైట్ రకాలను ఎంచుకోవడం ద్వారా ఇది సాధ్యమైంది.",
      description_hi: "56 संगीत स्तंभों को थपथपाने पर अलग-अलग संगीत के सुर निकलते हैं। यह विशिष्ट ग्रेनाइट प्रकारों के चयन और सटीक नक्काशी के माध्यम से प्राप्त किया गया था।",
      visual_hint: "Sonic Engineering"
    },
    {
      id: 'konark_precision',
      title_en: "Astronomical Time Calibration",
      title_te: "ఖగోళ సమయ క్రమాంకనం",
      title_hi: "खगोलीय काल अंशांकन",
      location_en: "Konark Sun Temple",
      location_te: "కోణార్క్ సూర్య దేవాలయం",
      location_hi: "कोणार्क सूर्य मंदिर",
      data_points: [
        { label: "Accuracy", value: "± 2 Minutes" },
        { label: "Geometry", value: "Solar Gnomon" },
        { label: "Feature", value: "24 Ornate Sundials" }
      ],
      description_en: "The 24 wheels of the chariot are not just decorative; they are hyper-precise sundials that can calculate time down to the minute by observing the shadow of the central axle.",
      description_te: "రథం యొక్క 24 చక్రాలు కేవలం అలంకరణ మాత్రమే కాదు; ఇవి నిమిషాల వ్యవధిలో సమయాన్ని లెక్కించగల హైపర్-ఖచ్చితమైన సూర్య గడియారాలు.",
      description_hi: "रथ के 24 पहिये केवल सजावटी नहीं हैं; वे अत्यधिक सटीक सूर्य घड़ियाँ हैं जो मिनटों तक समय की गणना कर सकती हैं।",
      visual_hint: "Astronomical Logic"
    }
  ];

  return (
    <section className="py-32 bg-stone-950 relative overflow-hidden">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1700px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-center">
          
          {/* Left Side: The "Blueprint" Visualizer */}
          <div className="lg:col-span-5 relative aspect-square bg-stone-900 rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden group">
             <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSecret}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="w-full h-full p-12 flex items-center justify-center"
                  >
                     {/* Dynamic SVG Blueprint Placeholder */}
                     <div className="relative w-full h-full border-2 border-dashed border-vermilion/20 rounded-full animate-spin-slow">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                           <Ruler size={300} strokeWidth={0.5} className="text-vermilion" />
                        </div>
                     </div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ repeat: Infinity, duration: 4 }}
                        >
                           <Zap size={64} className="text-vermilion mb-4" />
                        </motion.div>
                        <h4 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Technical Analysis</h4>
                        <p className="text-vermilion text-[10px] font-black uppercase tracking-[0.5em]">{secrets[activeSecret].visual_hint}</p>
                     </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* UI Markers */}
             <div className="absolute top-8 left-8 flex gap-2">
                <div className="w-2 h-2 bg-vermilion rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Scanning Heritage Site...</span>
             </div>
          </div>

          {/* Right Side: The Pedagogical Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
               <h2 className="text-xs font-black text-vermilion uppercase tracking-[0.6em]">
                 {t('heritage.secrets', 'Engineering Secrets')}
               </h2>
               <h3 className={`text-4xl md:text-5xl font-black text-white font-display leading-[1.1]
                 ${isTelugu ? 'font-telugu' : isHindi ? 'font-hindi' : ''}`}>
                 Ancient Science & Material Precision
               </h3>
               <p className="text-stone-400 text-lg leading-relaxed italic border-l-2 border-vermilion pl-6">
                 Moving beyond aesthetic admiration to understand the structural logic of the Pancha Brahma.
               </p>
            </div>

            <div className="space-y-4">
               {secrets.map((secret, index) => (
                 <button
                   key={secret.id}
                   onClick={() => setActiveSecret(index)}
                   className={`w-full text-left p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all border ${
                     activeSecret === index 
                     ? 'bg-white/10 border-vermilion/50 shadow-2xl md:translate-x-4' 
                     : 'bg-white/5 border-white/5 hover:bg-white/5 hover:border-white/10'
                   }`}
                 >
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{secret.location_en}</span>
                       <Info size={14} className={activeSecret === index ? 'text-vermilion' : 'text-stone-600'} />
                    </div>
                    <h4 className={`text-2xl font-black text-white 
                      ${isTelugu ? 'font-telugu' : isHindi ? 'font-hindi' : ''}`}>
                      {isTelugu ? secret.title_te : isHindi ? secret.title_hi : secret.title_en}
                    </h4>
                    
                    <AnimatePresence>
                      {activeSecret === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                           <p className="text-stone-400 text-sm mt-4 leading-relaxed font-medium">
                             {isTelugu ? secret.description_te : isHindi ? secret.description_hi : secret.description_en}
                           </p>
                           <div className="flex gap-4 mt-8">
                              {secret.data_points.map((dp, di) => (
                                <div key={di} className="bg-stone-900 border border-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl flex-1">
                                   <p className="text-[10px] font-black text-vermilion uppercase tracking-widest mb-1">{dp.label}</p>
                                   <p className="text-xs font-black text-white">{dp.value}</p>
                                </div>
                              ))}
                           </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </button>
               ))}
            </div>

            <button className="bg-vermilion text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-vermilion/90 transition-all shadow-xl shadow-vermilion/20 active:scale-95">
               Access Full Research Library
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
