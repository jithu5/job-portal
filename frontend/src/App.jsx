import React from 'react'
import { Outlet } from 'react-router-dom'
import "./App.css"

function App() {
  return (
    <>
    <div className='min-h-screen w-full bg-primary'>
    <Outlet/>
      
    </div>
    </>
  )
}

export default App
