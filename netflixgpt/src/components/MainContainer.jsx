import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

function MainContainer() {
  const movies = useSelector((store) => store?.movies?.movies);
  const mainMovie = movies[0] || {};

  return (
    <div className='w-screen aspect-video relative'>
      <VideoTitle title={mainMovie.original_title} overview={mainMovie.overview}/>
      <VideoBackground movieId={mainMovie.id}/>
    </div>
  )
}

export default MainContainer
