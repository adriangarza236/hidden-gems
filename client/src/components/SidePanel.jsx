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
        <div className="fixed right-0 w-[400px] h-[calc(100vh-64px)] bg-white border-l shadow-inner overflow-y-auto">
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