'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const { language } = useStore();
  const features = [
    { icon: '⚡', title: language === 'en' ? 'Fast Delivery' : 'দ্রুত ডেলিভারি' },
    { icon: '🛡️', title: language === 'en' ? 'Secure Payment' : 'নিরাপদ পেমেন্ট' },
    { icon: '💯', title: language === 'en' ? 'Quality Assured' : 'গুণমান নিশ্চিত' },
    { icon: '🎁', title: language === 'en' ? 'Best Prices' : 'সেরা দাম' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('welcome', language)}</h1>
          <p className="text-xl mb-8 opacity-90">
            {language === 'en'
              ? 'Discover the latest fashion trends at unbeatable prices'
              : 'অবিশ্বাস্য দামে সর্বশেষ ফ্যাশন ট্রেন্ড আবিষ্কার করুন'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-light transition"
          >
            <ShoppingCart size={20} />
            {t('shop', language)}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="text-center p-6 rounded-lg bg-light hover:shadow-lg transition">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <p className="font-bold text-lg">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {language === 'en' ? 'Start Shopping Now' : 'এখনই কেনাকাটা শুরু করুন'}
        </h2>
        <p className="mb-6 opacity-90">
          {language === 'en'
            ? 'Browse our exclusive collection of dresses and accessories'
            : 'আমাদের একচেটিয়া পোশাক এবং এক্সেসরিজ সংগ্রহ ব্রাউজ করুন'}
        </p>
        <Link href="/" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-light transition">
          {t('shop', language)}
        </Link>
      </section>
    </div>
  );
}
