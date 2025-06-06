import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload
            state.loggedIn = true
        },
        logoutUser: (state, action) => {
            state.currentUser = null
            state.loggedIn = false
        },
    },
})

export const { loginUser, logoutUser } = authSlice.actions
export default authSlice.reducer