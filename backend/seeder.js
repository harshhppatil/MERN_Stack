import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db.js';
import Movie from './src/models/Movie.js';
import User from './src/models/User.js';
import movies from './src/data/movies.js';
import otherMovies from './src/data/otherMovies.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing movies
    await Movie.deleteMany();

    // Find an admin user to associate the movies with
    // For this example, we'll just grab the first user.
    // In a real app, you might want a specific admin user.
    const adminUser = await User.findOne();

    if (!adminUser) {
      console.error('Error: No users found in the database. Please create a user first.');
      process.exit(1);
    }

    const allMovies = [...movies, ...otherMovies];

    const sampleMovies = allMovies.map((movie) => {
      return { ...movie, addedBy: adminUser._id };
    });

    await Movie.insertMany(sampleMovies);

    console.log('All Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Movie.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
