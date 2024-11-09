import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import BookReader from './pages/BookReader';
import Categories from './pages/Categories';
import NewReleases from './pages/NewReleases';
import Popular from './pages/Popular';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/book/:id/read" element={<BookReader />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new-releases" element={<NewReleases />} />
          <Route path="/popular" element={<Popular />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
