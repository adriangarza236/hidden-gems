import { useDispatch, useSelector } from 'react-redux'
import { setSearchQuery } from '../features/filterSlice'

const SearchBar = () => {
    const dispatch = useDispatch()
    const query = useSelector(state => state.filters.searchQuery)

    return (
        <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search Gem..."
            className="w-116 px-3 py-2 border rounded-md mb-3 mt-4 ml-2 bg-blue-700 outline-none"
        />
    )
}

export default SearchBar 