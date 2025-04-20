import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./login";
import moviesReducer from "./movies";
import gptReducer from "./gptSlice";
import configReducer from "./config";

export default configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        config: configReducer,
    },
    devTools: true,
});