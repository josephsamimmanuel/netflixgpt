import React, { useState } from 'react'
import { TMDB_IMAGE_URL } from '../utils/constant'
import DialogBoxMovieDetails from './DialogBoxMovieDetails'

function GptMovieSuggestions({ movies }) {
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };
  console.log(movies);
  return (
    <div className='flex flex-wrap gap-2 p-2 w-full'>
      {movies.map((movie) => (
        <div className='w-72' key={movie.id}>
        <img
          src={`${TMDB_IMAGE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className='w-72 hover:scale-105 transition-all duration-300 rounded-lg'
          onClick={() => handleOpen(movie)}
        />
        <p className='text-white text-sm'>{movie.title}</p>
        </div>
      ))}
      <DialogBoxMovieDetails movie={selectedMovie} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default GptMovieSuggestions
