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

// Firstpage Component
const Firstpage = () => {
  const heroRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  const statsRef = useRef();

  useGSAP(() => {
    gsap.from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    gsap.from(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      delay: 0.5,
      ease: "power3.out"
    });

    gsap.from(statsRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 1,
      ease: "power3.out"
    });
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          {/* Hero Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Sustainable Fashion Community</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  ReWear
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Your Community Platform for Clothing Exchange & Swapping
              </p>
            </div>
            
            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Join thousands of fashion enthusiasts in creating a sustainable future. 
              Swap, exchange, and discover unique pieces while reducing textile waste.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Start Swapping
                <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
                Browse Items
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" 
                alt="Fashion Community" 
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">2,500+</div>
            <div className="text-sm text-gray-600 font-medium">Items Swapped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">800+</div>
            <div className="text-sm text-gray-600 font-medium">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">150kg</div>
            <div className="text-sm text-gray-600 font-medium">Waste Reduced</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Firstpage
