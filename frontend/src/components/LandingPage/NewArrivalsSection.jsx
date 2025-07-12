import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, Recycle, TrendingUp, Heart, Clock, Award, Play, Pause, Shield, Truck, MessageCircle, Search, Filter, ChevronDown } from 'lucide-react';

const mockProducts = [
  { 
    id: 1, 
    name: "Vintage Denim Jacket", 
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", 
    price: "45", 
    currency: "Points", 
    category: "Jackets", 
    condition: "Excellent", 
    size: "M", 
    daysAgo: 2,
    rating: 4.8,
    likes: 24,
    owner: "Sarah M.",
    verified: true
  },
  { 
    id: 2, 
    name: "Floral Summer Dress", 
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop", 
    price: "35", 
    currency: "Points", 
    category: "Dresses", 
    condition: "Good", 
    size: "S", 
    daysAgo: 1,
    rating: 4.5,
    likes: 18,
    owner: "Emma K.",
    verified: true
  },
  { 
    id: 3, 
    name: "Leather Boots", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", 
    price: "60", 
    currency: "Points", 
    category: "Footwear", 
    condition: "Excellent", 
    size: "8", 
    daysAgo: 3,
    rating: 4.9,
    likes: 32,
    owner: "Maria L.",
    verified: true
  },
  { 
    id: 4, 
    name: "Cashmere Sweater", 
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop", 
    price: "50", 
    currency: "Points", 
    category: "Sweaters", 
    condition: "Good", 
    size: "L", 
    daysAgo: 1,
    rating: 4.3,
    likes: 15,
    owner: "Anna P.",
    verified: false
  },
  { 
    id: 5, 
    name: "Designer Handbag", 
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", 
    price: "80", 
    currency: "Points", 
    category: "Accessories", 
    condition: "Excellent", 
    size: "N/A", 
    daysAgo: 4,
    rating: 4.7,
    likes: 28,
    owner: "Lisa R.",
    verified: true
  },
  { 
    id: 6, 
    name: "Silk Scarf", 
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", 
    price: "25", 
    currency: "Points", 
    category: "Accessories", 
    condition: "Good", 
    size: "N/A", 
    daysAgo: 2,
    rating: 4.2,
    likes: 12,
    owner: "Sophie T.",
    verified: true
  },
  { 
    id: 7, 
    name: "Cotton T-Shirt", 
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", 
    price: "20", 
    currency: "Points", 
    category: "T-Shirts", 
    condition: "Good", 
    size: "M", 
    daysAgo: 5,
    rating: 4.0,
    likes: 8,
    owner: "Jenny W.",
    verified: false
  },
  { 
    id: 8, 
    name: "Wool Coat", 
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop", 
    price: "75", 
    currency: "Points", 
    category: "Coats", 
    condition: "Excellent", 
    size: "L", 
    daysAgo: 3,
    rating: 4.6,
    likes: 21,
    owner: "Rachel B.",
    verified: true
  }
];
const ProductCard = ({ product, isFeatured = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col transform hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isFeatured && (
            <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-xs font-bold shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
          <span className="inline-flex items-center px-3 py-1 bg-white bg-opacity-90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 shadow-md">
            {product.daysAgo}d ago
          </span>
        </div>
        
        {/* Like Button */}
        <button 
          className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
            isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:shadow-xl'
          }`}
          onClick={() => setIsLiked(!isLiked)}
          aria-label={isLiked ? "Unlike item" : "Like item"}
        >
          <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
        </button>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            Quick View
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Product Info */}
        <div className="mb-4 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{product.name}</h3>
            {product.verified && (
              <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
            )}
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600 font-medium">{product.category}</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.condition}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>

          {/* Owner Info */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{product.owner[0]}</span>
            </div>
            <span className="text-xs text-gray-600">by {product.owner}</span>
          </div>
        </div>
        
        {/* Price and Size */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">{product.price}</span>
            <span className="text-sm font-medium text-gray-500">{product.currency}</span>
          </div>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Size: {product.size}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold text-sm hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Request Swap
          </button>
          <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Message
          </button>
        </div>
      </div>
    </div>
  );
};
const recentProducts = mockProducts.slice(4, 8);
const NewArrivalsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">Fresh Arrivals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Newly Listed Items
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check out the latest additions to our community. New items are added daily!
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Join CTA */}
        <div className="text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Ready to join our sustainable fashion community?
            </p>
            <button className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center justify-center">
                Sign Up Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NewArrivalsSection;