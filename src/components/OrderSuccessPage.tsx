'use client';

import { Order } from '@/types';
import { t } from '@/utils/translations';
import { generateInvoicePDF } from '@/utils/pdf';
import { Download, Home } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage({ params }: { params: { orderId: string } }) {
  const language = 'en';
  const order: Order = {
    orderId: params.orderId,
    customerId: 'user123',
    items: [],
    subtotal: 5000,
    discount: 1000,
    tax: 400,
    total: 4400,
    couponCode: 'FANCY20',
    shippingAddress: {
      fullName: 'John Doe',
      mobile: '9876543210',
      pincode: '123456',
      houseNo: '123',
      address: 'Main Street',
      addressType: 'home',
    },
    paymentMethod: 'Cash on Delivery',
    orderDate: new Date().toISOString(),
    status: 'confirmed',
  };

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="text-6xl mb-6 animate-bounce">✓</div>
        <h1 className="text-3xl font-bold mb-4 text-primary">{t('orderPlaced', language)}</h1>
        <p className="text-gray-600 mb-2">{t('orderId', language)}: {order.orderId}</p>
        <p className="text-gray-600 mb-8">Total: ₹{order.total.toFixed(2)}</p>

        <div className="space-y-3">
          <button
            onClick={() => generateInvoicePDF(order)}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-lg hover:bg-red-600 font-bold transition"
          >
            <Download size={18} />
            {t('downloadInvoice', language)}
          </button>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 bg-light text-dark py-3 rounded-lg hover:bg-gray-200 font-bold transition"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
