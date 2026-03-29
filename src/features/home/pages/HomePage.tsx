import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  ExternalLink, 
  ChevronRight
} from 'lucide-react';
import { eventsData as localEvents } from '../../../shared/constants/mock-data';
import { fetchGooglePhotosAlbum } from '@/infrastructure/api/googlePhotos.api';
import { supabase } from '@/infrastructure/config/supabaseClient';
import { HeroFiveSons } from '@/features/heritage/components/HeroFiveSons';
import { VisionSection } from '@/features/home/components/VisionSection';
import { AboutSection } from '@/features/home/components/AboutSection';
import { HeritageTeaser } from '@/features/home/components/HeritageTeaser';
import { KnowledgeTeaser } from '@/features/home/components/KnowledgeTeaser';
import { LegendsTeaser } from '@/features/home/components/LegendsTeaser';
import { SEO } from '@/shared/components/SEO';

const ALBUM_ID = 'AF1QipN_XMdvzWw9ZKmIoI2He1d-JdiHoIMAp2AIo6A9PNUORjW0K9q7t_d5oGz6z8OQ?key=N0Y4X3pQRVJwWGtpWG14UEY3';

export const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [photos, setPhotos] = useState<Record<string, string>[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [events, setEvents] = useState<typeof localEvents>(localEvents);

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

    loadPhotos();
    fetchEvents();
  }, []);

  return (
    <>
      <SEO 
        title={t('home.title', 'Home')} 
        description={t('app.description', 'Dedicated to the recognition, skill upgradation, and holistic support of traditional artisans in Andhra Pradesh and Telangana.')}
      />
      {/* Hero Section */}
      <HeroFiveSons />

      {/* Mission Layer */}
      <VisionSection />

      {/* About Section - Modern Context (Refactored) */}
      <AboutSection />

      {/* Heritage Path Teaser */}
      <HeritageTeaser />

      {/* Knowledge Bridge Teaser */}
      <KnowledgeTeaser />

      {/* Hall of Legends Teaser */}
      <LegendsTeaser />


      {/* Events Section */}
      <section id="events" className="py-24 bg-cream/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 font-display">{t('events.title')}</h2>
            <p className="text-stone-600 text-lg">{t('events.subtitle')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron-50 -mr-12 -mt-12 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 text-saffron-600 font-bold mb-6 uppercase tracking-widest text-[10px]">
                    <Calendar size={14} />
                    {(event.date as Record<string, string>)[i18n.language]}
                  </div>
                  <h3 className="text-2xl font-black text-stone-900 mb-4 group-hover:text-saffron-700 transition-colors leading-tight font-display">
                    {(event.title as Record<string, string>)[i18n.language]}
                  </h3>
                  <p className="text-stone-500 mb-8 line-clamp-3 text-sm leading-relaxed">
                    {(event.description as Record<string, string>)[i18n.language]}
                  </p>
                  <div className="flex items-center gap-2 text-stone-400 text-xs font-bold bg-stone-50 self-start px-3 py-2 rounded-lg">
                    <MapPin size={14} className="text-gold-500" />
                    {(event.location as Record<string, string>)[i18n.language]}
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
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4 font-display">{t('gallery.title')}</h2>
              <p className="text-stone-500 text-xs sm:text-sm font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <ImageIcon size={18} className="text-saffron-600" />
                {t('gallery.heritage')}
              </p>
            </motion.div>
            <a
              href={`https://photos.app.goo.gl/${ALBUM_ID}`}
              target="_blank"
              className="flex items-center gap-3 text-saffron-700 font-bold bg-saffron-50 px-8 py-4 rounded-2xl hover:bg-saffron-100 transition-all border border-saffron-100 shadow-sm active:scale-95 text-sm"
            >
              {t('gallery.viewGoogle')}
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
                      {t('gallery.expand')} <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50/50 border-4 border-dashed border-stone-100 rounded-[3rem] p-20 text-center">
              <p className="text-stone-400 font-bold mb-2">{t('gallery.noPhotos')}</p>
              <p className="text-[10px] text-stone-300 font-medium">(Verify ALBUM_ID and shared link visibility)</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
