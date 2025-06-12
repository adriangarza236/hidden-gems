import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const assignTag  = createAsyncThunk(
    "gemTags/assignTag",
    async ({ gemId, tagId }) => {
        const response = await fetch("/api/gem_tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gemId: gemId, tagId: tagId }),
    })
    if (!response.ok) throw new Error("Failed to assign tag")
        return await response.json()
    }
)

export const removeTag = createAsyncThunk(
    "gemTags/removeTag",
    async (gemTagId) => {
        const response = await fetch(`/api/gem_tags/${gemTagId}`, {
            method: "DELETE",
        })
        if (!response.ok) throw new Error("Failed to remove tag")
            return gemTagId
    }
)

const initialState = {
    gemTags: [],
    loading: false,
    error: null,
}

const gemTagSlice = createSlice({
    name: "gemTags",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(assignTag.fulfilled, (state, action) => {
                state.gemTags.push(action.payload)
            })
            .addCase(removeTag.fulfilled, (state, action) => {
                state.gemTags = state.gemTags.filter(
                    (gt) => gt.id !== action.payload
                )
            })
    }

})

export default gemTagSlice.reducer