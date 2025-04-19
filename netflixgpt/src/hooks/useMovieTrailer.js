import { useDispatch } from "react-redux"
import { addTrailer } from "../redux/movies"
import { options } from "../utils/Network Manager"
import axios from "axios"
import { useEffect } from "react"
import { BASE_URL } from '../utils/constant'


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch()
    const getMovieVideos = async () => {
        const data = await axios.get(`${BASE_URL.GET_NOW_PLAYING_MOVIES}/3/movie/${movieId}/videos?language=en-US`, options)
        const filteredData = data?.data?.results.filter((video) => video.type === 'Trailer')
        if (filteredData.length === 0) {
            const trailer = data?.data?.results[0]
            dispatch(addTrailer(trailer))
        } else {
            const trailer = filteredData[0]
            dispatch(addTrailer(trailer))
        }
    }
    useEffect(() => {
        getMovieVideos()
    }, [movieId])
}

export default useMovieTrailer
