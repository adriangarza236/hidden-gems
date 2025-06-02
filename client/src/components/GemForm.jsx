import { useState, useEffect } from "react";

const GemForm = ({ onSuccess, fillCoords }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    

    useEffect(() => {
        if(fillCoords) {
            setLatitude(fillCoords.lat)
            setLongitude(fillCoords.lng)
        }
    }, [fillCoords])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("/api/gems", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                description,
                image_url: imageUrl,
                latitude,
                longitude,
            }),
        })

        if (response.ok) {
            const newGem = await response.json()
            console.log("Created gem", newGem)
            resetForm()
            if (onSuccess) onSuccess(newGem)
        } else {
            console.error("Failed to create gem")
        }
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setImageUrl("")
        setLatitude(null)
        setLongitude(null)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input 
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input  
                type="number"
                placeholder="Latitude"
                value={latitude || ""}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                className="w-full p-2 border rounded"
            />
            <input
                type="number"
                placeholder="Longitude"
                value={longitude || ""}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Gem
            </button>
        </form>
    )
}

export default GemForm