import { Box, DialogTitle, Drawer } from "@mui/material";
import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

function ImageEditDrawer({ openDrawer, setOpenDrawer,handleSubmit,images,setImages }) {
    
    const refs = {
        profile: useRef(null),
        cover: useRef(null),
    };

    const handleFileChange = (e, type) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile)
            setImages((prev) => ({ ...prev, [type]: selectedFile }));
    };

    const handleDragDrop = (e, type) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile)
            setImages((prev) => ({ ...prev, [type]: droppedFile }));
    };

    const handleClearImage = (type) => {
        setImages((prev) => ({ ...prev, [type]: null }));
        refs[type].current.value = "";
    };



    const renderImageInput = (type, label) => (
        <div className="w-full flex flex-col items-center gap-4 mt-10">
            <label
                htmlFor={`${type}Image`}
                className="text-secondary font-semibold text-lg md:text-xl"
            >
                {label}
            </label>
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDragDrop(e, type)}
                className="w-full p-4 h-32 md:h-48 border-[2px] border-dashed border-secondary rounded-lg"
            >
                <input
                    type="file"
                    id={`${type}Image`}
                    name={`${type}Image`}
                    className="hidden"
                    ref={refs[type]}
                    onChange={(e) => handleFileChange(e, type)}
                />
                {!images[type] ? (
                    <label
                        htmlFor={`${type}Image`}
                        className="flex flex-col items-center justify-center cursor-pointer p-5"
                    >
                        <FaCloudUploadAlt className="text-3xl md:text-6xl" />
                        <span>Drag & Drop or Click to upload image</span>
                    </label>
                ) : (
                    <div className="w-full h-full flex items-center justify-center flex-col">
                        <img
                            src={URL.createObjectURL(images[type])}
                            alt={`${type}`}
                            className="w-12 h-12 object-cover rounded-xl"
                        />
                        <IoClose
                            onClick={() => handleClearImage(type)}
                            className="text-md md:text-lg cursor-pointer"
                        />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            anchor="right"
        >
            <Box
                sx={{
                    width: { xs: "100vw", sm: 360, md: 400 },
                   
                    px: { xs: 5, sm: 10 },
                    display: "flex",
                    flexDirection: "column",
                }}
                role="presentation"
            >
                <div className="w-full flex justify-between items-center">
                    <DialogTitle className="text-xl md:text-2xl">
                        Edit Images
                    </DialogTitle>
                    <IoClose
                        onClick={() => setOpenDrawer(false)}
                        className="text-md md:text-2xl cursor-pointer"
                    />
                </div>
                <form onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col items-center w-full"
                >
                    {renderImageInput("profile", "Profile Image")}
                    {renderImageInput("cover", "Cover Image")}
                    <button
                        type="submit"
                        className="mt-10 w-full px-6 py-3 text-white bg-stone-800 rounded-md hover:bg-stone-950"
                    >Edit</button>
                </form>
            </Box>
        </Drawer>
    );
}

export default ImageEditDrawer;
