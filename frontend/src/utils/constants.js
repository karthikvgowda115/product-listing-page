// Innerwear Categories
export const INNERWEAR_CATEGORIES = [
  { 
    id: 'all', 
    name: 'All Innerwear', 
    description: 'Browse all innerwear products',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505'
  },
  { 
    id: 'boxers', 
    name: 'Boxers', 
    description: 'Comfortable boxers for everyday wear',
    icon: '🩳',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3'
  },
  { 
    id: 'briefs', 
    name: 'Briefs', 
    description: 'Classic and seamless briefs',
    icon: '🩲',
    image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f'
  },
  { 
    id: 'vests', 
    name: 'Vests', 
    description: 'Cotton and sports vests',
    icon: '👕',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27'
  },
  { 
    id: 'thermal-wear', 
    name: 'Thermal Wear', 
    description: 'Winter thermal innerwear',
    icon: '🧥',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446'
  },
  { 
    id: 'innerwear-sets', 
    name: 'Innerwear Sets', 
    description: 'Value packs and combos',
    icon: '🎁',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8'
  },
  { 
    id: 'sports-innerwear', 
    name: 'Sports Innerwear', 
    description: 'Compression and performance wear',
    icon: '🏃',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3'
  }
];

// Materials
export const MATERIALS = [
  { id: 'cotton', name: 'Cotton', icon: '🧵' },
  { id: 'microfiber', name: 'Microfiber', icon: '✨' },
  { id: 'polyester', name: 'Polyester', icon: '🛡️' },
  { id: 'spandex', name: 'Spandex', icon: '🧘' },
  { id: 'bamboo', name: 'Bamboo', icon: '🎍' },
  { id: 'silk', name: 'Silk', icon: '👑' },
  { id: 'wool-blend', name: 'Wool Blend', icon: '🧶' }
];

// Gender Options - Fixed export
export const GENDER_OPTIONS = [
  { id: 'all', name: 'All', icon: '👥' },
  { id: 'men', name: 'Men', icon: '👨' },
  { id: 'women', name: 'Women', icon: '👩' },
  { id: 'unisex', name: 'Unisex', icon: '👤' }
];

// Innerwear Sizes - Fixed export
export const INNERWEAR_SIZES = [
  { id: 'xs', name: 'XS', label: 'Extra Small' },
  { id: 's', name: 'S', label: 'Small' },
  { id: 'm', name: 'M', label: 'Medium' },
  { id: 'l', name: 'L', label: 'Large' },
  { id: 'xl', name: 'XL', label: 'Extra Large' },
  { id: 'xxl', name: 'XXL', label: 'Double XL' },
  { id: 'xxxl', name: 'XXXL', label: 'Triple XL' }
];

// Price Ranges - Fixed export
export const PRICE_RANGES = [
  { id: 'under-500', label: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1000', label: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: '1000-2000', label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { id: '2000-5000', label: '₹2000 - ₹5000', min: 2000, max: 5000 },
  { id: 'above-5000', label: 'Above ₹5000', min: 5000, max: 100000 }
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured', icon: '⭐' },
  { value: 'newest', label: 'New Arrivals', icon: '🆕' },
  { value: 'price_asc', label: 'Price: Low to High', icon: '📈' },
  { value: 'price_desc', label: 'Price: High to Low', icon: '📉' },
  { value: 'rating', label: 'Top Rated', icon: '🏆' },
  { value: 'discount', label: 'Best Discount', icon: '💸' },
  { value: 'bestseller', label: 'Bestseller', icon: '🔥' }
];

// App Configuration
export const APP_CONFIG = {
  name: 'Innerwear Shop',
  tagline: 'Premium Comfort, Everyday Wear',
  description: 'Shop high-quality innerwear - Boxers, Briefs, Vests & more',
  currency: 'INR',
  currencySymbol: '₹',
  freeShippingThreshold: 1500,
  shippingCost: 99,
  contactEmail: 'support@innerwearshop.com',
  whatsapp: '+91 98765 43210',
  address: '123 Fashion Street, Mumbai, Maharashtra 400001'
};

// API Endpoints
export const API_ENDPOINTS = {
  products: {
    all: '/api/products',
    featured: '/api/products/featured',
    bestseller: '/api/products/bestseller',
    discounted: '/api/products/discounted',
    category: '/api/products/category',
    search: '/api/products/search',
    detail: '/api/products'
  },
  cart: {
    get: '/api/cart',
    add: '/api/cart/add',
    update: '/api/cart/update',
    remove: '/api/cart/remove',
    clear: '/api/cart/clear'
  }
};

// Default export if needed
export default {
  INNERWEAR_CATEGORIES,
  MATERIALS,
  GENDER_OPTIONS,
  INNERWEAR_SIZES,
  PRICE_RANGES,
  SORT_OPTIONS,
  APP_CONFIG,
  API_ENDPOINTS
};