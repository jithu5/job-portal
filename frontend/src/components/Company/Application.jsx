import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetJobsQuery } from '../../Store/AdminAuth/AdminAuth-Api';
import { Loader2 } from 'lucide-react';

function AdminApplication() {
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [title, setTitle] = useState("");
    const { data,isFetching,isLoading } = useGetJobsQuery();

    useEffect(() => {
        if (data && data.data && !isLoading) {
            setFilteredJobs(data.data);
        }
    }, [data])
    
    if (isLoading || isFetching) {
        return <div className='w-full min-h-screen flex justify-center items-center'><Loader2 className='w-6 h-6 md:h-24 md:w-24 animate-spin' /></div>;
        
    }
    const handleChange = (e) => {
        setTitle(e.target.value);
        setFilteredJobs(
            data.data.filter((job) =>
                job.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };
  return (
      <>
          <div className="w-full font-Oswald">
              <h1 className="text-md md:textlg lg:text-2xl font-semibold text-center">
                  Job Application
              </h1>
              <p className="text-sm md:text-xl text-center font-medium">
                  Welcome to the company application.
              </p>
              {/* Admin application components */}
              <div className="w-[300px] sm:w-[400px] md:w-[500px] mx-auto my-10">
                  <Input
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleChange}
                      placeholder="Search your job here"
                      className="w-[200px] md:w-md lg:w-[400px] placeholder:text-sm px-3"
                  />
              </div>
              {/* Jobs Section */}
              <div className="flex flex-col gap-6 items-center my-16">
                  {filteredJobs.map((job) => (
                      <div
                          key={job._id}
                          className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
                      >
                          {/* Job Title and Image */}
                          <div className="flex items-center gap-4">
                              <img
                                  src={job.company.profileImage}
                                  alt={job.title}
                                  className="w-14 h-14 object-cover rounded-full"
                              />
                              <div>
                                  <h2 className="text-lg md:text-xl font-bold text-blue-600">
                                      {job.title}
                                  </h2>
                                  <p className="text-gray-500">
                                      {job.description}
                                  </p>
                              </div>
                          </div>

                          {/* Job Details */}
                          <div className="flex flex-col gap-2">
                              <p className="text-gray-700">
                                  <span className="font-semibold">Status:</span>{" "}
                                  <span
                                      className={`${
                                          job.status === "Active"
                                              ? "text-green-600"
                                              : "text-red-600"
                                      } font-bold`}
                                  >
                                      {job.status}
                                  </span>
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">
                                      Number of Workers:
                                  </span>{" "}
                                  {job.workersCount - job.workersNeeded}
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">
                                      Date Posted:
                                  </span>{" "}
                                  {new Date(job.date).toLocaleDateString("en-US",{
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
  
                                  })}
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">Salary:</span>{" "}
                                  ${job.salary} per month
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">Filled:</span>{" "}
                                  {job.filled}%
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">
                                      Address:
                                  </span>{" "}
                                  {job.location}, {job.district}
                              </p>
                          </div>

                          {/* Show Details Button */}
                          <div className="w-full flex justify-end gap-6 items-center">
                                <button className="text-red-500 px-6 py-2 rounded-lg hover:text-red-700">
                                    Delete
                                     </button>
                              <Link
                                  to={`/company/dashboard/applications/${job._id}`}
                                  className="bg-third text-white px-6 py-2 rounded-lg hover:bg-purple-700"
                              >
                                  Show Details
                              </Link>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </>
  );
}

export default AdminApplication
