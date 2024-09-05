import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Clock, MapPin, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';


export const AddRestaurantPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
 
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cuisine: [] as string[],
    priceRange: 'medium' as 'low' | 'medium' | 'high',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      lat: 0,
      lng: 0
    },
    dietary: [] as string[],
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    photos: [] as string[]
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState('');

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

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Kosher',
    'Dairy-Free',
    'Nut-Free',
    'Low-Carb'
  ];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   const payload = {
  //     ...formData,  // Add existing form data
  //     ownerId: user?.id, // Add the ownerId to the payload
  //   };

  
  //   try {
  //     const res = await fetch(`http://localhost:8080/owner/add/${user?.name}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //        body: JSON.stringify(payload),
  //     });
  
  //     if (!res.ok) {
  //       throw new Error('Failed to add restaurant');
  //     }
  
  //     const data = await res.json();
  
  //     // Handle successful response (optional)
  //     alert('Restaurant added successfully!');
  //     navigate('/dashboard'); // Redirect to dashboard after success
  //   } catch (error) {
  //     console.error('Error adding restaurant:', error);
  //     alert('Failed to add restaurant. Please try again.');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      
      name: formData.name,
      description: formData.description,
      cuisine: formData.cuisine,
      priceRange: formData.priceRange,
      address: {
          street: formData.address.street,
          city: formData.address.city,
          state: formData.address.state,
          zipCode: formData.address.zipCode || null, // Ensure zipCode is sent as null if empty
          lat: formData.address.lat,
          lng: formData.address.lng,
      },
      dietary: formData.dietary,
      hours: formData.hours,
      photos: formData.photos.length > 0 ? formData.photos : ["defaultPhoto"], // Default photo if empty
      closed: false, // Add closed business field
      ownerId: user?.name
  };
  
  
    try {
      const res = await fetch(`http://localhost:8080/owner/add/${user?.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Failed to add restaurant:', errorData);
        throw new Error('Failed to add restaurant');
      }
  
      const data = await res.json();
      alert('Restaurant added successfully!');
      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (error) {
      console.error('Error adding restaurant:', error);
      alert('Failed to add restaurant. Please try again.');
    }
  };
  



  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Restaurant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow rounded-lg p-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cuisine Types</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <label key={cuisine} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.cuisine.includes(cuisine)}
                      onChange={(e) => {
                        const newCuisine = e.target.checked
                          ? [...formData.cuisine, cuisine]
                          : formData.cuisine.filter((c) => c !== cuisine);
                        setFormData({ ...formData, cuisine: newCuisine });
                      }}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dietary Options</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {dietaryOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietary.includes(option)}
                      onChange={(e) => {
                        const newDietary = e.target.checked
                          ? [...formData.dietary, option]
                          : formData.dietary.filter((d) => d !== option);
                        setFormData({ ...formData, dietary: newDietary });
                      }}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="mt-2 space-x-4">
                {['low', 'medium', 'high'].map((range) => (
                  <label key={range} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range}
                      checked={formData.priceRange === range}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as 'low' | 'medium' | 'high' })}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 capitalize">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Address</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
            
            {Object.keys(formData.hours).map((day) => (
              <div key={day}>
                <label htmlFor={day} className="block text-sm font-medium text-gray-700 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  id={day}
                  value={formData.hours[day as keyof typeof formData.hours]}
                  onChange={(e) => setFormData({
                    ...formData,
                    hours: { ...formData.hours, [day]: e.target.value }
                  })}
                  placeholder="e.g., 9:00 AM - 10:00 PM"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            ))}
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
            
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Add Photo URL
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Enter photo URL"
                  className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Restaurant photo ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700"
            >
              Add Restaurant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};