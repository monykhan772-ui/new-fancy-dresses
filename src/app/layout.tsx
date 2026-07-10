'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryNav from '@/components/CategoryNav';
import SearchBar from '@/components/SearchBar';

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <SearchBar />
      <CategoryNav />
      <main className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
