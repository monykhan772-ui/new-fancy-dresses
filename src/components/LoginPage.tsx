'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { isValidPhone } from '@/utils/sanitize';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(0);
  const { login, language } = useStore();

  const handleSendOTP = () => {
    if (!isValidPhone(phone)) {
      alert(t('errorPhoneNumber', language));
      return;
    }
    setShowOTP(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 4) {
      alert('Enter 4-digit OTP');
      return;
    }
    login(`user_${phone}`, `user_${phone}@nfd.com`, phone, `User ${phone}`);
    alert(t('success', language));
    window.location.href = '/';
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t('phoneLogin', language)}</h1>

        {!showOTP ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{t('mobileNumber', language)}</label>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={!phone || phone.length !== 10}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400 font-bold transition"
            >
              {t('sendOTP', language)}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">{t('otpSent', language)}</p>
            <div>
              <label className="block text-sm font-semibold mb-2">{t('enterOTP', language)}</label>
              <input
                type="text"
                placeholder="0000"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary text-center text-2xl tracking-widest"
              />
            </div>
            {timer > 0 && (
              <p className="text-center text-sm text-gray-600">
                {t('otpCountdown', language)}: {timer} {t('seconds', language)}
              </p>
            )}
            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 4}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-400 font-bold transition"
            >
              {t('verifyOTP', language)}
            </button>
            <button
              onClick={() => {
                setShowOTP(false);
                setOtp('');
                setTimer(0);
              }}
              className="w-full text-primary py-3 rounded-lg hover:bg-light transition font-semibold"
            >
              {t('resendOTP', language)}
            </button>
          </div>
        )}

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-gray-600 mb-4">{language === 'en' ? 'Or continue as guest' : 'অথবা অতিথি হিসাবে জারি রাখুন'}</p>
          <Link href="/" className="text-primary hover:text-red-600 font-semibold">
            {t('loginAsGuest', language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
