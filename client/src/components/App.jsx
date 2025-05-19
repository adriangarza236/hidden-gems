import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import MapView from './MapView'
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'

const App = () => {

  // setting useState
  const [currentUser, setCurrentUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [gems, setGems] = useState([])
  
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
    <div className="flex flex-col h-screen">
      <Navbar logout_user={logout_user} currentUser={currentUser} />
      <div className="pt-16 flex-1">
        <Routes>
          <Route path="/login" element={<Login login_user={login_user} loggedIn={loggedIn} />} />
          <Route path="/signup" element={<Signup login_user={login_user} loggedIn={loggedIn} />} />
          <Route path="/" element={<MapView gems={gems} />} />
        </Routes>
      </div>
    </div>
  );
}
      

export default App
