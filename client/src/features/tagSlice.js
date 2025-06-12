import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
    const response = await fetch("/api/tags")
    if (!response.ok) throw new Error("Failed to fetch tags")
        return await response.json()
})

const initialState = {
    tags: [],
    loading: false,
    error: null,
}

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false
                state.tags = action.payload
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const selectedTags = (state) => state.tags.tags
export default tagSlice.reducer