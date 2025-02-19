import React, { useState } from 'react'
import { AdminDrawer, AdminSideBar } from '../../components';
import { Outlet } from 'react-router-dom';

function Layout() {
        const [isOpen, setIsOpen] = useState(false);
  return (
      <>
          <main className="w-full min-h-screen bg-gray-900 text-white font-BebasNeue">
              <div className="hidden md:fixed md:flex w-[20%] lg:w-[17%] bg-stone-900 text-white min-h-screen rounded-tr-2xl rounded-br-2xl">
                  <AdminSideBar usedIn={"admin"} />
              </div>
              <AdminDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
              <div className="w-full max-md:px-5 md:w-[80%] lg:w-[83%] min-h-screen md:ml-[20%] lg:ml-[17%]">
                  <main className="w-full min-h-screen mt-3">
                      <Outlet />
                  </main>
              </div>
          </main>
      </>
  );
}

export default Layout
