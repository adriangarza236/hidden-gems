import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gems: [],
    selectedGem: null
}

const gemSlice = createSlice({
    name: 'gems',
    initialState,
    reduce: {
        setGems: (state, action) => {
            state.gems = action.payload
        },
        addGem: (state, action) => {
            state.gems.push(action.payload)
        },
        deleteGem: (state, action) => {
            state.gems = state.gems.filter(gem => gem.id !== action.payload)
        },
        selectGem: (state, action) => {
            state.selectedGem = action.payload
        },
        clearSelectedGem: (state) => {
            state.selectedGem = null
        },
        updateGem: (state, action) => {
            const updated = action.payload
            const i = state.gems.findIndex(gem => gem.id === updated.id)
            if (i !== -1) {
                state.gems[i] = updated
            }
        }
    }
})

export const {
    setGems,
    addGem,
    deleteGem,
    selectGem,
    clearSelectedGem,
    updateGem
} = gem.Slice.actions

export default gemSlice.reducer