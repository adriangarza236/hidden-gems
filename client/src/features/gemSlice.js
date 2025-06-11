import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gems: [],
    selectedGem: null,
    editingGem: false
}

const gemSlice = createSlice({
    name: 'gems',
    initialState,
    reducers: {
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
        },
        editingGem: (state) => {
            state.editingGem = true
        },
        notEditingGem: (state) => {
            state.editingGem = false
        }
    }
})

export const {
    setGems,
    addGem,
    deleteGem,
    selectGem,
    clearSelectedGem,
    updateGem,
    editingGem,
    notEditingGem
} = gemSlice.actions

export default gemSlice.reducer