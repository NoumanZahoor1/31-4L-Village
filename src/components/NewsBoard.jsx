import React, { useState } from 'react';
import { Megaphone, Bell, Calendar, PenTool, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';
import { communityNews } from '../data/mockData';

export default function NewsBoard() {
  const { lang } = useLang();
  const [selectedNews, setSelectedNews] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Submit Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Map translations to local lists safely with fallback
  const rawNewsList = t.data?.news || communityNews || [];
  const newsData = rawNewsList.map(item => {
    return {
      ...item,
      title: typeof item.title === 'object' ? get(item.title, lang) : item.title,
      date: typeof item.date === 'object' ? get(item.date, lang) : item.date,
      tag: typeof item.tag === 'object' ? get(item.tag, lang) : item.tag,
      excerpt: typeof item.excerpt === 'object' ? get(item.excerpt, lang) : item.excerpt,
      content: typeof item.content === 'object' ? get(item.content, lang) : item.content
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitModal(false);
      setName('');
      setPhone('');
      setTitle('');
      setContent('');
    }, 2000);
  };

  const getTagColor = (tag) => {
    // Check English tag or translated tags
    if (tag.includes('Sport') || tag.includes('کھیل')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (tag.includes('Welf') || tag.includes('فلاح')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    return 'bg-cyan-100 text-cyan-800 border-cyan-200';
  };

  return (
    <section id="news" className="py-24 bg-brand-cream/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-3">
            {get(t.news.sectionTag, lang)}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            {get(t.news.heading, lang)}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            {lang === 'ur'
              ? 'ترقیاتی منصوبوں، مفت میڈیکل کیمپوں، مقامی میچوں اور کمیونٹی اعلانات کے بارے میں باخبر رہیں۔'
              : 'Stay informed about the latest development plans, free clinic camps, local matches, and community bulletins.'}
          </p>
        </div>

        {/* Layout Grid: Left News feed, Right Widget Board */}
        <div className="grid lg:grid-cols-3 gap-10 items-start">
          
          {/* Main news feed */}
          <div className="lg:col-span-2 space-y-6">
            {newsData.map((news) => (
              <div 
                key={news.id} 
                className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getTagColor(news.tag)}`}>
                    {news.tag}
                  </span>
                  <span className="flex items-center text-xs text-gray-400 font-medium">
                    <Calendar className="h-3.5 w-3.5 mr-1" /> {news.date}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 hover:text-brand-emerald transition-colors cursor-pointer" onClick={() => setSelectedNews(news)}>
                  {news.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {news.excerpt}
                </p>

                <button 
                  onClick={() => setSelectedNews(news)}
                  className="flex items-center gap-1.5 text-brand-emerald hover:text-brand-moss text-sm font-bold transition-colors cursor-pointer"
                >
                  {lang === 'ur' ? 'مکمل معلومات پڑھیں ←' : 'Read Full Notice \u2192'}
                </button>
              </div>
            ))}
          </div>

          {/* Right sidebar bullet-board */}
          <div className="bg-brand-emerald text-white rounded-3xl p-8 border border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-gold/10 rounded-2xl">
                <Megaphone className="h-6 w-6 text-brand-gold animate-bounce" />
              </div>
              <h3 className="font-serif text-2xl font-bold">
                {lang === 'ur' ? 'کمیونٹی بورڈ' : 'Community Board'}
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {lang === 'ur'
                ? 'کیا آپ کوئی اعلان شیئر کرنا چاہتے ہیں؟ شادیوں، اجتماعات، کامیابیوں یا گمشدہ اشیاء کی تفصیلات یہاں جمع کرائیں۔'
                : 'Have an announcement to share? Weddings, gatherings, local achievements, or lost-and-found items can be submitted for admin review.'}
            </p>
            <div className="border-t border-white/10 pt-6">
              <button 
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-4 bg-brand-gold text-brand-emerald hover:bg-white hover:text-brand-emerald font-semibold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <PenTool className="h-4 w-4" /> {lang === 'ur' ? 'اعلان جمع کریں' : 'Submit Announcement'}
              </button>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex gap-3 text-xs bg-white/5 p-4 rounded-xl border border-white/5">
                <Bell className="h-4 w-4 text-brand-gold flex-shrink-0" />
                <p className="text-white/70">
                  {lang === 'ur' ? 'صرف منظور شدہ کمیونٹی واقعات ہی بورڈ پر شائع کیے جائیں گے۔' : 'Only vetted community events will be approved by moderators.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full News Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-gray-100 animate-[fade-in_0.2s_ease-out]">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getTagColor(selectedNews.tag)}`}>
                {selectedNews.tag}
              </span>
              <span className="flex items-center text-xs text-gray-400 font-medium">
                <Calendar className="h-3.5 w-3.5 mr-1" /> {selectedNews.date}
              </span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
              {selectedNews.title}
            </h3>
            
            <div className="text-sm text-gray-700 leading-relaxed bg-brand-cream/30 p-6 rounded-2xl border border-gray-100 mb-6 max-h-60 overflow-y-auto">
              {selectedNews.content}
            </div>

            <button 
              onClick={() => setSelectedNews(null)}
              className="w-full py-3 bg-brand-cream hover:bg-brand-emerald/10 text-brand-emerald font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              {lang === 'ur' ? 'بند کریں' : 'Close Notice'}
            </button>
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Submit Announcement Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl border border-gray-100 animate-[fade-in_0.2s_ease-out]">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle className="h-16 w-16 text-brand-emerald mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {lang === 'ur' ? 'کامیابی سے جمع ہو گیا!' : 'Submitted Successfully!'}
                </h3>
                <p className="text-gray-500 text-sm">
                  {lang === 'ur' ? 'آپ کا اعلان تصدیق کے لیے ہمارے کمیونٹی ماڈریٹر کو بھیج دیا گیا ہے۔' : 'Your notice has been sent to our community moderators for validation.'}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                  {lang === 'ur' ? 'اعلان جمع کریں' : 'Submit Announcement'}
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  {lang === 'ur' ? 'براہ کرم نیچے دیا گیا فارم پُر کریں۔ منظوری کے بعد یہ بورڈ پر نظر آئے گا۔' : 'Please fill the form below. Once approved, the notice will appear on the local bulletin feed.'}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">
                      {get(t.contact.name, lang)}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'ur' ? 'مثال: محمد رضا' : 'e.g. Muhammad Raza'} 
                      className="w-full p-3 bg-brand-cream/30 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">
                      {lang === 'ur' ? 'فون نمبر' : 'Phone Number'}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +92 300 1234567" 
                      className="w-full p-3 bg-brand-cream/30 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">
                      {lang === 'ur' ? 'اعلان کا عنوان' : 'Notice Title'}
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={lang === 'ur' ? 'مثال: ٹریکٹر کرایہ کے لیے دستیاب ہے' : 'e.g. Tractor Rent Announcement'} 
                      className="w-full p-3 bg-brand-cream/30 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">
                      {lang === 'ur' ? 'تفصیلات' : 'Detailed Description'}
                    </label>
                    <textarea 
                      rows="3" 
                      required 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder={lang === 'ur' ? 'تاریخ، وقت اور رابطہ کی تفصیلات لکھیں...' : 'Explain details, dates, and contact info...'} 
                      className="w-full p-3 bg-brand-cream/30 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-emerald resize-none"
                    ></textarea>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setShowSubmitModal(false)}
                      className="flex-1 py-3 bg-brand-cream hover:bg-gray-100 text-gray-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                    >
                      {lang === 'ur' ? 'کینسل' : 'Cancel'}
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 py-3 bg-brand-emerald hover:bg-brand-moss text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      {lang === 'ur' ? 'جمع کریں' : 'Submit Notice'}
                    </button>
                  </div>
                </form>
              </>
            )}
            
            <button 
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
