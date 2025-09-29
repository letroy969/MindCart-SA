import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { 
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { fetchProductDetails, fetchProductComparison } from '../services/api';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');

  // Fetch product details
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product-detail', productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId
  });

  // Fetch store comparison for this product
  const { data: storeComparison = [] } = useQuery({
    queryKey: ['product-store-comparison', productId],
    queryFn: () => fetchProductComparison(product?.name || ''),
    enabled: !!product?.name
  });

  const handleAddToCart = (productData) => {
    console.log('Adding to cart:', productData);
    // This would integrate with cart context/state management
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    console.log('Toggling wishlist for:', productId);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out ${product?.name} on MindCart`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const findBestDeal = (products) => {
    if (!products || products.length === 0) return null;
    return products.reduce((best, current) => 
      current.price < best.price ? current : best
    );
  };

  const bestDeal = findBestDeal(storeComparison);

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 hover:text-gold-600"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span>/</span>
        <span className="text-navy-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingCartIcon className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Thumbnail images would go here */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-navy-900 mb-2">
              {product.name}
            </h1>
            {product.brand && (
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
            )}
            
            {/* Price */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-navy-900">
                R{product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="space-y-1">
                  <div className="text-lg text-gray-500 line-through">
                    R{product.originalPrice.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    Save R{(product.originalPrice - product.price).toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            {/* Unit and Store */}
            <div className="flex items-center space-x-4 mb-6">
              {product.unit && (
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {product.unit}
                </span>
              )}
              <span className="text-sm font-medium text-navy-600 bg-navy-100 px-3 py-1 rounded-full">
                {product.store}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <button
                onClick={handleToggleWishlist}
                className="btn-outline flex items-center justify-center p-3"
              >
                {isInWishlist ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              
              <button
                onClick={handleShare}
                className="btn-outline flex items-center justify-center p-3"
              >
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Add to Cart with Store Selection */}
            {storeComparison.length > 1 && (
              <div className="border-t pt-4">
                <h3 className="font-semibold text-navy-900 mb-3">Available at other stores:</h3>
                <div className="space-y-2">
                  {storeComparison
                    .filter(p => p.store !== product.store)
                    .map((storeProduct) => (
                      <div
                        key={storeProduct.store}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{storeProduct.store}</span>
                          <div className="text-sm text-gray-600">
                            R{storeProduct.price.toFixed(2)}
                            {storeProduct.unit && ` • ${storeProduct.unit}`}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(storeProduct)}
                          className="btn-primary text-sm py-1 px-3"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-navy-900 mb-3">Product Details</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Store:</span>
                <span className="font-medium">{product.store}</span>
              </div>
              {product.unit && (
                <div className="flex justify-between">
                  <span>Unit:</span>
                  <span className="font-medium">{product.unit}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Store Comparison Section */}
      {storeComparison.length > 1 && (
        <div className="border-t pt-8">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-6">
            Compare Prices Across Stores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {storeComparison.map((storeProduct) => (
              <div
                key={storeProduct.store}
                className={`p-4 rounded-lg border-2 ${
                  storeProduct.id === bestDeal?.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-navy-900">
                    {storeProduct.store}
                  </span>
                  {storeProduct.id === bestDeal?.id && (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  )}
                </div>
                
                <div className="text-2xl font-bold text-navy-900 mb-2">
                  R{storeProduct.price.toFixed(2)}
                </div>
                
                {storeProduct.originalPrice && storeProduct.originalPrice > storeProduct.price && (
                  <div className="text-sm text-gray-500 line-through mb-2">
                    R{storeProduct.originalPrice.toFixed(2)}
                  </div>
                )}
                
                {storeProduct.unit && (
                  <div className="text-sm text-gray-600 mb-3">
                    {storeProduct.unit}
                  </div>
                )}
                
                <button
                  onClick={() => handleAddToCart(storeProduct)}
                  className="w-full btn-primary text-sm py-2"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
