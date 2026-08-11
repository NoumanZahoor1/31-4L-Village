import React, { useState } from 'react';
import { X, Code2, Server, GraduationCap, MapPin, Maximize2, Layers } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

const devs = [
  {
    id: 'burhan',
    name: 'Burhan Zahoor Jatoi',
    roleTitle: 'Frontend Engineer',
    tag: 'FRONTEND DEVELOPMENT',
    tagline: 'Crafting beautiful, responsive interfaces that speak to the heart of every visitor.',
    degree: 'Software Engineer',
    university: 'COMSATS University Islamabad',
    campus: 'Sahiwal Campus',
    village: 'Chak 31/4L, Okara',
    skills: ['React.js', 'Tailwind CSS', 'UI/UX Design', 'Vite', 'JavaScript', 'Responsive Web'],
    image: '/images/Burhan.jpeg',
    initials: 'BJ',
    icon: Code2,
    gradient: 'from-amber-400 via-brand-gold to-yellow-600',
    gradientBg: 'from-amber-50 via-yellow-50 to-orange-50',
    glowColor: 'shadow-amber-100',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    pillBg: 'bg-amber-500/10 text-amber-700 border-amber-200 hover:bg-amber-500 hover:text-white',
    number: '01',
  },
  {
    id: 'nouman',
    name: 'Nouman Zahoor Jatoi',
    roleTitle: 'Backend & Deployment Specialist',
    tag: 'BACKEND & DEPLOYMENT',
    tagline: 'Building robust server-side solutions and deploying scalable platforms for the community.',
    degree: 'Software Engineer · MERN Stack Developer',
    university: 'COMSATS University Islamabad',
    campus: 'Sahiwal Campus',
    village: 'Chak 31/4L, Okara',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'Cloud Deploy', 'REST APIs'],
    image: '/images/Nouman.jpeg',
    initials: 'NJ',
    icon: Server,
    gradient: 'from-brand-emerald via-teal-600 to-brand-moss',
    gradientBg: 'from-emerald-50 via-teal-50 to-green-50',
    glowColor: 'shadow-emerald-100',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    pillBg: 'bg-emerald-500/10 text-emerald-700 border-emerald-200 hover:bg-brand-emerald hover:text-white',
    number: '02',
  }
];

export default function Developers() {
  const { lang } = useLang();
  const [previewDev, setPreviewDev] = useState(null);

  return (
    <section id="developers" className="py-28 relative overflow-hidden bg-white">

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-gold/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-brand-emerald/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-brand-cream/60 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 text-brand-gold font-bold tracking-widest text-xs uppercase mb-4 bg-brand-gold/10 px-4 py-1.5 rounded-full border border-brand-gold/20">
            <Layers className="h-3.5 w-3.5" />
            {get(t.developers.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-brand-emerald mb-6 leading-tight">
            {get(t.developers.heading, lang)}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-gold" />
            <div className="h-2 w-2 bg-brand-gold rounded-full" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-brand-gold" />
          </div>
          <p className="text-gray-500 text-lg leading-relaxed">
            {get(t.developers.subheading, lang)}
          </p>
        </div>

        {/* Developer Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {devs.map((dev) => {
            const Icon = dev.icon;
            return (
              <div
                key={dev.id}
                className={`relative rounded-[2rem] overflow-hidden border border-gray-100 shadow-2xl ${dev.glowColor} group transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${dev.gradientBg}`}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${dev.gradient}`} />

                {/* Large number watermark */}
                <div className="absolute top-4 right-6 text-[6rem] font-black text-gray-100 leading-none select-none pointer-events-none">
                  {dev.number}
                </div>

                <div className="p-8 relative z-10">

                  {/* Top row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full border ${dev.badgeColor}`}>
                      <Icon className="h-3.5 w-3.5" />
                      {dev.tag}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold bg-white/70 px-3 py-1 rounded-full border border-gray-100">
                      COMSATS Sahiwal
                    </span>
                  </div>

                  {/* Profile row */}
                  <div className="flex items-end gap-6 mb-8">

                    {/* Photo */}
                    <div
                      className="relative flex-shrink-0 cursor-pointer group/photo"
                      onClick={() => setPreviewDev(dev)}
                    >
                      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${dev.gradient} opacity-60 blur-sm group-hover/photo:opacity-100 transition-opacity duration-300`} />
                      <div className="relative w-28 h-32 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
                        <img
                          src={dev.image}
                          alt={dev.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/photo:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className={`hidden absolute inset-0 bg-gradient-to-br ${dev.gradient} text-white font-black text-3xl items-center justify-center`}>
                          {dev.initials}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Maximize2 className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Name block */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-brand-emerald transition-colors duration-300 leading-tight mb-1">
                        {dev.name}
                      </h3>
                      <p className={`font-semibold text-sm mb-2 bg-gradient-to-r ${dev.gradient} bg-clip-text text-transparent`}>
                        {dev.roleTitle}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <GraduationCap className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{dev.degree}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>{dev.village}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl px-5 py-4 mb-6 border border-white text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{dev.tagline}&rdquo;
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Core Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {dev.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-default ${dev.pillBg}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-5 border-t border-white/60 flex items-center justify-between">
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-brand-moss" />
                      <span className="font-medium text-gray-500">Chak 31/4L Resident</span>
                    </div>
                    <button
                      onClick={() => setPreviewDev(dev)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full bg-gradient-to-r ${dev.gradient} text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer`}
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      View Photo
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>



      </div>

      {/* Full Image Preview Modal */}
      {previewDev && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
          onClick={() => setPreviewDev(null)}
        >
          <div
            className="relative flex flex-col items-center max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setPreviewDev(null)}
              className="absolute -top-14 right-0 flex items-center gap-1.5 text-white/80 hover:text-white bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer"
            >
              <X className="h-4 w-4" /> {lang === 'ur' ? 'بند کریں' : 'Close'}
            </button>

            {/* Photo with gradient glow ring */}
            <div className="relative mb-6 w-full">
              <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-br ${previewDev.gradient} opacity-50 blur-lg`} />
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={previewDev.image}
                  alt={previewDev.name}
                  className="w-full object-cover object-top max-h-[60vh]"
                />
              </div>
            </div>


          </div>
        </div>
      )}

    </section>
  );
}
