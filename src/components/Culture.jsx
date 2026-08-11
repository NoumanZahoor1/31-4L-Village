import React from 'react';
import { Sprout, Utensils, Users, ArrowRight } from 'lucide-react';
import { villageCulture } from '../data/mockData';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

const SECTION_META = [
  {
    icon: Sprout,
    accent: '#064e3b',
    tag: 'Agriculture',
    images: [
      { src: '/images/wheat.png', label: 'Wheat' },
      { src: '/images/rice.png', label: 'Rice' },
      { src: '/images/sugarcane.png', label: 'Sugarcane' },
      { src: '/images/animal img.jpg', label: 'Livestock' },
    ],
  },
  {
    icon: Utensils,
    accent: '#92400e',
    tag: 'Cuisine',
    images: [
      { src: '/images/makki.jpg', label: 'Makki Roti' },
      { src: '/images/lassi.png', label: 'Lassi' },
      { src: '/images/barfi.png', label: 'Barfi' },
    ],
  },
  {
    icon: Users,
    accent: '#1e40af',
    tag: 'Community',
    images: [
      { src: '/images/together.jpg', label: 'Together' },
      { src: '/images/wedding.png', label: 'Wedding' },
      { src: '/images/citrus.png', label: 'Celebrations' },
    ],
  },
];

export default function Culture() {
  const { lang } = useLang();

  const sectionMeta = [
    { tag: get(t.culture.sec0Tag, lang), title: get(t.culture.sec0Title, lang), text: get(t.culture.sec0Text, lang), subtext: get(t.culture.sec0Sub, lang) },
    { tag: get(t.culture.sec1Tag, lang), title: get(t.culture.sec1Title, lang), text: get(t.culture.sec1Text, lang), subtext: get(t.culture.sec1Sub, lang) },
    { tag: get(t.culture.sec2Tag, lang), title: get(t.culture.sec2Title, lang), text: get(t.culture.sec2Text, lang), subtext: get(t.culture.sec2Sub, lang) },
  ];

  return (
    <section id="culture" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-3">
            {get(t.culture.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            {get(t.culture.heading, lang)}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed font-light">
            {get(t.culture.intro, lang)}
          </p>
        </div>

        {/* Alternating Section Blocks */}
        <div className="space-y-24 mb-28">
          {villageCulture.sections.map((section, idx) => {
            const meta = SECTION_META[idx];
            const translated = sectionMeta[idx];
            const Icon = meta.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >

                {/* Image Collage Side */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  {meta.images.length === 4 ? (
                    /* 4-image 2×2 grid */
                    <div className="grid grid-cols-2 gap-3">
                      {meta.images.map((img, imgIdx) => (
                        <div
                          key={imgIdx}
                          className={`relative overflow-hidden rounded-2xl shadow-md group ${
                            imgIdx === 0 ? 'row-span-1' : ''
                          }`}
                          style={{ aspectRatio: '4/3' }}
                        >
                          <img
                            src={img.src}
                            alt={img.label}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {img.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* 3-image collage: 1 large + 2 stacked */
                    <div className="grid grid-cols-2 gap-3" style={{ height: '400px' }}>
                      <div className="relative overflow-hidden rounded-2xl shadow-md group col-span-1 h-full">
                        <img
                          src={meta.images[0].src}
                          alt={meta.images[0].label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute bottom-3 left-3 text-white text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {meta.images[0].label}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3 h-full">
                        {meta.images.slice(1).map((img, i) => (
                          <div
                            key={i}
                            className="relative overflow-hidden rounded-2xl shadow-md group flex-1"
                          >
                            <img
                              src={img.src}
                              alt={img.label}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="absolute bottom-2 left-2 text-white text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {img.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest"
                    style={{ color: meta.accent, borderColor: meta.accent, backgroundColor: `${meta.accent}12` }}>
                    <Icon className="h-4 w-4" />
                    {translated.tag}
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {translated.title}
                  </h3>

                  <div className="h-0.5 w-12 rounded-full bg-brand-gold" />

                  <p className="text-gray-600 text-base leading-relaxed">
                    {translated.text}
                  </p>

                  <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-brand-gold/40 pl-4 italic">
                    {translated.subtext}
                  </p>

                  <div className="flex items-center gap-2 text-brand-emerald font-semibold text-sm cursor-default select-none">
                    <ArrowRight className="h-4 w-4" />
                    {get(t.culture.heritage, lang)}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ── Festivals & Sports ───────────────────────────────── */}
        <div className="space-y-5">

          {/* Section Label */}
          <div className="text-center mb-6">
            <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-2">
              {get(t.culture.communityLife, lang)}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-brand-emerald">
              {get(t.culture.festSportsTitle, lang)}
            </h3>
            <div className="h-1 w-16 bg-brand-gold mx-auto mt-3 rounded-full" />
          </div>

          {/* Two Cards */}
          <div className="grid lg:grid-cols-2 gap-5">

            {/* ── Card 1: Festivals ── */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-brand-emerald text-white flex flex-col">
              {/* Decorative top strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold" />

              <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brand-gold/25 text-amber-300 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-brand-gold/40 shadow-sm">
                      {get(t.culture.annualCal, lang)}
                    </span>
                    <h4 className="font-serif text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      {lang === 'ur' ? 'میلے اور تہوار' : 'Festivals & Events'}
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/35 flex items-center justify-center flex-shrink-0 text-2xl shadow-inner">
                    🕌
                  </div>
                </div>

                {/* Urs Names highlight pills — translated */}
                <div className="flex flex-wrap gap-2 my-0.5">
                  {[get(t.culture.urs1, lang), get(t.culture.urs2, lang)].map((name, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-brand-gold/25 border border-brand-gold/50 text-amber-200 text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <span className="text-brand-gold text-sm">✦</span> {name}
                    </span>
                  ))}
                </div>

                {/* Paragraphs - translated */}
                <div className="space-y-3 text-white/90 text-sm font-medium leading-relaxed">
                  <p>{get(t.culture.festPara1, lang)}</p>
                  <p>{get(t.culture.festPara2, lang)}</p>
                  <p>{get(t.culture.festPara3, lang)}</p>
                </div>

                {/* Activity chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { icon: "🎶", label: get(t.culture.chipQawwali, lang) },
                    { icon: "🍽️", label: get(t.culture.chipLangar,   lang) },
                    { icon: "🏐", label: get(t.culture.chipVK,        lang) },
                    { icon: "🤼", label: get(t.culture.chipAkhara,    lang) },
                    { icon: "🥁", label: get(t.culture.chipDhol,      lang) },
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold shadow-sm">
                      <span className="text-sm">{item.icon}</span> {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Card 2: Sports ── */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#0f3460] text-white flex flex-col">
              {/* Decorative top strip */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-400 via-brand-gold to-blue-400" />

              <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brand-gold/25 text-amber-300 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 border border-brand-gold/40 shadow-sm">
                      {get(t.culture.dailyLife, lang)}
                    </span>
                    <h4 className="font-serif text-2xl md:text-3xl font-extrabold text-white leading-tight">
                      {lang === 'ur' ? 'کھیل اور تفریح' : 'Sports & Recreation'}
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/35 flex items-center justify-center flex-shrink-0 text-2xl shadow-inner">
                    🏏
                  </div>
                </div>

                {/* Paragraphs - translated */}
                <div className="space-y-3 text-white/90 text-sm font-medium leading-relaxed">
                  <p>{get(t.culture.sportsPara1, lang)}</p>
                  <p>{get(t.culture.sportsPara2, lang)}</p>
                </div>

                {/* KPL Spotlight */}
                <div className="rounded-xl bg-brand-gold/15 border border-brand-gold/30 p-4 flex items-center gap-3 shadow-sm">
                  <div className="text-3xl flex-shrink-0">🏆</div>
                  <div>
                    <p className="text-amber-300 font-bold text-sm uppercase tracking-wider mb-0.5">{get(t.culture.kplTitle, lang)}</p>
                    <p className="text-white/90 text-xs font-medium leading-relaxed">
                      {get(t.culture.kplDesc, lang)}
                    </p>
                  </div>
                </div>

                {/* Sports chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { icon: "🏏", label: get(t.culture.chipCricket,  lang) },
                    { icon: "⚽", label: get(t.culture.chipFootball, lang) },
                    { icon: "🤼", label: get(t.culture.chipAkhara,   lang) },
                    { icon: "🏐", label: get(t.culture.chipKabaddi,  lang) },
                  ].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold shadow-sm">
                      <span className="text-sm">{item.icon}</span> {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion Quote Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-emerald to-brand-moss p-6 md:p-8 flex items-center gap-4 shadow-xl border border-white/10">
            <div className="text-brand-gold text-4xl font-serif leading-none flex-shrink-0 opacity-80">"</div>
            <p className="text-white text-base md:text-lg leading-relaxed font-semibold italic flex-1">
              {get(t.culture.conclusion, lang)}
            </p>
            <div className="text-brand-gold text-4xl font-serif leading-none flex-shrink-0 opacity-80 self-end">"</div>
          </div>

        </div>
        {/* ─────────────────────────────────────────────────────── */}


      </div>
    </section>
  );
}
