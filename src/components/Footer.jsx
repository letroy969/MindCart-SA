import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg flex items-center justify-center">
                <ShoppingCartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gold-400">MindCart</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Compare prices across South African grocery stores and find the best deals. 
              Save money on your shopping with our smart price comparison tool.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-gold-400 transition-colors">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gold-400 transition-colors">
                <QuestionMarkCircleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Compare Prices
                </Link>
              </li>
              <li>
                <Link to="/category/fruits-vegetables" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-gold-400">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MindCart. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Compare prices from:</span>
              <div className="flex space-x-4">
                <span className="text-xs bg-navy-700 px-2 py-1 rounded">Checkers</span>
                <span className="text-xs bg-navy-700 px-2 py-1 rounded">Pick n Pay</span>
                <span className="text-xs bg-navy-700 px-2 py-1 rounded">Woolworths</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
