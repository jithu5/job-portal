import React from 'react'

const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        image: "https://via.placeholder.com/150",
        description: "Responsible for building user interfaces using React.",
        status: "Active",
        workers: 5,
        date: "2025-01-15",
        salary: 5000,
        filled: 60,
        address: "123 Tech Park, Silicon Valley, CA",
    },
    {
        id: 2,
        title: "Backend Developer",
        image: "https://via.placeholder.com/150",
        description: "Manage server-side logic and APIs for the platform.",
        status: "Closed",
        workers: 3,
        date: "2025-01-12",
        salary: 6000,
        filled: 100,
        address: "456 DevOps Street, Austin, TX",
    },
    {
        id: 3,
        title: "UI/UX Designer",
        image: "https://via.placeholder.com/150",
        description: "Create intuitive and visually appealing designs.",
        status: "Active",
        workers: 2,
        date: "2025-01-10",
        salary: 4000,
        filled: 80,
        address: "789 Design Blvd, New York, NY",
    },
];



function AdminApplication() {
  return (
      <>
          <div className="w-full font-Oswald">
              <h1 className="text-md md:textlg lg:text-2xl font-semibold text-center">
                  Job Application
              </h1>
              <p className="text-sm md:text-xl text-center font-medium">
                  Welcome to the admin application.
              </p>
              {/* Admin application components */}
              {/* Jobs Section */}
              <div className="flex flex-col gap-6 items-center my-16">
                  {jobs.map((job) => (
                      <div
                          key={job.id}
                          className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4"
                      >
                          {/* Job Title and Image */}
                          <div className="flex items-center gap-4">
                              <img
                                  src={job.image}
                                  alt={job.title}
                                  className="w-24 h-24 object-cover rounded-md"
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
                                  {job.workers}
                              </p>
                              <p className="text-gray-700">
                                  <span className="font-semibold">
                                      Date Posted:
                                  </span>{" "}
                                  {job.date}
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
                                  {job.address}
                              </p>
                          </div>

                          {/* Show Details Button */}
                          <div className="text-right">
                              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                  Show Details
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </>
  );
}

export default AdminApplication
