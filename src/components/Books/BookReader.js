import React, { useState } from 'react';

const BookReader = ({ book }) => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const adjustFontSize = (delta) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + delta)));
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">{book.title}</h1>
          <div className="flex space-x-4">
            <button onClick={() => adjustFontSize(-2)}>A-</button>
            <button onClick={() => adjustFontSize(2)}>A+</button>
            <button onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto pt-20 px-4">
        <div 
          className="prose max-w-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          {book.content}
        </div>
      </div>
    </div>
  );
};

export default BookReader;
