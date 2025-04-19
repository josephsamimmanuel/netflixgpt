import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        movies: [],
        trailer: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        getMovies: (state, action) => {
            state.movies = action.payload;
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

export const { getMovies, addTrailer } = moviesSlice.actions;
export default moviesSlice.reducer;
