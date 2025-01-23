import React from 'react'
import CoverImage from '../../assets/CoverImage.jpg';
import ProfileImage from '../../assets/man.png';
import { FaEdit } from 'react-icons/fa';

function ProfileImages({setOpenDrawer}) {
  return (
      <>
          <div className="w-full mt-10 relative">
              <img
                  src={CoverImage}
                  alt=""
                  className="w-full h-32 md:h-72 object-cover rounded-t-2xl lg:rounded-t-[60px] rounded-b-lg"
              />
              <div className="h-14 w-14 md:w-32 md:h-32 object-cover absolute left-6 md:left-20 top-[100%] -translate-y-1/2 rounded-full bg-primary flex items-center justify-center">
                  <img src={ProfileImage} alt="" className="w-[90%]" />
              </div>
              <div onClick={()=>setOpenDrawer(true)} className="absolute top-2 right-2 md:top-4 md:right-4 bg-third text-white p-2 md:p-4 rounded-full flex items-center justify-center cursor-pointer">
                  <FaEdit className='text-md md:text-lg' />
              </div>
          </div>
      </>
  );
}

export default ProfileImages
