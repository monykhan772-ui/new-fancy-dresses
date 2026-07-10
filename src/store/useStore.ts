import { create } from 'zustand';
import { Product, CartItem, WishlistItem, Order, Address } from '@/types';

interface StoreState {
  isLoggedIn: boolean;
  userId: string | null;
  userEmail: string | null;
  userPhone: string | null;
  userName: string | null;
  login: (userId: string, email: string, phone: string, name: string) => void;
  logout: () => void;

  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity: number, size: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  selectedCategory: string;
  selectedBrands: string[];
  priceRange: { min: number; max: number };
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSelectedBrands: (brands: string[]) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;

  appliedCoupon: string | null;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;

  orders: Order[];
  addOrder: (order: Order) => void;
  getOrders: () => Order[];

  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  isLoggedIn: false,
  userId: null,
  userEmail: null,
  userPhone: null,
  userName: null,
  login: (userId, email, phone, name) =>
    set({ isLoggedIn: true, userId, userEmail: email, userPhone: phone, userName: name }),
  logout: () =>
    set({
      isLoggedIn: false,
      userId: null,
      userEmail: null,
      userPhone: null,
      userName: null,
      cart: [],
    }),

  language: 'en',
  setLanguage: (lang) => set({ language: lang }),

  cart: [],
  addToCart: (product, quantity, size) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === product.id && item.size === size
      );
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === product.id && item.size === size
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        cart: [
          ...state.cart,
          { productId: product.id, quantity, size, product },
        ],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  updateCartQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => {
      const product = item.product;
      if (product) {
        return total + product.price * item.quantity;
      }
      return total;
    }, 0);
  },
  getCartItemCount: () => {
    const state = get();
    return state.cart.reduce((count, item) => count + item.quantity, 0);
  },

  wishlist: [],
  addToWishlist: (productId) =>
    set((state) => ({
      wishlist: [
        ...state.wishlist,
        { productId, addedAt: new Date().toISOString() },
      ],
    })),
  removeFromWishlist: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.productId !== productId),
    })),
  isInWishlist: (productId) => {
    const state = get();
    return state.wishlist.some((item) => item.productId === productId);
  },

  selectedCategory: '',
  selectedBrands: [],
  priceRange: { min: 0, max: 10000 },
  searchQuery: '',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedBrands: (brands) => set({ selectedBrands: brands }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetFilters: () =>
    set({
      selectedCategory: '',
      selectedBrands: [],
      priceRange: { min: 0, max: 10000 },
      searchQuery: '',
    }),

  appliedCoupon: null,
  applyCoupon: (code) => set({ appliedCoupon: code }),
  removeCoupon: () => set({ appliedCoupon: null }),

  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  getOrders: () => get().orders,

  shippingAddress: null,
  setShippingAddress: (address) => set({ shippingAddress: address }),
}));
