import { useSelector, useDispatch } from "react-redux";
import { toggleTag, clearTags } from "../features/filterSlice";

const TagFilter = () => {
    const tags = useSelector(state => state.tags.tags)
    const selectedTags = useSelector(state => state.filters.selectedTags)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-wrap gap-2 mb-4 ml-2 items-center">
            {tags.map(tag => (
                <button
                    key={tag.id}
                    onClick={() => dispatch(toggleTag(tag.id))}
                    className={`px-4 py-1 rounded-full border font-semibold ${
                        selectedTags.includes(tag.id)
                            ? 'bg-blue-700 text-black outline-none'
                            : 'bg-pink-600 text-black outline-none'
                    }`}
                >
                    {tag.name}
                </button>
            ))}
            {selectedTags.length > 0 && (
                <button
                    onClick={() => dispatch(clearTags())}
                    className="text-gray-500 px-2 text-2xl font-bold hover:text-black"
                    aria-label="Clear Filters"
                >
                    &times;
                </button>
            )}
        </div>
    )
}

export default TagFilter