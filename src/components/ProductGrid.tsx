'use client';

import { useStore } from '@/store/useStore';
import { PRODUCTS } from '@/data/products';
import { t } from '@/utils/translations';
import ProductCard from './ProductCard';
import { useMemo } from 'react';

export default function ProductGrid() {
  const {
    selectedCategory,
    selectedBrands,
    priceRange,
    searchQuery,
    language,
  } = useStore();

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const categoryMatch =
        !selectedCategory || product.category === selectedCategory;
      const brandMatch =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const priceMatch =
        product.price >= priceRange.min && product.price <= priceRange.max;
      const searchMatch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && brandMatch && priceMatch && searchMatch;
    });
  }, [selectedCategory, selectedBrands, priceRange, searchQuery]);

  return (
    <div className="flex-1">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">{t('noProductsMatch', language)}</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            {filteredProducts.length} {t('products', language)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
