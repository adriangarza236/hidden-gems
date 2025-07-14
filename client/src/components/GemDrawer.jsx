import { motion, AnimatePresence } from "framer-motion"
import { addGem } from "../features/gemSlice"
import { useDispatch } from "react-redux"
import GemForm from "./GemForm"

const GemDrawer = ({ isOpen, setIsOpen, onClose, fillCoords }) => {

    const dispatch = useDispatch()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-transparent -sm z-30 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div 
                        className="fixed top-18 right-0 h-[calc(100vh-64px)] border-l w-1/3 bg-blue-700 shadow-inner z-50 pt-4 pl-4"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-3xl font-extrabold tracking-wide bg-gradient">New Gem</h2>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-black text-2xl font-bold mr-5"
                            >
                                &times;
                            </button>
                        </div>

                        <GemForm onSuccess={() => dispatch(addGem())} fillCoords={fillCoords} setIsOpen={setIsOpen} />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default GemDrawer