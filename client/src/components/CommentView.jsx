import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentForm from "./CommentForm";


const CommentView = ({ gem }) => {

    const currentUser = useSelector((state) => state.auth.currentUser)

    //define state
    const [comments, setComments] = useState([])
    const [editCommentId, setEditCommentId] = useState([])
    const [editText, setEditText] = useState("")

    //fetch comments that align with gem
    useEffect(() => {
        fetch(`/api/gems/${gem.id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Something went wrong when loading comments", err))
    }, [gem.id])

    //sets Edit form data to state
    const handleEdit = (comment) => {
        setEditCommentId(comment.id)
        setEditText(comment.text)
    }

    //cancels the Edit per State
    const handleEditCancel = () => {
        setEditCommentId(null)
        setEditText("")
    }

    //Applies Edit to backend and resets form data
    const handleEditSubmit = async (e, id) => {
        e.preventDefault()
        try {
            const res = await fetch(`/api/comment/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: editText })
            })

            if (res.ok) {
                const updatedComment = await res.json()
                setComments(prev => 
                    prev.map(comm => (comm.id === id ? updatedComment : comm))
                )
                setEditCommentId(null)
                setEditText("")
            } else {
                console.error("Failed to update comment")
            }
        } catch (err) {
            console.error("Error updating comment", err)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this comment?")) 
            return 
        
        try {
            const res = await fetch(`/api/comment/${id}`, {
                method: "DELETE",
            })

            if (res.ok) {
                setComments(prev => prev.filter(comm => comm.id !== id))
            } else {
                console.error("Failed to delete comment")
            }
        } catch (err) {
            console.error("Error deleting comment", err)
        }
}

    return (
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                {comments.length === 0 ? (
                    <p className="text-sm text-gray-500">No comments</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="mb-3 border-b pb-2">
                            <p className="text-sm font-semibold">{comment.user?.username || 'Anonymous'}</p>

                            {editCommentId === comment.id ? (
                                <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                    <textarea
                                        className="w-full p-2 border rounded mt-1"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        required
                                    />
                                    <div className="flex gap-2 mt-1">
                                        <button type="submit" className="px-3 py-1 text-white  bg-blue-600 rounded">
                                            Save
                                        </button>
                                        <button type="button" onClick={handleEditCancel} className="px-3 py-1 text-gray-700 bg-gray-200 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <p>{comment.text}</p>
                                    {currentUser?.id === comment.user_id && (
                                        <>
                                            <button
                                                onClick={() => handleEdit(comment)}
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(comment.id)}
                                                className="text-sm text-red-500 hover:underline ml-2"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </>
                            )
                        }
                        </div>
                    ))
                )}

                <div className="mt-4">
                    {currentUser ? (
                        <CommentForm gemId={gem.id} currentUser={currentUser} onCommentAdded={newComment => setComments(prev => [...prev, newComment])} />
                    ) : (
                        <p className="text-sm italic text-gray-500">Must be logged in to post a comment</p>
                    )}
                </div>

            </div>
    )

}

export default CommentView