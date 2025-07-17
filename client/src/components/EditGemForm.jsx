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
    const [imageFile, setImageFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(selectedGem?.image)
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

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("tag_ids", JSON.stringify(selectedTags.map(tag => tag.value)))

        if (imageFile) {
            formData.append("image", imageFile)
        }

        const response = await fetch(`/api/gem/${selectedGem.id}`, {
            method: 'PATCH',
            body: formData,
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
            <h2 className="text-5xl font-extrabold tracking-wide drop-shadow-[0_0_5px_black] text-blue-700 ">Edit Gem </h2>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-600"
            />
            <textarea
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-600"
            />
            <input
                type="file"
                accept="image/*"
                onChange={e => {
                    setImageFile(e.target.files[0])
                    setPreviewUrl(URL.createObjectURL(e.target.files[0]))
                }}
                className="w-full p-2 border rounded focus:outline-none focus:border-pink-600 focus:ring-2 focus:ring-pink-600"
            />

            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="rounded shadow max-h-48 object-contain mt-2 "
                />
            )}
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
                <button type="submit" className="bg-blue-700 text-black px-4 py-2 rounded border-3 hover:bg-blue-800 font-extrabold">
                    Save    
                </button>
                <button type="button" onClick={() => dispatch(notEditingGem())} className="bg-red-600 hover:underline border-3 font-extrabold hover:bg-red-700 px-4 py-2 ">
                    Cancel    
                </button> 
            </div>
        </form>
    )
}

export default EditGemForm