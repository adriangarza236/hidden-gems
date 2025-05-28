import { useState } from 'react';

const CommentForm = ({ gemId, onCommentAdded, currentUser }) => {
    
    //Define useState
    const [text, setText] = useState('')
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)
        setError(null)

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    gem_id: gemId,
                    user_id: currentUser.id,
                    text: text, 
                }),
            })
            if (!response.ok) {
                throw new Error("Failed to submit comment")
            }
            const newComment = await response.json()
            onCommentAdded(newComment)
            setText('')
        } catch (err) {
            setError(err.message || "Error occurred")
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