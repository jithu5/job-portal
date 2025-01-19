import React from "react";
import {
    Box,
    Button,
    DialogTitle,
    Drawer,
    Slider,
    TextField,
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
    handlFilterChange,
    clearInput,
}) {
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

                <form>
                    {/* Title Filter */}
                    <TextField
                        label="Job Title"
                        variant="outlined"
                        fullWidth
                        value={filterInput.Title}
                        onChange={handleChange}
                        name="Title"
                        sx={{ mb: 2 }}
                    />

                    {/* Salary Range Filter */}
                    <div className="w-[60%] flex flex-col gap-3 mx-auto">
                        <p>Salary Range</p>
                        <Slider
                            value={filterInput.Salary} // default to 0 if no min salary is selected
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `$${value}`}
                            name="Salary"
                            min={0}
                            max={2000}
                            sx={{ mb: 2 }}
                        />
                    </div>

                    {/* Place Filter */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Place</InputLabel>
                        <Select
                            value={filterInput.Place}
                            onChange={handleChange}
                            name="Place"
                        >
                            <MenuItem value="New York">New York</MenuItem>
                            <MenuItem value="San Francisco">
                                San Francisco
                            </MenuItem>
                            <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                            <MenuItem value="Chicago">Chicago</MenuItem>
                            <MenuItem value="Austin">Austin</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Job Type Filter */}
                    <TextField
                        label="Job Type"
                        variant="outlined"
                        fullWidth
                        value={filterInput.Type}
                        onChange={handleChange}
                        name="Type"
                        sx={{ mb: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            setOpenFilter(false);
                            handlFilterChange();
                        }}
                        sx={{ mt: 2 }}
                    >
                        Apply Filters
                    </Button>
                    <Button
                        onClick={clearInput}
                        sx={{ mt: 2 }}
                        color="error"
                    >
                        clear
                    </Button>
                </form>
            </Box>
        </Drawer>
    );
}

export default JobSideBar;
