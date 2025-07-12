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

const ExclusiveOfferBanner = () => {
  const bannerRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  useGSAP(() => {
    gsap.from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
      }
    });

    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 80%",
      }
    });
  });

  return (
    <section ref={bannerRef} className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2 text-white" />
              <span className="text-sm font-medium text-white">Join the Movement</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Be Part of the
              <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Sustainable Revolution
              </span>
            </h2>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Every swap makes a difference. Join our community and help reduce textile waste 
              while discovering unique fashion pieces.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">2,500+</div>
                <div className="text-sm text-gray-300">Items Exchanged</div>
              </div>
              <div className="text-center bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white mb-2">150kg</div>
                <div className="text-sm text-gray-300">CO2 Saved</div>
              </div>
            </div>
            
            <button className="group px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Join Community
              <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
          
          {/* Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-3xl blur-3xl opacity-30 transform -rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop" 
                alt="Sustainable Fashion" 
                className="relative z-10 w-full max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOfferBanner