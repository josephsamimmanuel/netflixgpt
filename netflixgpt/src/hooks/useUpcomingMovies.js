import { useDispatch } from "react-redux";
import { getUpcomingMovies } from "../redux/movies";
import { BASE_URL } from "../utils/constant";
import { options } from "../utils/Network Manager";
import toast from "react-hot-toast";
import { TOAST_MESSAGE } from "../utils/constant";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector((store) => store.movies.upcomingMovies);
    useEffect(() => {
        !upcomingMovies && fetchMovies();
    }, []);


    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL.GET_NOW_PLAYING_MOVIES}/3/movie/upcoming?language=en-US&page=1`, options);
            if (response.status === 200) {
                dispatch(getUpcomingMovies(response.data.results));
                toast.success(TOAST_MESSAGE.MOVIES_FETCHED_SUCCESS);
            }
            else {
                toast.error(TOAST_MESSAGE.MOVIES_FETCHED_ERROR);
            }
        } catch (error) {
            toast.error(TOAST_MESSAGE.MOVIES_FETCHED_ERROR);
        }
    };
};

export default useUpcomingMovies;
