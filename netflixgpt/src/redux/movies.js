import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        popularMovies: [],
        topRatedMovies: [],
        upcomingMovies: [],
        trailer: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        getMovies: (state, action) => {
            state.movies = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        getTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addMovies: (state, action) => {
            state.movies = [...state.movies, ...action.payload];
        },
        updateMovies: (state, action) => {
            state.movies = action.payload;
        },
        deleteMovies: (state, action) => {
            state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
    },
});

export const { getMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies, addTrailer } = moviesSlice.actions;
export default moviesSlice.reducer;
