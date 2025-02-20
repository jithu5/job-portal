import { Button, Input } from '@mui/material'
import React, { useEffect } from 'react'

function JobHeader({ setOpenFilter,title,handleChange,openFilter,setFilterInput }) {
    
    return (
        <>
            <header className="flex items-center py-7 justify-between w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
                <Input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Search your job here"
                    className="w-[200px] md:w-md lg:w-[400px] placeholder:text-sm px-3"
                />
                <div className='flex items-center gap-4'>

               <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#9263f3",
                    }}
                    onClick={() => {
                        setOpenFilter(true);
                    }}
                    >
                    Filter
                </Button>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "black",
                    }}
                    onClick={() => {
                        setFilterInput({ district: '', time: '',title: '' });
                        
                    }}
                    >
                    Clear
                </Button>
                    </div>
                    
            </header>
        </>
    );
}

export default JobHeader
