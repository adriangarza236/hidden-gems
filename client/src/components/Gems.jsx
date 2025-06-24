import { useSelector, useDispatch } from "react-redux"
import { selectGem } from "../features/gemSlice"

const Gems = () => {

    const gems = useSelector((state) => state.gems.gems)
    const selectedTags = useSelector(state => state.filters.selectedTags)
    const query = useSelector(state => state.filters.searchQuery.toLowerCase())
    const dispatch = useDispatch()

    const filteredGems = gems.filter(gem => 
        (selectedTags.length === 0 ||
        selectedTags.every(selectedId => 
            gem.tags?.some(tag => tag.id === selectedId)
        )
    ) &&
    gem.title.toLowerCase().includes(query)
    )

    
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Gems</h2>
            <ul className="space-y-2">
                {filteredGems.map(gem => (
                    <li
                        key={gem.id}
                        onClick={() => dispatch(selectGem(gem))}
                        className="cursor-pointer hover:bg-pink-600 p-2 rounded"
                    >
                        {gem.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Gems