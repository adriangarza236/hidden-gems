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
                <h3 className="text-2xl font-bold text-pink-700 mb-2">Comments</h3>
                <div className="w-100 h-1 mb-4 bg-gradient bg-pink-700 rounded-full" />
                {loading && <p className="text-sm text-gray-500">Loading Comments...</p>}
                {comments.length === 0 && !loading && (
                    <p className="text-sm font-bold text-gray-500">No comments</p>
                )}  
                {comments.map(comment => (
                    <div key={comment.id} className="mb-3 pb-2">
                        <p className="text-md underline ml-4 text-pink-600 font-bold mb-1">{comment.user?.username || 'Anonymous'}</p>

                        {editCommentId === comment.id ? (
                            <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                <textarea
                                    className="w-full p-2 font-bold focus:outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-600 border rounded mt-1"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    required
                                />
                                <div className="flex gap-2 mt-1">
                                    <button type="submit" className="px-2 py-0 border-2 font-bold bg-blue-700 hover:bg-blue-800 rounded">
                                        Save
                                    </button>
                                    <button type="button" onClick={handleEditCancel} className="px-2 py-0 bg-red-600 hover:bg-red-700 border-2 font-bold rounded">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <p className="bg-pink-600 font-semibold rounded-3xl py-2 px-3 inline-block max-w-md break-words">{comment.text}</p>
                                {currentUser?.id === comment.user_id && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => handleEdit(comment)}
                                            className="text-sm border rounded-2xl font-bold bg-blue-700 py-.05 px-2 hover:bg-blue-800"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(comment.id)}
                                            className="text-sm border rounded-2xl font-bold bg-red-700 py-.05 px-2 hover:bg-red-800 "
                                        >
                                            Delete
                                        </button>
                                    </div>
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