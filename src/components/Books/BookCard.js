import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEye, FaBookmark } from 'react-icons/fa';

const BookCard = ({ book }) => {
  const {
    id = 1,
    title = "Đắc Nhân Tâm",
    author = "Dale Carnegie",
    coverImage = "https://nxbhcm.com.vn/Image/Biasach/dacnhantam86.jpg",
    rating = 4.5,
    views = "10.2K",
    categories = ["Self-Help", "Psychology"],
    description = "Đắc Nhân Tâm là cuốn sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại.",
  } = book || {};

  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="relative">
        <Link to={`/book/${id}`}>
          <img
            className="w-full h-64 object-cover"
            src={coverImage}
            alt={title}
          />
          <div className="absolute top-0 right-0 p-2">
            <button className="text-white hover:text-yellow-400 transition-colors">
              <FaBookmark className="w-6 h-6" />
            </button>
          </div>
        </Link>
      </div>

      <div className="p-5">
        <Link to={`/book/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">{author}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-gray-600">{rating}</span>
          </div>
          <div className="flex items-center">
            <FaEye className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">{views}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          to={`/book/${id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Read Now
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
