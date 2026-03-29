import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  MapPin, 
  Phone, 
  Star, 
  Filter,
  ChevronRight,
  User
} from 'lucide-react';
import type { Artisan, ArtisanCategory } from '@/features/directory/contracts/ArtisanSchema';
import { CRAFT_LABELS } from '@/features/directory/contracts/ArtisanSchema';

const MOCK_ARTISANS: Artisan[] = [
  {
    id: '1',
    name: 'Sri Ramana Chary',
    nameRegional: 'శ్రీ రమణ చారి',
    craft: 'sculpture',
    location: 'Warangal, Telangana',
    phone: '+91 98480 12345',
    rating: 4.9,
    experienceYears: 25,
    featured: true,
    image: 'https://images.unsplash.com/photo-1590739225287-bd2049969145?auto=format&fit=crop&q=82&w=800'
  },
  {
    id: '2',
    name: 'Sri Naveen Achary',
    nameRegional: 'శ్రీ నవీన్ ఆచారి',
    craft: 'jewelry',
    location: 'Secunderabad, Hyderabad',
    phone: '+91 99887 76655',
    rating: 4.8,
    experienceYears: 15,
    image: 'https://images.unsplash.com/photo-1610492314412-d4ec18db6865?auto=format&fit=crop&q=82&w=800'
  },
  {
    id: '3',
    name: 'Sri Bhaskar Chary',
    nameRegional: 'శ్రీ భాస్కర్ చారి',
    craft: 'carpentry',
    location: 'Karimnagar, Telangana',
    phone: '+91 94401 55443',
    rating: 4.7,
    experienceYears: 30,
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=82&w=800'
  },
  {
    id: '4',
    name: 'Sri Venkata Chary',
    nameRegional: 'శ్రీ వెంకట చారి',
    craft: 'metalwork',
    location: 'Nirmal, Telangana',
    phone: '+91 90001 11223',
    rating: 4.6,
    experienceYears: 20,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5f566fab?auto=format&fit=crop&q=82&w=800'
  }
];

export const DirectoryPage = () => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ArtisanCategory>('all');

  const filteredArtisans = useMemo(() => {
    return MOCK_ARTISANS.filter(artisan => {
      const matchesSearch = 
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || artisan.craft === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const categories: ArtisanCategory[] = ['all', 'carpentry', 'metalwork', 'sculpture', 'jewelry', 'architecture'];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-stone-50/30">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left mb-12"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <span className="w-12 h-[2px] bg-vermilion" />
            <p className="text-vermilion font-black tracking-[0.3em] uppercase text-xs">
               The Economic Engine
            </p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-stone-900 mb-6 font-display tracking-tight leading-none">
            Master Artisans <span className="text-vermilion">& Professionals</span>
          </h1>
          <p className="text-stone-600 text-lg md:text-xl max-w-3xl leading-relaxed font-medium">
            Discover the finest Vishwakarma craftsmen. From sacred architecture to intricate jewelry, find the legacy you need.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[2.5rem] border border-stone-200/60 shadow-2xl flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-vermilion transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search by name, location, or skill..."
              className="w-full h-16 pl-16 pr-8 bg-stone-50 rounded-3xl border-none focus:ring-2 focus:ring-vermilion transition-all font-medium text-stone-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="hidden md:flex h-12 w-[1px] bg-stone-100" />
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-stone-900 text-turmeric shadow-lg' 
                    : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                }`}
              >
                {cat === 'all' ? <Filter size={12} /> : null}
                {cat === 'all' ? 'All Crafts' : CRAFT_LABELS[cat as keyof typeof CRAFT_LABELS][i18n.language as 'en' | 'te' | 'hi']}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-8">
           <p className="text-stone-500 font-bold text-sm">
             Showing <span className="text-stone-900">{filteredArtisans.length}</span> results
           </p>
        </div>

        <motion.div 
           layout
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtisans.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={artisan.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={artisan.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {artisan.featured && (
                    <div className="absolute top-6 left-6 bg-turmeric text-stone-900 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                       <Star size={12} fill="currentColor" />
                       Master Artisan
                    </div>
                  )}

                  <div className="absolute bottom-6 left-8 right-8 text-white">
                    <span className="text-turmeric text-[10px] font-black uppercase tracking-[0.3em] mb-1 block">
                       {CRAFT_LABELS[artisan.craft][i18n.language as 'en' | 'te' | 'hi']}
                    </span>
                    <h3 className={`text-2xl font-black leading-tight ${i18n.language === 'te' ? 'font-ramaraja' : i18n.language === 'hi' ? 'font-rozha' : 'font-outfit'}`}>
                       {i18n.language === 'en' ? artisan.name : artisan.nameRegional}
                    </h3>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-stone-600 font-medium">
                       <MapPin size={18} className="text-vermilion/50" />
                       <span className="text-sm">{artisan.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-600 font-medium">
                       <User size={18} className="text-vermilion/50" />
                       <span className="text-sm">{artisan.experienceYears}+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                       {[...Array(5)].map((_, i) => (
                         <Star 
                           key={i} 
                           size={14} 
                           className={i < Math.floor(artisan.rating) ? "text-turmeric fill-turmeric" : "text-stone-200"}
                         />
                       ))}
                       <span className="ml-2 text-xs font-black text-stone-900">{artisan.rating}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a 
                      href={`tel:${artisan.phone}`}
                      className="flex-1 bg-stone-900 text-white h-14 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-lg"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                    <button className="w-14 h-14 border-2 border-stone-100 rounded-2xl flex items-center justify-center text-stone-400 hover:border-vermilion hover:text-vermilion transition-all active:scale-95 group/btn">
                       <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArtisans.length === 0 && (
          <div className="bg-stone-50/50 border-4 border-dashed border-stone-100 rounded-[3rem] p-32 text-center">
            <p className="text-stone-400 font-bold mb-4 uppercase tracking-[0.2em]">No master artisans found</p>
            <p className="text-stone-300 text-sm max-w-sm mx-auto">Try adjusting your search query or switching categories to find other professionals.</p>
          </div>
        )}
      </div>

      {/* Join the Network Banner */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <div className="bg-vermilion rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-[0_40px_100px_rgba(227,66,52,0.2)]">
          <motion.img 
            src="/images/hero/mandala-motif.png"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute -right-32 -bottom-32 w-96 h-96 opacity-10 pointer-events-none invert"
          />
          <div className="relative z-10 max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
               Are you a Master <span className="text-turmeric text-stroke-white">Craftsman?</span>
             </h2>
             <p className="text-white/80 text-lg mb-10 font-medium">
               Get your work discovered by thousands. Join our network today and claim your Digital Identity card.
             </p>
             <button className="bg-white text-vermilion px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">
                List Your Business
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
