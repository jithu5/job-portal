import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar,Footer } from '../../components/index';

function UserHome() {
    
  return (
      <>
          <div className="px-6 py-4">
              <NavBar />
              <Outlet />
          </div>
          <Footer />
      </>
  );
}

export default UserHome
