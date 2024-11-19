import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaEye, FaBookmark } from 'react-icons/fa';

const BookCard = ({ book }) => {
  const {
    id,
    title,
    author,
    coverImage,
    rating,
    reviews,
    views,
    categories,
    description,
    price,
    discount,
  } = book || {};

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-[400px]">
        <Link to={`/book/${id}`}>
          <img
            className="w-full h-full object-cover"
            src={coverImage}
            alt={title}
          />
          {discount > 0 && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg font-semibold">
              -{discount}%
            </div>
          )}
          <div className="absolute top-0 right-0 p-2">
            <button className="text-white hover:text-yellow-400 transition-colors">
              <FaBookmark className="w-6 h-6" />
            </button>
          </div>
        </Link>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <Link to={`/book/${id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 line-clamp-2 h-[3.5rem]">
            {title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-2">{author}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-4">
            <FaStar className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-gray-600">{rating}</span>
            <span className="text-gray-500 ml-1">({reviews})</span>
          </div>
          <div className="flex items-center">
            <FaEye className="w-4 h-4 text-gray-400 mr-1" />
            <span className="text-gray-600">{views}</span>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2 h-[2.5rem]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories && categories.map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-gray-500 line-through text-sm">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
              </span>
              <span className="text-blue-600 font-semibold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discountedPrice)}
              </span>
            </div>
            <Link
              to={`/book/${id}/read-book`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Read Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
