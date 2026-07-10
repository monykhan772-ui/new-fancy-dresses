'use client';

import { useStore } from '@/store/useStore';
import { t } from '@/utils/translations';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { sanitizeInput } from '@/utils/sanitize';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const { setSearchQuery, language } = useStore();

  const handleSearch = (value: string) => {
    const sanitized = sanitizeInput(value);
    setInput(sanitized);
    setSearchQuery(sanitized);
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-[73px] z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex items-center">
          <Search size={20} className="absolute left-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('search', language)}
            value={input}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition"
          />
        </div>
      </div>
    </div>
  );
}
