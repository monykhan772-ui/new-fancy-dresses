'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { useState } from 'react';
import { Lock, LogOut, Package, TrendingUp, Tag } from 'lucide-react';

const ADMIN_PASSWORD = 'AB!?NFD$#$#2343TB&&NP';

export default function AdminPage() {
  const { language } = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const [activeTab, setActiveTab] = useState('products');

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
                {t('tooManyAttempts', language)}
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

      <div className="flex gap-4 mb-8 border-b">
        {['products', 'pricing', 'coupons'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold border-b-2 transition ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600'
            }`}
          >
            {tab === 'products' && t('productManagement', language)}
            {tab === 'pricing' && t('priceController', language)}
            {tab === 'coupons' && t('couponManagement', language)}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        {activeTab === 'products' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('productManagement', language)}</h2>
            <p className="text-gray-600">Product management dashboard</p>
          </div>
        )}
        {activeTab === 'pricing' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('priceController', language)}</h2>
            <p className="text-gray-600">Price management dashboard</p>
          </div>
        )}
        {activeTab === 'coupons' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{t('couponManagement', language)}</h2>
            <p className="text-gray-600">Coupon management dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}
