import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './features/auth/authSlice'
import React from 'react'
import MapView from './components/MapView'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import SidePanel from './components/SidePanel'
import GemDrawer from './components/GemDrawer'
import Success from './components/Success'

const App = () => {


  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.auth.currenUser)

  // setting useState
  const [gems, setGems] = useState([])
  const [selectedGem, setSelectedGem] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [fillCoords, setFillCoords] = useState(null)
  
  // Checking Current User
  useEffect(() => {
    async function checkCurrentUser() {
      const response = await fetch("api/check_current_user")
      if (response.status === 200) {
        const data = await response.json()
        dispatch(loginUser(data))
      }
    }
    checkCurrentUser()
  }, [])




  // fetching gems 
  useEffect(() => {
    fetch("/api/gems")
    .then((response) => response.json())
    .then((data) => setGems(data))
  }, [])

  const handleDeleteGem = (deletedGemId) => {
    setGems(prev => prev.filter(gem => gem.id !== deletedGemId))
    setSelectedGem(null)
  }


  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Navbar 
        onAddGem={() => setIsOpen(true)} 
      />
      <div className="pt-16 flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
          <Route path="/" element={
            <div className="flex h-[calc(100vh-64px)] mt-16">
              <div className="w-2/3 h-full">
                <MapView 
                  gems={gems}  
                  onSelectedGem={setSelectedGem}
                  onMapClick={(coords) => {
                    setFillCoords(coords)
                  }}  
                />
              </div>
              <div className="w-1/3 h-full overflow-y-auto">
                <SidePanel 
                  setSelectedGem={setSelectedGem} 
                  selectedGem={selectedGem} 
                  onClearSelection={() => setSelectedGem(null)} 
                  currentUser={currentUser} 
                  gems={gems} 
                  handleDeleteGem={handleDeleteGem}
                />
              </div>
            </div>
          } />
        </Routes>
        <GemDrawer 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          setGems={setGems}
          onClose={() => {
            setIsOpen(false)
            setFillCoords(null)
          }}
          fillCoords={fillCoords} 
        />
      </div>
    </div>
  );
}
      

export default App
