'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { useState, useEffect } from 'react';
import { Lock, LogOut, Package, TrendingUp, Tag } from 'lucide-react';

const ADMIN_PASSWORD = 'admin123';

export default function AdminPage() {
  const { language } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (isLocked) {
      const interval = setInterval(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked]);

  const handleLogin = () => {
    if (isLocked) {
      alert(t('tooManyAttempts', language));
      return;
    }

    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setPassword('');
      setLoginAttempts(0);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimer(900);
        alert(t('tooManyAttempts', language));
      } else {
        alert(t('errorPassword', language));
      }
      setPassword('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Lock size={32} className="text-primary" />
            <h1 className="text-3xl font-bold">{t('adminDashboard', language)}</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{t('adminPassword', language)}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                disabled={isLocked}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary disabled:bg-gray-100"
                placeholder={t('enterPassword', language)}
              />
            </div>
            {isLocked && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {t('tooManyAttempts', language)} ({lockTimer}s)
              </p>
            )}
            <button
              onClick={handleLogin}
              disabled={isLocked || !password}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400 font-bold transition"
            >
              {t('adminLogin', language)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('adminDashboard', language)}</h1>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          {t('logout', language)}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        {[
          { id: 'products', label: t('productManagement', language), icon: Package },
          { id: 'pricing', label: t('priceController', language), icon: TrendingUp },
          { id: 'coupons', label: t('couponManagement', language), icon: Tag },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-primary'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('productManagement', language)}</h2>
            <p className="text-gray-600 mb-4">
              {language === 'en'
                ? 'Product management interface - Edit/Delete products coming soon'
                : 'পণ্য ব্যবস্থাপনা ইন্টারফেস - শীঘরে লগই হবে'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="bg-light h-32 rounded-lg mb-4"></div>
                  <p className="font-semibold">Product {i}</p>
                  <p className="text-gray-600 text-sm">₹1,299</p>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold">
                      {t('editProduct', language)}
                    </button>
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold">
                      {t('deleteProduct', language)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('priceController', language)}</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Product {i}</p>
                    <p className="text-gray-600 text-sm">Current: ₹1,299</p>
                  </div>
                  <input
                    type="number"
                    placeholder="New price"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  />
                  <button className="px-6 py-2 bg-primary text-white rounded hover:bg-red-600 font-semibold">
                    {t('updatePrice', language)}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('couponManagement', language)}</h2>
            <div className="space-y-4">
              {['FANCY20', 'SAVE15', 'NEWUSER10'].map((code) => (
                <div key={code} className="border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-lg">{code}</p>
                    <p className="text-gray-600 text-sm">20% Discount</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold">
                      {t('editCoupon', language)}
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold">
                      {t('deleteCoupon', language)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
