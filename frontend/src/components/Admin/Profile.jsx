import React from 'react'
import ProfileImages from '../common/ProfileImages'
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

function AdminProfile() {
  return (
      <>
          <div className="w-[99%] mx-auto min-h-screen font-BarlowSemiCondensed mb-32">
              <ProfileImages />
              <div className="w-[90%] mx-auto flex flex-col items-end mt-10">
                  <div className="flex flex-col items-center gap-3">
                      <h1 className="text-xl font-medium ">Job Role</h1>
                      <p className="bg-third rounded-lg px-3 py-2 text-white">
                          Software Engineer
                      </p>
                  </div>
              </div>
              <div className="w-[90%] mx-auto flex flex-col gap-4">
                  <h1 className="text-xl md:text-3xl font-bold">
                      Monkey D Luffy
                  </h1>
                  <p className="text-md md:texxt-lg font-medium">
                      Software Engineer
                  </p>
                  <p className="text-md md:texxt-lg font-medium">
                      luffy@sunny.com
                  </p>
                  <p className="text-md md:texxt-lg font-medium">6955217854</p>
                  <p className="text-md md:text-lg font-normal">
                      Foosha Village, Goa kingdom, East Blue
                  </p>
                  <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                      <Link
                          to={"/admin/dashboard/profile/edit"}
                          className="bg-third text-md text-white font-semibold rounded-md py-2 px-4 flex items-center gap-2"
                      >
                          <FaEdit className="text-md" />
                          Edit Profile
                      </Link>
                  </div>
              </div>
          </div>
      </>
  );
}

export default AdminProfile
