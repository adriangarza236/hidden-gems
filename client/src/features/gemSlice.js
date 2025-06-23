import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGems = createAsyncThunk('gems/fetchGems', async () => {
    const response = await fetch('api/gems')
    if (!response.ok) {
        throw new Error('Failed to fetch gems')
    }
    const data = await response.json()
    return data
})

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
            if (state.selectedGem?.id === updated.id) {
                state.selectedGem = updated
            }
        },
        editingGem: (state) => {
            state.editingGem = true
        },
        notEditingGem: (state) => {
            state.editingGem = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGems.fulfilled, (state, action) => {
                state.gems = action.payload
                state.error = null
            })
            .addCase(fetchGems.rejected, (state, action) => {
                console.error('Error fetching gems:', action.error.message)
                state.error = action.error.message
            })
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