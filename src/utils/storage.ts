const STORAGE_KEYS = {
  CART: 'nfd_cart',
  WISHLIST: 'nfd_wishlist',
  USER: 'nfd_user',
  ORDERS: 'nfd_orders',
  ADMIN_ATTEMPTS: 'nfd_admin_attempts',
  ADMIN_LOCKOUT: 'nfd_admin_lockout',
  LANGUAGE: 'nfd_language',
};

export function saveToLocalStorage(key: string, data: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('LocalStorage save failed:', error);
  }
}

export function getFromLocalStorage(key: string): any {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('LocalStorage remove failed:', error);
  }
}

export const StorageKeys = STORAGE_KEYS;
