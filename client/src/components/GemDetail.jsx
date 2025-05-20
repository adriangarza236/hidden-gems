const GemDetail = ({ gem, onBack, currentUser }) => {
    return (
        <div className="p-4">
            <button onClick={onBack} className="text-blue-600 underline mb-4">Back to List</button>
            <h2 className="text-2xl font-bold mb-2">{gem.title}</h2>
            <img src={gem.image_url} alt={gem.title} className="w-full rounded mb-4" />
            <p className="text-gray-700">{gem.description}</p>
            <h4 className="text-blue-400">{gem.address}</h4>
        </div>
    )
}

export default GemDetail