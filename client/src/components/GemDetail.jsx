import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedGem, editingGem, deleteGem } from '../features/gemSlice'


import CommentView from './CommentView'

const GemDetail = () => {

    const [imgError, setImgError] = useState(false)
    const currentUser = useSelector((state) => state.auth.currentUser)
    const selectedGem = useSelector((state) => state.gems.selectedGem)
    const dispatch = useDispatch()

    const tagColors = {
        bar: '#ff33ff', //pink
        food: '#f1f418', //yellow
        art: '#f43618', //red
        music: '#b818f4', //purple
        nature: '#18f41f', //green
    }

    
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this gem?")) return

        const res = await fetch(`/api/gem/${id}`, {
            method: "DELETE",
        })

        if (res.ok) {
            dispatch(deleteGem(id))
            dispatch(clearSelectedGem())
        } else {
            alert("Something went wrong. Could not delete Gem")
        }
    }

    console.log(selectedGem?.image_url)

    return (
        <div className="p-4 overflow-x-auto">
            <div className="flex justify-between mb-4">
                <button onClick={() => dispatch(clearSelectedGem())} className="bg-pink-600 font-bold rounded-full px-3 py-1 border-3 hover:bg-blue-700 focus:bg-blue-900">
                    Back to Gems
                </button>
                {currentUser?.id === selectedGem?.user_id && (
                    <button onClick={() => dispatch(editingGem())} className="bg-pink-600 px-3 py-1 rounded-full border-3 font-bold hover:bg-blue-700 focus:bg-blue-900">
                        Edit Gem
                    </button>
                )}
            </div>
            <h2 className="text-4xl border-2 bg-blue-700 py-2 px-2 font-extrabold mb-2">{selectedGem?.title}</h2>
            <p className="text-sm text-blue-700 italic">
                Posted by {selectedGem?.creator || "Unkown"}
            </p>
            {imgError ? (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded mb-4 text-gray-600 font-bold text-lg">
                    Error loading image
                </div>
            ) : (
                <img
                    src={selectedGem?.image_url} 
                    alt={selectedGem?.title} 
                    className="w-full rounded mb-4" 
                    onError={() => setImgError(true)}
                />
            )}
            <p className="text-sm ml-4 underline mb-1 font-bold text-pink-600">Gem Description:</p>
            <p className="font-bold text-xl bg-blue-700 rounded-3xl py-2 px-3 inline-block max-w-md break-words">{selectedGem?.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {selectedGem?.tags.map(tag => {
                    const color = tagColors[tag.name.toLowerCase()] || '#ccc'
                    return (
                        <span
                            key={tag.id}
                            style={{ backgroundColor: color }}
                            className="font-bold text-sm px-3 py-1 border rounded-full shadow-sm"
                        >
                            #{tag.name}
                        </span>
                    )
                })}
            </div>
            <h4 className="text-blue-700 font-bold text-md">{selectedGem?.address}</h4>

            <CommentView />

            {currentUser?.id === selectedGem?.user_id && (
                    <div className="flex gap-3 mt-2 mb-5">
                        <button
                            onClick={() => selectedGem?.id && handleDelete(selectedGem.id)}
                            className="bg-red-600 hover:underline border-2 font-bold hover:bg-red-700 py-1 px-3 "
                        >
                            Delete Gem
                        </button>
                    </div>
                )}
        </div>
    )
}

export default GemDetail