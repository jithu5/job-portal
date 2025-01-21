import React from 'react'
import Avatar from "../../assets/man.png"

import { TiThMenu } from "react-icons/ti";


function AdminNavBar({ setIsOpen}) {
  return (
      <>
          <header className="px-1 md:px-14 py-5 md:py-7 lg:py-12 w-full font-BarlowSemiCondensed flex items-center justify-between">
              <div className="md:hidden">
                  <TiThMenu className='text-lg' onClick={()=>setIsOpen(true)} />
              </div>
              <div>
                  <h1 className="text-xl md:text-3xl font-bold">
                      Job Portal Admin
                  </h1>
              </div>
              <div>
                  <img
                      src={Avatar}
                      className="w-8 md:w-12 object-cover rounded-full"
                      alt=""
                  />
              </div>
          </header>
      </>
  );
}

export default AdminNavBar
