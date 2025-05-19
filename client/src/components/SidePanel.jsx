
const SidePanel = ({ currentUser, gems }) => {
    return (
        <div className="w-1/3 h-full bg-gray-100 p-4 overflow-y-auto border-l border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Your Toolkit</h2>

            {currentUser ? (
                <div className="mb-6">
                    <p className="text-gray-700 mb-2">Welcome, <span className="font-semibold">{currentUser.username}</span> 👋</p>
                    <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">
                        Add a Gem
                    </button>
                </div>
            ) : (
                <p className="text-gray-500">Log in to add or manage your gems.</p>
            )}

            <hr className="my-4" />

            <div>
                <h3 className="text-lg font-semibold mb-2">Nearby Gems</h3>
                {gems.length > 0 ? (
                    <ul className="space-y-2">
                        {gems.map((gem) => (
                            <li key={gems.id} className="bg-white shadow rounded p-2 hover:bg-blue-50">
                                <p className="font-medium">{gem.title}</p>
                                <p className="text-sm text-gray-600">{gem.descritption}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No gems found nearby.</p>
                )}
            </div>
        </div>

    )
}
export default SidePanel