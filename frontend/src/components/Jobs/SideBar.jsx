import React from "react";
import {
    Box,
    DialogTitle,
    Drawer,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { formatTime } from "../../data";

function JobSideBar({ openFilter, setOpenFilter, filterInput, handleChange }) {
    const shiftTimings = {
        morning: "08:00",
        afternoon: "12:00",
        evening: "16:00",
        night: "20:00",
    };

    const keralaDistricts = [
        "Thiruvananthapuram",
        "Kollam",
        "Pathanamthitta",
        "Alappuzha",
        "Kottayam",
        "Idukki",
        "Ernakulam",
        "Thrissur",
        "Palakkad",
        "Malappuram",
        "Kozhikode",
        "Wayanad",
        "Kannur",
        "Kasaragod",
    ];

    return (
        <Drawer
            variant="temporary"
            anchor="left"
            open={openFilter}
            onClose={() => setOpenFilter(false)}
        >
            <Box
                sx={{
                    width: {
                        sm: "300px",
                        md: "500px",
                    },
                    padding: {
                        sm: "20px",
                        md: "40px",
                    },
                }}
            >
                <div className="flex items-center justify-between">
                    <DialogTitle>Filter</DialogTitle>
                    <IoClose
                        className="text-sm md:text-2xl"
                        onClick={() => setOpenFilter(false)}
                    />
                </div>

                <form className="w-full flex flex-col items-center gap-10 text-secondary">
                    <FormControl className="w-[90%]">
                        <InputLabel id="shift-label">District</InputLabel>
                        <Select
                            name="district"
                            value={filterInput.district}
                            label="District"
                            onChange={handleChange}
                        >
                            {keralaDistricts.map((district) => (
                                <MenuItem key={district} value={district}>
                                    {district}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="w-[90%]">
                        <InputLabel id="shift-label">Time</InputLabel>
                        <Select
                            name="time"
                            label="time"
                            value={filterInput.time}
                            onChange={handleChange}
                        >
                            {Object.entries(shiftTimings).map(
                                ([shift, time]) => (
                                    <MenuItem key={shift} value={time}>
                                        {formatTime(time)}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                </form>
            </Box>
        </Drawer>
    );
}

export default JobSideBar;
