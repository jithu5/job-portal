import React, { useState } from "react";
import ProfileImages from "../common/ProfileImages";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import ImageEditdDawer from "../common/ImageEditdDawer";
import { useDispatch, useSelector } from "react-redux";
import {
    useDeleteCoverImageMutation,
    useDeleteProfileImageMutation,
    useUpdateImagesMutation,
} from "../../Store/AdminAuth/AdminAuth-Api";
import { toast } from "react-toastify";
import { setUser } from "../../Store/Auth";

function AdminProfile() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [images, setImages] = useState({ profile: null, cover: null });
    const [isSubmiting, setIsSubmiting] = useState(false);
    const { user } = useSelector((state) => state.Auth);
    const [updateImages] = useUpdateImagesMutation();
    const [deleteProfileImage] = useDeleteProfileImageMutation();
    const [deleteCoverImage] = useDeleteCoverImageMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Images state:", images);

        const formData = new FormData();
        formData.append("profileImage", images.profile);
        formData.append("coverImage", images.cover);

        try {
            const response = await updateImages(formData).unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            console.log(response.data);
            // ✅ Batch updates in a single dispatch
            dispatch(
                setUser({
                    ...user,
                    profileImage:
                        response.data.profileImage ?? user.profileImage,
                    coverImage: response.data.coverImage ?? user.coverImage,
                })
            );

            setOpenDrawer(false);
            setImages({ profile: null, cover: null });
        } catch (error) {
            const errMessage = error?.data?.message;
            toast.error(errMessage || "Error in updating ");
            console.error(error);
        } finally {
            setIsSubmiting(false);
        }
    };

    function handleRemoveProfileImage() {
        toast(
            <div>
                <p>Are you sure you want to delete profile image?</p>
                <div className="flex justify-end gap-2 mt-2 px-3 py-1">
                    <button
                        onClick={async () => {
                            toast.dismiss();
                            await removeProfileImage();
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 px-3 py-1 rounded text-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                theme: "dark",
            }
        );
    }

    async function removeProfileImage() {
        try {
            const response = await deleteProfileImage().unwrap();
            console.log(response);
            if (!response.success) {
                return;
            }
            toast.success(response.message);
            dispatch(
                setUser({
                    ...user,
                    profileImage: null,
                })
            );
        } catch (error) {
            const errMessage =
                error?.data?.message || "Error in deleting profile image";
            toast.error(errMessage);
        }
    }

    function handleRemoveCoverImage() {
        toast(
            <div>
                <p>Are you sure you want to delete cover image?</p>
                <div className="flex justify-end gap-2 mt-2 px-3 py-1">
                    <button
                        onClick={async () => {
                            toast.dismiss();
                            await removeCoverImage();
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="bg-gray-300 px-3 py-1 rounded text-secondary"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: "top-right",
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                closeButton: false,
                theme: "dark",
            }
        );
    }

    async function removeCoverImage() {
        try {
            const response = await deleteCoverImage().unwrap();
            console.log(response);
            if (!response.success) {
                return;
            }
            toast.success(response.message);
            dispatch(
                setUser({
                    ...user,
                    coverImage: null,
                })
            );
        } catch (error) {
            const errMessage =
                error?.data?.message || "Error in deleting cover image";
            toast.error(errMessage);
        }
    }

    return (
        <>
            <div className="w-[99%] mx-auto min-h-screen font-BarlowSemiCondensed mb-32">
                {/* drawer  */}
                <ImageEditdDawer
                    openDrawer={openDrawer}
                    setOpenDrawer={setOpenDrawer}
                    images={images}
                    setImages={setImages}
                    handleSubmit={handleSubmit}
                    isSubmiting={isSubmiting}
                />
                <ProfileImages
                    setOpenDrawer={setOpenDrawer}
                    user={user}
                    removeProfileImage={handleRemoveProfileImage}
                    removeCoverImage={handleRemoveCoverImage}
                />

                <div className="w-[90%] mx-auto flex flex-col gap-4 mt-24">
                    <h1 className="text-xl md:text-3xl font-bold">
                        {user.companyName.toUpperCase()}
                    </h1>
                    <p className="text-md md:texxt-lg font-medium">
                        {user.email}
                    </p>
                    <p className="text-md md:texxt-lg font-medium">
                        {user.phone}
                    </p>
                    <p className="text-md md:text-lg font-normal">
                        {user.address}
                    </p>
                    <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                        <Link
                            to={"/company/dashboard/profile/edit"}
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

export default AdminProfile;
