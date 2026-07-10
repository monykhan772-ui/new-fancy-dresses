'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, isLoggedIn, logout, getCartItemCount, wishlist } = useStore();
  const cartCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            New Fancy Dresses
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-primary transition">{t('home', language)}</Link>
            <Link href="/shop" className="hover:text-primary transition">{t('shop', language)}</Link>
            {isLoggedIn && <Link href="/admin" className="hover:text-primary transition">{t('admin', language)}</Link>}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="px-3 py-2 rounded-lg bg-light hover:bg-gray-200 transition text-sm font-medium"
            >
              {language === 'en' ? t('bangla', language) : t('english', language)}
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative hover:text-primary transition">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative hover:text-primary transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition"
              >
                {t('logout', language)}
              </button>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition">
                {t('login', language)}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t pt-4">
            <Link href="/" className="hover:text-primary transition">{t('home', language)}</Link>
            <Link href="/shop" className="hover:text-primary transition">{t('shop', language)}</Link>
            {isLoggedIn && <Link href="/admin" className="hover:text-primary transition">{t('admin', language)}</Link>}
          </nav>
        )}
      </div>
    </header>
  );
}
