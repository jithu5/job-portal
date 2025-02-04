import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MenuButton, NavigationLinks } from "../index";

import { HiOutlineUser } from "react-icons/hi";
import avatar from "../../assets/man.png";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { useLogoutUserMutation } from "../../Store/Auth/Auth-Api";
import { clearUserData } from "../../Store/Auth/index";
import UserApi from "../../Store/Auth/Auth-Api";
import { toast } from "react-toastify";

function NavBar() {
    const { user: currentUser, appliedJobs } = useSelector(
        (state) => state.Auth
    );

    const [isActive, setIsActive] = useState(false);

    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [anchorEl, setAnchorEl] = useState(null);

    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLogout = async () => {
        // Logout logic here
        try {
            const response = await logoutUser().unwrap();
            console.log(response);
            if (!response.success) {
                toast.error(response.message);
            }
            toast.success(response.message);
            setTimeout(() => {
                dispatch(clearUserData());
                dispatch(UserApi.util.resetApiState());
                navigate("/api/user/login");
            }, 1000);
        } catch (error) {
            toast.error(error);
        }
    };

    const getResponsiveSize = () => {
        if (screenSize < 768) {
            // Mobile
            return {
                open: {
                    width: 320,
                    height: 450,
                    top: "5px",
                    right: "15px",
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "20px",
                    right: "24px",
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                    // opacity: 0,
                },
            };
        } else if (screenSize < 1024) {
            // Tablet
            return {
                open: {
                    width: 320,
                    height: 500,
                    top: "5px",
                    right: "50px",
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                    // opacity: 1,
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "16px",
                    right: "64px",
                    // opacity: 0,
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                },
            };
        } else {
            // Desktop
            return {
                open: {
                    width: 420,
                    height: 600,
                    top: "5px",
                    right: "50px",
                    // opacity: 1,
                    transition: "all 0.75s cubic-bezier(0.76,0,0.24,1)",
                },
                close: {
                    width: 0,
                    height: 0,
                    top: "20px",
                    right: "66px",
                    // opacity: 0,
                    transition: {
                        duration: 0.75,
                        delay: 0.3, // Delay for the animation
                        ease: [0.76, 0, 0.24, 1],
                    },
                },
            };
        }
    };

    const variants = getResponsiveSize();
    return (
        <>
            <header className="w-full flex items-center justify-end font-BarlowSemiCondensed font-medium md:px-10">
                {/* logo */}
                <nav>
                    <ul className="flex items-center gap-6">
                        {!currentUser && (
                            <>
                                <div className="flex justify-center items-center p-1 md:p-2 rounded-full border-[2px] border-secondary mr-7">
                                    <HiOutlineUser className="text-sm sm:text-md md:text-lg" />
                                </div>
                            </>
                        )}
                        {currentUser && (
                            <>
                                <Link to={"wishlist"}>
                                    <FaRegHeart className="text-md sm:text-xl md:text-2xl" />
                                </Link>
                                <Link to={"job-history"} className="relative">
                                    <MdOutlineWorkHistory className="text-md sm:text-xl md:text-2xl" />
                                   {appliedJobs.length > 0 && <p className="absolute -top-4 -right-4 bg-yellow-300 w-7 h-7 rounded-full flex justify-center items-center">{appliedJobs.length}</p>}
                                </Link>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick} 
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={
                                            open ? "account-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            open ? "true" : undefined
                                        }
                                    >
                                        <Avatar sx={{ width: 40, height: 40 }}>
                                            <img
                                                src={currentUser?.profileImage || avatar}
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>

                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    slotProps={{
                                        paper: {
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&::before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform:
                                                        "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        },
                                    }}
                                    transformOrigin={{
                                        horizontal: "right",
                                        vertical: "top",
                                    }}
                                    anchorOrigin={{
                                        horizontal: "right",
                                        vertical: "bottom",
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link
                                            to={"profile"}
                                            className="flex items-center gap-1"
                                        >
                                            <Avatar /> Profile
                                        </Link>
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            handleLogout();
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                        <motion.div
                            variants={variants}
                            animate={isActive ? "open" : "close"}
                            initial="close"
                            className="bg-third rounded-2xl absolute top-4 right-6 md:right-16 z-10"
                        >
                            <AnimatePresence>
                                {isActive && (
                                    <NavigationLinks
                                        setIsActive={setIsActive}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <MenuButton
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default NavBar;
