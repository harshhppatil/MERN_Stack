import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Placeholder for icons - in a real app, these might be separate components or from a library
const FeatureIcon = ({ d }) => (
  <svg className="w-12 h-12 mb-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={d}></path></svg>
);

const HomePage = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: "M15 5v14m-8-7h8", // Placeholder icon
      title: "Vast Library",
      description: "Explore a huge collection of movies, from classics to new releases."
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Personalized Lists",
      description: "Keep track of movies you love with Favorites and a Watchlist."
    },
    {
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
      title: "Secure & Private",
      description: "Your data is yours. Manage your movie lists securely."
    },
    {
      icon: "M10 21h4m-2-4v4M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z",
      title: "Mobile Friendly",
      description: "Browse and manage your lists on the go, on any device."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div
        className="relative h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop')`, // Placeholder image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Welcome to <span className="text-red-600">CinemaStack</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate destination to discover, track, and organize your favorite movies.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/movies"
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg shadow-red-600/30"
            >
              Browse Movies
            </Link>
            {!user && (
              <Link
                to="/register"
                className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <FeatureIcon d={feature.icon} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;