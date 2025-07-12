import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Star, Users, Recycle, TrendingUp, Heart, Clock, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock data for demonstration
const mockProducts = [
  { id: 1, name: "Vintage Denim Jacket", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop", price: "45 Points", category: "Jackets", condition: "Excellent", size: "M", daysAgo: 2 },
  { id: 2, name: "Floral Summer Dress", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop", price: "35 Points", category: "Dresses", condition: "Good", size: "S", daysAgo: 1 },
  { id: 3, name: "Leather Boots", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", price: "60 Points", category: "Footwear", condition: "Excellent", size: "8", daysAgo: 3 },
  { id: 4, name: "Cashmere Sweater", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop", price: "50 Points", category: "Sweaters", condition: "Good", size: "L", daysAgo: 1 },
  { id: 5, name: "Designer Handbag", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", price: "80 Points", category: "Accessories", condition: "Excellent", size: "N/A", daysAgo: 4 },
  { id: 6, name: "Silk Scarf", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", price: "25 Points", category: "Accessories", condition: "Good", size: "N/A", daysAgo: 2 },
  { id: 7, name: "Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", price: "20 Points", category: "T-Shirts", condition: "Good", size: "M", daysAgo: 5 },
  { id: 8, name: "Wool Coat", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop", price: "75 Points", category: "Coats", condition: "Excellent", size: "L", daysAgo: 3 }
];

const featuredProducts = mockProducts.slice(0, 4);
const recentProducts = mockProducts.slice(4, 8);

gsap.registerPlugin(ScrollTrigger);

const Popular = () => {
  const sectionRef = useRef();
  const headerRef = useRef();
  const gridRef = useRef();

  useGSAP(() => {
    gsap.from(headerRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    gsap.from(gridRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%",
      }
    });
  });

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full mb-4">
            <TrendingUp className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Featured Items</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular This Week
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most loved items in our community
          </p>
        </div>
        
        {/* Items Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    <Star className="w-3 h-3 mr-1 text-yellow-500" />
                    Featured
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-orange-500">{item.price}</span>
                  <span className="text-sm text-gray-500">Size: {item.size}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Request Swap
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <button className="group px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
            View All Items
            <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Popular;