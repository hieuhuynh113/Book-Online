import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comments from '../components/Books/Comments';
import { fetchBook } from '../services/api';
import { FaStar, FaBookmark, FaShare, FaDownload, FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';

const BookDetail = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock data - replace with actual API call
  const book = {
    id: id,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    coverImage: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    rating: 4.8,
    reviews: 1250,
    views: "15.2K",
    categories: ["Self-Help", "Psychology", "Personal Development"],
    description: `Đắc Nhân Tâm (How to Win Friends and Influence People) là một trong những cuốn sách nổi tiếng nhất của Dale Carnegie và của mọi thời đại.

    Đây là cuốn sách duy nhất về thể loại self-help liên tục đứng đầu danh mục sách bán chạy nhất (best-selling Books) do báo The New York Times bình chọn suốt 10 năm liền.

    Được xuất bản năm 1936, với số lượng bán ra hơn 15 triệu bản, Đắc Nhân Tâm là một trong những cuốn sách được dịch ra nhiều thứ tiếng và được bán nhiều nhất trên thế giới.`,
    publishedDate: "1936",
    publisher: "Simon & Schuster",
    pages: 291,
    language: "Tiếng Việt",
    isbn: "978-0671027032",
    chapters: [
      { id: 1, title: "Chương 1: Những nguyên tắc cơ bản", pages: 25 },
      { id: 2, title: "Chương 2: Sáu cách tạo thiện cảm", pages: 30 },
      { id: 3, title: "Chương 3: Cách thuyết phục người khác", pages: 28 },
      // Add more chapters
    ]
  };

  const relatedBooks = [
    {
      id: 2,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      coverImage: "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    },
    // Add more related books
  ];

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Book Header Section */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
              <div className="mt-4 flex justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <FaBookmark /> Bookmark
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                  <FaShare /> Share
                </button>
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
                {book.categories.map((category, index) => (
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
                  <h3 className="text-sm text-gray-500">ISBN</h3>
                  <p className="font-semibold">{book.isbn}</p>
                </div>
              </div>

              <Link
                to={`/book/${id}/read`}
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'description' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'chapters' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('chapters')}
            >
              Chapters
            </button>
            <button
                className={`px-6 py-3 font-medium ${
                activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('comments')}
            >
                Comments
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'description' ? (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{book.description}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {book.chapters.map((chapter) => (
                  <div 
                    key={chapter.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <h3 className="font-medium">{chapter.title}</h3>
                    <span className="text-gray-500">{chapter.pages} pages</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'comments' && (
                <Comments bookId={id} comments={book.comments} />
            )}
          </div>
        </div>
      </div>

      {/* Related Books */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {relatedBooks.map((book) => (
            <Link 
              key={book.id} 
              to={`/book/${book.id}`}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
