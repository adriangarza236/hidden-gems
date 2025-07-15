import { useSelector, useDispatch } from "react-redux"
import { selectGem } from "../features/gemSlice"
import { motion } from "framer-motion"

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }
}

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
            <h2 className="text-4xl font-extrabold mb-4 tracking-wide bg-gradient-to-r border-b-7 pb-2 text-blue-700">Gems</h2>
            <motion.ul
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredGems.map(gem => (
                    <motion.li
                        key={gem.id}
                        onClick={() => dispatch(selectGem(gem))}
                        className="cursor-pointer hover:bg-pink-600 p-2 rounded"
                        variants={itemVariants}
                        whileHover={{ scale: [1, 1.15, 1], transition: { duration: 0.4 } }}
                    >
                        {gem.title}
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    )
}

export default Gems