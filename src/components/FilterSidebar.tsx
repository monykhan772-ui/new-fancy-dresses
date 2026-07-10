'use client';

import { useStore } from '@/store/useStore';
import { BRANDS, PRICE_RANGES } from '@/data/products';
import { t } from '@/utils/translations';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function FilterSidebar() {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    brands: true,
    price: true,
  });

  const {
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    language,
    resetFilters,
  } = useStore();

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand]
    );
  };

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-40">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">{t('filters', language)}</h3>
        {(selectedBrands.length > 0 || priceRange.min > 0 || priceRange.max < 10000) && (
          <button
            onClick={resetFilters}
            className="text-xs text-primary hover:text-red-600 font-semibold"
          >
            {t('clearFilters', language)}
          </button>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6 border-b pb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full font-semibold mb-4"
        >
          {t('filterByBrand', language)}
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.brands ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.brands && (
          <div className="space-y-3">
            {BRANDS.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-semibold mb-4"
        >
          {t('filterByPrice', language)}
          <ChevronDown
            size={18}
            className={`transition ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            {PRICE_RANGES.map((range) => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange.min === range.min && priceRange.max === range.max}
                  onChange={() => setPriceRange({ min: range.min, max: range.max })}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
