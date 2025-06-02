import { Link } from "react-router-dom";
import Confetti from "react-confetti"
import { useWindowSize } from "@react-hook/window-size"


const Success = () => {

    const [width, height] = useWindowSize()
    
    return ( 
        <div className="flex flex-col items-center justify-center h-screen text-center bg-white">
            <Confetti width={width} height={height} />
            <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 YOU DID IT!</h1>
            <p className="text-lg text-gray-700 mb-6">Your Gem was added succesfully.</p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow-md"
            >
                Back to Gems
            </Link>
        </div>
    )
}

export default Success