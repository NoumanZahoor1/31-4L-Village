import React, { useState } from 'react';
import { MessageCircle, MapPin, Phone, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

const VILLAGE_WHATSAPP = '923177543733';

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Contact() {
  const { lang } = useLang();
  const [cName, setCName]           = useState('');
  const [cPhone, setCPhone]         = useState('');
  const [cMsg, setCMsg]             = useState('');
  const [cSubmitted, setCSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const text = lang === 'ur'
      ? `السلام علیکم! میرا نام *${cName}* ہے۔\nواٹس ایپ نمبر: ${cPhone}\n\nپیغام:\n${cMsg}`
      : `Assalam o Alaikum! My name is *${cName}*.\nMy WhatsApp: ${cPhone}\n\nMessage:\n${cMsg}`;
    window.open(`https://wa.me/${VILLAGE_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
    setCSubmitted(true);
    setTimeout(() => { setCSubmitted(false); setCName(''); setCPhone(''); setCMsg(''); }, 3500);
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-white to-brand-cream/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-2">
            {get(t.contact.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-emerald mb-3">
            {get(t.contact.heading, lang)}
          </h2>
          <div className="h-1 w-16 bg-brand-gold mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 text-base leading-relaxed">
            {lang === 'ur'
              ? 'واٹس ایپ پر پیغام بھیجیں یا نقشے پر ہمارا مقام دیکھیں۔'
              : 'Send us a WhatsApp message or find us on the map below.'}
          </p>
        </div>

        {/* ── Two-column: Form + Map ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">

          {/* ── LEFT: WhatsApp Form ── */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
            {/* Green header bar */}
            <div className="bg-[#25D366] px-7 py-5 flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {lang === 'ur' ? 'واٹس ایپ پر پیغام بھیجیں' : 'Send a WhatsApp Message'}
                </h3>
                <a
                  href={`https://wa.me/${VILLAGE_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 text-xs hover:text-white flex items-center gap-1 mt-0.5"
                >
                  <Phone className="h-3 w-3" />
                  {lang === 'ur' ? 'براہ راست کال کریں: 0317-7543733' : 'Call directly: 0317-7543733'}
                </a>
              </div>
            </div>

            {/* Form body */}
            <div className="p-7 flex-1 flex flex-col justify-center">
              {cSubmitted ? (
                <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
                  <div className="h-16 w-16 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-9 w-9 text-[#25D366]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    {lang === 'ur' ? 'واٹس ایپ کھل رہا ہے!' : 'Opening WhatsApp!'}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {lang === 'ur' ? 'بس "Send" دبائیں۔' : 'Just tap Send in WhatsApp.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">
                        {lang === 'ur' ? 'آپ کا نام' : 'Your Name'}
                      </label>
                      <input
                        type="text" required value={cName}
                        onChange={(e) => setCName(e.target.value)}
                        placeholder={lang === 'ur' ? 'نام لکھیں' : 'Enter your name'}
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">
                        {lang === 'ur' ? 'واٹس ایپ نمبر' : 'WhatsApp Number'}
                      </label>
                      <input
                        type="tel" required value={cPhone}
                        onChange={(e) => setCPhone(e.target.value)}
                        placeholder="03001234567"
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block mb-1">
                      {lang === 'ur' ? 'آپ کا پیغام' : 'Your Message'}
                    </label>
                    <textarea
                      rows="4" required value={cMsg}
                      onChange={(e) => setCMsg(e.target.value)}
                      placeholder={lang === 'ur' ? 'اپنا پیغام یہاں لکھیں...' : 'Write your message here...'}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]/30 resize-none transition"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[.98] text-white font-semibold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {WA_ICON}
                    {lang === 'ur' ? 'واٹس ایپ پر بھیجیں' : 'Send via WhatsApp'}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ── RIGHT: Map ── */}
          <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
            {/* Map header bar */}
            <div className="bg-brand-emerald px-7 py-5 flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">
                  {lang === 'ur' ? 'ہمارا مقام' : 'Our Location'}
                </h3>
                <p className="text-white/70 text-xs mt-0.5">
                  {lang === 'ur' ? 'چک نمبر 31 ایف ایل، ضلع اوکاڑہ' : 'Chak No. 31/4.L, Okara District'}
                </p>
              </div>
            </div>

            {/* Map embed — flex-1 fills remaining height */}
            <div className="flex-1 min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d752.153604681563!2d73.37009473543773!3d30.65743933996626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922af007501557b%3A0x82b07e5648705adf!2sChak%20No.31%2F4.L%2C%20Okara%2C%20Pakistan!5e0!3m2!1sen!2s!4v1786857008420!5m2!1sen!2s"
                width="100%" height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Chak No. 31/4.L Location Map"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
