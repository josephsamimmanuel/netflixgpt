import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./login";

export default configureStore({
    reducer: {
        user: userReducer,
    },
    devTools: true,
});