import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import gemReducer from '../features/auth/gemSlice'
import commentReducer from '../features/commentSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        gems: gemReducer,
        comments: commentReducer,
    },
})

export default store