import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comments from '../components/Books/Comments';
import { fetchBook } from '../services/api';
import { FaStar, FaBookmark, FaShare, FaHeart, FaRegHeart, FaEye, FaShoppingCart } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBook(id);
        setBook(data);
      } catch (error) {
        console.error('Error loading book:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Book not found</h2>
          <p className="text-gray-500 mt-2">The book you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = book.price - (book.price * book.discount) / 100;

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Book Header Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full rounded-lg shadow-lg"
                />
                {book.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                    -{book.discount}%
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}
                    </p>
                    {book.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                  <p className="text-xl text-gray-600 mb-4">{book.author}</p>
                </div>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="text-red-500 text-2xl"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{book.rating}</span>
                  <span className="text-gray-500 ml-1">({book.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <FaEye className="text-gray-400 mr-1" />
                  <span>{book.views} reads</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {book.categories && book.categories.map((category, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Published</h3>
                  <p className="font-semibold">{book.publishedDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Pages</h3>
                  <p className="font-semibold">{book.pages}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Language</h3>
                  <p className="font-semibold">{book.language}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-500">Publisher</h3>
                  <p className="font-semibold">{book.publisher}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 border-b">
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'description'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'chapters'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('chapters')}
                  >
                    Chapters
                  </button>
                  <button
                    className={`px-4 py-2 font-medium ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews
                  </button>
                </div>

                {activeTab === 'description' ? (
                  <p className="text-gray-700 whitespace-pre-line">
                    {book.description}
                  </p>
                ) : activeTab === 'chapters' ? (
                  <div className="space-y-2">
                    {book.chapters && book.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
                      >
                        <span className="font-medium">{chapter.title}</span>
                        <span className="text-gray-500">{chapter.pages} pages</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {book.comments && book.comments.map((comment) => (
                      <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{comment.user}</h4>
                            <p className="text-sm text-gray-500">{comment.date}</p>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span>{comment.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Reviews & Comments</h2>
        <Comments bookId={id} comments={book.comments} />
      </div>
    </div>
  );
};

export default BookDetail;
