import React from 'react';
import { Users, MapPin, Sprout, GraduationCap, ChevronDown } from 'lucide-react';
import { villageStats } from '../data/mockData';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

export default function Hero() {
  const { lang } = useLang();

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
      value: { en: 'Expected 4,000', ur: 'تقریباً 4000 افراد' },
      description: { en: 'According to latest local survey', ur: 'تازہ ترین مقامی سروے کے مطابق' },
    },
    {
      label: 'Main District',
      value: { en: 'Okara', ur: 'اوکاڑہ' },
      description: { en: 'Land of Agriculture & Dairy', ur: 'زراعت اور ڈیری کی سرزمین' },
    },
    {
      label: 'Primary Crops',
      value: { en: 'Potato, Wheat, Rice, Corn, Sugarcane', ur: 'آلو، گندم، چاول، مکئی، گنا' },
      description: { en: 'Top agricultural exports', ur: 'اہم زرعی پیداوار' },
    },
    {
      label: 'Literacy Rate',
      value: { en: '> 80%', ur: '٪۸۰ سے زائد' },
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
      case 'Population':    return <Users className="h-6 w-6 text-brand-gold" />;
      case 'Main District': return <MapPin className="h-6 w-6 text-brand-gold" />;
      case 'Primary Crops': return <Sprout className="h-6 w-6 text-brand-gold" />;
      case 'Literacy Rate': return <GraduationCap className="h-6 w-6 text-brand-gold" />;
      case 'Caste':         return <Users className="h-6 w-6 text-brand-gold" />;
      default: return null;
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-between items-center text-white overflow-hidden">
      
      {/* Background with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        style={{ backgroundImage: "url('/images/hero.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-brand-emerald/75 to-brand-emerald/95 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex-grow flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto pt-32 pb-16">
        <span className="text-brand-gold font-semibold tracking-widest text-sm uppercase mb-4 animate-fade-in">
          {get(t.hero.subtitle, lang)}
        </span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-xl animate-slide-up">
          {lang === 'ur'
            ? <>چک 31/4L میں <span className="text-brand-gold italic">خوش آمدید</span></>
            : <>Welcome to <span className="text-brand-gold italic">Chak 31/4L</span></>}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 font-light max-w-3xl mb-12 leading-relaxed drop-shadow-md">
          {get(t.hero.tagline, lang)}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => scrollToSection('directory')}
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-emerald hover:bg-white hover:text-brand-emerald font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {get(t.hero.explore, lang)}
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            {get(t.hero.discover, lang)}
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 p-6 glass rounded-3xl border border-white/10 shadow-2xl text-gray-800">
          {localStats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 border-r last:border-r-0 border-gray-200/50 lg:block lg:text-left">
              <div className="flex items-center space-x-3 mb-2 justify-center lg:justify-start">
                <div className="p-2 rounded-xl bg-brand-emerald/10">
                  {getIcon(stat.label)}
                </div>
                <span className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                  {statLabelMap[stat.label] || stat.label}
                </span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-bold font-serif text-brand-emerald block">
                  {get(stat.value, lang)}
                </span>
                <span className="text-[11px] text-gray-400">
                  {get(stat.description, lang)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => scrollToSection('about')}
            className="animate-bounce p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
          >
            <ChevronDown className="h-5 w-5 text-brand-gold" />
          </button>
        </div>
      </div>

    </section>
  );
}
