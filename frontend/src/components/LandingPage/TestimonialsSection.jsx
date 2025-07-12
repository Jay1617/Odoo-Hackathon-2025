import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, Recycle, TrendingUp, Heart, Clock, Award, Play, Pause, Shield, Truck, MessageCircle, Search, Filter, ChevronDown } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content: "ReWear has completely changed how I think about my wardrobe. I've discovered so many unique pieces while knowing I'm helping the planet.",
      image: "https://randomuser.me/api/portraits/women/43.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Sustainability Advocate",
      content: "The community aspect makes all the difference. I've made real connections while refreshing my style sustainably.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Graphic Designer",
      content: "The points system is genius! I've been able to get high-quality items just by sharing pieces I no longer wear.",
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mb-6">
            <MessageCircle className="w-5 h-5 mr-2 text-purple-600" />
            <span className="text-sm font-bold text-purple-700">Community Voices</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our community about their experiences with ReWear
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">"{testimonial.content}"</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;