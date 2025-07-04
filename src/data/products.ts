import type { Product } from "../store/useStore"

export const mockProducts: Product[] = [
  {
    id: 1,
    name: {
      en: "iPhone 15",
      ar: "آيفون 15",
    },
    price: 999,
    original_price: 1199,
    type: "simple",
    image: "https://via.placeholder.com/300x300/007ACC/FFFFFF?text=iPhone+15",
    discount: 200,
    is_featured: true,
    ai_suggested: true,
  },
  {
    id: 2,
    name: {
      en: "T-Shirt",
      ar: "تي شيرت",
    },
    type: "variable",
    variations: [{ price: 50 }, { price: 75 }, { price: 60 }],
    image: "https://via.placeholder.com/300x300/28A745/FFFFFF?text=T-Shirt",
    is_featured: false,
    ai_suggested: false,
  },
  {
    id: 3,
    name: {
      en: "Laptop",
      ar: "لابتوب",
    },
    price: 1500,
    original_price: 1800,
    type: "simple",
    image: "https://via.placeholder.com/300x300/6F42C1/FFFFFF?text=Laptop",
    discount: 300,
    is_featured: true,
    ai_suggested: false,
  },
  {
    id: 4,
    name: {
      en: "Sneakers",
      ar: "حذاء رياضي",
    },
    type: "variable",
    variations: [{ price: 120 }, { price: 150 }, { price: 180 }],
    image: "https://via.placeholder.com/300x300/FD7E14/FFFFFF?text=Sneakers",
    is_featured: false,
    ai_suggested: true,
  },
]
