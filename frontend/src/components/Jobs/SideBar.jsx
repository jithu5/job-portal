import React from "react";
import {
    Box,
    Button,
    DialogTitle,
    Drawer,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { IoClose } from "react-icons/io5";

function JobSideBar({
    openFilter,
    setOpenFilter,
    filterInput,
    handleChange,
}) {
    const shiftTimings = {
        "Morning (6 AM - 12 PM)": ["06:00", "12:00"],
        "Afternoon (12 PM - 4 PM)": ["12:00", "16:00"],
        "Evening (4 PM - 7 PM)": ["16:00", "19:00"],
        "Night (7 PM - 12 AM)": ["19:00", "23:59"],
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
                            {keralaDistricts.map(district =>(
                                <MenuItem key={district} value={district}>
                                    {district}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="w-[90%]">
                        <InputLabel id="shift-label">Shift</InputLabel>
                        <Select
                            name="shift"
                            label="Shift"
                            value={filterInput.shift}
                            onChange={handleChange}
                        >
                            {Object.keys(shiftTimings).map((shift) => (
                                <MenuItem key={shift} value={shift}>
                                    {shift}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                </form>
            </Box>
        </Drawer>
    );
}

export default JobSideBar;
