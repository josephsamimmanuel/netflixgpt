import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        gptSearch: false,
        searchMovies: [],
        movieNames: [],
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.gptSearch = !state.gptSearch;
        },
        addSearchMovies: (state, action) => {
            state.searchMovies = action.payload;
        },
        addMovieNames: (state, action) => {
            state.movieNames = action.payload;
        },
    },
});

export const { toggleGptSearch, addSearchMovies, addMovieNames } = gptSlice.actions;
export default gptSlice.reducer;
