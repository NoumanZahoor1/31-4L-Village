/* eslint-disable react/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const LANGUAGES = [
  { code: 'en', label: 'EN', native: 'English', dir: 'ltr' },
  { code: 'ur', label: 'اردو', native: 'Urdu',   dir: 'rtl' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const currentLang = LANGUAGES.find(l => l.code === lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, currentLang, LANGUAGES }}>
      <div dir={currentLang.dir} style={{ fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : undefined }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
