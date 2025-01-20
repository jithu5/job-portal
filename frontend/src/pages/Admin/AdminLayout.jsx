import React from 'react'
import { Footer, NavBar } from '../../components/index'
import { Outlet } from 'react-router-dom';

function AdminLayout() {
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

export default AdminLayout
