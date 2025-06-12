import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import gemReducer from '../features/gemSlice'
import commentReducer from '../features/commentSlice'
import gemTagReducer from '../features/gemTagSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        gems: gemReducer,
        comments: commentReducer,
        gemTags: gemTagReducer,
    },
})

export default store