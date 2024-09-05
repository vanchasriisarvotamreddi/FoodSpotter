import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { useGeolocation } from '../../hooks/useGeolocation';

interface HeroProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onLocationChange }) => {
  const [zipCode, setZipCode] = useState('');
  const [isLoadingZipCode, setIsLoadingZipCode] = useState(false);
  const { getCurrentLocation, isLoading: isLoadingCurrentLocation } = useGeolocation();

  const handleZipCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;

    setIsLoadingZipCode(true);
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: zipCode + ', USA' });
      
      if (result.results[0]?.geometry?.location) {
        const location = result.results[0].geometry.location;
        onLocationChange({ lat: location.lat(), lng: location.lng() });
      }
    } catch (error) {
      console.error('Error geocoding zipcode:', error);
    } finally {
      setIsLoadingZipCode(false);
    }
  };

  const handleCurrentLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      onLocationChange(location);
    }
  };

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Find Your Next Favorite Spot
        </h1>
        <p className="text-xl text-white mb-8">
          Discover the best restaurants, cafes, and bars in your area
        </p>
        
        <form onSubmit={handleZipCodeSubmit} className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex gap-2">

            <button 
              type="submit"
              disabled={isLoadingZipCode || !zipCode}
              className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isLoadingZipCode ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};