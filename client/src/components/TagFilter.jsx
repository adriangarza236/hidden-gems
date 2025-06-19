import { useSelector, useDispatch } from "react-redux";
import { toggleTag, clearTags } from "../features/filterSlice";

const TagFilter = () => {
    const tags = useSelector(state => state.tags.tags)
    const selectedTags = useSelector(state => state.filters.selectedTags)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col gap-2 mb-4">
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                    <button
                        key={tag.id}
                        onClick={() => dispatch(toggleTag(tag.id))}
                        className={`px-3 py-1 rounded-full border text-sm ${
                            selectedTags.includes(tag.id)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>

            {selectedTags.length > 0 && (
                <button
                    onClick={() => dispatch(clearTags())}
                    className="self-start px-3 py-1 mt-2 rounded bg-red-500 text-white hover:bg-red-600 text-sm"
                >
                    Clear Filters
                </button>
            )}
        </div>
    )
}

export default TagFilter