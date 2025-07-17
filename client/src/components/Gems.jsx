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
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.h2
                    className="text-6xl font-extrabold mb-4 drop-shadow-[0_0_5px_black] text-blue-700 tracking-wide bg-gradient-to-r from-pink-400 to-blue-700 bg-clip-text items-center justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2>Gems</h2>
                </motion.h2>
            </motion.div>
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
                        className="cursor-pointer hover:bg-pink-600 p-2 rounded font-bold"
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