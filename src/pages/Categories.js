import React, { useState, useEffect } from 'react';
import BookCard from '../components/Books/BookCard';
import { fetchBooksByCategory } from '../services/api';
import { FaSpinner } from 'react-icons/fa';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Fiction', name: 'Fiction', count: 3 },
    { id: 'Fantasy', name: 'Fantasy', count: 1 },
    { id: "Children's Literature", name: "Children's Literature", count: 1 },
    { id: 'Self-Help', name: 'Self-Help', count: 1 },
    { id: 'Psychology', name: 'Psychology', count: 1 },
    { id: 'Philosophy', name: 'Philosophy', count: 1 },
    { id: 'Coming of Age', name: 'Coming of Age', count: 1 },
    { id: 'Education', name: 'Education', count: 1 }
  ];

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchBooksByCategory(selectedCategory);
        setBooks(data);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [selectedCategory]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Browse Categories</h1>
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                {category.count && (
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing {books.length} book{books.length !== 1 ? 's' : ''} in {selectedCategory === 'all' ? 'all categories' : selectedCategory}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
