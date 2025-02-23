import React, { useState } from "react";
import avatar from "../../assets/man.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";

import { TiThMenu } from "react-icons/ti";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminNavBar({ setIsOpen, handleLogout, usedIn }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.Auth);
    console.log(user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(anchorEl);
    return (
        <>
            <header className="md:px-14 px-4 py-5 w-full font-BarlowSemiCondensed flex items-center justify-between bg-primary text-stone-900">
                <div className="md:hidden">
                    <TiThMenu
                        className="text-lg"
                        onClick={() => setIsOpen(true)}
                    />
                </div>
                <div>
                    <h1 className="text-xl md:text-3xl font-bold">
                        {usedIn.toLowerCase() === "company"
                            ? "Company"
                            : "Admin"}{" "}
                        Dashboard
                    </h1>
                </div>

                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 38, height: 38 }}>
                            <img
                                src={user?.profileImage || avatar}
                                alt=""
                                className="w-full h-full rounded-full object-cover"
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
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    {usedIn !== "admin" && (
                        <>
                            <MenuItem onClick={handleClose}>
                                <Link
                                    to={"profile"}
                                    className="flex items-center gap-1"
                                >
                                    <Avatar /> Profile
                                </Link>
                            </MenuItem>
                            <Divider />
                        </>
                    )}

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
            </header>
        </>
    );
}

export default AdminNavBar;
