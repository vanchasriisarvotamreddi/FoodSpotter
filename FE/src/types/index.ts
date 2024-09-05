export type UserRole = 'user' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  priceRange: 'low' | 'medium' | 'high';
  rating: number;
  reviews: Review[];
  address: Address;
  photos: string[];
  hours: BusinessHours;
  ownerId: string;
  dietary: string[];
}

export interface Review {
  id: string;
  // userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}