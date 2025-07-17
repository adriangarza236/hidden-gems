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
        <header className="flex border-3 fixed  justify-between items-center px-6 py-5 bg-purple-900 top-0 left-0 right-0 z-50">
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Hidden Gems Logo" className="h-10" />
            </Link>

            <div className="space-x-4">
                {currentUser ? (
                    <>
                        <span className="text-black bg-pink-600 rounded-full px-5 py-3 shadow-sm font-extrabold border-3">Hi, {currentUser.username}</span>

                        <button
                            onClick={onAddGem}
                            className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-3 rounded shadow font-extrabold border-3"
                        >
                            Create Gem
                        </button>
                        
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 font-extrabold text-black px-4 py-3 rounded border-3"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="border-3 px-4 py-3 bg-blue-700 hover:bg-blue-800 font-bold">
                            Login
                        </Link>
                        <Link to="/signup" className=" border-3 px-4 py-3 font-bold bg-red-600 hover:bg-red-700">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Navbar