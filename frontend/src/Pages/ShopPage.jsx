import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, Recycle, TrendingUp, Heart, Clock, Award, Play, Pause, Shield, Truck, MessageCircle, Search, Filter, ChevronDown } from 'lucide-react';
import TestimonialsSection from '../components/LandingPage/TestimonialsSection';
import FeaturesSection from '../components/LandingPage/FeaturesSection';
import NewArrivalsSection from '../components/LandingPage/NewArrivalsSection';
import HeroSection from '../components/LandingPage/HeroSection';
import ProfessionalCarousel from '../components/LandingPage/ProfessionalCarousel';
import PopularSection from '../components/LandingPage/PopularSection';


const ShopPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ProfessionalCarousel />
      <HeroSection />
      <PopularSection />
      <NewArrivalsSection />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default ShopPage;