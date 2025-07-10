import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../features/auth/authSlice"
import logo from '../assets/hiddenGems_logo.svg'

const Navbar = ({ onAddGem }) => {

    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.currentUser)

    const handleLogout = e => {
        e.preventDefault()

        fetch("/api/logout", { method: "DELETE" })
            .then(() => dispatch(logoutUser()))
    }

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-purple-900 shadow-md fixed top-0 left-0 right-0 z-50">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Hidden Gems Logo" className="h-10" />
            </Link>

            <div className="space-x-4">
                {currentUser ? (
                    <>
                        <span className="text-gray-600">Hi, {currentUser.username}</span>

                        <button
                            onClick={onAddGem}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded shadow"
                        >
                            Add Gem
                        </button>
                        
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 hover:bg-gray-200 text-sm text-red-600 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-600 hover:underline text-sm">
                            Login
                        </Link>
                        <Link to="/signup" className="text-blue-600 hover:underline text-sm">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Navbar