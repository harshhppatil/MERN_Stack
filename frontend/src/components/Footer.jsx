import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-gray-400">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">CinemaStack</h3>
            <p className="max-w-xs">
              Your one-stop solution for discovering and organizing movies. Experience cinema like never before.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li className="mb-2"><Link to="/movies" className="hover:text-red-500 transition-colors">Movies</Link></li>
              <li className="mb-2"><Link to="/dashboard" className="hover:text-red-500 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-red-500 transition-colors">Action</a></li>
              <li className="mb-2"><a href="#" className="hover:text-red-500 transition-colors">Comedy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-red-500 transition-colors">Drama</a></li>
              <li className="mb-2"><a href="#" className="hover:text-red-500 transition-colors">Thriller</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2">info@cinemastack.com</li>
              <li className="mb-2">Surat, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CinemaStack. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
