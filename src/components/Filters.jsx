import React, { useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Filters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  totalResults = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    category = '',
    priceRange = { min: 0, max: 1000 },
    stores = [],
    sortBy = 'price',
    showOnlyOnSale = false,
    showOnlyBulk = false
  } = filters;

  const categories = [
    'Fruits & Vegetables',
    'Dairy & Eggs', 
    'Meat & Poultry',
    'Bakery',
    'Beverages',
    'Pantry',
    'Frozen Foods',
    'Health & Beauty'
  ];

  const storeOptions = [
    { id: 'checkers', name: 'Checkers', color: 'bg-red-100 text-red-800' },
    { id: 'pnp', name: 'Pick n Pay', color: 'bg-green-100 text-green-800' },
    { id: 'woolworths', name: 'Woolworths', color: 'bg-purple-100 text-purple-800' }
  ];

  const sortOptions = [
    { value: 'price', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'savings', label: 'Best Savings' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'store', label: 'Store' }
  ];

  const handleStoreToggle = (storeId) => {
    const newStores = stores.includes(storeId)
      ? stores.filter(s => s !== storeId)
      : [...stores, storeId];
    onFilterChange({ ...filters, stores: newStores });
  };

  const handlePriceRangeChange = (field, value) => {
    onFilterChange({
      ...filters,
      priceRange: { ...priceRange, [field]: parseFloat(value) || 0 }
    });
  };

  const activeFiltersCount = [
    category,
    stores.length > 0,
    priceRange.min > 0 || priceRange.max < 1000,
    showOnlyOnSale,
    showOnlyBulk
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-navy-900">Filters</h3>
            {activeFiltersCount > 0 && (
              <span className="bg-gold-100 text-gold-800 text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden p-1 text-gray-600 hover:text-gray-800"
            >
              <ChevronDownIcon className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {totalResults.toLocaleString()} products found
        </p>
      </div>

      {/* Filters Content */}
      <div className={`p-4 space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Store Filter */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Stores
          </label>
          <div className="space-y-2">
            {storeOptions.map((store) => (
              <label key={store.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={stores.includes(store.id)}
                  onChange={() => handleStoreToggle(store.id)}
                  className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                />
                <span className={`text-sm px-2 py-1 rounded ${store.color}`}>
                  {store.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Min</label>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Max</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                placeholder="1000"
              />
            </div>
          </div>
        </div>

        {/* Special Filters */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Special Offers
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlyOnSale}
                onChange={(e) => onFilterChange({ ...filters, showOnlyOnSale: e.target.checked })}
                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
              />
              <span className="text-sm text-gray-700">On Sale Only</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showOnlyBulk}
                onChange={(e) => onFilterChange({ ...filters, showOnlyBulk: e.target.checked })}
                className="rounded border-gray-300 text-gold-600 focus:ring-gold-500"
              />
              <span className="text-sm text-gray-700">Bulk Deals Only</span>
            </label>
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-navy-900 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
