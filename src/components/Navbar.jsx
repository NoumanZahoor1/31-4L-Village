import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Landmark, ChevronDown } from 'lucide-react';
import { useLang, LANGUAGES } from '../context/LanguageContext';
import { t, get } from '../data/translations';

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [isOpen, setIsOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled]   = useState(false);
  const [langOpen, setLangOpen]   = useState(false);
  const langRef = useRef(null);

  const navItems = [
    { id: 'home',       key: 'home' },
    { id: 'about',      key: 'about' },
    { id: 'culture',    key: 'culture' },
    { id: 'landmarks',  key: 'landmarks' },
    { id: 'directory',  key: 'directory' },
    { id: 'news',       key: 'news' },
    { id: 'gallery',    key: 'gallery' },
    { id: 'developers', key: 'developers' },
    { id: 'contact',    key: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'py-3 bg-brand-emerald/90 text-white shadow-lg backdrop-blur-md border-b border-white/10'
        : 'py-5 bg-transparent text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className={`p-2 rounded-lg transition-colors ${scrolled ? 'bg-white/10' : 'bg-brand-emerald/80'}`}>
              <Landmark className="h-6 w-6 text-brand-gold" />
            </div>
            <span className="font-serif font-bold text-xl tracking-wide">
              {get(t.nav.brandName, lang)}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? scrolled
                      ? 'bg-brand-gold text-brand-emerald font-semibold shadow-md'
                      : 'bg-white text-brand-emerald font-semibold shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {get(t.nav[item.key], lang)}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="relative ml-3" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold hover:bg-brand-gold/30 transition-all text-sm font-bold"
              >
                🌐 <span>{currentLang.label}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-brand-emerald border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                        lang === l.code
                          ? 'bg-brand-gold/20 text-brand-gold font-bold'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-base">
                        {l.code === 'en' ? '🇬🇧' : l.code === 'ur' ? '🇵🇰' : '🏔️'}
                      </span>
                      <span>{l.native}</span>
                      {lang === l.code && <span className="ml-auto text-brand-gold text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Language + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Compact language switcher for mobile */}
            <div className="relative" ref={undefined}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold"
              >
                🌐 {currentLang.label}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-brand-emerald border border-white/15 rounded-xl shadow-2xl overflow-hidden z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 text-xs flex items-center gap-2 transition-colors ${
                        lang === l.code ? 'bg-brand-gold/20 text-brand-gold font-bold' : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {l.code === 'en' ? '🇬🇧' : l.code === 'ur' ? '🇵🇰' : '🏔️'} {l.native}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`lg:hidden fixed inset-x-0 top-18 bg-brand-emerald border-b border-brand-moss shadow-2xl transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 max-h-screen py-4' : 'opacity-0 max-h-0 overflow-hidden py-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-11/12 text-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-brand-gold text-brand-emerald font-semibold'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {get(t.nav[item.key], lang)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
