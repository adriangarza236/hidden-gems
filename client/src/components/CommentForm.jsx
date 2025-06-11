import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../features/commentSlice';

const CommentForm = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.currentUser)
    const gemId = useSelector((state) => state.gems.selectedGem.id)
    
    //Define useState
    const [text, setText] = useState('')
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        setError(null)

        try {
            await dispatch(addComment({ gemId, text, userId: currentUser.id })).unwrap()
            setText("")
        } catch (err) {
            setError(err.message || "Error while posting comment")
        } finally {
            setSubmit(false)
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
                required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
                type="submit"
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                disabled={submit}
            >
                {submit ? 'Posting Comment...' : 'Post Comment'}
            </button>
        </form>
    )
}

export default CommentForm