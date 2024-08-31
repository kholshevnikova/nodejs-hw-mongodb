import MovieCollection from '../db/models/Movie.js';

export const getAllMovies = () => MovieCollection.find();

export const getMovieById = () => MovieCollection.findById();
