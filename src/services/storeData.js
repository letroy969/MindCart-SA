// Store metadata and configuration
export const STORE_CONFIG = {
  checkers: {
    id: 'checkers',
    name: 'Checkers',
    displayName: 'Checkers',
    color: '#E53E3E', // Red
    logo: '/logos/checkers-logo.png',
    apiBaseUrl: 'https://api.checkers.co.za/v1',
    website: 'https://www.checkers.co.za',
    description: 'South Africa\'s leading grocery retailer',
    features: ['Online Shopping', 'Delivery', 'Click & Collect'],
    categories: [
      'fruits-vegetables',
      'dairy-eggs',
      'meat-poultry',
      'bakery',
      'beverages',
      'pantry',
      'frozen-foods',
      'health-beauty'
    ]
  },
  pnp: {
    id: 'pnp',
    name: 'Pick n Pay',
    displayName: 'Pick n Pay',
    color: '#38A169', // Green
    logo: '/logos/pnp-logo.png',
    apiBaseUrl: 'https://api.pnp.co.za/v1',
    website: 'https://www.pnp.co.za',
    description: 'Quality products at great prices',
    features: ['Online Shopping', 'Delivery', 'Click & Collect'],
    categories: [
      'fruits-vegetables',
      'dairy-eggs',
      'meat-poultry',
      'bakery',
      'beverages',
      'pantry',
      'frozen-foods',
      'health-beauty'
    ]
  },
  woolworths: {
    id: 'woolworths',
    name: 'Woolworths',
    displayName: 'Woolworths',
    color: '#805AD5', // Purple
    logo: '/logos/woolworths-logo.png',
    apiBaseUrl: 'https://api.woolworths.co.za/v1',
    website: 'https://www.woolworths.co.za',
    description: 'Premium quality and fresh produce',
    features: ['Online Shopping', 'Delivery', 'Click & Collect'],
    categories: [
      'fruits-vegetables',
      'dairy-eggs',
      'meat-poultry',
      'bakery',
      'beverages',
      'pantry',
      'frozen-foods',
      'health-beauty'
    ]
  }
};

export const CATEGORY_CONFIG = {
  'fruits-vegetables': {
    name: 'Fruits & Vegetables',
    icon: '🥬',
    color: 'from-green-400 to-green-600',
    description: 'Fresh fruits and vegetables',
    subcategories: [
      'Fresh Fruits',
      'Fresh Vegetables',
      'Organic Produce',
      'Pre-cut & Ready-to-eat'
    ]
  },
  'dairy-eggs': {
    name: 'Dairy & Eggs',
    icon: '🥛',
    color: 'from-blue-400 to-blue-600',
    description: 'Milk, cheese, yogurt, and eggs',
    subcategories: [
      'Milk & Cream',
      'Cheese',
      'Yogurt & Dairy Desserts',
      'Eggs',
      'Butter & Margarine'
    ]
  },
  'meat-poultry': {
    name: 'Meat & Poultry',
    icon: '🥩',
    color: 'from-red-400 to-red-600',
    description: 'Fresh meat, poultry, and seafood',
    subcategories: [
      'Beef',
      'Pork',
      'Chicken',
      'Lamb',
      'Seafood',
      'Deli Meats'
    ]
  },
  'bakery': {
    name: 'Bakery',
    icon: '🍞',
    color: 'from-yellow-400 to-yellow-600',
    description: 'Fresh bread, pastries, and baked goods',
    subcategories: [
      'Bread',
      'Pastries',
      'Cakes',
      'Cookies & Biscuits',
      'Breakfast Items'
    ]
  },
  'beverages': {
    name: 'Beverages',
    icon: '🥤',
    color: 'from-purple-400 to-purple-600',
    description: 'Drinks, juices, and beverages',
    subcategories: [
      'Soft Drinks',
      'Juices',
      'Water',
      'Coffee & Tea',
      'Energy Drinks',
      'Alcoholic Beverages'
    ]
  },
  'pantry': {
    name: 'Pantry',
    icon: '🥫',
    color: 'from-orange-400 to-orange-600',
    description: 'Canned goods, grains, and pantry staples',
    subcategories: [
      'Canned Goods',
      'Grains & Rice',
      'Pasta & Noodles',
      'Cooking Oils',
      'Spices & Seasonings',
      'Condiments'
    ]
  },
  'frozen-foods': {
    name: 'Frozen Foods',
    icon: '🧊',
    color: 'from-cyan-400 to-cyan-600',
    description: 'Frozen meals, vegetables, and desserts',
    subcategories: [
      'Frozen Vegetables',
      'Frozen Meals',
      'Ice Cream',
      'Frozen Desserts',
      'Frozen Snacks'
    ]
  },
  'health-beauty': {
    name: 'Health & Beauty',
    icon: '💄',
    color: 'from-pink-400 to-pink-600',
    description: 'Health, beauty, and personal care products',
    subcategories: [
      'Personal Care',
      'Vitamins & Supplements',
      'Baby Care',
      'Oral Care',
      'Skin Care'
    ]
  }
};

export const PRICE_RANGES = [
  { label: 'Under R50', min: 0, max: 50 },
  { label: 'R50 - R100', min: 50, max: 100 },
  { label: 'R100 - R200', min: 100, max: 200 },
  { label: 'R200 - R500', min: 200, max: 500 },
  { label: 'Over R500', min: 500, max: 10000 }
];

export const SORT_OPTIONS = [
  { value: 'price', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'savings', label: 'Best Savings' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'store', label: 'Store' },
  { value: 'newest', label: 'Newest First' }
];

export const DEAL_TYPES = {
  SALE: 'sale',
  BULK: 'bulk',
  CLEARANCE: 'clearance',
  PROMOTION: 'promotion'
};

export const getStoreById = (storeId) => {
  return STORE_CONFIG[storeId] || null;
};

export const getCategoryById = (categoryId) => {
  return CATEGORY_CONFIG[categoryId] || null;
};

export const getAllStores = () => {
  return Object.values(STORE_CONFIG);
};

export const getAllCategories = () => {
  return Object.values(CATEGORY_CONFIG);
};

export const getStoreColor = (storeId) => {
  const store = getStoreById(storeId);
  return store ? store.color : '#6B7280';
};

export const getCategoryColor = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.color : 'from-gray-400 to-gray-600';
};

// Store availability by region (for future location-based features)
export const STORE_LOCATIONS = {
  checkers: {
    'western-cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
    'gauteng': ['Johannesburg', 'Pretoria', 'Sandton'],
    'kwazulu-natal': ['Durban', 'Pietermaritzburg', 'Ballito']
  },
  pnp: {
    'western-cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
    'gauteng': ['Johannesburg', 'Pretoria', 'Sandton'],
    'kwazulu-natal': ['Durban', 'Pietermaritzburg', 'Ballito']
  },
  woolworths: {
    'western-cape': ['Cape Town', 'Stellenbosch', 'Paarl'],
    'gauteng': ['Johannesburg', 'Pretoria', 'Sandton'],
    'kwazulu-natal': ['Durban', 'Pietermaritzburg', 'Ballito']
  }
};

// API rate limits and configuration
export const API_CONFIG = {
  rateLimits: {
    checkers: { requests: 100, window: 60000 }, // 100 requests per minute
    pnp: { requests: 100, window: 60000 },
    woolworths: { requests: 100, window: 60000 }
  },
  timeouts: {
    default: 5000, // 5 seconds
    search: 10000, // 10 seconds for search
    comparison: 15000 // 15 seconds for comparison
  },
  retries: 3,
  retryDelay: 1000 // 1 second
};
