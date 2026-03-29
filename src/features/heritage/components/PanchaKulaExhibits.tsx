import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Compass, Award, ChevronDown, ChevronUp } from 'lucide-react';

export const PanchaKulaExhibits = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const kulas = [
    {
      id: 'manu',
      name: t('heritage.kulas.manu', 'Manu Kula (Blacksmith)'),
      craft: "Iron & Steel – Blacksmiths",
      color: "text-stone-500",
      accent: "bg-stone-500",
      items: [
        { 
          id: 'iron-pillar', 
          title: "The Iron Pillar of Delhi", 
          desc: "A 1,600-year-old metallurgical wonder that has not rusted despite being exposed to the elements. It proves ancient Manu craftsmen mastered phosphorus-rich iron.", 
          tech: "Phosphorus-Rich Iron Mastery",
          img: "/images/heritage/exhibits/manu-iron-pillar.jpg"
        },
        { 
          id: 'wootz-steel', 
          title: "Wootz Steel (Damascus Blades)", 
          desc: "High-carbon steel pioneered in South India. It was so advanced that it could cut a silk scarf mid-air and was exported globally.", 
          tech: "Ancient Carbon-Nanotubes",
          img: "/images/heritage/exhibits/manu-wootz-steel.jpg"
        },
        { 
          id: 'metallurgy-furnaces', 
          title: "The Furnaces of Kodumanal", 
          desc: "Ancient industrial-scale iron production centers that supplied the world with high-quality steel during the Sangam era.", 
          tech: "Crucible Steel Production",
          img: "/images/heritage/exhibits/manu-furnaces.jpg"
        }
      ]
    },
    {
      id: 'maya',
      name: t('heritage.kulas.maya', 'Maya Kula (Carpenter)'),
      craft: "Structural Design – Architects",
      color: "text-amber-800",
      accent: "bg-amber-800",
      items: [
        { 
          id: 'ramappa-foundation', 
          title: "Ramappa: Sandbox Technology", 
          desc: "The structural foundation of Ramappa Temple uses 'sandbox' technology to absorb seismic tremors, alongside floating bricks.", 
          tech: "Anti-Seismic Infrastructure",
          img: "/images/heritage/exhibits/maya-ramappa.jpg"
        },
        { 
          id: 'puri-rathas', 
          title: "The Chariots of Puri", 
          desc: "Massive wooden Rathas built every year using zero metal nails, relying entirely on ancient wood-locking joints.", 
          tech: "Zero-Nail Load Joinery",
          img: "/images/heritage/exhibits/maya-puri-ratha.jpg"
        },
        { 
          id: 'padmanabhapuram', 
          title: "Padmanabhapuram Palace", 
          desc: "The world’s finest wooden architecture. The 'Mantrashala' features intricate carvings that regulate temperature naturally.", 
          tech: "Natural Climate Control",
          img: "/images/heritage/exhibits/maya-padmanabhapuram.jpg"
        }
      ]
    },
    {
      id: 'twashta',
      name: t('heritage.kulas.twashta', 'Twashta Kula (Metallurgists)'),
      craft: "Metal & Acoustics – Metallurgists",
      color: "text-orange-600",
      accent: "bg-orange-600",
      items: [
        { 
          id: 'hampi-musical', 
          title: "Hampi: Musical Pillars", 
          desc: "Stone pillars designed using Twashta acoustic principles to resonate like brass bells (Ghanta) when tapped.", 
          tech: "Acoustic Resonance Engineering",
          img: "/images/heritage/exhibits/twashta-hampi-pillars.jpg"
        },
        { 
          id: 'chola-nataraja', 
          title: "The Chola Nataraja (Bronze)", 
          desc: "Recognized globally as a masterpiece of 'Lost Wax' casting. It balances movement physics with spiritual pose.", 
          tech: "Lost-Wax Precision Molding",
          img: "/images/heritage/exhibits/twashta-nataraja.jpg"
        },
        { 
          id: 'aranmula-mirror', 
          title: "The Aranmula Metal Mirror", 
          desc: "A secret alloy of copper and tin from Kerala. Unlike glass mirrors, this eliminates secondary reflections.", 
          tech: "Molecular Reflectivity",
          img: "/images/heritage/exhibits/twashta-mirror.jpg"
        }
      ]
    },
    {
      id: 'shilpi',
      name: t('heritage.kulas.shilpi', 'Shilpi Kula (Stone Masons)'),
      craft: "Stone & Sculpture – Stone Masons",
      color: "text-stone-700",
      accent: "bg-stone-700",
      items: [
        { 
          id: 'kailasa-temple', 
          title: "Kailasa: Top-Down Monolith", 
          desc: "The world's largest monolithic structure. Carved from the top down out of a single mountain—a feat of engineering.", 
          tech: "Monolithic Excavation Logic",
          img: "/images/heritage/exhibits/shilpi-kailasa.jpg"
        },
        { 
          id: 'konark-wheel', 
          title: "Konark: Solar Calibration", 
          desc: "The 24 wheels are hyper-precise sundials that calculate time by observing the shadow of the central axle.", 
          tech: "Astronomical Precision",
          img: "/images/heritage/exhibits/shilpi-konark.jpg"
        },
        { 
          id: 'madanikas-belur', 
          title: "The Madanikas of Belur", 
          desc: "Detailed sculptures showing fingernails and moving jewelry chains—sculpted by the legendary Jakanachari.", 
          tech: "Micro-Dimensional Carving",
          img: "/images/heritage/exhibits/shilpi-madanika.jpg"
        }
      ]
    },
    {
      id: 'vishvajnya',
      name: t('heritage.kulas.vishvajnya', 'Vishvajnya Kula (Goldsmiths)'),
      craft: "Gold & Precious Metals – Goldsmiths",
      color: "text-yellow-600",
      accent: "bg-yellow-600",
      items: [
        { 
          id: 'mangala-sutra', 
          title: "The Sacred Mangala Sutra", 
          desc: "The spiritual bond of marriage, crafted with sacred geometry and rhythmic gold beads to sanctify and protect the union.", 
          tech: "Spiritual Geometry & Talismanic Design",
          img: "/images/heritage/exhibits/vishvajnya-mangalasutra.jpg"
        },
        { 
          id: 'thanjavur-nakshi', 
          title: "Temple Jewellery of Thanjavur", 
          desc: "Divine iconography crafted with 'Kunda' (pure gold foil) and 'Nakshi' repoussé work to create 3D divine figures for deities.", 
          tech: "Kunda-Nakshi Miniature Sculpture",
          img: "/images/heritage/exhibits/vishvajnya-jewellery.jpg"
        },
        { 
          id: 'golden-vimana', 
          title: "The Golden Vimana of Shrines", 
          desc: "Gilding the heavens – the massive gold-plated spires and intricate foil work that adorn India's most sacred temple sanctums.", 
          tech: "Sacred Architectural Gilding",
          img: "/images/heritage/exhibits/vishvajnya-golden-vimana.jpg"
        }
      ]
    }
  ];

  return (
    <div className="space-y-40">
      {kulas.map((kula, kIdx) => (
        <section key={kula.id} id={kula.id} className="space-y-12">
          {/* Section Header - Compact */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-8"
          >
             <div className="flex items-center gap-6">
                <span className="text-[10px] font-black font-mono text-stone-200 tracking-widest">{`[ 0${kIdx + 1} ]`}</span>
                <div>
                   <h2 className="text-xl md:text-2xl font-black text-stone-900 font-display uppercase tracking-wider">{kula.name}</h2>
                   <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${kula.color}`}>{kula.craft}</p>
                </div>
             </div>
             <div className="flex items-center gap-2 text-stone-400 text-[10px] font-black uppercase tracking-widest">
                <Compass size={12} className="text-stone-300" /> Authorized Exhibit v1.0
             </div>
          </motion.div>

          {/* Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {kula.items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col bg-stone-50 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-stone-200 hover:border-vermilion/20 transition-all duration-500 hover:shadow-2xl"
              >
                {/* Image Layer - Clean, No Overlay */}
                <div className="relative aspect-square overflow-hidden">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute top-6 left-6 flex gap-2">
                       <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20">
                          <Award size={14} className={kula.color} />
                       </div>
                   </div>
                </div>

                {/* Content Layer - Compact white footer */}
                <div className="p-8 space-y-4 bg-white grow flex flex-col justify-between">
                   <div className="space-y-2">
                       <h3 className="text-base md:text-lg font-black text-stone-900 leading-tight group-hover:text-vermilion transition-colors">
                        {item.title}
                       </h3>
                      <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">
                         Technical: {item.tech}
                      </p>
                   </div>

                   <div className="pt-4 space-y-4">
                      <AnimatePresence>
                        {expandedId === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                             <p className="text-stone-500 text-xs leading-relaxed font-medium pb-4 border-b border-stone-100">
                               {item.desc}
                             </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <button 
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="flex items-center gap-2 text-[10px] font-black text-vermilion uppercase tracking-widest hover:gap-4 transition-all"
                      >
                         {expandedId === item.id ? (
                           <>{t('heritage.exhibits.collapse', 'Collapse Details')} <ChevronUp size={14} /></>
                         ) : (
                           <>{t('heritage.exhibits.technical_report', 'Read Technical Report')} <ChevronDown size={14} /></>
                         )}
                      </button>
                   </div>
                </div>

                {/* Technical Coordinates Decorator */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity select-none hidden group-hover:block">
                   <div className="flex flex-col items-end gap-1">
                      <span className="text-[8px] font-black font-mono">X: {Math.floor(Math.random() * 999)}</span>
                      <span className="text-[8px] font-black font-mono">Y: {Math.floor(Math.random() * 999)}</span>
                      <span className="text-[8px] font-black font-mono">Z: {Math.floor(Math.random() * 999)}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
