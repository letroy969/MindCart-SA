import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false,
  showStoreComparison = false 
}) => {
  const {
    id,
    name,
    brand,
    image,
    price,
    originalPrice,
    store,
    category,
    unit,
    savings,
    isOnSale = false,
    isBulkOption = false
  } = product;

  const savingsPercentage = originalPrice ? 
    Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <ShoppingCartIcon className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isOnSale && (
            <span className="savings-badge">
              {savingsPercentage}% OFF
            </span>
          )}
          {isBulkOption && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Bulk Deal
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(id)}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          {isInWishlist ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Store Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-navy-600 bg-navy-100 px-2 py-1 rounded">
            {store}
          </span>
          {unit && (
            <span className="text-xs text-gray-500">{unit}</span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-navy-900 mb-1 line-clamp-2 group-hover:text-gold-600 transition-colors">
          {name}
        </h3>

        {/* Brand */}
        {brand && (
          <p className="text-sm text-gray-600 mb-2">{brand}</p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-navy-900">
              R{price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                R{originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <span className="text-sm font-medium text-green-600">
              Save R{savings.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onAddToCart?.(product)}
            className="flex-1 btn-primary flex items-center justify-center space-x-1"
          >
            <ShoppingCartIcon className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          
          <Link
            to={`/product/${id}`}
            className="btn-outline flex items-center justify-center p-2"
            title="View Details"
          >
            <EyeIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Store Comparison Link */}
        {showStoreComparison && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              to={`/compare?product=${id}`}
              className="text-sm text-gold-600 hover:text-gold-700 font-medium"
            >
              Compare with other stores →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
