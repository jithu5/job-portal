import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar,Footer } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { setAppliedJobs } from '../../Store/Auth';
import { useGetAppliedJobQuery } from '../../Store/Auth/Auth-Api';

function UserHome() {
        const { data: data, isFetching } = useGetAppliedJobQuery();
        const dispatch = useDispatch();

        const { appliedJobs } = useSelector((state) => state.Auth);
     useEffect(() => {
         if (data?.data && !isFetching) {
             console.log(data.data);
             if (appliedJobs?.length === 0) {
                 dispatch(setAppliedJobs(data.data));
             }
         }
     },[data]);
    
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
