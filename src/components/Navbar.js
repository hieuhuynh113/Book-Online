import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { searchBooks, getCart, removeFromCart, updateCartItemQuantity } from '../services/api';
import { formatCurrency } from '../utils/format';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });
  
  const searchRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  useEffect(() => {
    // Update cart data whenever cart icon is clicked
    if (showCart) {
      const cartData = getCart();
      setCart(cartData);
    }
  }, [showCart]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchBooks(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      const result = await removeFromCart(bookId);
      setCart(result.cart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (bookId, quantity) => {
    try {
      const result = await updateCartItemQuantity(bookId, quantity);
      setCart(result.cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Book Online"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Trang chủ
              </Link>
              <Link
                to="/categories"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Thể loại
              </Link>
              <Link
                to="/new-releases"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sách mới
              </Link>
              <Link
                to="/popular"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Phổ biến
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {/* Search Bar */}
            <div className="relative mr-4" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                  {searchResults.map((book) => (
                    <Link
                      key={book.id}
                      to={`/book/${book.id}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setShowResults(false)}
                    >
                      <div className="flex items-center">
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className="w-12 h-16 object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium">{book.title}</div>
                          <div className="text-sm text-gray-600">{book.author}</div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(book.price)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {showResults && searchResults.length === 0 && searchQuery && !loading && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
                  Không tìm thấy kết quả
                </div>
              )}

              {loading && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg p-4 text-center text-gray-500">
                  Đang tìm kiếm...
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <div className="relative" ref={cartRef}>
              <button
                className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={() => setShowCart(!showCart)}
              >
                <FaShoppingCart className="h-6 w-6" />
                {cart.items.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {cart.items.length}
                  </span>
                )}
              </button>

              {/* Cart Dropdown */}
              {showCart && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Giỏ hàng</h3>
                    {cart.items.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">Giỏ hàng trống</p>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {cart.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <div className="text-sm text-gray-500">
                                  {formatCurrency(item.finalPrice)}
                                </div>
                                <div className="flex items-center mt-2">
                                  <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  >
                                    -
                                  </button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  >
                                    +
                                  </button>
                                  <button
                                    className="ml-4 text-red-600 hover:text-red-800"
                                    onClick={() => handleRemoveFromCart(item.id)}
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Tổng cộng</p>
                            <p>{formatCurrency(cart.total)}</p>
                          </div>
                          <div className="mt-6">
                            <Link
                              to="/checkout"
                              className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                              onClick={() => setShowCart(false)}
                            >
                              Thanh toán
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
