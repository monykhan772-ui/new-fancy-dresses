'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const { language } = useStore();

  return (
    <footer className="bg-dark text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">New Fancy Dresses</h3>
            <p className="text-gray-300 text-sm">
              {language === 'en'
                ? 'Premium fashion and clothing store with latest trends and styles.'
                : 'সর্বশেষ ফ্যাশন এবং স্টাইলের প্রিমিয়াম পোশাক স্টোর।'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('shop', language)}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-primary transition">{t('ladiesWear', language)}</a></li>
              <li><a href="#" className="hover:text-primary transition">{t('gentsWear', language)}</a></li>
              <li><a href="#" className="hover:text-primary transition">{t('kidsFancy', language)}</a></li>
              <li><a href="#" className="hover:text-primary transition">{t('trendingAccessories', language)}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('contactUs', language)}</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>support@newfancydresses.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">{t('aboutUs', language)}</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-primary transition">{t('privacy', language)}</a></li>
              <li><a href="#" className="hover:text-primary transition">{t('terms', language)}</a></li>
              <li><a href="#" className="hover:text-primary transition">{t('contactUs', language)}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>{t('copyright', language)}</p>
        </div>
      </div>
    </footer>
  );
}
