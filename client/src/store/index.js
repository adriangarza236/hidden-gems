import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import gemReducer from '../features/auth/gemSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        gems: gemReducer
    },
})

export default store