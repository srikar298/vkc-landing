import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  ExternalLink, 
  Menu, 
  X,
  ChevronRight,
  Hammer,
  Ruler,
  BookOpen,
  Compass
} from 'lucide-react';
import { translations, eventsData as localEvents } from '@/shared/constants/mock-data';
import { fetchGooglePhotosAlbum } from '@/infrastructure/api/googlePhotos.api';
import { supabase } from '@/infrastructure/config/supabaseClient';
import { Admin } from '@/features/admin/components/Admin';
import { About } from '@/features/heritage/components/About';
import { JoinModal } from '@/features/onboarding/components/JoinModal';
import { HeroFiveSons } from '@/features/heritage/components/HeroFiveSons';

// Replace with your actual Google Photos shared album ID
const ALBUM_ID = 'AF1QipN_XMdvzWw9ZKmIoI2He1d-JdiHoIMAp2AIo6A9PNUORjW0K9q7t_d5oGz6z8OQ?key=N0Y4X3pQRVJwWGtpWG14UEY3';

type Language = 'en' | 'hi' | 'te';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [photos, setPhotos] = useState<Record<string, string>[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [events, setEvents] = useState<typeof localEvents>(localEvents);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const loadPhotos = async () => {
      setLoadingPhotos(true);
      const albumPhotos = await fetchGooglePhotosAlbum(ALBUM_ID);
      setPhotos(albumPhotos.slice(0, 8));
      setLoadingPhotos(false);
    };

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('id', { ascending: true });
      
      if (!error && data && data.length > 0) {
        setEvents(data);
      }
    };

    const handleHash = () => {
      setShowAdmin(window.location.hash === '#admin');
      setShowAbout(window.location.hash === '#mission');
      if (window.location.hash === '#admin' || window.location.hash === '#mission') setIsMenuOpen(false);
    };

    loadPhotos();
    fetchEvents();
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-1 bg-saffron-50 p-1 rounded-xl border border-saffron-100">
      {(['en', 'hi', 'te'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            lang === l 
              ? 'bg-saffron-600 text-white shadow-sm' 
              : 'text-saffron-600 hover:bg-saffron-100'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  if (showAdmin) return <Admin />;
  if (showAbout) return <About onBack={() => window.location.hash = ''} onJoinClick={() => setIsJoinModalOpen(true)} />;

  return (
    <div className="min-h-screen font-sans selection:bg-saffron-200 bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-saffron-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-saffron-600 p-2 rounded-lg">
                <Hammer className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-saffron-900 hidden sm:block">
                VKC
              </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 mr-4 border-r border-saffron-100 pr-8">
                <a href="#about" className="text-stone-600 hover:text-saffron-600 transition-colors font-medium">{t.nav.about}</a>
                <a href="#events" className="text-stone-600 hover:text-saffron-600 transition-colors font-medium">{t.nav.events}</a>
                <a href="#gallery" className="text-stone-600 hover:text-saffron-600 transition-colors font-medium">{t.nav.gallery}</a>
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <button 
                  onClick={() => setIsJoinModalOpen(true)}
                  className="bg-saffron-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-saffron-700 transition-all shadow-md active:scale-95 text-sm"
                >
                  {t.nav.join}
                </button>
              </div>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <LanguageSwitcher />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-saffron-900">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-saffron-50 p-4 space-y-2 shadow-xl overflow-hidden"
            >
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-stone-700 hover:bg-saffron-50 rounded-xl font-medium">{t.nav.about}</a>
              <a href="#events" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-stone-700 hover:bg-saffron-50 rounded-xl font-medium">{t.nav.events}</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-stone-700 hover:bg-saffron-50 rounded-xl font-medium">{t.nav.gallery}</a>
              <div className="pt-2">
                <button 
                  onClick={() => setIsJoinModalOpen(true)}
                  className="w-full bg-saffron-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-saffron-600/20 active:scale-95 transition-transform"
                >
                  {t.nav.join}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <HeroFiveSons />
      </main>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-gold-100/30 blur-[100px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-6 font-display">{t.about.title}</h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto leading-relaxed">{t.about.description}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-saffron-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
                <Compass className="text-saffron-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{t.about.card1Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.about.card1Desc}</p>
            </div>
            
            <div className="bg-cream p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-gold-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 -rotate-3">
                <BookOpen className="text-gold-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{t.about.card2Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.about.card2Desc}</p>
            </div>

            <div className="bg-cream p-8 rounded-[2.5rem] border border-stone-100 shadow-sm text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-saffron-100 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-6">
                <Ruler className="text-saffron-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-stone-900">{t.about.card3Title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{t.about.card3Desc}</p>
            </div>
          </div>

          <div className="mt-16 bg-saffron-50/50 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border-l-8 border-saffron-600 italic text-center text-stone-800 text-xl font-bold relative">
             <div className="absolute top-4 left-6 text-saffron-200 text-6xl font-serif">"</div>
             {t.about.mission}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-cream/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 font-display">{t.events.title}</h2>
            <p className="text-stone-600 text-lg">{t.events.subtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-50 -mr-12 -mt-12 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-saffron-600 font-bold mb-6 uppercase tracking-widest text-[10px]">
                    <Calendar size={14} />
                    {(event.date as Record<string, string>)[lang]}
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 mb-4 group-hover:text-saffron-700 transition-colors leading-tight font-display">
                    {(event.title as Record<string, string>)[lang]}
                  </h3>
                  <p className="text-stone-500 mb-8 line-clamp-3 text-sm leading-relaxed">
                    {(event.description as Record<string, string>)[lang]}
                  </p>
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-bold bg-stone-50 self-start px-3 py-2 rounded-lg">
                    <MapPin size={14} className="text-gold-500" />
                    {(event.location as Record<string, string>)[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 flex-wrap gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 font-display">{t.gallery.title}</h2>
              <p className="text-stone-500 text-xs sm:text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <ImageIcon size={18} className="text-saffron-600" />
                {t.gallery.heritage}
              </p>
            </motion.div>
            <a 
              href={`https://photos.app.goo.gl/${ALBUM_ID}`} 
              target="_blank" 
              className="flex items-center gap-3 text-saffron-700 font-bold bg-saffron-50 px-8 py-4 rounded-2xl hover:bg-saffron-100 transition-all border border-saffron-100 shadow-sm active:scale-95 text-sm"
            >
              {t.gallery.viewGoogle}
              <ExternalLink size={18} />
            </a>
          </div>

          {loadingPhotos ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-stone-50 rounded-3xl" />
              ))}
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-stone-100 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img 
                    src={photo.thumbnail} 
                    alt="Community Photo" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 flex items-end p-4 sm:p-8">
                    <a href={photo.original} target="_blank" className="w-full text-white text-[10px] sm:text-xs font-black flex items-center justify-center gap-2 bg-saffron-600 hover:bg-saffron-500 py-3 rounded-xl backdrop-blur-md transition-all">
                      {t.gallery.expand} <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50/50 border-4 border-dashed border-stone-100 rounded-[3rem] p-20 text-center">
              <p className="text-stone-400 font-bold mb-2">{t.gallery.noPhotos}</p>
              <p className="text-[10px] text-stone-300 font-medium">(Verify ALBUM_ID and shared link visibility)</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-white py-20 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-saffron-900/10 blur-[150px] rounded-full -z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-saffron-600 p-2.5 rounded-xl shadow-lg shadow-saffron-600/40">
                  <Hammer className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-white">VKC</span>
              </div>
              <p className="text-stone-400 leading-relaxed max-w-sm text-sm">
                {t.footer.description}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-black mb-8 text-saffron-500 uppercase tracking-widest">{t.footer.quickLinks}</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#about" className="text-stone-500 hover:text-white transition-colors">{t.footer.history}</a></li>
                <li><a href="#events" className="text-stone-500 hover:text-white transition-colors">{t.footer.calendar}</a></li>
                <li><a href="#gallery" className="text-stone-500 hover:text-white transition-colors">{t.footer.media}</a></li>
                <li><a href="#" className="text-stone-500 hover:text-white transition-colors">{t.footer.contactUs}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-black mb-8 text-gold-500 uppercase tracking-widest">{t.footer.contact}</h4>
              <p className="text-stone-400 mb-2 text-sm font-bold">Vishwa Karma Knowledge Centre</p>
              <p className="text-stone-500 text-sm">{t.footer.address}</p>
              <p className="text-saffron-500 mt-6 font-black text-sm">info@vkc-community.org</p>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs text-stone-600 font-bold">
            <p>© 2026 {t.hero.title} {t.hero.subtitle}. {t.footer.rights}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#admin" className="text-stone-900/10 hover:text-stone-700 transition-colors">.</a>
            </div>
          </div>
        </div>
      </footer>

      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </div>
  );
}

export default App;
