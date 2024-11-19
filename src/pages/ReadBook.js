import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBook } from '../services/api';
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from 'react-icons/fa';

const ReadBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const FREE_PAGE_LIMIT = 10;

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBook(id);
        setBook(data);
      } catch (error) {
        console.error('Error loading book:', error);
      }
    };
    loadBook();
  }, [id]);

  const handleNextPage = () => {
    if (currentPage === FREE_PAGE_LIMIT) {
      setShowPurchaseModal(true);
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handlePurchase = () => {
    // TODO: Implement purchase functionality
    navigate(`/book/${id}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen pt-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-100">
      {/* Reading Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/book/${id}`)}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-gray-600">{book.author}</p>
              </div>
            </div>
            <div className="text-gray-600">
              Page {currentPage} of {Math.min(FREE_PAGE_LIMIT, book.pages)}
            </div>
          </div>
        </div>
      </div>

      {/* Reading Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="prose max-w-none">
            {/* Sample content for demonstration */}
            <h2 className="text-2xl font-bold mb-4">
              {book.chapters[Math.min(currentPage - 1, book.chapters.length - 1)]?.title || 'Chapter Title'}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {currentPage <= FREE_PAGE_LIMIT ? (
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              ) : (
                <div className="text-center text-gray-500">
                  Content locked. Please purchase the book to continue reading.
                </div>
              )}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <FaArrowLeft /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === book.pages}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                currentPage === book.pages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Want to Continue Reading?
            </h3>
            <p className="text-gray-600 mb-6">
              You've reached the free preview limit. Purchase the book to continue reading and get access to all {book.pages} pages.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handlePurchase}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Purchase for {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadBook;
