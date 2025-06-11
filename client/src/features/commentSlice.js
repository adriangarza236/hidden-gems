import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (gemId) => {
        const res = await fetch(`/api/gems/${gemId}/comments`)
        const data = await res.json()
        return { gemId, comments: data }
    }
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ gemId, content }) => {
        const res = await fetch(`/api/gems/${gemId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        })
        const data = await res.json()
        return { gemId, comment: data }
    }
)

const initialState = {
    byGemId: {},
    loading: false,
    error: null,
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments(state) {
            state.byGemId = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchComments.fulfilled, (state) => {
                const { gemId, comments } = action.payload
                state.byGemId[gemId] = comments
                state.loading = false
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const { gemId, comment } = action.payload
                if (state.byGemId[gemId]) {
                    state.byGemId[gemId].push(comment)
                } else {
                    state.byGemId[gemId] = [comment]
                }
            })
    }
})

export const { clearComments } = commentSlice.actions
export default commentSlice.reducer