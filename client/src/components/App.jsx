import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import MapView from './MapView'
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'
import SidePanel from './SidePanel'
import GemDrawer from './GemDrawer'

const App = () => {

  // setting useState
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
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
        login_user(data)
      }
    }
    checkCurrentUser()
  }, [])

  //Login 
  const login_user = user => {
    setCurrentUser(user)
    setLoggedIn(true)
  }

  //Logout
  const logout_user = () => {
    setCurrentUser(null)
    setLoggedIn(false)
  }

  // fetching gems 
  useEffect(() => {
    fetch("/api/gems")
    .then((response) => response.json())
    .then((data) => setGems(data))
  }, [])


  return (
    <div className="flex flex-col h-screen bg-white">
      <Navbar 
        logout_user={logout_user} 
        currentUser={currentUser} 
        onAddGem={() => setIsOpen(true)} 
      />
      <div className="pt-16 flex-1">
        <Routes>
          <Route path="/login" element={<Login login_user={login_user} loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Signup login_user={login_user} loggedIn={loggedIn} />} />
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
                />
              </div>
            </div>
          } />
        </Routes>
        <GemDrawer 
          isOpen={isOpen} 
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
