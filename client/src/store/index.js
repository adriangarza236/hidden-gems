import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import gemReducer from '../features/gemSlice'
import commentReducer from '../features/commentSlice'
import gemTagReducer from '../features/gemTagSlice'
import tagReducer from '../features/tagSlice'
import locationReducer from '../features/locationSlice'
import filterReducer from '../features/filterSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        gems: gemReducer,
        comments: commentReducer,
        gemTags: gemTagReducer,
        tags: tagReducer,
        location: locationReducer,
        filters: filterReducer,
    },
})

export default store