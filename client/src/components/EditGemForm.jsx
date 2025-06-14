import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from 'react-select'
import { updateGem, notEditingGem, selectGem } from "../features/gemSlice";
import { fetchTags, selectTags } from "../features/tagSlice";

const EditGemForm = () => {

    const selectedGem = useSelector((state) => state.gems.selectedGem)
    const tags = useSelector(selectTags)
    const dispatch = useDispatch()
    
    const [title, setTitle] = useState(selectedGem?.title)
    const [description, setDescription] = useState(selectedGem?.description)
    const [imageUrl, setImageUrl] = useState(selectedGem?.image_url)
    const [selectedTags, setSelectedTags] = useState(
        selectedGem?.tags?.map(tag => ({ value: tag.id, label: tag.name }))
    )

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    const tagOptions = tags.map(tag => ({
        value: tag.id,
        label: tag.name
    }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/gem/${selectedGem.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                title,
                description,
                image_url: imageUrl,
                tag_ids: selectedTags.map(tag => tag.value),
            }),
        })

        if (response.ok) {
            const updatedGem = await response.json()
            dispatch(updateGem(updatedGem))
            dispatch(selectGem(updatedGem))
            dispatch(notEditingGem())
            
        } else {
            console.error("Failed to update Gem")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Edit Gem </h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded"
            />
            <textarea
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="Image URL"
                className="w-full p-2 border rounded"
            />
            <Select
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                menuPortalTarget={document.body}
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999
                    })
                }}
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save    
                </button>
                <button type="button" onClick={() => dispatch(notEditingGem())} className="text-gray-600 underline">
                    Cancel    
                </button> 
            </div>
        </form>
    )
}

export default EditGemForm