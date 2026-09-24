import React, { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Sprout, GraduationCap, ChevronDown, ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';
import TiltCard from './TiltCard';
import Counter from './Counter';

const HERO_SLIDES = [
  {
    image: '/images/hero-slide-1.webp',
    titleEn: 'Welcome to',
    titleUr: 'چک 31/4L میں',
    highlightEn: 'Chak 31/4L',
    highlightUr: 'خوش آمدید',
    subtitleEn: 'Heart of Okara Punjab',
    subtitleUr: 'اوکاڑہ پنجاب کی شان',
  },
  {
    image: '/images/hero-slide-2.webp',
    titleEn: 'Lush Green',
    titleUr: 'سرسبز و شاداب',
    highlightEn: 'Farmlands',
    highlightUr: 'کھیت',
    subtitleEn: 'Rich Agricultural Heritage',
    subtitleUr: 'زراعت کی شاندار روایات',
  },
  {
    image: '/images/hero-slide-3.webp',
    titleEn: 'Golden Harvest &',
    titleUr: 'سنہری فصلیں اور',
    highlightEn: 'Traditions',
    highlightUr: 'روایات',
    subtitleEn: 'Where Land Meets Legacy',
    subtitleUr: 'جہاں زمین اور روایات ملتی ہیں',
  },
  {
    image: '/images/hero-slide-4.webp',
    titleEn: 'Vibrant Community &',
    titleUr: 'زندہ دل عوام اور',
    highlightEn: 'Unity',
    highlightUr: 'اتحاد',
    subtitleEn: 'Peaceful Village Life',
    subtitleUr: 'پرامن گاؤں کی زندگی',
  },
];

export default function Hero() {
  const { lang } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const SLIDE_DURATION = 7000;

  // Auto-advance slides
  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(intervalRef.current);
    };
  }, [currentSlide]);

  const goToSlide = (idx) => {
    clearTimeout(intervalRef.current);
    setCurrentSlide(idx);
  };

  const statLabelMap = {
    'Population':   get(t.hero.population, lang),
    'Main District': get(t.hero.district, lang),
    'Primary Crops': get(t.hero.crops, lang),
    'Literacy Rate': get(t.hero.literacy, lang),
    'Caste':        get(t.hero.caste, lang),
  };

  const localStats = [
    {
      label: 'Population',
      count: 4000,
      suffix: '+',
      value: { en: '4,000+', ur: '۴۰۰۰+' },
      description: { en: 'According to latest local survey', ur: 'تازہ ترین مقامی سروے کے مطابق' },
    },
    {
      label: 'Main District',
      value: { en: 'Okara', ur: 'اوکاڑہ' },
      description: { en: 'Land of Agriculture & Dairy', ur: 'زراعت اور ڈیری کی سرزمین' },
    },
    {
      label: 'Primary Crops',
      value: { en: 'Potato, Wheat, Rice, Corn', ur: 'آلو، گندم، چاول، مکئی' },
      description: { en: 'Top agricultural exports', ur: 'اہم زرعی پیداوار' },
    },
    {
      label: 'Literacy Rate',
      count: 80,
      suffix: '%+',
      value: { en: '80%+', ur: '۸۰٪+' },
      description: { en: 'Highly active school enrollment', ur: 'بہت زیادہ اسکول داخلہ' },
    },
    {
      label: 'Caste',
      value: { en: 'Baloch', ur: 'بلوچ' },
      description: { en: 'Main community of the village', ur: 'گاؤں کی مرکزی برادری' },
    },
  ];

  const getIcon = (label) => {
    switch (label) {
      case 'Population':    return <Users className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />;
      case 'Main District': return <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />;
      case 'Primary Crops': return <Sprout className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />;
      case 'Literacy Rate': return <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />;
      case 'Caste':         return <Users className="h-4 w-4 sm:h-5 sm:w-5 text-brand-gold" />;
      default: return null;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between items-center text-white bg-black group">
      
      {/* ===== BACKGROUND IMAGE CAROUSEL with Ken Burns ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
              opacity: currentSlide === idx ? 1 : 0,
              animation: currentSlide === idx ? 'kenburns 12s ease-in-out infinite alternate' : 'none',
            }}
          />
        ))}
      </div>

      {/* ===== CINEMATIC GRADIENT OVERLAY ===== */}
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.2) 50%, rgba(6,78,59,0.8) 85%, rgba(6,78,59,0.98) 100%)',
      }} />

      {/* Vignette effect for cinematic feel */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* ===== AMBIENT LIGHT ORBS ===== */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-emerald-500/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-brand-gold/8 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* ===== FLOATING EDGE SLIDER ARROWS (hidden on mobile to prevent clutter) ===== */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="hidden sm:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-brand-gold hover:text-brand-emerald border border-white/20 text-white backdrop-blur-xl transition-all duration-300 transform hover:scale-110 shadow-2xl cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % HERO_SLIDES.length)}
        className="hidden sm:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-brand-gold hover:text-brand-emerald border border-white/20 text-white backdrop-blur-xl transition-all duration-300 transform hover:scale-110 shadow-2xl cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ===== HERO MAIN CONTENT ===== */}
      <div className="relative z-20 flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 sm:pt-28 pb-4">
        
        {/* Animated Subtitle Badge */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 border border-brand-gold/40 text-brand-gold font-bold tracking-[0.15em] text-[10px] sm:text-[11px] uppercase mb-3 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>{lang === 'ur' ? HERO_SLIDES[currentSlide].subtitleUr : HERO_SLIDES[currentSlide].subtitleEn}</span>
          </motion.div>
        </AnimatePresence>

        {/* Animated Main Heading */}
        <AnimatePresence mode="wait">
          <motion.h1 
            key={`heading-${currentSlide}`}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 leading-tight sm:leading-[1.1] text-white"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.85)' }}
          >
            {lang === 'ur' ? (
              <>
                {HERO_SLIDES[currentSlide].titleUr}{' '}
                <span className="text-brand-gold italic block sm:inline drop-shadow-[0_2px_15px_rgba(213,169,73,0.5)]">
                  {HERO_SLIDES[currentSlide].highlightUr}
                </span>
              </>
            ) : (
              <>
                {HERO_SLIDES[currentSlide].titleEn}{' '}
                <span className="text-brand-gold italic block sm:inline drop-shadow-[0_2px_15px_rgba(213,169,73,0.5)]">
                  {HERO_SLIDES[currentSlide].highlightEn}
                </span>
              </>
            )}
          </motion.h1>
        </AnimatePresence>

        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs sm:text-sm md:text-base text-white/90 font-normal max-w-lg mb-5 sm:mb-6 leading-relaxed"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}
        >
          {get(t.hero.tagline, lang)}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full max-w-xs sm:max-w-none sm:w-auto"
        >
          <button 
            onClick={() => scrollToSection('directory')}
            className="group w-full sm:w-auto px-6 py-3 bg-brand-gold text-brand-emerald hover:bg-white font-bold rounded-full shadow-[0_6px_25px_rgba(213,169,73,0.4)] hover:shadow-[0_6px_35px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <span>{get(t.hero.explore, lang)}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto px-6 py-3 bg-black/40 hover:bg-white/20 text-white border border-white/30 font-semibold rounded-full shadow-lg transition-all duration-300 backdrop-blur-xl cursor-pointer hover:border-white/60 text-xs sm:text-sm"
          >
            {get(t.hero.discover, lang)}
          </button>
        </motion.div>

        {/* ===== MINIMALIST GLOWING DASH INDICATORS ===== */}
        <div className="flex items-center gap-2 mt-5 sm:mt-6">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="relative h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-500"
              style={{ width: currentSlide === idx ? '2.25rem' : '0.6rem' }}
              aria-label={`Slide ${idx + 1}`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'bg-brand-gold shadow-[0_0_12px_rgba(213,169,73,0.9)]' 
                  : 'bg-white/40 hover:bg-white/70'
              }`} />
            </button>
          ))}
        </div>

      </div>

      {/* ===== STATS BAR with 3D Tilt Cards ===== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pb-3 pt-1">
        
        {/* Desktop Layout: Sleek & Compact 5-Column Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-2.5 lg:gap-3"
        >
          {localStats.map((stat, idx) => (
            <TiltCard 
              key={`desktop-${idx}`} 
              className="group/statCard relative p-[1px] rounded-xl bg-gradient-to-b from-brand-gold/60 via-emerald-500/40 to-brand-gold/30 hover:from-brand-gold hover:via-amber-300 hover:to-brand-gold transition-all duration-500 shadow-[0_6px_25px_rgba(0,0,0,0.55)] hover:shadow-[0_10px_30px_rgba(213,169,73,0.3)]"
            >
              <div className="rounded-[11px] p-2.5 lg:p-3 backdrop-blur-2xl bg-gradient-to-b from-emerald-950/90 via-emerald-950/80 to-black/90 text-white h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover/statCard:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <div className="absolute top-0 inset-x-3 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent blur-[0.5px]" />

                <div className="flex items-center space-x-1.5 w-full relative z-10">
                  <div className="p-1 rounded-lg bg-gradient-to-br from-brand-gold/25 to-amber-600/10 text-brand-gold border border-brand-gold/30 shrink-0 shadow-[0_0_10px_rgba(213,169,73,0.25)] group-hover/statCard:scale-105 transition-transform duration-300">
                    {getIcon(stat.label)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-brand-gold tracking-wider truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                    {statLabelMap[stat.label] || stat.label}
                  </span>
                </div>

                <div className="w-full mt-1 relative z-10">
                  <span className="text-sm sm:text-base lg:text-lg font-extrabold font-serif bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 bg-clip-text text-transparent block leading-tight py-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {stat.count ? (
                      <Counter end={stat.count} suffix={stat.suffix} />
                    ) : (
                      get(stat.value, lang)
                    )}
                  </span>
                  <span className="text-[9px] text-emerald-100/75 font-medium leading-tight block truncate">
                    {get(stat.description, lang)}
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Mobile Layout: Infinite Smooth Auto-Scrolling Marquee Slider */}
        <div className="sm:hidden relative overflow-hidden w-full py-1 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
          <div className="flex gap-3 w-max animate-hero-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...localStats, ...localStats].map((stat, idx) => (
              <div 
                key={`mobile-${idx}`} 
                className="group/statCard relative p-[1.5px] rounded-2xl bg-gradient-to-b from-brand-gold/60 via-emerald-500/40 to-brand-gold/30 shadow-[0_10px_35px_rgba(0,0,0,0.65)] w-[170px] xs:w-[190px] shrink-0"
              >
                <div className="rounded-[14px] p-3 backdrop-blur-2xl bg-gradient-to-b from-emerald-950/90 via-emerald-950/80 to-black/90 text-white h-full flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent blur-[0.5px]" />

                  <div className="flex items-center space-x-1.5 w-full relative z-10">
                    <div className="p-1 rounded-lg bg-gradient-to-br from-brand-gold/25 to-amber-600/10 text-brand-gold border border-brand-gold/40 shrink-0 shadow-[0_0_12px_rgba(213,169,73,0.3)]">
                      {getIcon(stat.label)}
                    </div>
                    <span className="text-[9px] uppercase font-bold text-brand-gold tracking-wider truncate drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      {statLabelMap[stat.label] || stat.label}
                    </span>
                  </div>

                  <div className="w-full mt-1.5 relative z-10">
                    <span className="text-base font-extrabold font-serif bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-400 bg-clip-text text-transparent block leading-tight py-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      {stat.count ? (
                        <Counter end={stat.count} suffix={stat.suffix} />
                      ) : (
                        get(stat.value, lang)
                      )}
                    </span>
                    <span className="text-[8px] text-emerald-100/80 font-medium leading-snug block mt-0.5 line-clamp-2">
                      {get(stat.description, lang)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-3">
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce p-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-brand-gold cursor-pointer transition-all backdrop-blur-md"
            aria-label="Scroll Down"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Ken Burns & Marquee Keyframes Animation */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes hero-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-hero-marquee {
          animation: hero-marquee 16s linear infinite;
        }
      `}</style>

    </section>
  );
}

