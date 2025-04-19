import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./login";
import moviesReducer from "./movies";

export default configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
    },
    devTools: true,
});