import React from 'react'
import {useForm} from "react-hook-form"

// title
//         description
//         location
//         date
//         salary
//         workersCount
//         status

function AdminPostJob() {
    const { register, handleSubmit,reset, } = useForm();
  return (
    <>
      <main className='w-full h-full'>
        <div className='w-full h-full flex items-center justify-center'>
          <h1 className='text-4xl font-bold text-primary'>Post Job</h1>
        </div>
        {/* Job Form */}
      </main>
    </>
  )
}

export default AdminPostJob
