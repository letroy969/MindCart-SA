<<<<<<< HEAD
import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <ProductCard name="Apple" price="R10" />
    <ProductCard name="Banana" price="R5" />
    <ProductCard name="Milk" price="R25" />
  </div>
);
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  MagnifyingGlassIcon, 
  TrendingUpIcon, 
  StarIcon,
  FireIcon,
  ShoppingBagIcon 
} from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import { fetchFeaturedProducts, fetchTopDeals } from '../services/api';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch featured products
  const { data: featuredProducts = [], isLoading: featuredLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: fetchFeaturedProducts,
  });

  // Fetch top deals
  const { data: topDeals = [], isLoading: dealsLoading } = useQuery({
    queryKey: ['top-deals'],
    queryFn: fetchTopDeals,
  });

  const categories = [
    {
      name: 'Fruits & Vegetables',
      path: '/category/fruits-vegetables',
      icon: '🥬',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Dairy & Eggs',
      path: '/category/dairy-eggs',
      icon: '🥛',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Meat & Poultry',
      path: '/category/meat-poultry',
      icon: '🥩',
      color: 'from-red-400 to-red-600'
    },
    {
      name: 'Bakery',
      path: '/category/bakery',
      icon: '🍞',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      name: 'Beverages',
      path: '/category/beverages',
      icon: '🥤',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Pantry',
      path: '/category/pantry',
      icon: '🥫',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  const handleAddToCart = (product) => {
    // This would integrate with cart context/state management
    console.log('Adding to cart:', product);
  };

  const handleToggleWishlist = (productId) => {
    // This would integrate with wishlist context/state management
    console.log('Toggling wishlist for:', productId);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-navy-50 to-gold-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-navy-900 mb-6">
            Find the Best
            <span className="text-gradient block">Grocery Deals</span>
          </h1>
          <p className="text-xl text-navy-600 mb-8 max-w-2xl mx-auto">
            Compare prices across Checkers, Pick n Pay, and Woolworths. 
            Save money on every shopping trip with our smart price comparison tool.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands, or categories..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-gold-500 shadow-lg"
              />
              <Link
                to={`/compare?search=${encodeURIComponent(searchQuery)}`}
                className="absolute inset-y-0 right-0 px-6 flex items-center bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-r-xl transition-colors"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-display font-bold text-navy-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-center font-semibold text-navy-900 group-hover:text-gold-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Deals */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-navy-900 flex items-center">
            <FireIcon className="w-8 h-8 text-gold-500 mr-3" />
            Top Deals Today
          </h2>
          <Link
            to="/compare?filter=deals"
            className="text-gold-600 hover:text-gold-700 font-semibold flex items-center"
          >
            View All Deals
            <TrendingUpIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {dealsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDeals.map((product) => (
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
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-navy-900 flex items-center">
            <StarIcon className="w-8 h-8 text-gold-500 mr-3" />
            Featured Products
          </h2>
          <Link
            to="/compare"
            className="text-gold-600 hover:text-gold-700 font-semibold flex items-center"
          >
            View All Products
            <ShoppingBagIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {featuredLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Ready to Start Saving?
        </h2>
        <p className="text-xl text-navy-200 mb-8 max-w-2xl mx-auto">
          Join thousands of South Africans who save money every week with MindCart.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/compare"
            className="btn-primary bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 text-lg"
          >
            Start Comparing Prices
          </Link>
          <Link
            to="/category/fruits-vegetables"
            className="btn-outline border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-white px-8 py-3 text-lg"
          >
            Browse Categories
          </Link>
        </div>
      </section>
    </div>
  );
};
>>>>>>> 67fc4225eef96736e7f7b6b18720466f372b0830

export default Home;
