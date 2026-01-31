import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';

import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';

import styles from './App.module.css'; 

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(results);
    } catch (error) {
      console.error(error);
      setIsError(true);
      toast.error('Failed to fetch movies.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

    return (
    <> 
      <SearchBar onSubmit={handleSearch} />
     
      <div className={styles.appContainer}>
        <Toaster position="top-right" />
        
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        
        {movies.length > 0 && <MovieGrid movies={movies} onSelect={openModal} />}
        
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={closeModal} />
        )}
      </div>
    </>
  )};

export default App;