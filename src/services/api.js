import axios from 'axios';

// Base URLs for South African store APIs (these would be actual API endpoints)
const API_BASE_URLS = {
  checkers: 'https://api.checkers.co.za/v1',
  pnp: 'https://api.pnp.co.za/v1',
  woolworths: 'https://api.woolworths.co.za/v1',
};

// Mock data for development (replace with actual API calls)
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Fresh Bananas',
    brand: 'Fresh Choice',
    image: null,
    price: 25.99,
    originalPrice: 29.99,
    store: 'Checkers',
    category: 'fruits-vegetables',
    unit: 'per kg',
    savings: 4.00,
    isOnSale: true,
    isBulkOption: false
  },
  {
    id: '2',
    name: 'Fresh Bananas',
    brand: 'Fresh Choice',
    image: null,
    price: 27.50,
    originalPrice: null,
    store: 'Pick n Pay',
    category: 'fruits-vegetables',
    unit: 'per kg',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '3',
    name: 'Fresh Bananas',
    brand: 'Fresh Choice',
    image: null,
    price: 24.99,
    originalPrice: null,
    store: 'Woolworths',
    category: 'fruits-vegetables',
    unit: 'per kg',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '4',
    name: 'Whole Milk 2L',
    brand: 'Clover',
    image: null,
    price: 32.99,
    originalPrice: 35.99,
    store: 'Checkers',
    category: 'dairy-eggs',
    unit: '2L',
    savings: 3.00,
    isOnSale: true,
    isBulkOption: false
  },
  {
    id: '5',
    name: 'Whole Milk 2L',
    brand: 'Clover',
    image: null,
    price: 34.50,
    originalPrice: null,
    store: 'Pick n Pay',
    category: 'dairy-eggs',
    unit: '2L',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '6',
    name: 'Whole Milk 2L',
    brand: 'Clover',
    image: null,
    price: 33.99,
    originalPrice: null,
    store: 'Woolworths',
    category: 'dairy-eggs',
    unit: '2L',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '7',
    name: 'Chicken Breast',
    brand: 'Free Range',
    image: null,
    price: 89.99,
    originalPrice: 99.99,
    store: 'Checkers',
    category: 'meat-poultry',
    unit: 'per kg',
    savings: 10.00,
    isOnSale: true,
    isBulkOption: false
  },
  {
    id: '8',
    name: 'Chicken Breast',
    brand: 'Free Range',
    image: null,
    price: 95.50,
    originalPrice: null,
    store: 'Pick n Pay',
    category: 'meat-poultry',
    unit: 'per kg',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '9',
    name: 'Chicken Breast',
    brand: 'Free Range',
    image: null,
    price: 92.99,
    originalPrice: null,
    store: 'Woolworths',
    category: 'meat-poultry',
    unit: 'per kg',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '10',
    name: 'White Bread',
    brand: 'Sasko',
    image: null,
    price: 18.99,
    originalPrice: null,
    store: 'Checkers',
    category: 'bakery',
    unit: '700g',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '11',
    name: 'White Bread',
    brand: 'Sasko',
    image: null,
    price: 19.50,
    originalPrice: null,
    store: 'Pick n Pay',
    category: 'bakery',
    unit: '700g',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  },
  {
    id: '12',
    name: 'White Bread',
    brand: 'Sasko',
    image: null,
    price: 17.99,
    originalPrice: null,
    store: 'Woolworths',
    category: 'bakery',
    unit: '700g',
    savings: 0,
    isOnSale: false,
    isBulkOption: false
  }
];

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to filter products
const filterProducts = (products, filters) => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Price range filter
    if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
      return false;
    }

    // Store filter
    if (filters.stores.length > 0 && !filters.stores.includes(product.store.toLowerCase().replace(/\s+/g, '-'))) {
      return false;
    }

    // On sale filter
    if (filters.showOnlyOnSale && !product.isOnSale) {
      return false;
    }

    // Bulk option filter
    if (filters.showOnlyBulk && !product.isBulkOption) {
      return false;
    }

    return true;
  });
};

// Helper function to sort products
const sortProducts = (products, sortBy) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'savings':
        return (b.savings || 0) - (a.savings || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'store':
        return a.store.localeCompare(b.store);
      default:
        return 0;
    }
  });
};

// API Functions

export const fetchFeaturedProducts = async () => {
  await delay(500); // Simulate API delay
  return MOCK_PRODUCTS.slice(0, 8);
};

export const fetchTopDeals = async () => {
  await delay(500);
  return MOCK_PRODUCTS
    .filter(product => product.isOnSale)
    .sort((a, b) => (b.savings || 0) - (a.savings || 0))
    .slice(0, 4);
};

export const fetchProductsByCategory = async (categoryName, filters = {}) => {
  await delay(500);
  
  const categoryFilter = {
    ...filters,
    category: categoryName
  };
  
  let filteredProducts = filterProducts(MOCK_PRODUCTS, categoryFilter);
  filteredProducts = sortProducts(filteredProducts, filters.sortBy);
  
  return filteredProducts;
};

export const fetchProductComparison = async (searchQuery) => {
  await delay(500);
  
  if (!searchQuery) return [];
  
  const query = searchQuery.toLowerCase();
  const matchingProducts = MOCK_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.brand.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  
  return matchingProducts;
};

export const fetchProductDetails = async (productId) => {
  await delay(500);
  
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  return product || null;
};

// Real API functions (to be implemented when actual APIs are available)
export const fetchProductPrices = async (query) => {
  try {
    const [checkers, pnp, woolworths] = await Promise.allSettled([
      axios.get(`${API_BASE_URLS.checkers}/products?search=${encodeURIComponent(query)}`),
      axios.get(`${API_BASE_URLS.pnp}/products?search=${encodeURIComponent(query)}`),
      axios.get(`${API_BASE_URLS.woolworths}/products?search=${encodeURIComponent(query)}`)
    ]);

    const results = [];
    
    if (checkers.status === 'fulfilled') {
      results.push(...checkers.value.data.products.map(product => ({
        ...product,
        store: 'Checkers'
      })));
    }
    
    if (pnp.status === 'fulfilled') {
      results.push(...pnp.value.data.products.map(product => ({
        ...product,
        store: 'Pick n Pay'
      })));
    }
    
    if (woolworths.status === 'fulfilled') {
      results.push(...woolworths.value.data.products.map(product => ({
        ...product,
        store: 'Woolworths'
      })));
    }

    return results;
  } catch (error) {
    console.error('Error fetching product prices:', error);
    // Fallback to mock data
    return fetchProductComparison(query);
  }
};

// Store-specific API functions
export const fetchCheckersProducts = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URLS.checkers}/products?search=${encodeURIComponent(query)}`);
    return response.data.products.map(product => ({
      ...product,
      store: 'Checkers'
    }));
  } catch (error) {
    console.error('Error fetching Checkers products:', error);
    return [];
  }
};

export const fetchPickNPayProducts = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URLS.pnp}/products?search=${encodeURIComponent(query)}`);
    return response.data.products.map(product => ({
      ...product,
      store: 'Pick n Pay'
    }));
  } catch (error) {
    console.error('Error fetching Pick n Pay products:', error);
    return [];
  }
};

export const fetchWoolworthsProducts = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URLS.woolworths}/products?search=${encodeURIComponent(query)}`);
    return response.data.products.map(product => ({
      ...product,
      store: 'Woolworths'
    }));
  } catch (error) {
    console.error('Error fetching Woolworths products:', error);
    return [];
  }
};
