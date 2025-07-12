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
export default ProfessionalCarousel;