import { useSelector, useDispatch } from "react-redux"
import { selectGem } from "../features/auth/gemSlice"

const NearbyGems = () => {

    const gems = useSelector((state) => state.gems.gems)
    const dispatch = useDispatch()

    
    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Nearby Gems</h2>
            <ul className="space-y-2">
                {gems.map(gem => (
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