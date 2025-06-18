import { useSelector, useDispatch } from "react-redux";
import { toggleTag } from "../features/filterSlice";

const TagFilter = () => {
    const tags = useSelector(state => state.tags.tags)
    const selectedTags = useSelector(state => state.filters.selectedTags)
    const dispatch = useDispatch()

    return (
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
    )
}

export default TagFilter