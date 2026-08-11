import React, { useState } from 'react';
import { Image as ImageIcon, Eye, X, Play, Film } from 'lucide-react';
import { galleryItems } from '../data/mockData';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

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

  // Merge translation keys with mock data paths
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

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
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
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {translatedCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-brand-gold text-brand-emerald shadow-lg'
                  : 'bg-brand-cream/60 text-gray-600 hover:bg-gray-200 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Media Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative bg-brand-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 flex flex-col"
              onClick={() => setLightboxIndex(index)}
            >
              {/* Media Aspect ratio card wrapper */}
              <div className="aspect-[4/3] w-full overflow-hidden relative bg-black/5">
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
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Badge for Video */}
                {item.video && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/20">
                    <Film className="h-3.5 w-3.5 text-brand-gold" />
                    <span>VIDEO</span>
                  </div>
                )}
                
                {/* Hover Mask */}
                <div className="absolute inset-0 bg-brand-emerald/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center">
                    {item.video ? (
                      <Play className="h-7 w-7 fill-white translate-x-0.5" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </div>
                </div>
              </div>

              {/* Caption details */}
              <div className="p-6 bg-white flex-1 flex flex-col justify-between">
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
                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-emerald transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-[fade-in_0.2s_ease-out]">
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            
            {/* Media viewer (Video or Image) */}
            <div className="relative w-full max-h-[70vh] flex justify-center items-center overflow-hidden">
              {filteredItems[lightboxIndex].video ? (
                <video 
                  src={filteredItems[lightboxIndex].video} 
                  controls 
                  autoPlay 
                  playsInline
                  className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                <img 
                  src={filteredItems[lightboxIndex].image} 
                  alt={filteredItems[lightboxIndex].title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}
            </div>



            {/* Navigation arrows */}
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full border border-white/10 cursor-pointer hidden md:block"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full border border-white/10 cursor-pointer hidden md:block"
            >
              &rarr;
            </button>

            {/* Close */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-1.5 cursor-pointer text-sm font-semibold bg-white/15 px-3 py-1.5 rounded-full"
            >
              <X className="h-4 w-4" /> {lang === 'ur' ? 'بند کریں' : 'Close'}
            </button>

            {/* Slide Index dots */}
            <div className="flex gap-2 mt-6">
              {filteredItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    lightboxIndex === idx ? 'bg-brand-gold w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

