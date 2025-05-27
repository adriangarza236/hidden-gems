import React, { useEffect, useState } from 'react'

const GemDetail = ({ gem, onBack, currentUser }) => {

    //define state
    const [comments, setComments] = useState([])

    //fetch comments that align with gem
    useEffect(() => {
        fetch(`/api/gems/${gem.id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Something went wrong when loading comments", err))
    }, [gem.id])


    return (
        <div className="p-4">
            <button onClick={onBack} className="text-blue-600 underline mb-4">Back to List</button>
            <h2 className="text-2xl font-bold mb-2">{gem.title}</h2>
            <img src={gem.image_url} alt={gem.title} className="w-full rounded mb-4" />
            <p className="text-gray-700">{gem.description}</p>
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
            </div>
        </div>
    )
}

export default GemDetail