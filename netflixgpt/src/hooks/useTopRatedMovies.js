import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movies";
import { BASE_URL } from "../utils/constant";
import { options } from "../utils/Network Manager";
import toast from "react-hot-toast";
import { TOAST_MESSAGE } from "../utils/constant";
import { useEffect } from "react";
import axios from "axios";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetchMovies();
    }, []);
    const fetchMovies = async () => {
        try {
            const response = await axios.get(`${BASE_URL.GET_NOW_PLAYING_MOVIES}/3/movie/top_rated?language=en-US&page=1`, options);
            if (response.status === 200) {
                dispatch(getTopRatedMovies(response.data.results));
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

export default useTopRatedMovies;
