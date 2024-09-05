import React from 'react';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isCompact?: boolean;
  isHighlighted?: boolean;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  isCompact = false,
  isHighlighted = false,
}) => {
  const getPriceRange = (range: string) => {
    switch (range) {
      case 'low':
        return <DollarSign className="h-4 w-4" />;
      case 'medium':
        return <div className="flex"><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /></div>;
      case 'high':
        return <div className="flex"><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /><DollarSign className="h-4 w-4" /></div>;
      default:
        return null;
    }
  };

  const formatLocation = (address: Restaurant['address']) => {
    if (address.city && address.state) {
      return `${address.city}, ${address.state}`;
    }
    // If city/state not available, use the street address
    return address.street;
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block group">
      <div 
        className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 ${
          isHighlighted ? 'ring-2 ring-primary-500 transform scale-[1.02]' : ''
        }`}
      >
        <div className={`relative ${isCompact ? 'h-32' : 'h-48'}`}>
          <img
            src={restaurant.photos[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
            <Star className="h-4 w-4 text-primary-500 fill-current" />
            <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-500">
              {restaurant.name}
            </h3>
            <div className="text-primary-500">
              {getPriceRange(restaurant.priceRange)}
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{formatLocation(restaurant.address)}</span>
          </div>
          
          {!isCompact && (
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisine.map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};