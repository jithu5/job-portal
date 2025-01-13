import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar,Footer } from '../../components/index';

function UserHome() {
  return (
      <>
          <NavBar />
          <Outlet />
          <Footer />
      </>
  );
}

export default UserHome
