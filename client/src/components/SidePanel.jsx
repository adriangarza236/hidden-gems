import GemDetail from "./GemDetail"
import NearbyGems from "./NearbyGems"
import EditGemForm from "./EditGemForm"
import { useState } from "react"

const SidePanel = ({ currentUser, gems, selectedGem, setSelectedGem, onClearSelection, handleDeleteGem }) => {

    //Define editing state
    const [isEditing, setIsEditing] = useState(false)

    //toggles editing when clicked
    const handleEditClick = () => {
        setIsEditing(true)
    }

    //Saves updates and toggles editing off
    const handleEditDone = (updatedGem) => {
        setSelectedGem(updatedGem)
        setIsEditing(false)
    }
    return (
        <div className="fixed top-16 right-0 w-[400px] h-[calc(100vh-64px)] bg-white border-l shadow-inner overflow-y-auto">
            {selectedGem ? (
                isEditing ? (
                    <EditGemForm
                        gem={selectedGem}
                        currentUser={currentUser}
                        onCancel={() => setIsEditing(false)}
                        onSave={handleEditDone}
                    />
                ) : (
                    <GemDetail 
                        gem={selectedGem} 
                        onBack={onClearSelection} 
                        currentUser={currentUser} 
                        onEdit={handleEditClick}
                        onDelete={handleDeleteGem}
                    />
                )       
            ) : (
                <NearbyGems 
                    gems={gems} 
                    onSelectedGem={setSelectedGem} 
                />
            )}
        </div>
        )
    }

export default SidePanel