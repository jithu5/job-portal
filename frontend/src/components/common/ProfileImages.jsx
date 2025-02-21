import React from 'react'
import CoverImage from '../../assets/CoverImage.jpg';
import ProfileImage from '../../assets/man.png';
import { FaEdit } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';

function ProfileImages({setOpenDrawer,user,removeProfileImage,removeCoverImage}) {
  return (
      <>
          <div className="w-full mt-10 relative">
              <img
                  src={user?.coverImage || CoverImage}
                  alt=""
                  className="w-full h-32 md:h-72 object-cover rounded-t-2xl lg:rounded-t-[60px] rounded-b-lg"
              />
              <div onClick={removeCoverImage} className="absolute p-2 rounded-full bg-red-500 -bottom-3 right-0 cursor-pointer">
                  <Trash2 className="size-4 text-white" />
              </div>
              <div className="h-14 w-14 md:w-32 md:h-32 object-cover absolute left-6 md:left-20 top-[96%] -translate-y-1/2 rounded-full bg-primary flex items-center jusify-center m-2">
                  <img
                      src={user?.profileImage || ProfileImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                  />
                  <div onClick={removeProfileImage} className="absolute p-2 rounded-full bg-red-500 bottom-0 right-0 cursor-pointer">
                      <Trash2 className="size-4 text-white" />
                  </div>
              </div>

              <div
                  onClick={() => setOpenDrawer(true)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-third text-white p-2 md:p-4 rounded-full flex items-center justify-center cursor-pointer"
              >
                  <FaEdit className="text-md md:text-lg" />
              </div>
          </div>
      </>
  );
}

export default ProfileImages
