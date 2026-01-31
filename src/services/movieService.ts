import axios from 'axios';
import type { SearchResponse, Movie } from '../types/movie';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await instance.get<SearchResponse>('search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  
  return data.results;
};