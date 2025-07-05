"use client"

import ProductCard from "./components/ProductCard"
import productsData from "./data/products.json"
import useStore from "./store/useStore"
import enTranslations from "./i18n/en.json"
import arTranslations from "./i18n/ar.json"
import { useEffect } from "react"

function App() {
  const { language, setLanguage, wishlist, compareList, toggleWishlist, toggleCompare, isInWishlist, isInCompare } =
    useStore()

  const translations = language === "ar" ? arTranslations : enTranslations
  const isRTL = language === "ar"

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }
  useEffect(() => {
  const isRTL = language === 'ar';
  document.documentElement.lang = language;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
}, [language]);

  return (
    <div className={`min-h-screen bg-gray-100 ${isRTL ? "font-arabic" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 left-4 rtl:left-auto rtl:right-4  z-50 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-semibold shadow-lg hover:shadow-xl"
      >
        {translations.toggleLanguage}
      </button>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold text-gray-900 mb-2 text-start ${isRTL ? "text-right" : "text-left"}`}>
            {translations.productCards}
          </h1>
          <div className={`flex items-center gap-4 text-sm text-gray-600 justify-start `}>
            <span>❤️ {wishlist.length}  {translations.itemsInWishlist} </span>
            <span>📊 {compareList.length}/3  {}{translations.itemsToCompare}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Compare Counter - Fixed Position */}
        {compareList.length > 0 && (
          <div
            className={`fixed bottom-4 z-20 bg-white rounded-lg shadow-lg p-4 border-2 border-blue-200 ${isRTL ? "left-4" : "right-4"}`}
          >
            <div className={`text-sm font-medium text-gray-700 text-start `}>
              📊 {translations.compareList}: {compareList.length}/3
            </div>
            {compareList.length === 3 && <div className="text-xs text-blue-600 mt-1">{translations.maxCompare}</div>}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
