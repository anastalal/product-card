// src/store/useStore.ts

import { create } from "zustand"

// 1. تعريف واجهة (Interface) لتحديد شكل الحالة والإجراءات
interface StoreState {
  language: 'en' | 'ar';
  wishlist: number[];
  compareList: number[];
  setLanguage: (lang: 'en' | 'ar') => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleCompare: (productId: number) => boolean; // Returns true on success, false on failure
  isInCompare: (productId: number) => boolean;
  clearCompareList: () => void;
}

// 2. استخدام الواجهة مع دالة create من Zustand
const useStore = create<StoreState>()((set, get) => ({
  // الحالة الأولية
  language: "en",
  wishlist: [],
  compareList: [],

  // الإجراءات (Actions)
  setLanguage: (lang) => set({ language: lang }),

  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),

  // دوال "Selectors" للحصول على بيانات مشتقة
  isInWishlist: (productId) => get().wishlist.includes(productId),
  
  toggleCompare: (productId) => {
    const { compareList } = get(); // Get current state
    if (compareList.includes(productId)) {
      set({ compareList: compareList.filter((id) => id !== productId) });
      return true; // Operation was successful
    } else if (compareList.length < 3) {
      set({ compareList: [...compareList, productId] });
      return true; // Operation was successful
    } else {
      return false; // Max limit reached, operation failed
    }
  },

  isInCompare: (productId) => get().compareList.includes(productId),

  clearCompareList: () => set({ compareList: [] }),
}));

export default useStore;
