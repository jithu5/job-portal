import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import { useGetDashboardQuery } from "../../Store/adminapi/SuperAdmin-Api";
import { Loader2 } from "lucide-react";

function Dashboard() {
    const { data, isFetching } = useGetDashboardQuery();

    if (isFetching) {
        return (
            <div className="w-full min-h-[70vh] flex justify-center items-center">
                <Loader2 className="w-6 h-6 md:w-28 md:h-28 animate-spin text-stone-800" />
            </div>
        );
    }

    const stats = [
        { label: "Total Jobs", value: data?.data.totalJobs },
        { label: "Active Jobs", value: data?.data.totalActiveJobs },
        { label: "Total Companies", value: data?.data.totalCompanies },
        { label: "Total Users", value: data?.data.totalUsers },
        { label: "Total Applicants", value: data?.data.totalApplicants },
        { label: "Jobs Today", value: data?.data.jobsToday },
        { label: "Users Today", value: data?.data.usersToday },
        { label: "Applications Today", value: data?.data.applicantsToday },
    ];
    console.log(data?.data);

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
