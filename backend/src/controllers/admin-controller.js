const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/Asynchandler.js");
const usermodel = require("../models/usermodel.js");
const companymodel = require("../models/company.js");
const adminmodel = require("../models/admin.js");
const jobmodel = require("../models/jobs.js");
const applicantmodel = require("../models/applicants.js");
const wishlistmodel = require("../models/wishlist.js");
const blocklistmodel = require("../models/blocklist.js");
const { default: mongoose } = require("mongoose");
const PASSWORD_RESET_TEMPLATE = require("../utils/resetotp.js");

//register
const Register = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingAdmin = await adminmodel.findOne({ email });
        if (existingAdmin) {
            throw new ApiError(400, "Admin already exists");
        }
        const newAdmin = await adminmodel.create({ name, email, password });
        const token = newAdmin.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        return res
            .cookie("adminToken", token, cookieOptions)
            .json(
                new ApiResponse(201, newAdmin, "Admin registered successfully")
            );
    } catch {
        throw new ApiError(500, "Server error");
    }
});

//login
const Login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }
        const admin = await adminmodel.findOne({ email });
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }
        const isMatch = await admin.comparePassword(password);
        if (!admin || !isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = await admin.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        return res
            .cookie("adminToken", token, cookieOptions)
            .json(new ApiResponse(200, admin, "Admin logged in successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//send reset password otp
const SendResetOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    try {
        const admin = await adminmodel.findOne({ email: email });
        if (!admin) {
            throw new ApiError(404, "admin not found");
        }
        const otp = crypto.randomInt(100000, 1000000);
        admin.resetPasswordOTP = otp;
        admin.resetPasswordOTPValidDate = new Date(Date.now() + 5 * 60 * 1000);
        await admin.save();
        // send otp to email
        await sendMail(
            email,
            "Reset Password OTP",
            PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp)
        );
        return res.json(
            new ApiResponse(
                200,
                admin,
                "OTP sent successfully for reset password to your email"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//verify reset password otp
const VerifyResetOtp = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
    try {
        const admin = await adminmodel.findOne({ email: email });
        if (!admin) {
            throw new ApiError(404, "admin not found");
        }
        if (
            !admin.resetPasswordOTPValidDate ||
            admin.resetPasswordOTPValidDate < new Date()
        ) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (admin.resetPasswordOTP !== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        return res.json(
            new ApiResponse(200, admin, "reset password otp verified")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//reset password
const UpdatePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;
    if (!newPassword) {
        throw new ApiError(400, "New password is required");
    }
    try {
        const admin = await adminmodel.findOne({ email: email });
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }
        admin.password = newPassword;
        await admin.save();
        const token = await admin.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        res.cookie("adminToken", token, cookieOptions).json(
            new ApiResponse(200, admin, "Password updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const GetAdmin = asyncHandler(async (req, res) => {
    const adminId = req.admin;
    try {
        const admin = await adminmodel.findById(adminId);
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }
        return res.json(
            new ApiResponse(200, admin, "Admin fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

const GetUsers = asyncHandler(async (req, res) => {
    try {
        const users = await usermodel.aggregate([
            {
                $lookup: {
                    from: "applicants",
                    localField: "_id",
                    foreignField: "userId",
                    as: "applicants",
                },
            },
            {
                $addFields: {
                    noOfappliedjobs: {
                        $size: "$applicants",
                    },
                },
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    phone: 1,
                    noOfappliedjobs: 1,
                },
            },
        ]);
        if (!users) {
            return res.json(new ApiResponse(200, "Users not found"));
        }
        return res.json(
            new ApiResponse(200, users, "Users fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const GetCompany = asyncHandler(async (req, res) => {
    try {
        const company = await companymodel.aggregate([
            {
                $lookup: {
                    from: "jobs",
                    localField: "_id",
                    foreignField: "company",
                    as: "jobs",
                },
            },
            {
                $addFields: {
                    NoOfjobs: { $size: "$jobs" },
                    NoOfactivejobs: {
                        $size: {
                            $filter: {
                                input: "$jobs",
                                as: "job",
                                cond: { $eq: ["$$job.status", "Active"] },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    companyName: 1,
                    email: 1,
                    phone: 1,
                    NoOfjobs: 1,
                    NoOfactivejobs: 1,
                },
            },
        ]);
        if (!company) {
            return res.json(new ApiResponse(200, "Company not found"));
        }

        return res.json(
            new ApiResponse(200, company, "Company fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//view user profile
const ViewUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.json(new ApiResponse(404, "User not found"));
        }
        const appliedJobs = await applicantmodel.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "job",
                },
            },
            {
                $unwind: "$job",
            },
            {
                $lookup: {
                    from: "companies",
                    localField: "job.company",
                    foreignField: "_id",
                    as: "company",
                },
            },
            {
                $unwind: "$company",
            },
            {
                $project: {
                    title: "$job.title",
                    description: "$job.description",
                    location: "$job.location",
                    district: "$job.district",
                    date: "$job.date",
                    shift: "$job.shift",
                    time: "$job.time",
                    salary: "$job.salary",
                    workersCount: "$job.workersCount",
                    workersNeeded: "$job.workersNeeded",
                    status: "$job.status",
                    companyId: "$company._id",
                    company: "$company.companyName",
                    companyprofile: "$company.profileImage",
                },
            },
        ]);
        return res.json(
            new ApiResponse(
                200,
                { user, appliedJobs },
                "User fetched successfully"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//view company profile
const ViewCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            return res.json(new ApiResponse(404, "Company not found"));
        }
        const jobs = await jobmodel.find({ company: companyId });
        if (!jobs) {
            throw new ApiError(404, "No posted jobs found");
        }
        const NoOfjobs = await jobs.length;
        const NoOfactivejobs = await jobs.filter(
            (job) => job.status === "Active"
        ).length;
        console.log("NoOfActive", NoOfactivejobs);
        console.log(NoOfjobs);

        return res.json(
            new ApiResponse(
                200,
                { company, NoOfactivejobs, NoOfjobs, jobs },
                "Company fetched successfully"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//delete user
const DeleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await usermodel.findByIdAndDelete(userId);
        if (!user) {
            return res.json(new ApiResponse(404, "User not found"));
        }
        const Email = await user.email;
        const applicant = await applicantmodel.find({ userId: userId });
        if (applicant.length > 0) {
            const jobIds = applicant.map((app) => app.jobId);
            console.log("jobs", jobIds);
            await jobmodel.updateMany(
                { _id: { $in: jobIds } },
                {
                    $inc: { workersNeeded: 1 },
                    $set: { status: "Active" },
                }
            );
        }
        await applicantmodel.deleteMany({ userId: userId });
        const userWishlist = await wishlistmodel.deleteMany({ userId: userId });
        const block = new blocklistmodel({
            blockedEmail: Email,
        });
        await block.save();
        console.log(userWishlist);
        return res.json(
            new ApiResponse(200, { user, block }, "User deleted successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//delete company
const DeleteCompany = asyncHandler(async (req, res) => {
    const { companyId } = req.params;
    try {
        const company = await companymodel.findByIdAndDelete(companyId);
        if (!company) {
            throw new ApiError(error.statusCode || 500, error.message);
        }
        const Email = company.email;
        const jobs = await jobmodel.find({ company: companyId });
        if (jobs.length > 0) {
            const jobIds = jobs.map((job) => job._id);
            await jobmodel.deleteMany({ company: companyId });
            await applicantmodel.deleteMany({ jobId: { $in: jobIds } });
            await wishlistmodel.deleteMany({ jobId: { $in: jobIds } });
        }
        const block = new blocklistmodel({
            blockedEmail: Email,
        });
        await block.save();

        return res.json(
            new ApiResponse(
                200,
                { company, block },
                "Company deleted successfully"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

const Logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure it's secure
            sameSite: "lax",
        });

        return res
            .status(200)
            .json(new ApiResponse(200, null, "Admin logged out"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

module.exports = {
    Register,
    Login,
    SendResetOtp,
    VerifyResetOtp,
    UpdatePassword,
    GetAdmin,
    GetUsers,
    GetCompany,
    ViewUser,
    ViewCompany,
    DeleteUser,
    DeleteCompany,
    Logout,
};
