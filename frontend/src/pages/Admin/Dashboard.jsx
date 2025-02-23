import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

function Dashboard() {
    // Hardcoded data
    const stats = [
        { label: "Total Jobs", value: 120 },
        { label: "Active Jobs", value: 80 },
        { label: "Total Companies", value: 45 },
        { label: "Total Users", value: 500 },
        { label: "Total Applicants", value: 350 },
        { label: "Jobs Today", value: 5 },
        { label: "Users Today", value: 12 },
        { label: "Applications Today", value: 20 },
    ];

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 5,
                backgroundColor: "#f4f6f8",
                minHeight: "100vh",
            }}
        >
            <Typography
                variant="h4"
                fontWeight="bold"
                textAlign="center"
                gutterBottom
                color="black"
            >
                Admin Dashboard
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            elevation={3}
                            sx={{
                                textAlign: "center",
                                padding: "20px",
                                borderRadius: "12px",
                                backgroundColor: "#fff",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" color="textSecondary">
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    color="primary.main"
                                >
                                    {stat.value}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default Dashboard;
