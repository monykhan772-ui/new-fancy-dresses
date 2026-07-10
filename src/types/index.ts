export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  image: string[];
  images: string[];
  description: string;
  rating: number;
  reviews: Review[];
  stock: number;
  sizes: string[];
  sizeChart: SizeChart;
}

export interface SizeChart {
  chest: string;
  length: string;
  shoulder: string;
  waist?: string;
  hips?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  product?: Product;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  image?: string;
  createdAt: string;
  verified: boolean;
}

export interface Order {
  orderId: string;
  customerId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  shippingAddress: Address;
  paymentMethod: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  houseNo: string;
  address: string;
  addressType: 'home' | 'work';
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  role: 'admin';
  lastLogin: string;
}

export interface CouponCode {
  code: string;
  discount: number;
  maxUses: number;
  currentUses: number;
  expiryDate: string;
  active: boolean;
}
