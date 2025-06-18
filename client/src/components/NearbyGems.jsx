import { useSelector, useDispatch } from "react-redux"
import { selectGem } from "../features/gemSlice"

const NearbyGems = () => {

    const gems = useSelector((state) => state.gems.gems)
    const selectedTags = useSelector(state => state.filters.selectedTags)
    const dispatch = useDispatch()

    const filteredGems = gems.filter(gem => 
        selectedTags.length === 0 ||
        selectedTags.every(selectedId => 
            gem.tags?.some(tag => tag.id === selectedId)
        )
    )

    
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Nearby Gems</h2>
            <ul className="space-y-2">
                {filteredGems.map(gem => (
                    <li
                        key={gem.id}
                        onClick={() => dispatch(selectGem(gem))}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                        {gem.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NearbyGems