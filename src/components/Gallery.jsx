import React, { useState, useEffect } from 'react';
import { Eye, X, Play, Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems } from '../data/mockData';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';
import TiltCard from './TiltCard';

export default function Gallery() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const translatedCategories = [
    { id: "all", label: get(t.gallery.all, lang) },
    { id: "farming", label: get(t.gallery.farming, lang) },
    { id: "culture", label: get(t.gallery.culture, lang) },
    { id: "landmarks", label: get(t.gallery.landmarks, lang) },
  ];

  const categoryLabels = {
    farming: get(t.gallery.farming, lang),
    culture: get(t.gallery.culture, lang),
    landmarks: get(t.gallery.landmarks, lang),
  };

  const rawGalleryList = t.data?.gallery || galleryItems || [];
  const itemsData = rawGalleryList.map(item => {
    const original = galleryItems.find(g => g.id === item.id) || item;
    return {
      ...item,
      image: original.image,
      video: original.video,
      type: original.type,
      categoryKey: original.category,
      category: categoryLabels[original.category] || original.category,
      title: typeof item.title === 'object' ? get(item.title, lang) : item.title,
      description: typeof item.description === 'object' ? get(item.description, lang) : item.description
    };
  });

  const filteredItems = itemsData.filter(item => 
    activeCategory === "all" || item.categoryKey === activeCategory
  );

  const handleNext = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-3">
            {get(t.gallery.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            {get(t.gallery.heading, lang)}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            {lang === 'ur'
              ? 'چک 31/4L کی تصاویر اور ویڈیوز کا سفر کریں۔ گندم کے کھیتوں، آموں کے باغات، اور گاؤں کے خوبصورت مناظر دیکھیں۔'
              : 'Explore photo & video highlights of Chak 31/4L. Experience wheat harvest, lush orchards, scenic farmlands, and village life.'}
          </p>
        </motion.div>

        {/* Dynamic Category Filter Tabs with Layout Animations */}
        <div className="flex flex-wrap gap-3 justify-center mb-14">
          {translatedCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-brand-emerald' : 'text-gray-600 hover:text-gray-900 bg-white/80 border border-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-brand-gold rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Media Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="group h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
                  <div 
                    className="aspect-[4/3] w-full overflow-hidden relative bg-black/5"
                    onClick={() => setLightboxIndex(index)}
                  >
                    {item.video ? (
                      <video 
                        src={item.video} 
                        poster={item.image}
                        muted 
                        playsInline 
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <img 
                        loading="lazy"
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}

                    {item.video && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20">
                        <Film className="h-3.5 w-3.5 text-brand-gold" />
                        <span>VIDEO</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-brand-emerald/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-4 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center">
                        {item.video ? (
                          <Play className="h-8 w-8 fill-white translate-x-0.5" />
                        ) : (
                          <Eye className="h-7 w-7" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between" onClick={() => setLightboxIndex(index)}>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest block">
                          {item.category}
                        </span>
                        {item.video && (
                          <span className="text-[10px] font-semibold text-brand-emerald bg-brand-cream px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Play className="h-2.5 w-2.5 fill-current" /> {lang === 'ur' ? 'ویڈیو' : 'Video'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-emerald transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Upgraded Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              
              {/* Top Bar Info & Close */}
              <div className="w-full flex items-center justify-between mb-4 text-white">
                <div>
                  <span className="text-xs text-brand-gold uppercase tracking-widest block">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="text-lg font-bold">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                </div>

                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer border border-white/20"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lightbox Media Box */}
              <motion.div 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-h-[72vh] flex justify-center items-center overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl"
              >
                {filteredItems[lightboxIndex].video ? (
                  <video 
                    src={filteredItems[lightboxIndex].video} 
                    controls 
                    autoPlay 
                    playsInline
                    className="max-w-full max-h-[72vh] rounded-2xl object-contain"
                  />
                ) : (
                  <img 
                    src={filteredItems[lightboxIndex].image} 
                    alt={filteredItems[lightboxIndex].title} 
                    className="max-w-full max-h-[72vh] object-contain rounded-2xl"
                  />
                )}

                {/* Left/Right Nav Buttons */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full border border-white/20 cursor-pointer backdrop-blur-md transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/70 p-3 rounded-full border border-white/20 cursor-pointer backdrop-blur-md transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </motion.div>

              {/* Description & Slide Indicators */}
              <div className="w-full mt-4 text-center">
                <p className="text-gray-300 text-sm max-w-2xl mx-auto mb-4">
                  {filteredItems[lightboxIndex].description}
                </p>

                <div className="flex justify-center items-center gap-2">
                  {filteredItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        lightboxIndex === idx ? 'bg-brand-gold w-6' : 'bg-white/30 hover:bg-white/60 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
