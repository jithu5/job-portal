import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfileImages from "../common/ProfileImages";
import ImageEditDrawer from "../common/ImageEditdDawer";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCoverImageMutation, useUploadIagesMutation,useDeleteProfileImageMutation } from "../../Store/Auth/Auth-Api";
import { toast } from "react-toastify";
import { setUser } from "../../Store/Auth";

const Profile = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [images, setImages] = useState({ profile: null, cover: null });
    const [isSubmiting, setIsSubmiting] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.Auth);
    const [uploadIages] = useUploadIagesMutation();
    const [deleteProfileImage] = useDeleteProfileImageMutation()
    const [deleteCoverImage] = useDeleteCoverImageMutation()

    const handleSubmit = async (e) => {
        setIsSubmiting(true);
        e.preventDefault();
        console.log("Images state:", images);

        const formData = new FormData();
        formData.append("profileImage", images.profile);
        formData.append("coverImage", images.cover);

        // Debug FormData entries
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
        try {
            const response = await uploadIages(formData).unwrap();
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
            toast.error("Failed to upload");
            console.error(error);
        }
        finally{
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Empty dependency array to run only once when the component mounts
    return (
        <div className="w-full min-h-screen font-BarlowSemiCondensed mb-32">
            <ImageEditDrawer
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                images={images}
                setImages={setImages}
                handleSubmit={handleSubmit}
                isSubmiting={isSubmiting}
            />
            <ProfileImages setOpenDrawer={setOpenDrawer} user={user} removeCoverImage={handleRemoveCoverImage} removeProfileImage={handleRemoveProfileImage} />
         
            <div className="w-[90%] mx-auto flex flex-col gap-4 mt-24">
                <h1 className="text-xl md:text-3xl font-bold">
                    {user.name.toUpperCase()}
                </h1>
                <p className="text-md md:texxt-lg font-medium">{user.email}</p>
                <p className="text-md md:texxt-lg font-medium">{user.phone}</p>
                <p className="text-md md:text-lg font-normal">{user.address}</p>
                <div className="w-[90%] mx-auto flex items-center justify-start mt-10">
                    <Link
                        to={"/user/profile/edit"}
                        className="bg-third text-md text-white font-semibold rounded-md py-2 px-4 flex items-center gap-2"
                    >
                        <FaEdit className="text-md" />
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
