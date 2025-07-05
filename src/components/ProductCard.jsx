"use client"

import { useState } from "react"
import useStore from "../store/useStore"
import enTranslations from "../i18n/en.json"
import arTranslations from "../i18n/ar.json"

const ProductCard = ({ product }) => {
  const { language, toggleWishlist, toggleCompare, isInWishlist, isInCompare } = useStore()

  // Get translations based on current language
  const translations = language === "ar" ? arTranslations : enTranslations

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isRTL = language === "ar"
  const isLiked = isInWishlist(product.id)
  const isCompared = isInCompare(product.id)

  const handleCompareClick = () => {
    const success = toggleCompare(product.id)
    if (!success) {
      alert(translations.maxCompare)
    }
  }

  const calculateDiscountPercentage = () => {
    if (product.type === "simple" && product.original_price && product.price) {
      return Math.round(((product.original_price - product.price) / product.original_price) * 100)
    }
    return 0
  }

  const getPriceDisplay = () => {
    if (product.type === "simple") {
      return (
        <div className={`flex items-center gap-2 text-start justify-start `}>
          <span className="text-lg font-bold text-gray-900">
            {product.price} {translations.bhd}
          </span>
          {product.original_price && product.original_price > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {product.original_price} {translations.bhd}
            </span>
          )}
        </div>
      )
    } else {
      const prices = product.variations?.map((v) => v.price) || []
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)

      return (
        <div className={`text-lg font-bold text-start text-gray-900 `}>
          {translations.from} {minPrice} {translations.to} {maxPrice} {translations.bhd}
        </div>
      )
    }
  }

  const discountPercentage = calculateDiscountPercentage()

  return (
    <div
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isRTL ? "font-arabic" : ""
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Badges */}
      <div className={`absolute top-2 z-10 flex flex-col justify-start items-start left-2 rtl:right-2 rtl:left-auto  gap-1 `}>
        {product.is_featured && (
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
             {translations.featured} ⭐
          </span>
        )}
        {product.ai_suggested && (
          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
           {translations.aiSuggested}  🤖
          </span>
        )}
        {discountPercentage > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
            {discountPercentage}% {translations.off} 🏷️
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">📷</div>
              <div className="text-sm">Image not available</div>
            </div>
          </div>
        ) : (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name[language]}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true)
              setImageLoaded(true)
            }}
          />
        )}

        {/* Action Icons */}
        <div className={`absolute top-2 flex flex-col gap-2 justify-start items-start right-2 rtl:left-2 rtl:right-auto  `}>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`size-10 flex justify-center items-center rounded-full transition-all duration-200 shadow-md hover:scale-110 ${
              isLiked ? "bg-red-300 text-white" : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
            }`}
            title={isLiked ? translations.removeWishlist : translations.wishlist}
          >
            <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
          </button>

          <button
            onClick={handleCompareClick}
            className={`size-10 flex justify-center items-center rounded-full transition-all duration-200 shadow-md hover:scale-110 ${
              isCompared ? "bg-blue-300 text-white" : "bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500"
            }`}
            title={translations.compare}
          >
            <span className=" text-lg">📊</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className={`flex items-center justify-between mb-3`}>
          <h3 className={`font-semibold text-gray-900 text-lg text-start `}>
            {product.name[language]}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              product.type === "simple" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
            }`}
          >
            {translations[product.type]}
          </span>
        </div>

        {/* Price */}
        <div className="text-start">{getPriceDisplay()}</div>
      </div>
    </div>
  )
}

export default ProductCard
