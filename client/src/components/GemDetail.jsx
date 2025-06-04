import React, { useEffect, useState } from 'react'
import CommentForm from './CommentForm'

const GemDetail = ({ gem, onBack, currentUser, onEdit, onDelete }) => {

    //define state
    const [comments, setComments] = useState([])

    //fetch comments that align with gem
    useEffect(() => {
        fetch(`/api/gems/${gem.id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Something went wrong when loading comments", err))
    }, [gem.id])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this gem?")) return

        const res = await fetch(`/api/gem/${id}`, {
            method: "DELETE",
        })

        if (res.ok) {
            onDelete(id)
            onBack()
        } else {
            alert("Something went wrong. Could not delete Gem")
        }
    }


    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex justify-between mb-4">
                <button onClick={onBack} className="bg-pink-600 text-white rounded-full px-1 border hover:bg-blue-700 focus:bg-blue-900">
                    Back to List
                </button>
                {currentUser?.id === gem.user_id && (
                    <button onClick={onEdit} className="bg-pink-600 text-white py-1 rounded-full px-1 border hover:bg-blue-700 focus:bg-blue-900">
                        Edit Gem
                    </button>
                )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{gem.title}</h2>
            <p className="text-sm text-gray-600 italic">
                Posted by {gem.creator || "Unkown"}
            </p>
            <img src={gem.image_url} alt={gem.title} className="w-full rounded mb-4" />
            <p className="text-gray-700">{gem.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {gem.tags.map(tag => (
                    <span
                        key={tag.id}
                        className="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>
            <h4 className="text-blue-400">{gem.address}</h4>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                {comments.length === 0 ? (
                    <p className="text-sm text-gray-500">No comments</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="mb-3 border-b pb-2">
                            <p className="text-sm font-semibold">{comment.user?.username || 'Anonymous'}</p>
                            <p>{comment.text}</p>
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
                {currentUser?.id === gem.user_id && (
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => handleDelete(gem.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete Gem
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GemDetail