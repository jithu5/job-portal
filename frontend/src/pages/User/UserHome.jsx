import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { NavBar, Footer } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { setAppliedJobs, setWishlist } from "../../Store/Auth";
import {
    useGetAppliedJobQuery,
    useGetWishlistQuery,
} from "../../Store/Auth/Auth-Api";

function UserHome() {
    const { data: data, isFetching } = useGetAppliedJobQuery();
    const { data: wishlistsData, isFetching: isWishListFetching } =
        useGetWishlistQuery();
    const dispatch = useDispatch();

    const { appliedJobs, wishlist } = useSelector((state) => state.Auth);
    useEffect(() => {
        if (data?.data && !isFetching) {
            console.log(data.data);
            if (appliedJobs?.length === 0) {
                dispatch(setAppliedJobs(data.data));
            }
        }
    }, [data]);
    useEffect(() => {
        if (wishlistsData?.data &&!isWishListFetching) {
            if (wishlist.length === 0) {
                dispatch(setWishlist(wishlistsData.data))
            }
        }
    }, [wishlistsData]);

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

export default UserHome;
