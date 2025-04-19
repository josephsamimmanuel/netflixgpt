import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

function SecondaryContainer() {
  const movies = useSelector((store) => store?.movies?.movies);
  const popularMovies = useSelector((store) => store?.movies?.popularMovies);
  const topRatedMovies = useSelector((store) => store?.movies?.topRatedMovies);
  const upcomingMovies = useSelector((store) => store?.movies?.upcomingMovies);
  console.log('Upcoming Movies', upcomingMovies);
  console.log('Top Rated Movies', topRatedMovies);
  console.log('Popular Movies', popularMovies);
  console.log('Now Playing Movies', movies);
  return (
    <div className='mt-[-20%] relative z-20'>
      <MovieList title={"Now Playing"} movies={movies}/>
      <MovieList title={"Top Rated"} movies={topRatedMovies}/>
      <MovieList title={"Popular"} movies={popularMovies}/>
      <MovieList title={"Upcoming"} movies={upcomingMovies}/>
    </div>
  )
}

export default SecondaryContainer
