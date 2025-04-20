import React from 'react'
import { TMDB_IMAGE_URL } from '../utils/constant'

function MovieCard({ movies }) {
    return (
        <div className='flex gap-2 p-2 w-full overflow-x-scroll scrollbar-hide'>
            {movies.map((movie) => (
                    <img
                        src={`${TMDB_IMAGE_URL}${movie.backdrop_path}`}
                        alt={movie.title}
                        className='w-72 hover:scale-105 transition-all duration-300 rounded-lg'
                    />
            ))}
        </div>
    )
}

export default MovieCard
