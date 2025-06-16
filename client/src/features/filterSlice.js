import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedTags: [],
    searchQuery: "",
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        toggleTag(state, action) {
            const tagId = action.payload
            if (state.selectedTags.includes(tagId)) {
                state.selectedTags = state.selectedTags.filter(id => id !== tagId)
            } else {
                state.selectedTags.push(tagId)
            }
        },
        clearTags(state) {
            state.selectedTags = []
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload
        },
        clearFilters(state) {
            state.selectedTags = []
            state.searchQuery = ""
        }
    }
})

export const { toggleTag, clearTags, setSearchQuery, clearFilters } = filterSlice.actions
export default filterSlice.reducer