import React from 'react'
import { NavBar, Footer } from './components/index'
import { Outlet } from 'react-router-dom'
import "./App.css"

function App() {
  return (
    <>
    <div className='min-h-screen w-full px-6 py-4 bg-primary'>

      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
    </>
  )
}

export default App
