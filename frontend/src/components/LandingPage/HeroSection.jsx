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

const featuredProducts = mockProducts.slice(0, 4);
const recentProducts = mockProducts.slice(4, 8);

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-100 to-blue-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Live Community</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  ReWear
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed">
                Your Community Platform for Clothing Exchange & Swapping
              </p>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Join thousands of fashion enthusiasts in creating a sustainable future. 
              Swap, exchange, and discover unique pieces while reducing textile waste and building meaningful connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10 flex items-center justify-center">
                  Start Swapping Today
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Browse Collection
              </button>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-20 transform rotate-6 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" 
                alt="Fashion Community" 
                className="relative z-10 w-full rounded-3xl shadow-2xl object-cover aspect-square transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700">2,847 Active Swappers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-gray-200">
          {[
            { value: "2,847", label: "Active Members", icon: Users },
            { value: "8,234", label: "Items Swapped", icon: Recycle },
            { value: "425kg", label: "Waste Prevented", icon: Award },
            { value: "4.9/5", label: "Member Rating", icon: Star }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex justify-center mb-3">
                <stat.icon className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;