'use client';

import { useStore } from '@/store/useStore';
import { COUPONS } from '@/data/products';
import { t } from '@/utils/translations';
import {
  isValidName,
  isValidPhone,
  isValidPincode,
  isValidAddress,
  sanitizeInput,
} from '@/utils/sanitize';
import { useState } from 'react';
import { Order } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const {
    cart,
    clearCart,
    shippingAddress,
    setShippingAddress,
    appliedCoupon,
    applyCoupon,
    getCartTotal,
    userId,
    addOrder,
    language,
    isLoggedIn,
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || '',
    mobile: shippingAddress?.mobile || '',
    pincode: shippingAddress?.pincode || '',
    houseNo: shippingAddress?.houseNo || '',
    address: shippingAddress?.address || '',
    addressType: (shippingAddress?.addressType as 'home' | 'work') || 'home',
  });

  const [couponCode, setCouponCode] = useState('');
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const subtotal = getCartTotal();
  const coupon = COUPONS.find((c) => c.code === appliedCoupon && c.active);
  const discount = coupon ? (subtotal * coupon.discount) / 100 : 0;
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'fullName' || name === 'address' ? sanitizeInput(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!isValidName(formData.fullName)) newErrors.fullName = t('errorFullName', language);
    if (!isValidPhone(formData.mobile)) newErrors.mobile = t('errorPhoneNumber', language);
    if (!isValidPincode(formData.pincode)) newErrors.pincode = t('errorPincode', language);
    if (!formData.houseNo) newErrors.houseNo = language === 'en' ? 'House number required' : 'বাড়ির নম্বর আবশ্যক';
    if (!isValidAddress(formData.address)) newErrors.address = t('errorAddress', language);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    const coupon = COUPONS.find((c) => c.code === couponCode && c.active);
    if (coupon) {
      applyCoupon(couponCode);
      alert(t('success', language));
      setCouponCode('');
    } else {
      alert(t('errorInvalidCoupon', language));
    }
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      alert(t('loginRequired', language));
      return;
    }

    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      const newAddress = { ...formData, addressType: formData.addressType as 'home' | 'work' };
      setShippingAddress(newAddress);

      const order: Order = {
        orderId: `ORD-${Date.now()}`,
        customerId: userId || '',
        items: cart,
        subtotal,
        discount,
        tax,
        total,
        couponCode: appliedCoupon || undefined,
        shippingAddress: newAddress,
        paymentMethod: 'Cash on Delivery',
        orderDate: new Date().toISOString(),
        status: 'pending',
      };

      addOrder(order);

      // Simulate Telegram notification
      console.log('Order placed:', order);

      alert(t('orderPlaced', language));
      clearCart();
      window.location.href = `/order-success/${order.orderId}`;
    } catch (error) {
      alert(t('errorCheckout', language));
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">{t('cartEmpty', language)}</p>
        <Link href="/" className="text-primary hover:text-red-600">{t('continueShopping', language)}</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/cart" className="flex items-center gap-2 text-primary hover:text-red-600 mb-6">
        <ArrowLeft size={20} />
        {t('shoppingCart', language)}
      </Link>

      <h1 className="text-3xl font-bold mb-8">{t('checkout', language)}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('shippingAddress', language)}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">{t('fullName', language)}</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t('mobileNumber', language)}</label>
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                {errors.mobile && <p className="text-red-600 text-sm mt-1">{errors.mobile}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">{t('pincode', language)}</label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">{t('houseNo', language)}</label>
                  <input
                    type="text"
                    name="houseNo"
                    value={formData.houseNo}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  {errors.houseNo && <p className="text-red-600 text-sm mt-1">{errors.houseNo}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t('address', language)}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t('addressType', language)}</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      value="home"
                      checked={formData.addressType === 'home'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>{t('home', language)}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      value="work"
                      checked={formData.addressType === 'work'}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span>{t('work', language)}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{t('paymentMethod', language)}</h2>
            <div className="flex items-center gap-2">
              <input type="radio" checked readOnly className="w-4 h-4" />
              <span className="font-semibold">{t('cod', language)}</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-40 space-y-4">
            <h3 className="text-xl font-bold">{t('cartTotal', language)}</h3>

            {/* Coupon */}
            <div className="border-t pt-4 space-y-2">
              <input
                type="text"
                placeholder={t('promoCode', language)}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
              <button
                onClick={handleApplyCoupon}
                className="w-full text-sm bg-light hover:bg-gray-200 py-2 rounded-lg transition"
              >
                {t('applyCoupon', language)}
              </button>
              {appliedCoupon && (
                <p className="text-sm text-green-600 font-semibold">
                  {appliedCoupon} {t('applied', language) || 'Applied'}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="border-t pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>{t('subtotal', language)}</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{t('discount', language)}</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t('tax', language)}</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>{t('total', language)}</span>
                <span className="text-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={processing}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400 font-bold transition mt-4"
            >
              {processing ? t('processing', language) : t('placeOrder', language)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
