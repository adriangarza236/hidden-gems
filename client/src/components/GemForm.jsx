import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGems } from "../features/gemSlice";
import { fetchTags, selectTags } from "../features/tagSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'

const GemForm = ({ onSuccess, fillCoords, setIsOpen }) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [address, setAddress] = useState("")
    const [selectedTags, setSelectedTags] = useState([])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const tags = useSelector(selectTags)

    useEffect(() => {
        if(fillCoords) {
            setLatitude(fillCoords.lat)
            setLongitude(fillCoords.lng)
        }
    }, [fillCoords])

    useEffect(() => {
        const fetchAddress = async () => {
            if (!fillCoords) return 
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${fillCoords.lat}&lon=${fillCoords.lng}`
                )
                const data = await response.json()
                setAddress(data.display_name || "Address not found")
            } catch (err) {
                console.error("Reverse geocoding failed:", err)
            }
        }

        fetchAddress()
    }, [fillCoords])

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
        formData.append("latitude", latitude)
        formData.append("longitude", longitude)
        formData.append("address", address)
        formData.append("tag_ids", JSON.stringify(selectedTags.map(tag => tag.value)))

        if (imageFile) {
            formData.append("image", imageFile)
        }

        const response = await fetch("/api/gems", {
            method: "POST",
            body: formData,
        })

        if (response.ok) {
            const newGem = await response.json()
            console.log("Created gem", newGem)
            resetForm()
            if (onSuccess) onSuccess(newGem)
                dispatch(fetchGems())
                setIsOpen(false)
                navigate("/success")
        } else {
            console.error("Failed to create gem")
        }
    }

    const resetForm = () => {
        setTitle("")
        setDescription("")
        setImageFile(null)
        setLatitude(null)
        setLongitude(null)
    }

    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#6d28d9',
            borderColor: '#000000',
            boxShadow: state.isFocused ? '0 0 0 2px #000000' : 'none',
            '&:hover': { borderColor: '#000000' },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#6d28d9',
            borderColor: '000000',
            color: '#fff',
            marginTop: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }),
        menuList: (provided) => ({
            ...provided,
            backgroundColor: '#6d28d9',
            color: '#fff',
            padding: 0,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#a78bfa'
                : state.isFocused
                ? `#7c3aed`
                : '#6d28d9',
            color: '#000',
            '&:activate': { backgroundColor: '#a78bfa' },
        }),
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800"
            />
            <Select
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
                styles={customSelectStyles}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800"
            />
            <input 
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800"
            />
            <input  
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:border-purple-800 focus:ring-2 focus:ring-purple-800"
            />

            <button type="submit" className="bg-purple-800 text-black px-4 py-2 rounded mt-8 border hover:bg-purple-900 font-extrabold">
                Submit Gem
            </button>
        </form>
    )
}

export default GemForm