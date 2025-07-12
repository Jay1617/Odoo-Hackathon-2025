import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, Recycle, TrendingUp, Heart, Clock, Award, Play, Pause, Shield, Truck, MessageCircle, Search, Filter, ChevronDown } from 'lucide-react';
const FeaturesSection = () => {
  const features = [
    {
      icon: Recycle,
      title: "Sustainable Swapping",
      description: "Give your clothes a second life and reduce textile waste through our community-driven platform.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with fashion lovers who share your values and discover unique pieces from real people.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Star,
      title: "Points System",
      description: "Earn points by listing items and use them to get amazing pieces from other members.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Verified Members",
      description: "Our verification system ensures trust and safety in all transactions.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Truck,
      title: "Easy Shipping",
      description: "Integrated shipping options make exchanging items simple and hassle-free.",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All items are reviewed by our team to ensure they meet quality standards.",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Why Choose ReWear?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the way people think about fashion by making sustainability social
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.color} shadow-lg`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;