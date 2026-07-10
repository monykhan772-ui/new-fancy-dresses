'use client';

import { useStore } from '@/store/useStore';
import { CATEGORIES } from '@/data/products';
import { t } from '@/utils/translations';
import { ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

const categoryIcons: { [key: string]: string } = {
  'Ladies Wear': '👗',
  'Gents Wear': '👔',
  'Kids Fancy': '👧',
  'Trending Accessories': '✨',
};

export default function CategoryNav() {
  const { selectedCategory, setSelectedCategory, language } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-white border-b sticky top-[73px] z-40">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center">
          {showLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-light transition"
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 py-4 overflow-x-auto scrollbar-hide px-8"
            onScroll={() => {
              if (scrollRef.current) {
                setShowLeft(scrollRef.current.scrollLeft > 0);
                setShowRight(
                  scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
                );
              }
            }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                className={`flex flex-col items-center gap-2 px-6 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-light text-dark hover:bg-gray-300'
                }`}
              >
                <span className="text-2xl">{categoryIcons[category]}</span>
                <span className="text-sm font-semibold">{t(category.toLowerCase().replace(/\s+/g, ''), language) || category}</span>
              </button>
            ))}
          </div>

          {showRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-light transition"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
