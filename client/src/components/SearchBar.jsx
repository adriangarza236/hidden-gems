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
            placeholder="Search gem..."
            className="w-full px-4 py-2 border rounded-md mb-4"
        />
    )
}

export default SearchBar 