import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SONS = [
  {
    id: 'manu',
    name: 'MANU',
    craft: 'The Master Forge / Iron',
    desc: 'The primordial fire. Manu bestowed the knowledge of metallurgy, forging the unbreakable tools that built civilizations.',
    image: 'https://images.unsplash.com/photo-1540544520-22c92e92c2ae?q=80&w=1200&auto=format&fit=crop',
    color: 'from-orange-600/50 to-red-900/50',
  },
  {
    id: 'maya',
    name: 'MAYA',
    craft: 'The Divine Carpenter / Wood',
    desc: 'Master of geometry and timber. Maya crafted the intricate woodworks, chariots, and the illusionary architecture of the epics.',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop',
    color: 'from-amber-700/50 to-yellow-900/50',
  },
  {
    id: 'thwashta',
    name: 'THWASHTA',
    craft: 'The Architect of Alloys / Brass',
    desc: 'The master of non-ferrous metals. Thwashta crafted divine vessels, intricate gears, and the weapons of the gods.',
    image: 'https://images.unsplash.com/photo-1610634123528-98e9860b73c4?q=80&w=1200&auto=format&fit=crop',
    color: 'from-yellow-500/50 to-orange-800/50',
  },
  {
    id: 'shilpi',
    name: 'SHILPI',
    craft: 'The Eternal Sculptor / Stone',
    desc: 'Bringing life to granite. Shilpi bestowed the science of Vastu and the art of breathing divinity into cold stone pillars.',
    image: 'https://images.unsplash.com/photo-1605446071477-8c88f33d7b43?q=80&w=1200&auto=format&fit=crop',
    color: 'from-stone-500/50 to-zinc-800/50',
  },
  {
    id: 'vishwajna',
    name: 'VISHWAJNA',
    craft: 'The Luminous Jeweler / Gold',
    desc: 'The creator of brilliance. Vishwajna works with the solar elements, crafting delicate filigree and the crowns of deities.',
    image: 'https://images.unsplash.com/photo-1620650212354-9a4f61dae38e?q=80&w=1200&auto=format&fit=crop',
    color: 'from-yellow-300/50 to-amber-600/50',
  }
];

export function HeroFiveSons() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSnap = () => {
    if (navigator.vibrate) {
      navigator.vibrate(30); // Mobile haptic feedback
    }
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col pt-20">
      {/* Background Arching Presence - Lord Vishwakarma */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20 transition-all duration-1000"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-20 px-6 py-4 text-center md:pb-8 shrink-0">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold font-outfit text-white mb-2 tracking-tight drop-shadow-lg"
        >
          The Divine Forge
        </motion.h1>
         <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-saffron-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-2"
        >
          Lord Vishwakarma & The Five Creators
        </motion.p>
      </div>

      {/* Interactive Accordion / Carousel */}
      <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto overflow-x-auto snap-x snap-mandatory flex md:gap-1 pb-10 hide-scrollbar"
           onScroll={isMobile ? handleSnap : undefined}>
        {SONS.map((son, index) => {
          const isActive = hoveredIndex === index;
          return (
            <motion.div
              key={son.id}
              className={`flex-shrink-0 w-[85vw] md:w-auto h-[65vh] md:h-full snap-center rounded-2xl md:rounded-none overflow-hidden relative cursor-pointer mx-2 md:mx-0 group ${isActive ? 'ring-2 ring-saffron-500 ring-offset-2 ring-offset-black z-10' : 'z-0'}`}
              style={{ flex: isMobile ? 'none' : isActive ? 5 : 1 }}
              onHoverStart={() => !isMobile && setHoveredIndex(index)}
              onHoverEnd={() => !isMobile && setHoveredIndex(null)}
              onClick={() => isMobile && setHoveredIndex(isActive ? null : index)}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Background Texture/Image */}
              <motion.div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${son.image})` }}
                animate={{ scale: isActive ? 1.05 : 1 }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${son.color} opacity-60 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-black/50 md:group-hover:bg-black/30 transition-colors duration-500" />
              
              {isActive && <div className="absolute inset-0 backdrop-blur-[2px] bg-black/30 md:bg-transparent transition-all duration-500" />}

              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                {/* Vertical Name (Hidden when active on desktop) */}
                {!isMobile && !isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-white/40 font-outfit text-3xl xl:text-4xl font-bold tracking-widest -rotate-90 whitespace-nowrap drop-shadow-xl transition-opacity duration-300">
                      {son.name}
                    </h2>
                  </div>
                )}

                {/* Expanded Content */}
                <AnimatePresence>
                  {(isActive || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                      className={`${!isActive && isMobile ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'} transition-all duration-500 md:opacity-100 md:translate-y-0`}
                    >
                      <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-2xl">
                        <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-2 drop-shadow-md">
                          {son.name}
                        </h2>
                        <h3 className="text-saffron-400 text-xs md:text-sm font-semibold uppercase tracking-wider mb-3">
                          {son.craft}
                        </h3>
                        {isActive && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-zinc-200 text-sm md:text-base leading-relaxed"
                          >
                            {son.desc}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
