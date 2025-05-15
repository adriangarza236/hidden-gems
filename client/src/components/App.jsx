import { useEffect, useState } from 'react'
import React from 'react'
import MapView from './MapView'

const App = () => {

  // setting useState
  const [gems, setGems] = useState([])
  
  // fetching gems 
  useEffect(() => {
    fetch("/api/gems")
    .then((response) => response.json())
    .then((data) => setGems(data))
  }, [])


  return (
    <MapView gems={gems} />
  )
}

export default App
