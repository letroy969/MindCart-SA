import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  FunnelIcon, 
  Squares2X2Icon, 
  ListBulletIcon,
  ChevronLeftIcon 
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { fetchProductsByCategory } from '../services/api';

const Category = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: categoryName || '',
    priceRange: { min: 0, max: 1000 },
    stores: [],
    sortBy: 'price',
    showOnlyOnSale: false,
    showOnlyBulk: false
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products for the category
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['category-products', categoryName, filters],
    queryFn: () => fetchProductsByCategory(categoryName, filters),
    enabled: !!categoryName
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: categoryName || '',
      priceRange: { min: 0, max: 1000 },
      stores: [],
      sortBy: 'price',
      showOnlyOnSale: false,
      showOnlyBulk: false
    });
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
  };

  const handleToggleWishlist = (productId) => {
    console.log('Toggling wishlist for:', productId);
  };

  const categoryDisplayName = categoryName
    ? categoryName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    : 'Category';

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
        <p className="text-gray-600">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <a href="/" className="hover:text-gold-600">Home</a>
        <ChevronLeftIcon className="w-4 h-4 rotate-180" />
        <span className="text-navy-900 font-medium">{categoryDisplayName}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-navy-900">
            {categoryDisplayName}
          </h1>
          <p className="text-gray-600 mt-2">
            {isLoading ? 'Loading products...' : `${products.length} products found`}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Filter Toggle - Mobile */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FunnelIcon className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
            >
              <ListBulletIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalResults={products.length}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-xl"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Squares2X2Icon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or search for something else.</p>
              <button
                onClick={handleClearFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={`${product.id}-${product.store}`}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  showStoreComparison={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
