import { create } from 'zustand';
import { Restaurant } from '../types';

interface RestaurantState {
  restaurants: Restaurant[];
  addRestaurant: (restaurant: Omit<Restaurant, 'id'>) => void;
  updateRestaurant: (id: string, restaurant: Partial<Restaurant>) => void;
  deleteRestaurant: (id: string) => void;
  
  getRestaurantsByOwner: (ownerId: string) => Restaurant[];
  getRestaurantById: (id: string) => Restaurant | undefined;
  addReview: (restaurantId: string, review: Omit<Restaurant['reviews'][0], 'id'>) => void;
}

// Sample data


export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  
  addRestaurant: (restaurant) => {
    set((state) => ({
      restaurants: [
        ...state.restaurants,
        { ...restaurant, id: Math.random().toString(36).substr(2, 9) }
      ]
    }));
  },

  updateRestaurant: (id, updates) => {
    set((state) => ({
      restaurants: state.restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, ...updates } : restaurant
      )
    }));
  },

  deleteRestaurant: (id) => {
    set((state) => ({
      restaurants: state.restaurants.filter((restaurant) => restaurant.id !== id)
    }));
  },

  getRestaurantsByOwner: (ownerId) => {
    return get().restaurants.filter((restaurant) => restaurant.ownerId === ownerId);
  },

  getRestaurantById: (id) => {
    return get().restaurants.find((restaurant) => restaurant.id === id);
  },

  addReview: (restaurantId, review) => {
    set((state) => ({
      restaurants: state.restaurants.map((restaurant) => {
        if (restaurant.id === restaurantId) {
          const newReview = {
            ...review,
            id: Math.random().toString(36).substr(2, 9),
          };
          
          // Calculate new rating
          const totalRatings = restaurant.reviews.reduce((acc, r) => acc + r.rating, 0) + review.rating;
          const newRating = totalRatings / (restaurant.reviews.length + 1);

          return {
            ...restaurant,
            reviews: [...restaurant.reviews, newReview],
            rating: Number(newRating.toFixed(1))
          };
        }
        return restaurant;
      })
    }));
  }
}));