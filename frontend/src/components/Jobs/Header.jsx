import { Button, Input } from '@mui/material'
import React, { useEffect } from 'react'

function JobHeader({ setOpenFilter,title,handleChange }) {
    
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
            </header>
        </>
    );
}

export default JobHeader
