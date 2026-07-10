'use client';

import { useStore } from '@/store/useStore';
import { Product } from '@/types';
import { t } from '@/utils/translations';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isLoggedIn,
    language,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert(t('loginRequired', language));
      return;
    }
    if (!selectedSize) {
      alert(t('errorSelectSize', language));
      return;
    }
    addToCart(product, quantity, selectedSize);
    alert(t('addedToCart', language));
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      alert(t('loginRequired', language));
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden bg-light h-64">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{t('outOfStock', language)}</span>
          </div>
        )}
        {discountPercent > 0 && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discountPercent}%
          </div>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-primary hover:text-white transition"
        >
          <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} color={isWishlisted ? '#FF6B6B' : 'gray'} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.round(product.rating) ? '#FFD700' : '#E5E7EB'}
                color={i < Math.round(product.rating) ? '#FFD700' : '#E5E7EB'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews.length})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-primary">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>

        {/* Size Selection */}
        {product.sizes.length > 0 && (
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2 block">{t('selectSize', language)}</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            >
              <option value="">{t('selectSize', language)}</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2 block">{t('quantity', language)}</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
          >
            <ShoppingCart size={18} />
            {t('addToCart', language)}
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-full block text-center bg-light text-dark py-2 rounded-lg hover:bg-gray-200 transition"
          >
            {t('buyNow', language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
