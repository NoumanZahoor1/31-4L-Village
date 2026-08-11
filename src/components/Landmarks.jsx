import React, { useState } from 'react';
import { Camera, MapPin, Eye, X, Maximize2 } from 'lucide-react';
import { placeLandmarks } from '../data/mockData';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

export default function Landmarks() {
  const { lang } = useLang();
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  // Merge images from mockData with translation texts
  const rawLandmarksList = t.data?.landmarks || placeLandmarks || [];
  const landmarksData = rawLandmarksList.map(item => {
    const original = placeLandmarks.find(p => p.id === item.id) || item;
    return {
      ...item,
      image: original.image,
      category: typeof item.category === 'object' ? get(item.category, lang) : item.category,
      name: typeof item.name === 'object' ? get(item.name, lang) : (item.name || original.name),
      description: typeof item.description === 'object' ? get(item.description, lang) : item.description
    };
  });

  return (
    <section id="landmarks" className="py-24 bg-brand-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-3">
            {get(t.landmarks.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            {get(t.landmarks.heading, lang)}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            {lang === 'ur' 
              ? 'ہمارے گاؤں کی سیر کریں اور ان تاریخی مقامات، خوبصورت نہروں اور مالٹے کے باغات کا تجربہ کریں۔' 
              : 'Take a stroll through our village to experience these historic landmarks, scenic waterways, and lush orange groves.'}
          </p>
        </div>

        {/* Landmarks Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {landmarksData.map((landmark) => (
            <div 
              key={landmark.id} 
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Landmark Image */}
              <div 
                className="w-full h-64 sm:h-72 overflow-hidden relative cursor-pointer group/img shrink-0"
                onClick={() => setSelectedLandmark(landmark)}
              >
                <img 
                  loading="lazy"
                  src={landmark.image} 
                  alt={landmark.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-110"
                />
                
                {/* Camera Icon Badge */}
                <div className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-md text-brand-emerald rounded-xl border border-white/20">
                  <Camera className="h-4 w-4" />
                </div>

                {/* Hover Preview Overlay */}
                <div className="absolute inset-0 bg-brand-emerald/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold tracking-wide bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    {lang === 'ur' ? 'تصویر دیکھیں' : 'Preview Image'}
                  </span>
                </div>
              </div>

              {/* Landmark Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block mb-2">
                    {landmark.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand-emerald transition-colors">
                    {landmark.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {landmark.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-medium">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-brand-moss" /> {get(t.nav.brandName, lang)}, Okara
                  </span>
                  <button 
                    onClick={() => setSelectedLandmark(landmark)}
                    className="flex items-center gap-1 text-brand-emerald hover:text-brand-gold font-semibold transition-colors cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {lang === 'ur' ? 'مکمل دیکھو' : 'Full View'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Image Preview Modal */}
      {selectedLandmark && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-[fade-in_0.2s_ease-out]"
          onClick={() => setSelectedLandmark(null)}
        >
          <div 
            className="relative max-w-6xl w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedLandmark(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white flex items-center gap-1.5 cursor-pointer text-sm font-semibold bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full transition-all"
            >
              <X className="h-4 w-4" /> {lang === 'ur' ? 'بند کریں' : 'Close'}
            </button>

            {/* Image Only - Full View */}
            <div className="relative max-h-[88vh] flex justify-center items-center overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img 
                src={selectedLandmark.image} 
                alt={selectedLandmark.name} 
                className="max-w-full max-h-[88vh] w-auto h-auto object-contain rounded-2xl block"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

