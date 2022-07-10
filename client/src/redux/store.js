import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TripReducer from "./features/tripSlice";


export default configureStore({
    reducer: {
        auth: AuthReducer,
        trip: TripReducer,
    },
});