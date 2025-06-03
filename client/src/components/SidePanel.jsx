import GemDetail from "./GemDetail"
import NearbyGems from "./NearbyGems"

const SidePanel = ({ currentUser, gems, selectedGem, setSelectedGem, onClearSelection }) => {
    return (
        <div className="fixed top-16 right-0 w-[400px] h-[calc(100vh-64px)] bg-white border-l shadow-inner overflow-y-auto">
            {selectedGem ? (
                <GemDetail gem={selectedGem} onBack={onClearSelection} currentUser={currentUser} />
            ) : (
                <NearbyGems gems={gems} onSelectedGem={setSelectedGem} />
            )}
        </div>
        )
    }

export default SidePanel