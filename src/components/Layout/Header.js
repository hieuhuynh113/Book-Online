import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">BookOnline</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
            <Link to="/new-releases" className="text-gray-700 hover:text-blue-600">New Releases</Link>
            <Link to="/popular" className="text-gray-700 hover:text-blue-600">Popular</Link>
          </nav>

          {/* Search and User Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <FaSearch className="w-5 h-5" />
            </button>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              <FaUserCircle className="w-6 h-6" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4">
            <div className="container mx-auto">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
                <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
                <Link to="/new-releases" className="text-gray-700 hover:text-blue-600">New Releases</Link>
                <Link to="/popular" className="text-gray-700 hover:text-blue-600">Popular</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
