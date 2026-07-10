'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { Heart, ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, language } = useStore();
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.some((w) => w.productId === p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('wishlist', language)}</h1>
        <p className="text-gray-600 mb-8">{language === 'en' ? 'Your wishlist is empty' : 'আপনার উইশলিস্ট খালি'}</p>
        <Link href="/" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-600">
          {t('continueShopping', language)}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="flex items-center gap-2 text-primary hover:text-red-600 mb-6">
        <ArrowLeft size={20} />
        {t('continueShopping', language)}
      </Link>

      <h1 className="text-3xl font-bold mb-8">{t('wishlist', language)}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
            <p className="text-primary font-bold mb-4">₹{product.price}</p>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-100 py-2 rounded-lg transition"
            >
              <Heart size={18} fill="currentColor" />
              {t('removeFromWishlist', language)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
