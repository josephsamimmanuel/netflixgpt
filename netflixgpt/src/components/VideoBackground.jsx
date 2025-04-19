import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer'

function VideoBackground({ movieId }) {
    const trailer = useSelector((store) => store.movies.trailer)
    useMovieTrailer(movieId)
    return (
        <div className='w-screen aspect-video'>
            <iframe
                className='w-full h-full'
                src={`https://www.youtube.com/embed/${trailer?.key}?si=pE6kF9FDTSCmU3f5&autoplay=1&mute=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
        </div>
        // &autoplay=1&mute=1
    )
}

export default VideoBackground
