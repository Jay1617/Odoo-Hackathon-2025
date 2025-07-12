import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Star, Users, Recycle, TrendingUp, Heart, Clock, Award, Play, Pause, Shield, Truck, MessageCircle, Search, Filter, ChevronDown } from 'lucide-react';

// Enhanced mock data for carousel
const carouselItems = [
  {
    id: 1,
    title: "Sustainable Fashion Week",
    subtitle: "Join the Movement",
    description: "Discover how fashion can be both stylish and sustainable. Swap, share, and care for our planet.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
    cta: "Explore Now",
    badge: "Featured"
  },
  {
    id: 2,
    title: "Premium Collection",
    subtitle: "Designer Pieces Available",
    description: "High-end fashion items from top brands. Exchange points for luxury pieces in excellent condition.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=600&fit=crop",
    cta: "Browse Collection",
    badge: "Premium"
  },
  {
    id: 3,
    title: "Community Spotlight",
    subtitle: "Member Success Stories",
    description: "See how our community members have transformed their wardrobes while helping the environment.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=600&fit=crop",
    cta: "Read Stories",
    badge: "Community"
  },
  {
    id: 4,
    title: "Eco Impact Report",
    subtitle: "Making a Difference Together",
    description: "Together we've saved 150kg of textile waste and reduced CO2 emissions by 75kg this month.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop",
    cta: "View Impact",
    badge: "Impact"
  }
];

// Professional Carousel Component
const ProfessionalCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  
  const totalSlides = carouselItems.length;
  const autoplayDelay = 5000; // 5 seconds

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoplayDelay);
    
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  // Progress bar animation
  useEffect(() => {
    if (!isPlaying) return;
    
    setProgressWidth(0);
    const progressInterval = setInterval(() => {
      setProgressWidth((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + (100 / (autoplayDelay / 100));
      });
    }, 100);
    
    return () => clearInterval(progressInterval);
  }, [currentSlide, isPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Featured': return 'bg-gradient-to-r from-orange-500 to-red-500';
      case 'Premium': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Community': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'Impact': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-gray-900">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-[10s] ease-out"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-1000 transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-8'
                }`}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-white text-sm font-medium mb-8 ${getBadgeColor(item.badge)} shadow-lg`}>
                  <Star className="w-4 h-4 mr-2" />
                  {item.badge}
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {item.title}
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-gray-200 font-light mb-8">
                  {item.subtitle}
                </h2>
                
                <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="group relative overflow-hidden px-10 py-5 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <span className="relative z-10 flex items-center justify-center">
                      {item.cta}
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  
                  <button className="px-10 py-5 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 z-30 group p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 z-30 group p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300" />
      </button>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-6 bg-white bg-opacity-10 backdrop-blur-md rounded-full px-8 py-4">
          {/* Slide Indicators */}
          <div className="flex space-x-3">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white w-8' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          {/* Progress Bar */}
          {isPlaying && (
            <div className="w-20 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-30">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl px-6 py-3 text-white text-sm font-medium">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

// Mock data for products
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
              <span className="text-sm font-semibold text-gray-700">Live Community • 2,847 Members Online</span>
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

// Enhanced Product Card Component
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

// Popular Items Section
const PopularSection = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'jackets', 'dresses', 'footwear', 'accessories'];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesFilter = filter === 'all' || product.category.toLowerCase().includes(filter);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
            <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
            <span className="text-sm font-bold text-orange-700">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Popular This Week
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most loved items in our community. These pieces are flying off the virtual shelves!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search items..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
            <select
              className="appearance-none block w-full pl-10 pr-10 py-4 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-700"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isFeatured />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group relative overflow-hidden px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10 flex items-center justify-center">
              View All Items
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

// New Arrivals Section
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

// Features Section
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

// Testimonials Section
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

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Join the Fashion Revolution?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Become part of a community that values style, sustainability, and meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10 flex items-center justify-center">
                Sign Up Now
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-10 py-5 bg-transparent text-white rounded-2xl font-bold text-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const links = [
    {
      title: "About",
      items: ["Our Story", "Mission", "Team", "Careers"]
    },
    {
      title: "Community",
      items: ["Guidelines", "Forum", "Events", "Blog"]
    },
    {
      title: "Help",
      items: ["FAQ", "Shipping", "Returns", "Contact"]
    },
    {
      title: "Legal",
      items: ["Privacy", "Terms", "Cookies", "Security"]
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ReWear
              </span>
            </h3>
            <p className="text-gray-400 mb-6">
              The community platform for sustainable fashion exchange and swapping.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.024-.047 1.379-.06 3.808-.06h.08c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.024-.047 1.379-.06 3.808-.06h.08zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          
          {links.map((link, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                {link.title}
              </h3>
              <ul className="space-y-4">
                {link.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ReWear. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
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