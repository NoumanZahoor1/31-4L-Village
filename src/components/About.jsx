import React from 'react';
import { 
  MapPin, Users, School, Wheat, Compass, Droplets, BookOpen, 
  Navigation, Globe, Milestone, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Waypoints
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

// ─────────────────────────────────────────────────────────────────
// LRM (\u200E) ensures LTR rendering for numbers & L in Urdu RTL text
// ─────────────────────────────────────────────────────────────────

const sectionTag     = { en: 'Heritage & Geography', ur: 'وراثت اور جغرافیہ' };
const headingText    = { en: 'The Story & Geography of Chak 31/4-L', ur: 'چک \u200E31/4-L\u200E کی داستان اور جغرافیہ' };
const subHeadingText = { en: 'A name rooted in struggle, memory, and an enduring village heritage in Okara, Punjab.', ur: 'ایک ایسا نام جس کی جڑیں جدوجہد، یادداشت اور اوکاڑہ، پنجاب کی وراثت میں پیوست ہیں۔' };
const storyIntro     = { en: 'The Story Behind the Name Kori Baloch', ur: 'کوڑی بلوچ نام کے پیچھے کی کہانی' };

// Four narrative chapters
const chapters = {
  en: [
    {
      num: '01',
      tag: 'The Beginning',
      title: 'A Well of Bitter Water',
      body: 'Before Kori Balocha 31/4L came into existence, its people lived in the mashriq (east) of Okara. Like any settlement, the community depended on clean water for daily life and their livestock. In search of a reliable source, the villagers dug a well — a kuwa. But when the well was finally completed, the water that rose from its depths turned out to be karwa — bitter and unfit for use.',
      color: '#c9903b',
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-300',
    },
    {
      num: '02',
      tag: 'The Decision',
      title: 'A Journey Toward Hope',
      body: 'Faced with this bitter truth, the community made a difficult but courageous decision: to uproot and move. They sought a place where the earth would nourish — not deny — life. They eventually settled at a new site nestled between Okara (30 km) and Pakpattan (37 km), in the fertile heart of Punjab.',
      color: '#2d6a4f',
      bg: 'from-emerald-50 to-green-50',
      border: 'border-emerald-300',
    },
    {
      num: '03',
      tag: 'The Name',
      title: 'Identity Born from Memory',
      body: 'As the new settlement grew, people from surrounding areas asked, "Who are these people, and where did they come from?" The settlers answered: they were the ones of the kori khui — the bitter well they had left behind. This identity spread through the region, and the community became known as Kori Khui Walay — "the people of the bitter well."',
      color: '#b5470b',
      bg: 'from-orange-50 to-red-50',
      border: 'border-orange-300',
    },
    {
      num: '04',
      tag: 'The Legacy',
      title: 'Two Names, One Soul',
      body: "Later, during British rule, the colonial administration renamed villages under the canal (nehr) numbering system. The village was officially designated 31/4L. Yet the local identity endured — people kept using Kori Khui Walay. In time, both names merged into one: Kori Balocha 31/4L. 'Kori' traces back to the karwa well, while 'Balocha' honours the proud Baloch heritage of its people.",
      color: '#1a4d6e',
      bg: 'from-sky-50 to-blue-50',
      border: 'border-sky-300',
    },
  ],
  ur: [
    {
      num: '۰۱',
      tag: 'آغاز',
      title: 'کڑوے پانی کا کنواں',
      body: 'کوڑی بلوچاں \u200E31/4L\u200E کے وجود میں آنے سے پہلے، اس کے باشندے اوکاڑہ کے مشرق میں آباد تھے۔ کسی بھی بستی کی طرح، یہ برادری بھی صاف پانی پر انحصار کرتی تھی۔ پانی کی تلاش میں گاؤں والوں نے ایک کنواں کھودا۔ مگر جب کنواں مکمل ہوا تو اس کا پانی کڑوا نکلا — جو روزمرہ استعمال کے قابل نہیں تھا۔',
      color: '#c9903b',
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-300',
    },
    {
      num: '۰۲',
      tag: 'فیصلہ',
      title: 'امید کی جانب سفر',
      body: 'اس تلخ حقیقت کا سامنا کرتے ہوئے، برادری نے ایک مشکل مگر حوصلہ مند فیصلہ کیا: ہجرت کرنا۔ انہوں نے وہ جگہ ڈھونڈی جہاں زمین زندگی کو پروان چڑھائے۔ بالآخر وہ اوکاڑہ (30 کلومیٹر) اور پاکپتن (37 کلومیٹر) کے درمیان پنجاب کے زرخیز دل میں آباد ہوئے۔',
      color: '#2d6a4f',
      bg: 'from-emerald-50 to-green-50',
      border: 'border-emerald-300',
    },
    {
      num: '۰۳',
      tag: 'پہچان',
      title: 'یادداشت سے جنمی شناخت',
      body: 'جب نئی بستی پھلی پھولی، تو اردگرد کے لوگوں نے پوچھا: "یہ کون ہیں اور کہاں سے آئے؟" آباد کاروں نے جواب دیا: وہ اسی کوڑی کھوئی والے ہیں — کڑوے کنویں کے لوگ جسے وہ پیچھے چھوڑ آئے۔ یہ پہچان پورے علاقے میں پھیل گئی اور برادری "کوڑی کھوئی والے" کے نام سے مشہور ہو گئی۔',
      color: '#b5470b',
      bg: 'from-orange-50 to-red-50',
      border: 'border-orange-300',
    },
    {
      num: '۰۴',
      tag: 'وراثت',
      title: 'دو نام، ایک روح',
      body: 'بعد میں انگریز دورِ حکومت میں، نوآبادیاتی انتظامیہ نے گاؤں کو نہری نظام کے مطابق \u200E31/4L\u200E کا نام دیا۔ مگر مقامی پہچان برقرار رہی۔ وقت کے ساتھ دونوں نام مل گئے: کوڑی بلوچاں \u200E31/4L\u200E۔ "کوڑی" اصل کنویں کے کڑوے پانی سے، جبکہ "بلوچاں" لوگوں کے بلوچ ورثے کی عکاسی کرتا ہے۔',
      color: '#1a4d6e',
      bg: 'from-sky-50 to-blue-50',
      border: 'border-sky-300',
    },
  ],
};

const closingQuote = {
  en: 'Together, these elements tell the story of resilience — a community that overcame hardship, relocated in search of a better future, and carried its identity forward through generations.',
  ur: 'یہ دونوں عناصر مل کر ایک ثابت قدمی کی کہانی بیان کرتے ہیں — ایک ایسی برادری جس نے مشکلات کا مقابلہ کیا، بہتر مستقبل کی تلاش میں نقلِ مکانی کی، اور نسل در نسل اپنی پہچان زندہ رکھی۔',
};

// Quick Facts
const quickFactsHeading = { en: 'Quick Facts', ur: 'اہم معلومات' };
const quickFactsProse = {
  en: "Kori Balocha 31/4L spans approximately 80 Murabba and is home to nearly 4,000 residents. The village's population is predominantly Baloch, with the Jatoi, Lashari, and Rind sub-castes forming its main clans. The village has a Government Middle School for boys and a Government Primary School for girls, and is counted among the larger villages falling under the 4L canal system.",
  ur: 'کوڑی بلوچاں \u200E31/4L\u200E تقریباً 80 مربع پر محیط ہے اور یہاں قریباً 4000 افراد آباد ہیں۔ گاؤں کی آبادی بڑی حد تک بلوچ قبیلے پر مشتمل ہے جس میں جتوئی، لاشاری اور رند ذیلی ذاتیں اہم قبائل ہیں۔ گاؤں میں لڑکوں کے لیے گورنمنٹ مڈل سکول اور لڑکیوں کے لیے گورنمنٹ پرائمری سکول ہے۔',
};

const quickFacts = {
  en: [
    { Icon: Wheat,    label: 'Area',        value: '~80 Murabba',                       accent: '#c9903b', lightBg: '#fef3c7' },
    { Icon: Users,    label: 'Population',  value: '~4,000 People',                     accent: '#2d6a4f', lightBg: '#d1fae5' },
    { Icon: Compass,  label: 'Caste',       value: 'Baloch',                            accent: '#1a4d6e', lightBg: '#dbeafe' },
    { Icon: Users,    label: 'Sub-castes',  value: 'Jatoi · Lashari · Rind',            accent: '#b5470b', lightBg: '#fee2e2' },
    { Icon: School,   label: 'Education',   value: 'Govt. Middle (Boys) + Primary (Girls)', accent: '#4a1d96', lightBg: '#ede9fe' },
    { Icon: Droplets, label: 'Significance', value: 'One of the largest in 4L canal system', accent: '#065f46', lightBg: '#ecfdf5' },
  ],
  ur: [
    { Icon: Wheat,    label: 'رقبہ',        value: 'تقریباً 80 مربع',                   accent: '#c9903b', lightBg: '#fef3c7' },
    { Icon: Users,    label: 'آبادی',        value: 'تقریباً 4000 افراد',                accent: '#2d6a4f', lightBg: '#d1fae5' },
    { Icon: Compass,  label: 'ذات',          value: 'بلوچ',                              accent: '#1a4d6e', lightBg: '#dbeafe' },
    { Icon: Users,    label: 'ذیلی ذاتیں',  value: 'جتوئی · لاشاری · رند',              accent: '#b5470b', lightBg: '#fee2e2' },
    { Icon: School,   label: 'تعلیم',        value: 'گورنمنٹ مڈل (لڑکے) + پرائمری (لڑکیاں)', accent: '#4a1d96', lightBg: '#ede9fe' },
    { Icon: Droplets, label: 'اہمیت',        value: '\u200E4L\u200E نہری نظام کے بڑے گاؤں میں', accent: '#065f46', lightBg: '#ecfdf5' },
  ],
};

// ── Location & Proximity detailed content ──
const locationSectionTag = { en: 'Geographic Context', ur: 'جغرافیائی معلومات' };
const locationHeading    = { en: 'Location & Proximity', ur: 'محلِ وقوع اور قربت' };

const locationDesc = {
  en: 'Chak No. 31/4-L is a rural locality and revenue area located in Tehsil and District Okara, Punjab, Pakistan. The village is situated at the crossroads of four major cities — Okara, Depalpur, Pakpattan, and Sahiwal — in the fertile plains of Punjab, nourished by a network of sub-canals branching from the main 4-L distributary.',
  ur: 'چک نمبر \u200E31/4-L\u200E ضلع اور تحصیل اوکاڑہ، پنجاب، پاکستان میں واقع ایک دیہی بستی اور ریونیو رقبہ ہے۔ یہ گاؤں چار بڑے شہروں — اوکاڑہ، ڈیپالپور، پاکپتن اور ساہیوال — کے وسط میں، پنجاب کے زرخیز میدانی علاقے میں واقع ہے، جسے مرکزی \u200E4-L\u200E ڈسٹری بیوٹری سے نکلنے والی ذیلی نہروں سے سیراب کیا جاتا ہے۔',
};

// Distances
const distanceHeading = { en: 'Distance from Major Cities', ur: 'بڑے شہروں سے فاصلہ' };
const cityDistances = [
  { city: { en: 'Okara', ur: 'اوکاڑہ' }, distance: { en: '30 km', ur: '30 کلومیٹر' }, color: '#2d6a4f' },
  { city: { en: 'Depalpur', ur: 'ڈیپالپور' }, distance: { en: '31 km', ur: '31 کلومیٹر' }, color: '#1a4d6e' },
  { city: { en: 'Sahiwal', ur: 'ساہیوال' }, distance: { en: '31 km', ur: '31 کلومیٹر' }, color: '#c9903b' },
  { city: { en: 'Pakpattan', ur: 'پاکپتن' }, distance: { en: '37 km', ur: '37 کلومیٹر' }, color: '#b5470b' },
  { city: { en: 'Lahore', ur: 'لاہور' }, distance: { en: '160 km', ur: '160 کلومیٹر' }, color: '#4a1d96' },
];

// Neighboring Villages
const neighborsHeading = { en: 'Neighboring Villages', ur: 'ملحقہ دیہات' };
const neighborsData = {
  en: [
    { direction: 'Mashriq (East)', chaks: '30/4L, 32/4L', dirIcon: ArrowRight, bg: 'from-amber-500/10 to-yellow-500/5', border: 'border-amber-500/20', textCol: 'text-amber-700' },
    { direction: 'Maghrib (West)', chaks: '23/4L, 22/4L', dirIcon: ArrowLeft, bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/20', textCol: 'text-emerald-700' },
    { direction: 'Shamal (North)', chaks: '28/4L, 29/4L', dirIcon: ArrowUp, bg: 'from-sky-500/10 to-blue-500/5', border: 'border-sky-500/20', textCol: 'text-sky-700' },
    { direction: 'Janoob (South)', chaks: '34/4L, 36/4L', dirIcon: ArrowDown, bg: 'from-purple-500/10 to-indigo-500/5', border: 'border-purple-500/20', textCol: 'text-purple-700' },
  ],
  ur: [
    { direction: 'مشرق', chaks: '\u200E30/4L\u200E، \u200E32/4L\u200E', dirIcon: ArrowLeft, bg: 'from-amber-500/10 to-yellow-500/5', border: 'border-amber-500/20', textCol: 'text-amber-700' },
    { direction: 'مغرب', chaks: '\u200E23/4L\u200E، \u200E22/4L\u200E', dirIcon: ArrowRight, bg: 'from-emerald-500/10 to-teal-500/5', border: 'border-emerald-500/20', textCol: 'text-emerald-700' },
    { direction: 'شمال', chaks: '\u200E28/4L\u200E، \u200E29/4L\u200E', dirIcon: ArrowUp, bg: 'from-sky-500/10 to-blue-500/5', border: 'border-sky-500/20', textCol: 'text-sky-700' },
    { direction: 'جنوب', chaks: '\u200E34/4L\u200E، \u200E36/4L\u200E', dirIcon: ArrowDown, bg: 'from-purple-500/10 to-indigo-500/5', border: 'border-purple-500/20', textCol: 'text-purple-700' },
  ],
};

// Geographic Context table details
const geoContextHeading = { en: 'Geographic Context', ur: 'جغرافیائی تفصیلات' };
const geoContextDetails = {
  en: [
    { label: 'District & Tehsil', info: 'Okara, Punjab, Pakistan' },
    { label: 'Position', info: 'Situated between Okara, Depalpur, Pakpattan, and Sahiwal' },
    { label: 'Canal System', info: '4-L Minor distributary' },
    { label: 'Access Roads', info: 'Connected via 4-L Minor canal roads and local link roads from Pipli Pahar Road (near Ghias Chowk) and Bunga Hayat Road' },
    { label: 'Coordinates', info: '30.76° N, 73.38° E (approximate regional baseline for 4-L Minor belt)' },
  ],
  ur: [
    { label: 'ضلع و تحصیل', info: 'اوکاڑہ، پنجاب، پاکستان' },
    { label: 'محلِ وقوع', info: 'اوکاڑہ، ڈیپالپور، پاکپتن اور ساہیوال کے درمیان واقع' },
    { label: 'نہری نظام', info: '\u200E4-L\u200E مائنر ڈسٹری بیوٹری' },
    { label: 'رسائی کے راستے', info: '\u200E4-L\u200E مائنر نہری روڈز اور پپلی پہاڑ روڈ (غیاث چوک کے قریب) و بنگہ حیات روڈ سے مقامی لنک روڈز کے ذریعے رسائی' },
    { label: 'تخمینی محلِ وقوع', info: '30.76° شمال، 73.38° مشرق (\u200E4-L\u200E مائنر زرعی پٹی کا تخمینی مقام)' },
  ],
};

// How to reach
const reachHeading = { en: 'How to Reach', ur: 'راستہ کیسے تلاش کریں' };
const reachText = {
  en: 'The village is primarily accessible by branching off the Okara–Bunga Hayat Road, then following the 4-L Minor distributary canal paths into the local village link road network.',
  ur: 'گاؤں تک رسائی بنیادی طور پر اوکاڑہ–بنگہ حیات روڈ سے ہوتے ہوئے، پھر \u200E4-L\u200E مائنر ڈسٹری بیوٹری کے راستوں سے مقامی گاؤں لنک روڈ نیٹ ورک میں داخل ہو کر ممکن ہے۔',
};

// ─────────────────────────────────────────────────────────────────
export default function About() {
  const { lang } = useLang();
  const isUrdu = lang === 'ur';
  const chs    = chapters[lang] || chapters.en;
  const facts  = quickFacts[lang] || quickFacts.en;
  const nData  = neighborsData[lang] || neighborsData.en;
  const gContext = geoContextDetails[lang] || geoContextDetails.en;

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block text-brand-gold font-bold tracking-widest text-xs uppercase mb-3 px-4 py-1.5 bg-brand-gold/10 rounded-full">
            {sectionTag[lang]}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mt-4 mb-5 leading-tight">
            {headingText[lang]}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-brand-gold to-brand-emerald mx-auto mb-6 rounded-full" />
          <p className="text-gray-500 text-lg leading-relaxed italic">
            {subHeadingText[lang]}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            NARRATIVE STORY — Magazine editorial scroll
        ══════════════════════════════════════════════════ */}
        <div className="mb-24">

          {/* Story label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
            <span className="flex items-center gap-2 text-brand-emerald font-bold text-sm tracking-widest uppercase px-5 py-2 bg-brand-emerald/5 rounded-full border border-brand-emerald/10">
              <BookOpen className="h-4 w-4" />
              {storyIntro[lang]}
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-200 to-gray-200" />
          </div>

          {/* Chapter cards — alternating layout */}
          <div className="space-y-12 max-w-5xl mx-auto">
            {chs.map((ch, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row ${!isEven && !isUrdu ? 'md:flex-row-reverse' : ''} ${!isEven && isUrdu ? 'md:flex-row' : ''} gap-0 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group`}
                  id={`story-chapter-${idx}`}
                >
                  {/* Colour accent panel */}
                  <div
                    className="md:w-1/3 flex flex-col items-center justify-center py-10 px-8 relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${ch.color}ee, ${ch.color}99)` }}
                  >
                    {/* Giant ghost number */}
                    <span
                      className="absolute -bottom-4 -right-4 text-9xl font-black leading-none select-none opacity-10 text-white"
                      aria-hidden="true"
                    >
                      {ch.num}
                    </span>
                    {/* Chapter number pill */}
                    <span className="text-white/70 font-bold tracking-widest text-xs uppercase mb-3">
                      {ch.num}
                    </span>
                    {/* Tag */}
                    <span className="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                      {ch.tag}
                    </span>
                    {/* Title */}
                    <h3 className={`font-serif text-2xl font-bold text-white text-center leading-snug ${isUrdu ? 'text-right' : ''}`}>
                      {ch.title}
                    </h3>
                  </div>

                  {/* Body text panel */}
                  <div className={`md:w-2/3 bg-gradient-to-br ${ch.bg} border-t-2 md:border-t-0 ${isEven && !isUrdu ? 'md:border-l-2' : 'md:border-r-2'} ${ch.border} flex items-center px-8 md:px-12 py-10`}>
                    {/* Left accent line */}
                    <div
                      className="hidden md:block w-1 self-stretch rounded-full mr-8 flex-shrink-0 opacity-30"
                      style={{ background: ch.color }}
                    />
                    <p className={`text-gray-700 text-base md:text-lg leading-relaxed md:leading-loose ${isUrdu ? 'text-right' : ''}`}>
                      {ch.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Closing pull-quote */}
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/5 via-brand-gold/5 to-transparent rounded-3xl" />
            <div className="relative border border-brand-gold/25 rounded-3xl px-10 py-10 md:px-16">
              <div className="flex gap-6 items-start">
                <span className="text-7xl text-brand-gold/30 font-serif leading-none flex-shrink-0 -mt-2 select-none">"</span>
                <p className={`text-gray-700 text-lg md:text-xl leading-relaxed font-medium italic ${isUrdu ? 'text-right' : ''}`}>
                  {closingQuote[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            QUICK FACTS
        ══════════════════════════════════════════════════ */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-bold text-brand-emerald mb-3">
              {quickFactsHeading[lang]}
            </h3>
            <div className="h-0.5 w-14 bg-brand-gold mx-auto rounded-full" />
          </div>

          <p className={`text-gray-600 leading-relaxed text-base max-w-3xl mx-auto text-center mb-12 ${isUrdu ? 'text-right sm:text-center' : ''}`}>
            {quickFactsProse[lang]}
          </p>

          {/* 2-column list style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {facts.map((fact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-5 p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                id={`quick-fact-${idx}`}
              >
                <div
                  className="flex-shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center"
                  style={{ background: fact.lightBg }}
                >
                  <fact.Icon className="h-5 w-5" style={{ color: fact.accent }} />
                </div>
                <div className={`flex-1 ${isUrdu ? 'text-right' : ''}`}>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-0.5">
                    {fact.label}
                  </p>
                  <p className="text-gray-800 font-semibold text-sm leading-snug">
                    {fact.value}
                  </p>
                </div>
                <div
                  className="h-2 w-2 rounded-full flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: fact.accent }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            LOCATION & PROXIMITY SECTION
        ══════════════════════════════════════════════════ */}
        <div className="space-y-16">
          
          {/* Header & Overview */}
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 text-brand-gold font-bold tracking-widest text-xs uppercase mb-3 px-4 py-1.5 bg-brand-gold/10 rounded-full">
              <Compass className="h-4 w-4" />
              {locationSectionTag[lang]}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-brand-emerald mb-6">
              {locationHeading[lang]}
            </h3>
            <p className={`text-gray-600 text-base md:text-lg leading-relaxed ${isUrdu ? 'text-right' : ''}`}>
              {locationDesc[lang]}
            </p>
          </div>

          {/* Distances & Neighboring Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Distance Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-3 bg-brand-emerald/10 text-brand-emerald rounded-2xl">
                  <Milestone className="h-6 w-6" />
                </div>
                <h4 className={`font-serif text-xl font-bold text-gray-900 ${isUrdu ? 'text-right w-full' : ''}`}>
                  {distanceHeading[lang]}
                </h4>
              </div>

              <div className="space-y-3">
                {cityDistances.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center p-4 rounded-2xl bg-gray-50/70 hover:bg-gray-100/80 transition-colors"
                  >
                    <span className="font-medium text-gray-800 flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-brand-emerald" />
                      {item.city[lang]}
                    </span>
                    <span className="font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full text-white shadow-sm" style={{ background: item.color }}>
                      {item.distance[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighboring Villages */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-2xl">
                  <Waypoints className="h-6 w-6" />
                </div>
                <h4 className={`font-serif text-xl font-bold text-gray-900 ${isUrdu ? 'text-right w-full' : ''}`}>
                  {neighborsHeading[lang]}
                </h4>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {nData.map((item, idx) => {
                  const IconComponent = item.dirIcon;
                  return (
                    <div 
                      key={idx} 
                      className={`p-5 rounded-2xl bg-gradient-to-br ${item.bg} border ${item.border} space-y-2`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold uppercase tracking-wider ${item.textCol}`}>
                          {item.direction}
                        </span>
                        <IconComponent className={`h-4 w-4 ${item.textCol}`} />
                      </div>
                      <p className="text-gray-900 font-bold text-lg">
                        {item.chaks}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Geographic Context & How to Reach */}
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            
            {/* Detailed Context Table Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-brand-emerald/5 via-white to-brand-gold/5 rounded-3xl p-8 border border-brand-emerald/15 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-emerald/10">
                <div className="p-3 bg-brand-emerald text-white rounded-2xl">
                  <Globe className="h-6 w-6" />
                </div>
                <h4 className={`font-serif text-xl font-bold text-brand-emerald ${isUrdu ? 'text-right w-full' : ''}`}>
                  {geoContextHeading[lang]}
                </h4>
              </div>

              <div className="space-y-4">
                {gContext.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-brand-gold sm:w-1/3 pt-0.5">
                      {item.label}
                    </span>
                    <span className={`font-medium text-gray-800 text-sm sm:w-2/3 ${isUrdu ? 'text-right' : ''}`}>
                      {item.info}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to reach Card */}
            <div className="bg-brand-emerald rounded-3xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <Navigation className="h-64 w-64 text-white" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="inline-flex p-3 bg-white/15 rounded-2xl backdrop-blur-xs">
                  <Navigation className="h-6 w-6 text-brand-gold" />
                </div>
                <h4 className={`font-serif text-2xl font-bold ${isUrdu ? 'text-right' : ''}`}>
                  {reachHeading[lang]}
                </h4>
                <p className={`text-white/85 text-sm md:text-base leading-relaxed ${isUrdu ? 'text-right' : ''}`}>
                  {reachText[lang]}
                </p>
              </div>

              <div className="relative z-10 pt-8 border-t border-white/20 mt-8 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-gold" />
                  Tehsil & District Okara
                </span>
                <span className="font-mono bg-white/10 px-2.5 py-1 rounded-full text-white/90">
                  4-L Minor
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
