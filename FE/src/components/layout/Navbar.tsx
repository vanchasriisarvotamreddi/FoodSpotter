import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, LogIn, Menu, Plus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import FastfoodIcon from "@mui/icons-material/Fastfood";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                  <div
                      className="nav-logo-container"
                      style={{ display: "flex", alignItems: "center" }}
                  >
                      {/* Material-UI Fastfood Icon */}
                      <FastfoodIcon
                          style={{
                              color: "#FF5722", // Deep Orange
                              fontSize: "2.5rem", // Adjust the size of the icon
                              marginRight: "8px", // Add spacing between icon and text
                          }}
                      />

                      {/* GrubHunt Text */}
                      <span className="text-2xl font-bold" style={{ color: "#FF5722" }}>
        GrubHunt
      </span>
                  </div>
              </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user?.role === 'user' && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="w-64 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'business' && (
                  <Link
                    to="/add-restaurant"
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Restaurant</span>
                  </Link>
                )}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{user?.name}</span>
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                        {user?.role === 'business' && (
                          <Link
                            to="/dashboard"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Dashboard
                          </Link>
                        )}
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Panel
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign in</span>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user?.role === 'user' && (
              <div className="relative mx-2 mb-4">
                <input
                  type="text"
                  placeholder="Search restaurants..."
                  className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Profile
                </Link>
                {user?.role === 'business' && (
                  <>
                    <Link
                      to="/add-restaurant"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Add Restaurant
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};