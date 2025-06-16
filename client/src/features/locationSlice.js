import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userLocation: null,
    mapCenter: [29.7858, -95.8245],
    zoom: 13
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation(state, action) {
            state.location = action.payload
        },
        setCenter(state, action) {
            state.center = action.payload
        },
        setZoom(state, action) {
            state.zoom = action.payload
        }
    }
})

export const { setLocation, setCenter, setZoom } = locationSlice.actions
export defaut locationSlice.reducer