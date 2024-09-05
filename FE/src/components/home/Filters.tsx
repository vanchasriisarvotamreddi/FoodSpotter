import React from 'react';
import { Filter } from 'lucide-react';

interface FiltersProps {
  onFilterChange: (filters: {
    cuisine: string[];
    dietary: string[];
    priceRange: string[];
  }) => void;
}

// Common cuisine types from Google Places API
const cuisineOptions = [
  'American',
  'Chinese',
  'French',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Thai',
  'Vietnamese',
  'Mediterranean',
  'Middle Eastern',
  'Seafood',
  'Steakhouse',
  'Pizza',
  'Sushi',
  'Vegetarian',
  'Vegan',
  'Fast food',
  'Cafe'
];

const dietaryOptions = ['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-free'];
const priceRangeOptions = ['low', 'medium', 'high'];

export const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = React.useState({
    cuisine: [] as string[],
    dietary: [] as string[],
    priceRange: [] as string[],
  });

  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters };
    const index = updatedFilters[category].indexOf(value);
    
    if (index === -1) {
      updatedFilters[category] = [...updatedFilters[category], value];
    } else {
      updatedFilters[category] = updatedFilters[category].filter((item) => item !== value);
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-primary-500 mr-2" />
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      <div className="space-y-6">
        {/* Cuisine Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Cuisine</h4>
          <div className="flex flex-wrap gap-2">
            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => handleFilterChange('cuisine', cuisine.toLowerCase())}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.cuisine.includes(cuisine.toLowerCase())
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Dietary</h4>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleFilterChange('dietary', option.toLowerCase())}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.dietary.includes(option.toLowerCase())
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
          <div className="flex gap-2">
            {priceRangeOptions.map((range) => (
              <button
                key={range}
                onClick={() => handleFilterChange('priceRange', range)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.priceRange.includes(range)
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'low' ? '$' : range === 'medium' ? '$$' : '$$$'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};