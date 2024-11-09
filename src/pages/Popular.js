import React, { useState, useEffect } from 'react';
import BookCard from '../components/Books/BookCard';
import { fetchPopularBooks } from '../services/api';
import { FaSpinner, FaFire, FaTrophy, FaMedal } from 'react-icons/fa';

const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [timeRange, setTimeRange] = useState('week');

  const timeRanges = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' },
    { id: 'all', name: 'All Time' },
  ];

  const rankColors = {
    0: 'text-yellow-400', // Gold
    1: 'text-gray-400',   // Silver
    2: 'text-amber-600'   // Bronze
  };

  const getRankIcon = (index) => {
    switch(index) {
      case 0:
        return <FaTrophy className={`w-6 h-6 ${rankColors[0]}`} />;
      case 1:
        return <FaMedal className={`w-6 h-6 ${rankColors[1]}`} />;
      case 2:
        return <FaMedal className={`w-6 h-6 ${rankColors[2]}`} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularBooks();
        // Sort by views (assuming views are in format "15.2K")
        const sortedBooks = [...data].sort((a, b) => {
          const aViews = parseFloat(a.views.replace('K', ''));
          const bViews = parseFloat(b.views.replace('K', ''));
          return bViews - aViews;
        });
        setBooks(sortedBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [timeRange]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <FaFire className="text-orange-500 w-8 h-8 mr-3" />
            <h1 className="text-3xl font-bold">Popular Books</h1>
          </div>

          {/* Time Range Selector */}
          <div className="flex space-x-4">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  timeRange === range.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Books */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Top 3 Most Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {books.slice(0, 3).map((book, index) => (
              <div key={book.id} className="relative transform hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 z-10 bg-white p-2 rounded-full shadow-lg">
                  {getRankIcon(index)}
                </div>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More Popular Books */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">More Popular Books</h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.slice(3).map((book, index) => (
              <BookCard 
                key={book.id} 
                book={{
                  ...book,
                  rank: index + 4
                }} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;
