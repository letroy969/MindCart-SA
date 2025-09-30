import React from 'react';
import { ShoppingCartIcon, TrashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const CartSummary = ({ 
  cartItems = [], 
  onRemoveItem, 
  onUpdateQuantity, 
  onClearCart,
  onProceedToCheckout 
}) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSavings = cartItems.reduce((sum, item) => sum + (item.savings || 0) * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center">
          <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Start adding products to compare prices</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-display font-semibold text-navy-900">
            Cart Summary
          </h3>
          <button
            onClick={onClearCart}
            className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
          >
            <TrashIcon className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
        </p>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto scrollbar-hide">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.store}`} className="p-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start space-x-3">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCartIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-navy-900 truncate">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.brand}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs bg-navy-100 text-navy-600 px-2 py-1 rounded">
                    {item.store}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-gray-500">{item.unit}</span>
                  )}
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-navy-900">
                    R{(item.price * item.quantity).toFixed(2)}
                  </span>
                  {item.savings > 0 && (
                    <span className="text-xs text-green-600">
                      -R{(item.savings * item.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, item.store, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity?.(item.id, item.store, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem?.(item.id, item.store)}
                  className="text-red-500 hover:text-red-700 text-xs mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-6 bg-gray-50 rounded-b-xl">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({totalItems} items)</span>
            <span className="font-medium">R{totalPrice.toFixed(2)}</span>
          </div>
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Total Savings</span>
              <span className="font-medium text-green-600">-R{totalSavings.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-navy-900">Total</span>
              <span className="font-bold text-lg text-navy-900">
                R{(totalPrice - totalSavings).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={onProceedToCheckout}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button className="w-full btn-outline">
            Compare All Stores
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
