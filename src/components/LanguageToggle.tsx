"use client"

import  useStore  from "../store/useStore"
import enTranslations from "../i18n/en.json"
import arTranslations from "../i18n/ar.json"

export default function LanguageToggle() {
  const { language, setLanguage } = useStore()
   const translations = language === "ar" ? arTranslations : enTranslations

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="fixed top-4 right-4 z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
    >
      {translations.toggleLanguage}
    </button>
  )
}
