import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCog, FaDownload, FaShare } from 'react-icons/fa';

const BookReader = () => {
  const { id } = useParams();
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // Mock content - replace with actual API call
  const content = {
    title: "Đắc Nhân Tâm",
    chapter: "Chương 1: Những nguyên tắc cơ bản",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  };

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading book...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: 'Check out this book!',
        url: window.location.href,
      });
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') setCurrentPage(p => Math.max(1, p - 1));
      if (e.key === 'ArrowRight') setCurrentPage(p => p + 1);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm z-50"
           onMouseEnter={() => setShowControls(true)}
           onMouseLeave={() => setShowControls(false)}>
        <div className={`container mx-auto px-4 py-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">{content.title}</h1>
            <div className="flex items-center space-x-4">
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                <FaCog className="w-5 h-5" />
              </button>
              <button onClick={handleDownload}>
                <FaDownload className="w-5 h-5" />
              </button>
              <button onClick={handleShare}>
                <FaShare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-20 pb-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{content.chapter}</h2>
          <div 
            className="prose max-w-none"
            style={{ fontSize: `${fontSize}px` }}
          >
            <p className="whitespace-pre-line">{content.text}</p>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm"
           onMouseEnter={() => setShowControls(true)}
           onMouseLeave={() => setShowControls(false)}>
        <div className={`container mx-auto px-4 py-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFontSize(size => size - 1)}
                className="px-3 py-1 border rounded"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(size => size + 1)}
                className="px-3 py-1 border rounded"
              >
                A+
              </button>
            </div>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
