import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, deleteComment, editComment } from "../features/commentSlice";
import CommentForm from "./CommentForm";


const CommentView = () => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.currentUser)
    const selectedGem = useSelector((state) => state.gems.selectedGem)
    const comments = useSelector((state) => state.comments.byGemId[selectedGem?.id] || [])
    const loading = useSelector((state) => state.comments.loading)

    //define state
    const [editCommentId, setEditCommentId] = useState([])
    const [editText, setEditText] = useState("")

    useEffect(() => {
        if (selectedGem?.id) {
            dispatch(fetchComments(selectedGem.id))
        }
    }, [selectedGem, dispatch])

    //fetch comments that align with gem
    // useEffect(() => {
    //     fetch(`/api/gems/${selectedGem.id}/comments`)
    //         .then(res => res.json())
    //         .then(data => setComments(data))
    //         .catch(err => console.error("Something went wrong when loading comments", err))
    // }, [selectedGem])

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
        await dispatch(editComment({ id, text: editText }))
        setEditCommentId(null)
        setEditText("")
    }

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this comment?")) return
        await dispatch(deleteComment(id))
    }

    return (
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                {loading && <p className="text-sm text-gray-500">Loading Comments...</p>}
                {comments.length === 0 && !loading && (
                    <p className="text-sm text-gray-500">No comments</p>
                )}  
                {comments.map(comment => (
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
                        )}
                    </div>
                ))}

                <div className="mt-4">
                    {currentUser ? (
                        <CommentForm />
                    ) : (
                        <p className="text-sm italic text-gray-500">Must be logged in to post a comment</p>
                    )}
                </div>

            </div>
    )

}

export default CommentView