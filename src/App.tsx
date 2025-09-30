import React from 'react';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🛒</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                MindCart SA
              </span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-amber-600 font-medium">Home</a>
              <a href="#" className="text-slate-600 hover:text-amber-600 font-medium">Compare</a>
              <a href="#" className="text-slate-600 hover:text-amber-600 font-medium">Categories</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          Welcome to
          <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            MindCart SA
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Compare prices across Checkers, Pick n Pay, and Woolworths. 
          Save money on every shopping trip with our smart price comparison tool.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products, brands, or categories..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-lg"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400">🔍</span>
            </div>
            <button className="absolute inset-y-0 right-0 px-6 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-r-xl transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">🚀 App is Running Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your MindCart SA React application is now running at <strong>http://localhost:3000</strong>
          </p>
          <div className="text-green-600 font-semibold">
            ✅ React Server: Running<br/>
            ✅ Browser: Connected<br/>
            ✅ Development Mode: Active
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏪</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Checkers</h3>
            <p className="text-gray-600 mb-4">South Africa's leading grocery retailer</p>
            <div className="text-sm text-green-600 font-semibold">Price Comparison Ready</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Pick n Pay</h3>
            <p className="text-gray-600 mb-4">Quality products at great prices</p>
            <div className="text-sm text-green-600 font-semibold">Best Deals Available</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Woolworths</h3>
            <p className="text-gray-600 mb-4">Premium quality and fresh produce</p>
            <div className="text-sm text-green-600 font-semibold">Smart Savings Active</div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold text-slate-900">Price Comparison</h4>
            <p className="text-sm text-gray-600">Compare across stores</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🛍️</span>
            </div>
            <h4 className="font-semibold text-slate-900">Smart Cart</h4>
            <p className="text-sm text-gray-600">Calculate total savings</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📱</span>
            </div>
            <h4 className="font-semibold text-slate-900">Mobile Ready</h4>
            <p className="text-sm text-gray-600">Works on all devices</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold text-slate-900">Real-time</h4>
            <p className="text-sm text-gray-600">Live price updates</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🛒</span>
            </div>
            <span className="text-xl font-bold text-amber-400">MindCart SA</span>
          </div>
          <p className="text-slate-300 mb-4">
            Compare prices across South African grocery stores and find the best deals.
          </p>
          <p className="text-slate-400 text-sm">
            © 2025 MindCart SA. Built with React + Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;