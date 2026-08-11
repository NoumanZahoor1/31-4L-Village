import React, { useState } from 'react';
import { Search, Star, X, User } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { t, get } from '../data/translations';

// —— Famous Personalities Data —————————————————————————————————————————————————
const personalitiesData = [
  // ================= NUMBERDARS =================
  // Deceased Numberdars
  {
    id: 1,
    name: { en: 'Lal Khan Jatoi Numberdar', ur: 'لال خان جتوئی نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Deceased)', ur: 'نمبردار (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Prominent former Numberdar of Chak 31/4L, remembered for his service, leadership, and dedication to the village community.',
      ur: 'چک 31/4L کے معروف سابق نمبردار، جنہیں گاؤں کی خدمت اور قیادت کے لیے یاد کیا جاتا ہے۔',
    },
    image: '/images/people/lal khan.png',
    achievement: { en: 'Honorary Village Leadership', ur: 'نمبردار (مرحوم)' },
  },
  {
    id: 2,
    name: { en: 'Chaway Khan Jatoi Namberdar', ur: 'چھوے خان جتوئی نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Deceased)', ur: 'نمبردار (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Respected Numberdar who served the residents of Chak 31/4L and played a vital role in maintaining peace and unity.',
      ur: 'محترم نمبردار جنہوں نے چک 31/4L کے رہائشیوں کی خدمت کی اور امن و اتحاد میں اہم کردار ادا کیا۔',
    },
    image: null,
    achievement: { en: 'Honorary Village Leadership', ur: 'نمبردار (مرحوم)' },
  },
  {
    id: 3,
    name: { en: 'M. Hussain Rind Namberdar', ur: 'محمد حسین رند نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Deceased)', ur: 'نمبردار (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Esteemed community leader and former Numberdar who dedicated his life to local administration and public welfare.',
      ur: 'معزز کمیونٹی رہنما اور سابق نمبردار جنہوں نے اپنی زندگی مقامی انتظامیہ اور عوامی فلاح کے لیے وقف کی۔',
    },
    image: null,
    achievement: { en: 'Honorary Village Leadership', ur: 'نمبردار (مرحوم)' },
  },
  // Alive Numberdars
  {
    id: 4,
    name: { en: 'Waris Ali Jatoi Numberdar', ur: 'وارث علی جتوئی نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Alive)', ur: 'نمبردار (حیات)' },
    category: 'Alive',
    bio: {
      en: 'Current active Numberdar of Chak 31/4L, actively managing village revenue records and serving the local community.',
      ur: 'چک 31/4L کے موجودہ فعال نمبردار، جو گاؤں کے مالیاتی ریکارڈ اور عوامی خدمت میں مصروف ہیں۔',
    },
    image: '/images/people/waris Numberdar.png',
    achievement: { en: 'Active Village Numberdar', ur: 'موجودہ نمبردار' },
  },
  {
    id: 5,
    name: { en: 'Hazir Khan Rind Numberdar', ur: 'حاضر خان رند نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Alive)', ur: 'نمبردار (حیات)' },
    category: 'Alive',
    bio: {
      en: 'Respected active Numberdar serving Chak 31/4L with guidance, dispute resolution, and community development.',
      ur: 'محترم موجودہ نمبردار جو گاؤں میں رہنمائی، تنازعات کے حل اور ترقی کے لیے کوشاں ہیں۔',
    },
    image: '/images/people/Hazir.png',
    achievement: { en: 'Active Village Numberdar', ur: 'موجودہ نمبردار' },
  },
  {
    id: 6,
    name: { en: 'Iqbal Khan Jatoi Numberdar', ur: 'اقبال خان جتوئی نمبردار' },
    type: 'Numberdar',
    field: { en: 'Numberdar (Alive)', ur: 'نمبردار (حیات)' },
    category: 'Alive',
    bio: {
      en: 'Active Numberdar working tirelessly for the welfare, social cohesion, and progress of Chak 31/4L.',
      ur: 'فعال نمبردار جو چک 31/4L کی فلاح، سماجی ہم آہنگی اور ترقی کے لیے انتھک محنت کر رہے ہیں۔',
    },
    image: null,
    achievement: { en: 'Active Village Numberdar', ur: 'موجودہ نمبردار' },
  },

  // ================= NOTABLE PERSONALITIES =================
  // Deceased Notable
  {
    id: 101,
    name: { en: 'Baba Ghulam Khan Jatoi', ur: 'بابا غلام خان جتوئی' },
    type: 'Notable',
    field: { en: 'Ex-Chairman / Notable (Deceased)', ur: 'سابق چیئرمین / معزز شخصیت (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Legendary community leader and Ex-Chairman of Chak 31/4L, celebrated for his guidance and immense service to the village.',
      ur: 'گاؤں کے عظیم رہنما اور سابق چیئرمین، جن کی رہنمائی اور شاندار خدمات کو خراج تحسین پیش کیا جاتا ہے۔',
    },
    image: null,
    achievement: { en: 'Ex-Chairman — Deceased', ur: 'سابق چیئرمین' },
  },
  {
    id: 102,
    name: { en: 'Sajwar Khan Jatoi', ur: 'سجوار خان جتوئی' },
    type: 'Notable',
    field: { en: 'Notable Personality (Deceased)', ur: 'معزز شخصیت (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Respected elder and prominent personality of Chak 31/4L, remembered with deep honor for his wisdom and contributions.',
      ur: 'چک 31/4L کے محترم بزرگ اور نمایاں شخصیت، جن کی حکمت عملی اور خدمات کو عزت سے یاد کیا جاتا ہے۔',
    },
    image: null,
    achievement: { en: 'Respected Elder — Deceased', ur: 'معزز بزرگ' },
  },
  {
    id: 103,
    name: { en: 'Baliyay Khan Jatoi', ur: 'بلیئے خان جتوئی' },
    type: 'Notable',
    field: { en: 'Notable Personality (Deceased)', ur: 'معزز شخصیت (مرحوم)' },
    category: 'Deceased',
    bio: {
      en: 'Honored village personality whose dedication and commitment earned him high regard in the community.',
      ur: 'گاؤں کی معزز شخصیت جن کی لگن اور عزم نے انہیں کمیونٹی میں اعلیٰ مقام دلایا۔',
    },
    image: null,
    achievement: { en: 'Honored Personality — Deceased', ur: 'معزز شخصیت' },
  },

  // Alive Notable
  { id: 201, name: { en: 'Ahmad Yar Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected prominent figure in Chak 31/4L dedicated to local community welfare.', ur: 'چک 31/4L کی محترم اور معزز شخصیت۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 202, name: { en: 'Haji Aman Ullah Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Prominent social figure and elder supporting community welfare.', ur: 'گاؤں کے معروف اور محترم سماجی رہنما۔' }, image: '/images/people/Aman ullah.jpeg', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 203, name: { en: 'Zahoor Ahmad Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Active community representative playing a key role in village harmony.', ur: 'گاؤں کے فعال اور معزز نمائندے۔' }, image: '/images/people/Zahoor .png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 204, name: { en: 'Haji Talib Hussain Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected leader involved in social work and community development.', ur: 'سماجی اور فلاحی امور کے معزز رہنما۔' }, image: '/images/people/Haji talib.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 205, name: { en: 'Wazir Ali Shahid Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Dedicated community leader supporting local welfare initiatives.', ur: 'عوامی اور فلاحی کاموں کے نامور کارکن۔' }, image: '/images/people/wazir .png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 206, name: { en: 'Wajib Ali Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Esteemed member of the village taking active part in social welfare.', ur: 'گاؤں کی محترم اور فعال شخصیت۔' }, image: '/images/people/Wajib.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 207, name: { en: 'Ustad Basara Khan Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality / Master Craftsman', ur: 'معزز شخصیت / ماہر استاد' }, category: 'Alive', bio: { en: 'Renowned teacher and master figure respected across the community.', ur: 'پورے علاقے میں محترم و معروف استاد شخصیت۔' }, image: '/images/people/Ustad Basara.jpeg', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 208, name: { en: 'Usman Ghani Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Active youth and community organizer in Chak 31/4L.', ur: 'برادری میں فعال اور متحرک رہنما۔' }, image: '/images/people/Usman.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 209, name: { en: 'M. Ayub Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected individual actively furthering local community wellbeing.', ur: 'معزز اور فعال سماجی شخصیت۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 210, name: { en: 'Ghulam Murtaza Jatoi', ur: 'سابق نائب ناظم' }, type: 'Notable', field: { en: 'Ex Naib Nazim / Notable', ur: 'سابق نائب ناظم / معزز شخصیت' }, category: 'Alive', bio: { en: 'Former Naib Nazim who served local governance with distinction.', ur: 'سابق نائب ناظم جنہوں نے علاقے کی بہترین خدمت کی۔' }, image: null, achievement: { en: 'Ex Naib Nazim', ur: 'سابق نائب ناظم' } },
  { id: 211, name: { en: 'Mohsin Ali Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Dynamic representative engaged in local youth and social projects.', ur: 'نوجوان سماجی و فلاحی نمائندے۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 212, name: { en: 'Shahid Abbas Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected figure known for social development contributions.', ur: 'علاقائی ترقی کے سرگرم کارکن۔' }, image: '/images/people/Shahid Abbas.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 213, name: { en: 'M. Aslam Sikandar Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Prominent personality active in village administration and unity.', ur: 'گاؤں میں اتحاد اور باہمی تعاون کے داعی۔' }, image: '/images/people/Aslam Jatoi.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 214, name: { en: 'Arshad Bashir Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Key local figure dedicated to progressive social works.', ur: 'سماجی اور فلاحی میدان کی نمایاں شخصیت۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 215, name: { en: 'Aslam Lashari', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected community leader contributing to peace and resolution.', ur: 'فلاح و بہبود کے میدان کے معزز رکن۔' }, image: '/images/people/Aslam Lashari.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 216, name: { en: 'Ajmal Lashari', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Active community personality working for collective growth.', ur: 'عوامی ترقی و فلاح کے کوشاں کارکن۔' }, image: '/images/people/Ajmal.jpeg', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 217, name: { en: 'Qadir Khan Lashari', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Esteemed elder supporting village harmony and local affairs.', ur: 'علاقائی ہم آہنگی کے پُرخلوص رہنما۔' }, image: '/images/people/Qadir.jpeg', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 218, name: { en: 'Abbas Sharif Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected individual actively supporting local initiatives.', ur: 'معزز اور سرگرم سماجی رکن۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 219, name: { en: 'Noor Nabi Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Dedicated village figure engaged in welfare and development.', ur: 'فلاحی اور ترقیاتی کاموں میں مصروف عمل شخصیت۔' }, image: '/images/people/noor nabi.png', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 220, name: { en: 'Usman Ghani Jatoi Secretary', ur: 'کمیونٹی سیکرٹری' }, type: 'Notable', field: { en: 'Secretary / Notable', ur: 'سیکرٹری / معزز شخصیت' }, category: 'Alive', bio: { en: 'Community Secretary managing civic and welfare coordination.', ur: 'سیکرٹری جو برادری اور فلاحی کاموں کے منتظم ہیں۔' }, image: null, achievement: { en: 'Community Secretary', ur: 'کمیونٹی سیکرٹری' } },
  { id: 221, name: { en: 'M. Ikram Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Young energetic leader focused on social and economic growth.', ur: 'نوجوان فعال اور متحرک سماجی شخصیت۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 222, name: { en: 'Kernel Rtd Zafar Iqbal Jatoi', ur: 'کرنل (ریٹائرڈ)' }, type: 'Notable', field: { en: 'Kernel (Rtd) / Notable', ur: 'کرنل (ریٹائرڈ) / معزز شخصیت' }, category: 'Alive', bio: { en: 'Distinguished retired Army Colonel serving as a proud representative and elder of Chak 31/4L.', ur: 'پاک فوج کے ریٹائرڈ کرنل جن کی خدمات گاؤں کے لیے باعثِ فخر ہیں۔' }, image: null, achievement: { en: 'Kernel (Rtd) — Military Service', ur: 'کرنل (ریٹائرڈ)' } },
  { id: 223, name: { en: 'Zeeshan Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Active young leader involved in community welfare and development.', ur: 'علاقائی فلاح و ترقی میں مصروف عمل متحرک شخصیت۔' }, image: '/images/people/zeeshan.jpeg', achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },
  { id: 224, name: { en: 'Naeem Ashraf Jatoi', ur: 'معزز شخصیت' }, type: 'Notable', field: { en: 'Notable Personality', ur: 'معزز شخصیت' }, category: 'Alive', bio: { en: 'Respected member contributing actively to social initiatives.', ur: 'سماجی اور فلاحی کاموں کے معزز و سرگرم رکن۔' }, image: null, achievement: { en: 'Notable Personality', ur: 'معزز شخصیت' } },


  { id: 225, name: { en: 'Assistant Sub Inspector Tanveer', ur: 'اسسٹنٹ سب انسپکٹر' }, type: 'Police', field: { en: 'Assistant Sub Inspector (Alive)', ur: 'اسسٹنٹ سب انسپکٹر (حیات)' }, category: 'Alive', bio: { en: 'Committed ASI serving efficiently in police department administration and crime prevention.', ur: 'پولیس محکمے میں فرض شناسی سے خدمات انجام دینے والے اسسٹنٹ سب انسپکٹر۔' }, image: '/images/people/Tanveer.jpeg', achievement: { en: 'Assistant Sub Inspector', ur: 'اسسٹنٹ سب انسپکٹر' } },
  { id: 226, name: { en: 'Fakhar', ur: 'ایڈوکیٹ' }, type: 'Advocate', field: { en: 'Legal Practitioner / Advocate', ur: 'قانون دان / ایڈوکیٹ' }, category: 'Alive', bio: { en: 'Respected Advocate dedicated to legal welfare.', ur: 'معزز قانون دان۔' }, image: '/images/people/Fakhar.png', achievement: { en: 'Advocate / Lawyer', ur: 'ایڈوکیٹ' } },
  { id: 227, name: { en: 'Fateh Sher', ur: 'پولیس اہلکار' }, type: 'Police', field: { en: 'Police Department (Alive)', ur: 'پولیس محکمہ کے باہمت اہلکار' }, category: 'Alive', bio: { en: 'Respected Police officer serving the community.', ur: 'فرض شناس پولیس اہلکار۔' }, image: '/images/people/Fateh Sher.png', achievement: { en: 'Police Department', ur: 'پولیس اہلکار' } },
  { id: 504, name: { en: 'Dr. Bashir', ur: 'میڈیکل ڈاکٹر' }, type: 'Doctor', field: { en: 'Medical Doctor', ur: 'میڈیکل ڈاکٹر' }, category: 'Alive', bio: { en: 'Dedicated medical doctor serving local patients.', ur: 'علاج و معالجے کے میدان میں بہترین خدمات انجام دینے والے ڈاکٹر۔' }, image: '/images/people/Dr Bashir.png', achievement: { en: 'Medical Practitioner', ur: 'طبی ماہر' } },
  // ================= POLICE =================
  // Martyr (Shaheed) Police
  {
    id: 301,
    name: { en: 'Naeem Jatoi Shaheed', ur: 'نعیم جتوئی شہید' },
    type: 'Police',
    field: { en: 'Police Department (Martyr / Shaheed)', ur: 'محکمہ پولیس (شہید)' },
    category: 'Martyr',
    bio: {
      en: 'Brave Police officer from Chak 31/4L who sacrificed his life in the line of duty, bringing immense honor to the nation and village.',
      ur: 'چک 31/4L کے بہادر پولیس افسر جنہوں نے ڈیوٹی کے دوران جان قربان کرکے قوم اور گاؤں کا سر فخر سے بلند کیا۔',
    },
    image: '/images/people/Naeem Shaheed.png',
    achievement: { en: 'Police Department Martyr (Shaheed)', ur: 'پولیس شہید' },
  },
  {
    id: 302,
    name: { en: 'Zahoor Jatoi Shaheed', ur: 'ظہور جتوئی شہید' },
    type: 'Police',
    field: { en: 'Police Department (Martyr / Shaheed)', ur: 'محکمہ پولیس (شہید)' },
    category: 'Martyr',
    bio: {
      en: 'Heroic Police officer who laid down his life protecting citizens and maintaining law and order.',
      ur: 'بہادر پولیس افسر جنہوں نے شہریوں کے تحفظ اور امن و امان برقرار رکھنے کے لیے اپنی جان کا نذرانہ پیش کیا۔',
    },
    image: null,
    achievement: { en: 'Police Department Martyr (Shaheed)', ur: 'پولیس شہید' },
  },
  {
    id: 303,
    name: { en: 'Hasham Jatoi Shaheed', ur: 'ہشام جتوئی شہید' },
    type: 'Police',
    field: { en: 'Police Department (Martyr / Shaheed)', ur: 'محکمہ پولیس (شہید)' },
    category: 'Martyr',
    bio: {
      en: 'Valiant Police martyr who served with extreme bravery and supreme sacrifice for the country.',
      ur: 'بہادر پولیس شہید جنہوں نے ملک کے لیے انتہائی بہادری سے خدمات انجام دیں اور عظیم قربانی دی۔',
    },
    image: null,
    achievement: { en: 'Police Department Martyr (Shaheed)', ur: 'پولیس شہید' },
  },

  // Alive Police Officers
  {
    id: 304,
    name: { en: 'Inspector Sadat Ullah Jatoi', ur: 'انسپکٹر سادات اللہ جتوئی' },
    type: 'Police',
    field: { en: 'Police Inspector (Alive)', ur: 'پولیس انسپکٹر' },
    category: 'Alive',
    bio: {
      en: 'Prominent Police Inspector serving with integrity, dedication, and law enforcement excellence.',
      ur: 'نمایاں پولیس انسپکٹر جو دیانتداری اور فرض شناسی کے ساتھ خدمات انجام دے رہے ہیں۔',
    },
    image: '/images/people/Sadat.png',
    achievement: { en: 'Police Inspector', ur: 'پولیس انسپکٹر' },
  },
  {
    id: 305,
    name: { en: 'Inspector M. Afzal Jatoi', ur: 'انسپکٹر محمد افضل جتوئی' },
    type: 'Police',
    field: { en: 'Police Inspector (Alive)', ur: 'پولیس انسپکٹر' },
    category: 'Alive',
    bio: {
      en: 'Senior Police Inspector serving the country with honor, duty, and leadership in police operations.',
      ur: 'سینئر پولیس انسپکٹر جو پولیس آپریشنز میں عزت اور فرض شناسی کے ساتھ ملک کی خدمت کر رہے ہیں۔',
    },
    image: '/images/people/Afzal jatoi.png',
    achievement: { en: 'Police Inspector', ur: 'پولیس انسپکٹر' },
  },
  {
    id: 306,
    name: { en: 'Sub Inspector Ajmal Khan Jatoi', ur: 'سب انسپکٹر اجمل خان جتوئی' },
    type: 'Police',
    field: { en: 'Sub Inspector Police (Alive)', ur: 'سب انسپکٹر پولیس' },
    category: 'Alive',
    bio: {
      en: 'Dedicated Sub Inspector serving in law enforcement and representing Chak 31/4L with dignity.',
      ur: 'قانون نافذ کرنے والے ادارے میں خدمات انجام دینے والے سرشار سب انسپکٹر جو وقار کے ساتھ نمائندگی کر رہے ہیں۔',
    },
    image: '/images/people/Ajmal.jpeg',
    achievement: { en: 'Sub Inspector Police', ur: 'سب انسپکٹر' },
  },
  {
    id: 308,
    name: { en: 'Sub Inspector Riffat Ullah Jatoi', ur: 'سب انسپکٹر رفعت اللہ جتوئی' },
    type: 'Police',
    field: { en: 'Sub Inspector Police (Alive)', ur: 'سب انسپکٹر پولیس' },
    category: 'Alive',
    bio: {
      en: 'Experienced Sub Inspector active in police service and community security.',
      ur: 'تجربہ کار سب انسپکٹر جو پولیس سروس اور کمیونٹی کی حفاظت میں سرگرم ہیں۔',
    },
    image: '/images/people/Riffat.png',
    achievement: { en: 'Sub Inspector Police', ur: 'سب انسپکٹر' },
  },
  // ================= TEACHERS =================
  {
    id: 401,
    name: { en: 'Israr Khan Jatoi', ur: 'اسرار خان جتوئی' },
    type: 'Teacher',
    field: { en: 'School Principal / Educator', ur: 'سکول پرنسپل / ماہر تعلیم' },
    category: 'Alive',
    bio: {
      en: 'Distinguished educator and School Principal from Chak 31/4L dedicated to shaping future generations.',
      ur: 'چک 31/4L کے نامور ماہر تعلیم اور سکول پرنسپل جو آنے والی نسلوں کی تعمیر کے لیے وقف ہیں۔',
    },
    image: '/images/people/israr.png',
    achievement: { en: 'School Principal', ur: 'سکول پرنسپل' },
  },
  {
    id: 402,
    name: { en: 'Mazhar Jatoi', ur: 'مظہر جتوئی' },
    type: 'Teacher',
    field: { en: 'School Principal / Educator', ur: 'سکول پرنسپل / ماہر تعلیم' },
    category: 'Alive',
    bio: {
      en: 'Respected School Principal leading educational excellence and youth academic progress.',
      ur: 'محترم سکول پرنسپل جو نوجوانوں کی تعلیمی ترقی میں نمایاں کردار ادا کر رہے ہیں۔',
    },
    image: null,
    achievement: { en: 'School Principal', ur: 'سکول پرنسپل' },
  },
  {
    id: 403,
    name: { en: 'Dr. M. Waseem Jatoi', ur: 'ڈاکٹر محمد وسیم جتوئی' },
    type: 'Teacher',
    field: { en: 'HOD UET Lahore / Professor', ur: 'پروفیسر / ایچ او ڈی UET' },
    category: 'Alive',
    bio: {
      en: 'Eminent scholar and Head of Department (HOD) at UET Lahore, bringing great pride and academic prestige to the village.',
      ur: 'UET لاہور میں نامور سکالر اور ہیڈ آف ڈیپارٹمنٹ، جو گاؤں کے لیے باعث فخر ہیں۔',
    },
    image: '/images/people/wassem.jpeg',
    achievement: { en: 'HOD — UET Lahore', ur: 'پروفیسر' },
  },
  {
    id: 404,
    name: { en: 'M. Abbas Jatoi', ur: 'محمد عباس جتوئی' },
    type: 'Teacher',
    field: { en: 'Educator / Teacher', ur: 'ماہر تعلیم' },
    category: 'Alive',
    bio: {
      en: 'Dedicated teacher rendering valuable educational services to local students and the community.',
      ur: 'مقامی تعلیمی ترقی اور کمیونٹی کی تدریس کے لیے کوشاں محترم شخصیت۔',
    },
    image: '/images/people/Master Abbas.png',
    achievement: { en: 'Education Service', ur: 'ماہر تعلیم' },
  },
  {
    id: 405,
    name: { en: 'Maqbool Hussain Jatoi', ur: 'وسیم جتوئی' },
    type: 'Teacher',
    field: { en: 'Educator / Teacher', ur: 'استاد' },
    category: 'Alive',
    bio: {
      en: 'Esteemed educator committed to academic development and student empowerment.',
      ur: 'طلباء کی تدریس اور نوجوانوں کی کردار سازی کے لیے وقف سرشار استاد۔',
    },
    image: null,
    achievement: { en: 'Education Service', ur: 'استاد' },
  },
  {
    id: 406,
    name: { en: 'Bashir Ahmad Jatoi', ur: 'ڈاکٹر شہادت علی جتوئی' },
    type: 'Teacher',
    field: { en: 'Educator / Teacher', ur: 'لیکچرر / ماہر تعلیم' },
    category: 'Alive',
    bio: {
      en: 'Veteran teacher who has devoted years to fostering knowledge and discipline.',
      ur: 'اعلیٰ تعلیم فراہم کرنے والے محترم لیکچرر اور ماہر تعلیم۔',
    },
    image: '/images/people/Bashir Ahmad.png',
    achievement: { en: 'Education Service', ur: 'لیکچرر' },
  },
  {
    id: 407,
    name: { en: 'Ameer Naeem Jatoi', ur: 'محمد ارشد جتوئی' },
    type: 'Teacher',
    field: { en: 'Educator / Teacher', ur: 'استاد / ایجوکیٹر' },
    category: 'Alive',
    bio: {
      en: 'Dynamic educator promoting quality teaching and modern educational standards.',
      ur: 'مقامی تعلیمی اقدامات میں سرگرم تجربہ کار استاد۔',
    },
    image: null,
    achievement: { en: 'Education Service', ur: 'استاد' },
  },
  {
    id: 408,
    name: { en: 'Arshad Hussain Jatoi', ur: 'ذوالفقار جتوئی' },
    type: 'Teacher',
    field: { en: 'Educator / Teacher', ur: 'استاد / ایجوکیٹر' },
    category: 'Alive',
    bio: {
      en: 'Passionate teacher serving the academic needs of the village youth.',
      ur: 'نوجوانوں کی تعلیم اور کمیونٹی کے فروغ کے لیے پرعزم استاد۔',
    },
    image: null,
    achievement: { en: 'Education Service', ur: 'استاد' },
  },
  // ================= DOCTORS =================
  {
    id: 501,
    name: { en: 'Dr. Muhammad Ahmad (MBBS)', ur: 'ڈاکٹر حاجی شیر جتوئی' },
    type: 'Doctor',
    field: { en: 'Medical Officer / MBBS Doctor', ur: 'میڈیکل ڈاکٹر' },
    category: 'Alive',
    bio: {
      en: 'Qualified MBBS physician dedicated to providing high quality healthcare and medical service to the community.',
      ur: 'محترم ڈاکٹر جو کمیونٹی کو معیاری طبی سہولیات فراہم کر رہے ہیں۔',
    },
    image: null,
    achievement: { en: 'Medical Doctor (MBBS)', ur: 'میڈیکل ڈاکٹر' },
  },
  {
    id: 502,
    name: { en: 'Dr. Sami Ullah Jatoi', ur: 'ڈاکٹر ارشد جتوئی' },
    type: 'Doctor',
    field: { en: 'Medical Doctor / Healthcare Professional', ur: 'میڈیکل ڈاکٹر' },
    category: 'Alive',
    bio: {
      en: 'Respected medical practitioner from Chak 31/4L rendering vital healthcare services.',
      ur: 'صحتِ عامہ اور مریضوں کی فلاح کے لیے وقف ڈاکٹر۔',
    },
    image: '/images/people/Sami ullah.png',
    achievement: { en: 'Medical Practitioner', ur: 'میڈیکل ڈاکٹر' },
  },
  {
    id: 503,
    name: { en: 'Dr. Jalal Khan Jatoi', ur: 'ڈاکٹر نعیم جتوئی' },
    type: 'Doctor',
    field: { en: 'Medical Doctor / Healthcare Specialist', ur: 'میڈیکل ڈاکٹر' },
    category: 'Alive',
    bio: {
      en: 'Dedicated medical doctor serving local patients with professional medical care.',
      ur: 'چک 31/4L کے رہائشیوں کو صحت کی دیکھ بھال فراہم کرنے والے فعال طبی ماہر۔',
    },
    image: '/images/people/Jalal.jpeg',
    achievement: { en: 'Medical Specialist', ur: 'میڈیکل ڈاکٹر' },
  },
  // ================= ADVOCATES =================
  {
    id: 601,
    name: { en: 'M. Zaman Jatoi Advocate', ur: 'محمد اسلم' },
    type: 'Advocate',
    field: { en: 'Legal Practitioner / Advocate', ur: 'ایڈوکیٹ / وکیل' },
    category: 'Alive',
    bio: {
      en: 'Prominent Legal Practitioner and Advocate representing justice and legal assistance for the community.',
      ur: 'تجربہ کار قانونی مشیر جو کمیونٹی کے حقوق کی وکالت کرتے ہیں۔',
    },
    image: null,
    achievement: { en: 'Advocate High Court / Legal Practitioner', ur: 'ایڈوکیٹ' },
  },
  {
    id: 602,
    name: { en: 'M. Amin Jatoi Advocate', ur: 'علی جتوئی' },
    type: 'Advocate',
    field: { en: 'Legal Practitioner / Advocate', ur: 'ایڈوکیٹ / وکیل' },
    category: 'Alive',
    bio: {
      en: 'Respected Lawyer dedicated to upholding law, justice, and community advocacy.',
      ur: 'محترم وکیل جو گاؤں کے لیے قانونی رہنمائی فراہم کرتے ہیں۔',
    },
    image: null,
    achievement: { en: 'Advocate / Lawyer', ur: 'ایڈوکیٹ' },
  },
  {
    id: 603,
    name: { en: 'Yasir Nadeem Jatoi Advocate', ur: 'ایڈوکیٹ عمران جتوئی' },
    type: 'Advocate',
    field: { en: 'Legal Practitioner / Advocate', ur: 'ایڈوکیٹ / وکیل' },
    category: 'Alive',
    bio: {
      en: 'Dynamic Advocate providing skilled legal representation and guidance.',
      ur: 'سرشار قانونی پیشہ ور جو انصاف اور عوامی مفاد کے لیے کام کرتے ہیں۔',
    },
    image: null,
    achievement: { en: 'Advocate / Lawyer', ur: 'ایڈوکیٹ' },
  },
  {
    id: 604,
    name: { en: 'Umer Fayaz Jatoi Advocate', ur: 'اویس جتوئی' },
    type: 'Advocate',
    field: { en: 'Legal Practitioner / Advocate', ur: 'ایڈوکیٹ / وکیل' },
    category: 'Alive',
    bio: {
      en: 'Young dedicated Advocate serving the judicial system with integrity.',
      ur: 'نوجوان ایڈوکیٹ جو کمیونٹی میں قانونی خدمات انجام دے رہے ہیں۔',
    },
    image: '/images/people/umer fayyaz.png',
    achievement: { en: 'Advocate / Lawyer', ur: 'ایڈوکیٹ' },
  },
    {
    id: 605,
    name: { en: 'Iqrar Khan Jatoi Advocate', ur: 'اقرار خان جتوئی ایڈوکیٹ' },
    type: 'Advocate',
    field: { en: 'Legal Practitioner / Advocate', ur: 'قانون دان / ایڈوکیٹ' },
    category: 'Alive',
    bio: {
      en: 'Esteemed Advocate representing client rights and community legal welfare.',
      ur: 'عوامی مسائل اور قانونی انصاف کی فراہمی میں مصروف عمل معزز ایڈوکیٹ۔',
    },
    image: '/images/people/Iqrar.png',
    achievement: { en: 'Advocate / Lawyer', ur: 'ایڈوکیٹ' },
  },
];

const MAIN_GROUPS = ['All', 'Numberdar', 'Notable', 'Police', 'Teacher', 'Doctor', 'Advocate'];
const STATUS_FILTERS = ['All', 'Deceased', 'Martyr', 'Alive'];

const GROUP_LABELS = {
  All:       { en: 'All Groups', ur: 'تمام گروپس' },
  Numberdar: { en: 'Numberdar', ur: 'نمبردار' },
  Notable:   { en: 'Notable Personalities', ur: 'معزز شخصیات' },
  Police:    { en: 'Police Department', ur: 'محکمہ پولیس' },
  Teacher:   { en: 'Teachers & Educators', ur: 'اساتذہ اور ماہرین تعلیم' },
  Doctor:    { en: 'Doctors & Healthcare', ur: 'ڈاکٹرز اور طبی ماہرین' },
  Advocate:  { en: 'Advocates & Lawyers', ur: 'وکلاء اور قانون دان' },
};

const STATUS_LABELS = {
  All:      { en: 'All Status', ur: 'تمام' },
  Deceased: { en: 'Deceased', ur: 'مرحومین' },
  Martyr:   { en: 'Martyr (Shaheed)', ur: 'شہداء' },
  Alive:    { en: 'Alive', ur: 'حیات' },
};

const CATEGORY_COLORS = {
  Deceased: { bg: 'bg-stone-100', text: 'text-stone-800', dot: 'bg-stone-500' },
  Martyr:   { bg: 'bg-red-100',   text: 'text-red-800',   dot: 'bg-red-600' },
  Alive:    { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
};

export default function FamousPersonalities() {
  const { lang } = useLang();
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfile, setActiveProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // Store custom uploaded images per personality id
  const [customImages, setCustomImages] = useState({});

  const filtered = personalitiesData.filter(p => {
    const matchGroup  = selectedGroup === 'All' || p.type === selectedGroup;
    const matchStatus = selectedStatus === 'All' || p.category === selectedStatus;
    const nameStr  = get(p.name, lang).toLowerCase();
    const fieldStr = get(p.field, lang).toLowerCase();
    const bioStr   = get(p.bio, lang).toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || nameStr.includes(q) || fieldStr.includes(q) || bioStr.includes(q);
    return matchGroup && matchStatus && matchSearch;
  });

  const handleImageUpload = (id, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomImages(prev => ({ ...prev, [id]: url }));
  };

  const getImage = (p) => customImages[p.id] || p.image;

  const colors = (cat) => CATEGORY_COLORS[cat] || { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };

  return (
    <section id="directory" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* —— Section Header —— */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold tracking-widest text-xs uppercase block mb-3">
            {lang === 'ur' ? 'ہمارے عظیم لوگ' : 'Our Distinguished People'}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-emerald mb-6">
            {lang === 'ur' ? 'مشہور شخصیات' : 'Famous Personalities'}
          </h2>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-lg leading-relaxed">
            {lang === 'ur'
              ? 'چک 31/4L کے ان ممتاز افراد اور نمبرداروں کو خراجِ تحسین جنہوں نے ہمارے گاؤں اور برادری کے لیے گراں قدر خدمات انجام دیں۔'
              : 'Celebrating the distinguished Numberdars and Notable Personalities of Chak 31/4L who have served our community.'}
          </p>
        </div>

        {/* —— Filter & Search Control Panel —— */}
        <div className="mb-14 bg-gradient-to-b from-gray-50/80 to-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm space-y-6">
          
          {/* Top Row: Category Tabs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {lang === 'ur' ? 'شعبہ درج کریں / کا انتخاب کریں' : 'Category / Profession'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {MAIN_GROUPS.map(grp => (
                <button
                  key={grp}
                  onClick={() => setSelectedGroup(grp)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    selectedGroup === grp
                      ? 'bg-brand-emerald text-white shadow-md shadow-brand-emerald/20 scale-[1.02]'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  {get(GROUP_LABELS[grp], lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full" />

          {/* Bottom Row: Status Filter + Search Bar */}
          <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between">
            {/* Status Pills */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mr-1">
                {lang === 'ur' ? 'حالت:' : 'Status:'}
              </span>
              <div className="inline-flex p-1 bg-gray-100/80 rounded-2xl border border-gray-200/60">
                {STATUS_FILTERS.map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      selectedStatus === st
                        ? 'bg-brand-gold text-white shadow-sm'
                        : 'text-gray-600 hover:text-brand-emerald'
                    }`}
                  >
                    {get(STATUS_LABELS[st], lang)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={lang === 'ur' ? 'نام یا عہدہ تلاش کریں...' : 'Search by name or title...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200/90 rounded-2xl text-xs font-medium focus:outline-none focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/10 shadow-sm transition-all"
              />
            </div>
          </div>

        </div>

        {/* —— Cards Grid —— */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {filtered.map(person => {
              const imgSrc = getImage(person);
              const c = colors(person.category);
              return (
                <div
                  key={person.id}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl border border-gray-100 hover:border-brand-moss/30 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Photo Area */}
                  <div 
                    className="relative h-28 sm:h-48 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => imgSrc && setPreviewImage(imgSrc)}
                  >
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={get(person.name, lang)}
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-1 sm:gap-2 opacity-40">
                        <User className="w-8 h-8 sm:w-16 sm:h-16 text-brand-emerald" />
                        <span className="text-[9px] sm:text-xs text-brand-emerald font-medium">No Photo</span>
                      </div>
                    )}

                    {/* Category badge */}
                    <span className={`absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 sm:py-1 ${c.bg} ${c.text} rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 sm:gap-1.5`}>
                      <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${c.dot}`} />
                      {get(STATUS_LABELS[person.category], lang)}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-0.5 font-serif leading-tight">
                      {get(person.name, lang)}
                    </h3>
                    <p className="text-brand-emerald text-[9px] sm:text-xs font-semibold uppercase tracking-wide mb-1.5 sm:mb-3">
                      {get(person.field, lang)}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-sm leading-snug sm:leading-relaxed line-clamp-3 flex-1">
                      {get(person.bio, lang)}
                    </p>

                    {/* Achievement badge */}
                    <div className="mt-2 sm:mt-4 flex items-start gap-1 sm:gap-2 bg-brand-gold/10 border border-brand-gold/25 rounded-lg sm:rounded-xl px-2 py-1.5 sm:px-3 sm:py-2">
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <p className="text-[9px] sm:text-xs text-amber-800 font-medium leading-tight sm:leading-snug">
                        {get(person.achievement, lang)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-brand-cream/10 border border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-500 text-lg">
              {lang === 'ur' ? 'کوئی شخصیت نہیں ملی۔' : 'No personalities found matching your search.'}
            </p>
          </div>
        )}

        {/* —— Continuous Update & Feedback Disclaimer Banner —— */}
        <div className="mt-16 bg-gradient-to-r from-brand-emerald/5 via-brand-gold/10 to-brand-emerald/5 border border-brand-gold/30 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-sm">
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
            {lang === 'ur'
              ? 'یہ فہرست مسلسل اپ ڈیٹ کی جا رہی ہے۔ اگر آپ محسوس کریں کہ کسی مستحق شخصیت کا نام شامل نہیں یا کوئی معلومات غیر درست ہیں تو برائے مہربانی ہمیں آگاہ کریں۔ ہم کسی بھی غیر ارادی کوتاہی پر معذرت خواہ ہیں اور اس ویب سائٹ کو درست رکھنے میں آپ کے تعاون کے مشکور ہیں۔'
              : 'This list is continuously being updated. If you notice that a deserving personality is missing or any information is incorrect, please inform us. We sincerely apologize for any unintentional omissions and appreciate your support in keeping this website accurate.'}
          </p>
        </div>

      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={previewImage} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      )}
    </section>
  );
}
