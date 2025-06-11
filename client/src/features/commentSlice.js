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
    async ({ gemId, text, userId }) => {
        const res = await fetch(`/api/gems/${gemId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, user_id: userId }),
        })
        const data = await res.json()
        return { gemId, comment: data }
    }
)

export const editComment = createAsyncThunk(
    'comments/editComment',
    async ({ id, text }) => {
        const res = await fetch(`/api/comment/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        })
        return await res.json()
    }
)

export const deleteComment = createAsyncThunk(
    'comments/deleteComment',
    async (id) => {
        await fetch(`/api/comment/${id}`, {
            method: "DELETE"
        })
        return id
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
            .addCase(fetchComments.fulfilled, (state, action) => {
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
            .addCase(editComment.fulfilled, (state, action) => {
                const updated = action.payload
                const list = state.byGemId[updated.gem_id]
                if (list) {
                    state.byGemId[updated.gem_id] = list.map(com => com.id === updated.id ? updated : com)
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const id = action.payload
                for (const gemId in state.byGemId) {
                    state.byGemId[gemId] = state.byGemId[gemId].filter(com => com.id !== id)
                }
            })
    }
})

export const { clearComments } = commentSlice.actions
export default commentSlice.reducer