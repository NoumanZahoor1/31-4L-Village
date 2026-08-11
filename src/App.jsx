import React from 'react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Culture from './components/Culture';
import Landmarks from './components/Landmarks';
import Directory from './components/Directory';
import NewsBoard from './components/NewsBoard';
import Gallery from './components/Gallery';
import Developers from './components/Developers';
import Contact from './components/Contact';
import { Landmark, ArrowUp } from 'lucide-react';
import { t, get } from './data/translations';

function MainAppContent() {
  const { lang } = useLang();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream/10">
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Culture />
        <Landmarks />
        <Directory />
        <NewsBoard />
        <Gallery />
        <Developers />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-brand-emerald text-white py-16 border-t border-brand-moss relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Landmark className="h-6 w-6 text-brand-gold" />
                <span className="font-serif font-bold text-lg tracking-wider">
                  {get(t.nav.brandName, lang)}
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                {get(t.footer.tagline, lang)}
              </p>
              <div className="text-xs text-white/40">
                {lang === 'ur' ? 'موقعی کوآرڈینیٹس' : 'Coordinates'}: 30.8012° N, 73.4478° E
              </div>
            </div>

            {/* Column 2: Navigation shortcuts */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-4">
                {get(t.footer.quickLinks, lang)}
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#home" className="hover:text-white transition-colors">{get(t.nav.home, lang)}</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">{get(t.nav.about, lang)}</a></li>
                <li><a href="#culture" className="hover:text-white transition-colors">{get(t.nav.culture, lang)}</a></li>
                <li><a href="#landmarks" className="hover:text-white transition-colors">{get(t.nav.landmarks, lang)}</a></li>
              </ul>
            </div>

            {/* Column 3: Secondary Links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-4">
                {get(t.footer.directories, lang)}
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#directory" className="hover:text-white transition-colors">{get(t.nav.directory, lang)}</a></li>
                <li><a href="#news" className="hover:text-white transition-colors">{get(t.nav.news, lang)}</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors">{get(t.nav.gallery, lang)}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{get(t.nav.contact, lang)}</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Socials */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-4">
                {get(t.footer.contactInfo, lang)}
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {lang === 'ur' ? (
                  <>
                    یوسی کونسل آفس،<br />
                    چک ۳۱ ایف ایل، تحصیل اوکاڑہ،<br />
                    پنجاب، پاکستان۔
                  </>
                ) : (
                  <>
                    Union Council Office,<br />
                    Chak 31/4L, Okara Tehsil,<br />
                    Punjab, Pakistan.
                  </>
                )}
              </p>
              <div className="pt-2">
                <span className="text-xs text-white/40">
                  © {new Date().getFullYear()} {get(t.nav.brandName, lang)} Portal. {get(t.footer.rights, lang)}
                </span>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <div>
              {get(t.footer.designedBy, lang)}
            </div>
            <div>
              {lang === 'ur' 
                ? 'اینٹی گریوٹی AI کی شراکت داری میں تیار کیا گیا۔' 
                : 'Developed in partnership with Antigravity AI.'}
            </div>
          </div>
        </div>

        {/* Back to top button */}
        <button 
          onClick={scrollToTop}
          className="absolute right-6 -top-6 bg-brand-gold text-brand-emerald hover:bg-white p-3 rounded-full shadow-2xl transition-all duration-300 border border-white/10 cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}

export default App;
