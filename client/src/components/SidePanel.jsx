import GemDetail from "./GemDetail"
import Gems from "./Gems"
import EditGemForm from "./EditGemForm"
import { useSelector, useDispatch } from "react-redux"
import { selectGem, notEditingGem } from "../features/gemSlice"
import TagFilter from "./TagFilter"
import SearchBar from "./SearchBar"

const SidePanel = ({ handleDeleteGem }) => {

    const dispatch = useDispatch()
    const selectedGem = useSelector((state) => state.gems.selectedGem)
    const editingGem = useSelector((state) => state.gems.editingGem)

   


    //Saves updates and toggles editing off
    const handleEditDone = (updatedGem) => {
        dispatch(selectGem(updatedGem))
        dispatch(notEditingGem())
    }
    return (
        <div className="fixed mt-5 w-1/3 h-[calc(100vh-100px)] bg-purple-900 border-l-3 overflow-y-auto overflow-x-hidden">
            {selectedGem ? (
                editingGem ? (
                    <EditGemForm
                        onSave={handleEditDone}
                    />
                ) : (
                    <GemDetail  
                        onDelete={handleDeleteGem}
                    />
                )       
            ) : (
                <>
                    <SearchBar />
                    <TagFilter />
                    <Gems />
                </>
            )}
        </div>
        )
    }

export default SidePanel