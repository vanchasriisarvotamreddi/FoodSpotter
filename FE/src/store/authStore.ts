// import { create } from 'zustand';
// import { User } from '../types';

// interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (credentials: { email: string; password: string }) => boolean;
//   logout: () => void;
// }

// const mockUsers = [
//   {
//     id: '1',
//     name: 'Restaurant Owner',
//     email: 'owner',
//     password: '12345',
//     role: 'business' as const,
//   },
//   {
//     id: '2',
//     name: 'Regular User',
//     email: 'user',
//     password: '12345',
//     role: 'user' as const,
//   },
//   {
//     id: '3',
//     name: 'Super Admin',
//     email: 'superadmin',
//     password: '12345',
//     role: 'admin' as const,
//   },
// ];

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   isAuthenticated: false,
//   login: (credentials) => {
//     const user = mockUsers.find(
//       (u) => u.email === credentials.email && u.password === credentials.password
//     );
    
//     if (user) {
//       const { password, ...userWithoutPassword } = user;
//       set({ user: userWithoutPassword as User, isAuthenticated: true });
//       return true;
//     }
//     return false;
//   },
//   logout: () => {
//     set({ user: null, isAuthenticated: false });
//   },
// }));

import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,


  // Login with backend integration
  login: async (credentials) => {
    try {

      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        console.error('Failed to log in');
        return false;
      }

      const data: User = await response.json(); // Assuming the backend sends a user 

      set({ user: data, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  },

  // Logout function
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
