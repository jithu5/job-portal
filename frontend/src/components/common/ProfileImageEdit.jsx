import React, { useRef } from 'react'
import { FaEdit } from 'react-icons/fa';

function ProfileImageEdit({ handleChange,input }) {
    const profileImageRef = useRef(null);
    const coverImageRef = useRef(null);

    function handleProfileClick() {
        profileImageRef.current.click(); // Trigger file input click
    }

    function handleCoverClick() {
        coverImageRef.current.click(); // Trigger file input click
    }

    return (
        <>
            <div className="w-full px-5 flex flex-col gap-6 justify-center mb-10 md:items-center">
                <div className="flex flex-col justify-center gap-7">
                    <img
                        className="object-cover w-36 h-36 rounded-full"
                        src={input.profileImage}
                        alt="User"
                    />
                    <div
                        onClick={handleProfileClick}
                        className="bg-third rounded-md py-2 px-8 flex items-center gap-2 w-fit"
                    >
                        <FaEdit className="text-md text-white" />
                        <input
                            type="file"
                            className="hidden"
                            name="profileImage"
                            ref={profileImageRef}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-7">
                    <img
                        className="object-cover w-[90%] md:w-full mx-auto rounded-md h-20 md:h-96"
                        src={input.coverImage}
                        alt="User"
                    />
                    <div
                        onClick={handleCoverClick}
                        className="bg-third rounded-md py-2 px-8 flex items-center gap-2 w-fit"
                    >
                        <FaEdit className="text-md text-white" />
                        <input
                            type="file"
                            className="hidden"
                            name="coverImage"
                            ref={coverImageRef}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileImageEdit
