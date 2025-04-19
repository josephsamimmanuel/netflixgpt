import React from 'react'
import MovieCard from './MovieCard'
function MovieList({title, movies}) {
  return (
    <div className='flex flex-col p-2 gap-4'>
        <h1 className='text-white text-2xl font-bold underline'>{title}</h1>
        <MovieCard movies={movies}/>
    </div>
  )
}

export default MovieList
