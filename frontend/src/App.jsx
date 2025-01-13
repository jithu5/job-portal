import React from 'react'
import { Outlet } from 'react-router-dom'
import "./App.css"

function App() {
  return (
    <>
    <div className='min-h-screen w-full px-6 py-4 bg-primary'>
    <Outlet/>
      
    </div>
    </>
  )
}

export default App
