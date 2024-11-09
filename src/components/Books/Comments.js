import React, { useState } from 'react';
import { FaUser, FaStar } from 'react-icons/fa';
import { addComment, addRating } from '../../services/api';

const Comments = ({ bookId, comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const comment = {
        text: newComment,
        rating,
        userId: 'current-user-id', // Replace with actual user ID
        timestamp: new Date().toISOString(),
      };
      
      const response = await addComment(bookId, comment);
      setComments([...comments, response]);
      setNewComment('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Rating Input */}
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="text-2xl transition-colors"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <FaStar
              className={`${
                star <= (hoveredRating || rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this book..."
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Post Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <FaUser className="text-gray-400" />
              <span className="font-medium">User</span>
              <div className="flex text-yellow-400">
                {[...Array(comment.rating)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{comment.text}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.timestamp).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
