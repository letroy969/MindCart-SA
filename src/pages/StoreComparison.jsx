import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import CartSummary from '../components/CartSummary';
import { fetchProductComparison } from '../services/api';

const StoreComparison = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(new Set());

  // Fetch product comparison data
  const { data: comparisonData = [], isLoading, error } = useQuery({
    queryKey: ['product-comparison', searchQuery],
    queryFn: () => fetchProductComparison(searchQuery),
    enabled: !!searchQuery
  });

  const stores = ['Checkers', 'Pick n Pay', 'Woolworths'];
  const totalSavings = cartItems.reduce((sum, item) => sum + (item.savings || 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(
      item => item.id === product.id && item.store === product.store
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.store === product.store
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId, store) => {
    setCartItems(cartItems.filter(
      item => !(item.id === productId && item.store === store)
    ));
  };

  const handleUpdateQuantity = (productId, store, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId, store);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId && item.store === store
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    // This would integrate with checkout flow
    console.log('Proceeding to checkout with:', cartItems);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search query
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', searchQuery.trim());
      window.history.replaceState({}, '', `?${newSearchParams.toString()}`);
    }
  };

  // Group products by name for comparison
  const groupedProducts = comparisonData.reduce((acc, product) => {
    const key = product.name.toLowerCase();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {});

  const findBestDeal = (products) => {
    return products.reduce((best, current) => 
      current.price < best.price ? current : best
    );
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Comparison</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-navy-900 mb-4">
          Store Price Comparison
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compare prices across South African grocery stores and find the best deals. 
          Add products to your cart to see total savings.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products to compare..."
            className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-6 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-r-xl transition-colors"
          >
            Compare
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Products Comparison */}
        <div className="flex-1">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-3 gap-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-8 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : Object.keys(groupedProducts).length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try searching for a different product.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedProducts).map(([productName, products]) => {
                const bestDeal = findBestDeal(products);
                const availableStores = products.map(p => p.store);
                const missingStores = stores.filter(store => !availableStores.includes(store));

                return (
                  <div key={productName} className="card">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-navy-900">
                          {productName}
                        </h3>
                        {bestDeal && (
                          <div className="flex items-center space-x-2 text-green-600">
                            <ArrowTrendingDownIcon className="w-5 h-5" />
                            <span className="font-semibold">
                              Best: R{bestDeal.price.toFixed(2)} at {bestDeal.store}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Available stores */}
                        {products.map((product) => (
                          <div
                            key={`${product.id}-${product.store}`}
                            className={`p-4 rounded-lg border-2 ${
                              product.id === bestDeal?.id
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-navy-900">
                                {product.store}
                              </span>
                              {product.id === bestDeal?.id && (
                                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                              )}
                            </div>
                            <div className="text-2xl font-bold text-navy-900 mb-2">
                              R{product.price.toFixed(2)}
                            </div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <div className="text-sm text-gray-500 line-through mb-2">
                                R{product.originalPrice.toFixed(2)}
                              </div>
                            )}
                            {product.unit && (
                              <div className="text-sm text-gray-600 mb-3">
                                {product.unit}
                              </div>
                            )}
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full btn-primary text-sm py-2"
                            >
                              Add to Cart
                            </button>
                          </div>
                        ))}

                        {/* Missing stores */}
                        {missingStores.map((store) => (
                          <div
                            key={store}
                            className="p-4 rounded-lg border-2 border-gray-200 bg-gray-50 flex flex-col items-center justify-center"
                          >
                            <XCircleIcon className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500 text-center">
                              Not available at {store}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="lg:w-96">
          <CartSummary
            cartItems={cartItems}
            onRemoveItem={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onProceedToCheckout={handleProceedToCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreComparison;
