import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select'

const EditGemForm = ({ gem, onCancel, onSave }) => {
    
    const [title, setTitle] = useState(gem.title)
    const [description, setDescription] = useState(gem.description)
    const [imageUrl, setImageUrl] = useState(gem.image_url)
    const [tagOptions, setTagOptions] = useState([])
    const [selectedTags, setSelectedTags] = useState(
        gem.tags.map(tag => ({ value: tag.id, label: tag.name }))
    )

    useEffect(() => {
        fetch('/api/tags')
            .then(res => res.json())
            .then(data => setTagOptions(data.map(tag => ({ value: tag.id, label: tag.name }))))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`/api/gem/${gem.id}`, {
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
            onSave(updatedGem)
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
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Save    
                </button>
                <button type="button" onClick={onCancel} className="text-gray-600 underline">
                    Cancel    
                </button> 
            </div>
        </form>
    )
}

export default EditGemForm