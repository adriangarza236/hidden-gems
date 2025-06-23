import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearSelectedGem, editingGem, deleteGem } from '../features/gemSlice'


import CommentView from './CommentView'

const GemDetail = () => {

    
    const currentUser = useSelector((state) => state.auth.currentUser)
    const selectedGem = useSelector((state) => state.gems.selectedGem)
    const dispatch = useDispatch()
    
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
                <button onClick={() => dispatch(clearSelectedGem())} className="bg-pink-600 text-white rounded-full px-1 border hover:bg-blue-700 focus:bg-blue-900">
                    Back to List
                </button>
                {currentUser?.id === selectedGem?.user_id && (
                    <button onClick={() => dispatch(editingGem())} className="bg-pink-600 text-white py-1 rounded-full px-1 border hover:bg-blue-700 focus:bg-blue-900">
                        Edit Gem
                    </button>
                )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedGem?.title}</h2>
            <p className="text-sm text-gray-600 italic">
                Posted by {selectedGem?.creator || "Unkown"}
            </p>
            <img src={selectedGem?.image_url} alt={selectedGem?.title} className="w-full rounded mb-4" />
            <p className="text-gray-700">{selectedGem?.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
                {selectedGem?.tags.map(tag => (
                    <span
                        key={tag.id}
                        className="bg-emerald-100 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                    >
                        #{tag.name}
                    </span>
                ))}
            </div>
            <h4 className="text-blue-400">{selectedGem?.address}</h4>

            <CommentView />

            {currentUser?.id === selectedGem?.user_id && (
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => selectedGem?.id && handleDelete(selectedGem.id)}
                            className="text-red-600 hover:underline"
                        >
                            Delete Gem
                        </button>
                    </div>
                )}
        </div>
    )
}

export default GemDetail