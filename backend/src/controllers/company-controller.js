const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/Asynchandler.js");
const companymodel = require("../models/company.js");
const jobmodel = require("../models/jobs.js");
const applicantmodel = require("../models/applicants.js");
const wishlistmodel = require("../models/wishlist.js");
const blocklistmodel = require("../models/blocklist.js");
const crypto = require("crypto");
const fs = require("fs");
const sendMail = require("../utils/sendEmail.js");
const EMAIL_VERIFY_TEMPLATE = require("../utils/emailverifytemplate.js");
const PASSWORD_RESET_TEMPLATE = require("../utils/resetotp.js");
const cloudinary = require("../utils/cloudinary.js");
const extractPublicId = require("../utils/ExtractPublicId.js");
const { default: mongoose } = require("mongoose");

//company register
const CRegister = asyncHandler(async (req, res) => {
    const { companyName, email, password, address, phone } = req.body;

    if (!companyName || !email || !password || !address || !phone) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        //check if company blocked or not
        const blocked = await blocklistmodel.findOne({blockedEmail:email});
        if(blocked){
            throw new ApiError(403, 'Company is blocked');
        }
        //check if username already exists
        const ExistingC = await companymodel.findOne({
            $or: [{ companyName: companyName }, { email: email }],
        });

        if (ExistingC && ExistingC.isAccountVerified) {
            throw new ApiError(400, "Company already exists");
        }
        //check company verified or not verified
        let newcompany,token;
        if (ExistingC && !ExistingC.isAccountVerified) {
            newcompany = await companymodel.findOneAndUpdate(
                { _id: ExistingC._id },
                {
                companyName,
                email,
                address,
                phone,
                password,
            },
            { new: true, runValidators: true }
        );
        console.log("company",newcompany);

        
        }else{

            // create user
            newcompany = new companymodel({
                companyName: companyName,
                email: email,
                address: address,
                phone: phone,
                password: password,
            });
            await newcompany.save();
        }
        token = await newcompany.generateToken();
        

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.cookie("companyToken", token, cookieOptions).json(
            new ApiResponse(201, newcompany, "Company registered successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//company login
const CLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        //check if company blocked or not
        const blocked = await blocklistmodel.findOne({blockedEmail:email});
        if(blocked){
            throw new ApiError(403, 'Company is blocked');
        }
        const company = await companymodel.findOne({ email: email });

        if (!company) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        if (!company.isAccountVerified) {
            throw new ApiError(401, "Account is not verified");
        }
        const token = await company.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.cookie("companyToken", token, cookieOptions).json(
            new ApiResponse(200, company, "Company logged in successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//company content
const GetCompany = asyncHandler(async (req, res) => {
    const companyId = req.company;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        res.json(
            new ApiResponse(200, company, "Company retrieved successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//send otp to company email
const Sendotp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log(email);
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    try {
        const company = await companymodel.findOne({ email: email });
        if (!company) {
            throw new ApiError(404, "company not found");
        }
        if (company.isAccountVerified) {
            throw new ApiError(400, "Account is already verified");
        }
        const otp = crypto.randomInt(100000, 1000000);
        company.AccountVerificationOTP = otp;
        company.AccountVerificationOTPValidDate = new Date(
            Date.now() + 5 * 60 * 1000
        );
        await company.save();
        // send otp to email
        await sendMail(
            email,
            "Account Verification OTP",
            EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
                "{{email}}",
                email
            )
        );
        return res.json(new ApiResponse(200, company, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//verify otp
const Verifyemail = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const companyId = req.company;
    console.log(req.body);
    console.log(companyId);
    if (!companyId || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "company not found");
        }
        if (
            !company.AccountVerificationOTPValidDate ||
            company.AccountVerificationOTPValidDate < new Date()
        ) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (company.AccountVerificationOTP !== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        company.isAccountVerified = true;
        company.AccountVerificationOTP = null;
        company.AccountVerificationOTPValidDate = null;
        await company.save();
        return res.json(
            new ApiResponse(200, company, "Email verified successfully")
        );
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
        const company = await companymodel.findOne({ email: email });
        if (!company) {
            throw new ApiError(404, "company not found");
        }
        const otp = crypto.randomInt(100000, 1000000);
        company.resetPasswordOTP = otp;
        company.resetPasswordOTPValidDate = new Date(
            Date.now() + 5 * 60 * 1000
        );
        await company.save();
        // send otp to email
        await sendMail(
            email,
            "Reset Password OTP",
            PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp)
        );
        return res.json(
            new ApiResponse(
                200,
                company,
                "OTP sent successfully for reset password to your email"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//verify reset otp
const VerifyResetOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
    console.log(email);
    console.log(otp);
    try {
        const company = await companymodel.findOne({ email: email });
        if (!company) {
            throw new ApiError(404, "company not found");
        }
        if (
            !company.resetPasswordOTPValidDate ||
            company.resetPasswordOTPValidDate < new Date()
        ) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (company.resetPasswordOTP !== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        return res.json(
            new ApiResponse(200, company, "reset otp verified successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//update password
const UpdatePassword = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    if (!newPassword) {
        throw new ApiError(400, "New password is required");
    }
    try {
        const company = await companymodel.findOne({ email: email });
        company.password = newPassword;
        await company.save();

        const token = await company.generateToken();
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        res.cookie("companyToken", token, cookieOptions).json(
            new ApiResponse(
                200,
                company,
                "Password updated successfully and logged in successfully"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//post job
const PostJob = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        location,
        district,
        salary,
        date,
        startTime,
        endTime,
        workersCount,
    } = req.body;
    const companyId = req.company;
    console.log(req.body);
    if (
        !title ||
        !description ||
        !location ||
        !district ||
        !startTime ||
        !endTime ||
        !salary ||
        !date ||
        !workersCount
    ) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }

        const newJob = new jobmodel({
            company: companyId,
            title,
            description,
            location,
            district,
            salary,
            date,
            startTime,
            endTime,
            workersCount,
            workersNeeded: workersCount,
        });
        await newJob.save();
        return res.json(
            new ApiResponse(201, newJob, "Job posted successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const getJobById = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    try {
        const job = await jobmodel.findById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        return res.json(new ApiResponse(200, job, "Job details"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//get all posted jobs
const GetAllPostedJob = asyncHandler(async (req, res) => {
    const companyId = req.company;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        const jobs = await jobmodel.find({ company: companyId });
        if (!jobs) {
            throw new ApiError(404, "No posted jobs found");
        }
        const noOfJobs = await jobs.length;
        const noOfActiveJobs = await jobs.filter(
            (job) => job.status === "Active"
        ).length;

        //active jobs percentage
        const activeJobsPercentage =
            noOfJobs > 0 ? ((noOfActiveJobs / noOfJobs) * 100).toFixed(2) : 0;

        return res.json(
            new ApiResponse(
                200,
                { noOfActiveJobs, noOfJobs, activeJobsPercentage, jobs },
                "All posted jobs"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

// get applications (jobs)
const GetApplicationsJob = asyncHandler(async (req, res) => {
    const companyId = req.company;
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        const jobs = await jobmodel
            .find({ company: companyId })
            .populate("company");
        if (!jobs) {
            return res.json(new ApiResponse(200, null, "jobs not found"));
        }
        return res.json(new ApiResponse(200, jobs, "All posted jobs"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//get applicants
const GetApplicants = asyncHandler(async (req, res) => {
    const companyId = req.company;
    const { jobId } = req.params;

    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }

        const jobs = await jobmodel.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(jobId) }
            },
            {
                $lookup: {
                    from: "applicants",
                    localField: "_id",
                    foreignField: "jobId",
                    as: "applicants"
                }
            },
            {
                $addFields: {
                    applicantsCount: { $size: { $ifNull: ["$applicants", []] } }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "applicants.userId",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {
                $addFields: {
                    applicants: {
                        $map: {
                            input: "$applicants",
                            as: "applicant",
                            in: {
                               
                                
                                username: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.username"
                                    }
                                },
                                name: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.name"
                                    }
                                },
                                email: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.email"
                                    }
                                },
                                phone: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.phone"
                                    }
                                },
                                gender: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.gender"
                                    }
                                },
                                address: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.address"
                                    }
                                },
                                profileImage: {
                                    $let: {
                                        vars: {
                                            user: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$users",
                                                            as: "user",
                                                            cond: { $eq: ["$$user._id", "$$applicant.userId"] }
                                                        }
                                                    }, 0
                                                ]
                                            }
                                        },
                                        in: "$$user.profileImage"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    users: 0 // Exclude extra users array
                }
            },
            { $limit: 1 },
        ]);

        if (!jobs.length) {
            throw new ApiError(404, "Job not found");
        }

        return res.json(new ApiResponse(200, jobs[0], "Job Applicants"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});


//update profile and cover image
const updateProfileAndCover = asyncHandler(async (req, res) => {
    let profilepicpath = null;
    let coverpicpath = null;
    const companyId = req.company;
    console.log("company", companyId);
    if (!req.files) {
        throw new ApiError(400, "No file uploaded");
    }
    try {
        profilepicpath = req.files?.profileImage?.[0]?.path;
        coverpicpath = req.files?.coverImage?.[0]?.path;

        //company
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "User not found");
        }

        //extracting profile image
        const existingprofileImage = company.profileImage;
        const existingcoverImage = company.coverImage;

        //deleting old and updating profile and cover images
        if (profilepicpath) {
            if (existingprofileImage) {
                const publicId = extractPublicId(existingprofileImage);
                const response =
                    await cloudinary.deleteImageByPublicId(publicId);
                if (!response) {
                    throw new ApiError(500, "Failed to delete profile image");
                }
            }
            const profileresponse =
                await cloudinary.uploadImageToCloudinary(profilepicpath);
            company.profileImage = profileresponse.secure_url;
        }

        if (coverpicpath) {
            if (existingcoverImage) {
                const publicId = extractPublicId(existingcoverImage);
                const response =
                    await cloudinary.deleteImageByPublicId(publicId);
                if (!response) {
                    throw new ApiError(500, "Failed to delete cover image");
                }
            }
            const coverresponse =
                await cloudinary.uploadImageToCloudinary(coverpicpath);
            company.coverImage = coverresponse.secure_url;
        }
        await company.save();

        return res.json(
            new ApiResponse(200, company, "Profile and cover pic updated")
        );
    } catch (error) {
        if (profilepicpath && fs.existsSync(profilepicpath)) {
            fs.unlinkSync(profilepicpath); // delete the file after upload
        }
        if (coverpicpath && fs.existsSync(coverpicpath)) {
            fs.unlinkSync(coverpicpath); // delete the file after upload
        }
        throw new ApiError(error.statusCode, error.message);
    }
});

//delete profile image
const DeleteProfileImage = asyncHandler(async (req, res, next) => {
    try {
        const companyId = req.company;
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(error.statusCode, error.message);
        }
        const profileImage = company.profileImage;
        if (profileImage) {
            const publicId = await extractPublicId(profileImage);
            const response = await cloudinary.deleteImageByPublicId(publicId);
            if (!response) {
                throw new ApiError(error.statusCode, error.message);
            }
        }
        company.profileImage = null;
        await company.save();
        return res.json(new ApiResponse(200, company, "Profile image deleted"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//delete cover image
const DeleteCoverImage = asyncHandler(async (req, res, next) => {
    try {
        const companyId = req.company;
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(error.statusCode, error.message);
        }
        const coverImage = company.coverImage;
        if (coverImage) {
            const publicId = await extractPublicId(coverImage);
            const response = await cloudinary.deleteImageByPublicId(publicId);
            if (!response) {
                throw new ApiError(error.statusCode, error.message);
            }
        }
        company.coverImage = null;
        await company.save();
        return res.json(new ApiResponse(200, company, "Cover image deleted"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//logout
const Logout = asyncHandler(async (req, res) => {
    res.clearCookie("companyToken").json(
        new ApiResponse(200, null, "Company logged out successfully")
    );
});

//edit profile
const EditProfile = asyncHandler(async (req, res) => {
    const companyId = req.company;
    const { companyName,address, phone } = req.body;
    if (!companyId) {
        throw new ApiError(400, "Company id is required");
    }
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        const updatedCompany = await companymodel.findOneAndUpdate(
            { _id: companyId },
            {
                companyName: companyName || company.companyName,
                address: address,
                phone: phone,
            },
            { new: true }
        );

        if (!updatedCompany) {
            throw new ApiError(400, "Company cannot be updated");
        }

        res.json(
            new ApiResponse(
                200,
                updatedCompany,
                "Company retrieved successfully"
            )
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//edit job  (getting id as params)
const EditJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    console.log("req", jobId);
    const {
        title,
        description,
        location,
        district,
        salary,
        date,
        startTime,
        endTime,
        workersCount,
    } = req.body;
    if (!jobId) {
        throw new ApiError(400, "Job id is required");
    }
    try {
        const job = await jobmodel.findById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        const updatedJob = await jobmodel.findOneAndUpdate(
            { _id: jobId },
            {
                title: title,
                description: description,
                location: location,
                district: district,
                salary: salary,
                date: date,
                startTime: startTime,
                endTime: endTime,
                workersCount: workersCount,
            },
            { new: true }
        );
        if (!updatedJob) {
            throw new ApiError(400, "Job cannot be updated");
        }
        res.json(
            new ApiResponse(200, updatedJob, "Job updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//delete job (getting id as params)
const Deletejob = asyncHandler(async (req, res) => {
    const companyId = req.company;
    const { jobId } = req.params;
    if (!jobId) {
        throw new ApiError(400, "Job id is required");
    }
    try {
        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        const job = await jobmodel.findByIdAndDelete(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        await applicantmodel.deleteMany({ jobId: jobId });
        await wishlistmodel.deleteMany({ jobId: jobId });
        res.json(new ApiResponse(200, null, "Job deleted successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//check company name unique
const checkCompanynameUnique = asyncHandler(async (req, res) => {
    console.log(req.query)
    const companyName = req.query.companyName; // Accessing query parameter

    console.log(companyName);

    try {
        const company = await companymodel.findOne({
            companyName: companyName,
            isAccountVerified: true,
        });
        if (company) {
            return res.json(
                new ApiResponse(200, true, "companyname already taken")
            );
        }
        return res.json(new ApiResponse(200, true, "companyname available"));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

module.exports = {
    CRegister,
    GetCompany,
    GetAllPostedJob,
    GetApplicationsJob,
    GetApplicants,
    CLogin,
    Sendotp,
    Verifyemail,
    SendResetOtp,
    VerifyResetOtp,
    UpdatePassword,
    PostJob,
    updateProfileAndCover,
    DeleteCoverImage,
    DeleteProfileImage,
    Logout,
    EditProfile,
    EditJob,
    Deletejob,
    checkCompanynameUnique,
    getJobById,
};
