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

  // Auto-advance slides with progress bar
  useEffect(() => {
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (SLIDE_DURATION / 50));
      });
    }, 50);

    intervalRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(intervalRef.current);
      clearInterval(progressInterval);
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

      {/* ===== FLOATING EDGE SLIDER ARROWS ===== */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-emerald border border-white/20 text-white backdrop-blur-xl transition-all duration-300 transform hover:scale-110 shadow-2xl cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % HERO_SLIDES.length)}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-brand-gold hover:text-brand-emerald border border-white/20 text-white backdrop-blur-xl transition-all duration-300 transform hover:scale-110 shadow-2xl cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ===== HERO MAIN CONTENT ===== */}
      <div className="relative z-20 flex-grow flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto pt-20 sm:pt-24 pb-2">
        
        {/* Animated Subtitle Badge */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-brand-gold font-semibold tracking-[0.2em] text-[9px] sm:text-[11px] uppercase mb-2.5 backdrop-blur-xl shadow-lg"
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
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2.5 leading-[1.1]"
            style={{ textShadow: '0 4px 25px rgba(0,0,0,0.6)' }}
          >
            {lang === 'ur' ? (
              <>
                {HERO_SLIDES[currentSlide].titleUr}{' '}
                <span className="text-brand-gold italic block sm:inline drop-shadow-[0_2px_20px_rgba(213,169,73,0.4)]">
                  {HERO_SLIDES[currentSlide].highlightUr}
                </span>
              </>
            ) : (
              <>
                {HERO_SLIDES[currentSlide].titleEn}{' '}
                <span className="text-brand-gold italic block sm:inline drop-shadow-[0_2px_20px_rgba(213,169,73,0.4)]">
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
          className="text-xs sm:text-sm md:text-base text-white/85 font-light max-w-lg mb-4 sm:mb-5 leading-snug"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
        >
          {get(t.hero.tagline, lang)}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-2.5 justify-center items-center w-full sm:w-auto"
        >
          <button 
            onClick={() => scrollToSection('directory')}
            className="group w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 bg-brand-gold text-brand-emerald hover:bg-white font-bold rounded-full shadow-[0_6px_25px_rgba(213,169,73,0.35)] hover:shadow-[0_6px_35px_rgba(255,255,255,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <span>{get(t.hero.explore, lang)}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold rounded-full shadow-lg transition-all duration-300 backdrop-blur-xl cursor-pointer hover:border-white/50 text-xs sm:text-sm"
          >
            {get(t.hero.discover, lang)}
          </button>
        </motion.div>

        {/* ===== MINIMALIST GLOWING DASH INDICATORS ===== */}
        <div className="flex items-center gap-2 mt-4 sm:mt-5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="relative h-1.5 rounded-full overflow-hidden cursor-pointer transition-all duration-500"
              style={{ width: currentSlide === idx ? '2rem' : '0.5rem' }}
              aria-label={`Slide ${idx + 1}`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                currentSlide === idx 
                  ? 'bg-brand-gold shadow-[0_0_10px_rgba(213,169,73,0.9)]' 
                  : 'bg-white/35 hover:bg-white/60'
              }`} />
            </button>
          ))}
        </div>

      </div>

      {/* ===== STATS BAR with 3D Tilt Cards ===== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pb-3 pt-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3"
        >
          {localStats.map((stat, idx) => (
            <TiltCard key={idx} className="rounded-lg sm:rounded-xl border border-white/20 shadow-xl p-2.5 sm:p-3 backdrop-blur-xl bg-white/95 text-gray-900">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left h-full justify-between gap-0.5">
                <div className="flex items-center space-x-1.5 mb-0.5 justify-center lg:justify-start w-full">
                  <div className="p-1 rounded-md bg-brand-emerald/10 shrink-0">
                    {getIcon(stat.label)}
                  </div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-950 tracking-wider truncate">
                    {statLabelMap[stat.label] || stat.label}
                  </span>
                </div>

                <div className="w-full">
                  <span className="text-sm sm:text-lg lg:text-xl font-bold font-serif text-brand-emerald block leading-none py-0.5">
                    {stat.count ? (
                      <Counter end={stat.count} suffix={stat.suffix} />
                    ) : (
                      get(stat.value, lang)
                    )}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-gray-600 font-medium block leading-tight truncate">
                    {get(stat.description, lang)}
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-1.5">
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-brand-gold cursor-pointer transition-all backdrop-blur-md"
            aria-label="Scroll Down"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Ken Burns CSS Animation */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>

    </section>
  );
}

