import { create } from "zustand"

const useStore = create((set, get) => ({
  // Language state
  language: "en",
  setLanguage: (lang) => set({ language: lang }),

  // Wishlist state
  wishlist: [],
  toggleWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
  isInWishlist: (productId) => get().wishlist.includes(productId),

  // Compare list state
  compareList: [],
  toggleCompare: (productId) => {
  let success = false;
  set((state) => {
    if (state.compareList.includes(productId)) {
      success = true;
      return { compareList: state.compareList.filter((id) => id !== productId) };
    }
    if (state.compareList.length < 3) {
      success = true;
      return { compareList: [...state.compareList, productId] };
    }
    // If max limit reached
    success = false;
    return state; // Do not change state
  });
  return success;
},
  isInCompare: (productId) => get().compareList.includes(productId),
  clearCompareList: () => set({ compareList: [] }),
}))

export default useStore
