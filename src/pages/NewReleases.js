import React, { useState, useEffect } from 'react';
import BookCard from '../components/Books/BookCard';
import { fetchNewReleases } from '../services/api';
import { FaSpinner, FaCalendarAlt, FaStar } from 'react-icons/fa';

const NewReleases = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('date');

  // Add release dates to books
  const booksWithDates = {
    "Harry Potter và Hòn đá Phù thủy": "2024-01-15",
    "Chiến binh Cầu vồng": "2024-01-10",
    "Hoàng tử bé": "2024-01-05",
    "Đắc Nhân Tâm": "2023-12-20"
  };

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const data = await fetchNewReleases();
        const sortedBooks = [...data].sort((a, b) => {
          if (sortBy === 'date') {
            return new Date(booksWithDates[b.title]) - new Date(booksWithDates[a.title]);
          }
          if (sortBy === 'rating') {
            return b.rating - a.rating;
          }
          return b.views.localeCompare(a.views);
        });
        setBooks(sortedBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [sortBy]);

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">New Releases</h1>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="date">Release Date</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full">
              This Week
            </button>
            <button className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              This Month
            </button>
            <button className="px-6 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              Last Month
            </button>
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
          <div className="space-y-12">
            {/* New This Week */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                New This Week
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <BookCard 
                    key={book.id} 
                    book={{
                      ...book,
                      releaseDate: booksWithDates[book.title]
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewReleases;
