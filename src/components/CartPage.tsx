'use client';

import { useStore } from '@/store/useStore';
import { PRODUCTS } from '@/data/products';
import { t } from '@/utils/translations';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, language } = useStore();
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('shoppingCart', language)}</h1>
        <p className="text-gray-600 mb-8">{t('cartEmpty', language)}</p>
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

      <h1 className="text-3xl font-bold mb-8">{t('shoppingCart', language)}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="bg-white p-6 rounded-lg shadow-md flex gap-4">
                <img
                  src={item.product?.image[0] || ''}
                  alt={item.product?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.product?.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{t('size', language)}: {item.size}</p>
                  <p className="text-primary font-bold">₹{item.product?.price}</p>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-light"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      className="p-1 hover:bg-light"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                  <p className="font-bold">₹{(item.product?.price || 0) * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-40 space-y-4">
            <h3 className="text-xl font-bold">{t('cartTotal', language)}</h3>
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>{t('subtotal', language)}</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('tax', language)}</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span>{t('total', language)}</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full block text-center bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-bold transition"
            >
              {t('proceedToCheckout', language)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
