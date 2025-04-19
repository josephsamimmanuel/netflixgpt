import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

function SecondaryContainer() {
  const movies = useSelector((store) => store?.movies?.movies);
  return (
    <div className='mt-[-20%] relative z-20'>
      <MovieList title={"Now Playing"} movies={movies}/>
      <MovieList title={"Top Rated"} movies={movies}/>
      <MovieList title={"Popular"} movies={movies}/>
      <MovieList title={"Upcoming"} movies={movies}/>
    </div>
  )
}

export default SecondaryContainer
