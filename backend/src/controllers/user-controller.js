const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const mongoose = require("mongoose");
const asyncHandler = require("../utils/Asynchandler.js");
const usermodel = require("../models/usermodel.js");
const applicantmodel = require("../models/applicants.js");
const companymodel = require("../models/company.js");
const jobmodel = require("../models/jobs.js");
const wishlistmodel = require("../models/wishlist.js");
const blocklistmodel = require("../models/blocklist.js");
const crypto = require("crypto");
const fs = require("fs");
const sendMail = require("../utils/sendEmail.js");
const EMAIL_VERIFY_TEMPLATE = require("../utils/emailverifytemplate.js");
const PASSWORD_RESET_TEMPLATE = require("../utils/resetotp.js");
const Tesseract = require("tesseract.js");
const Fuse = require("fuse.js");
const cloudinary = require("../utils/cloudinary.js");
const extractPublicId = require("../utils/ExtractPublicId.js");
const { pipeline } = require("stream");
const { error } = require("console");


//user register
const UserRegister = asyncHandler(async (req, res) => {
    const { username, name, email, password, gender, address, phone, dob } =
        req.body;
    console.log(req.body);
    console.log(req.file);
    const calculateage = async (dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age >= 18) {
            return age;
        } else {
            throw new ApiError(400, "Age should be 18 or above");
        }
    };
    const age = await calculateage(dob);
    console.log("age",age);
    if (
        !username ||
        !name ||
        !email ||
        !password ||
        !gender ||
        !address ||
        !phone ||
        !age ||
        !req.file
    ) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        //check the user blocked or not 
        const blocked = await blocklistmodel.findOne({blockedEmail:email});
        if(blocked){
            throw new ApiError(403, 'User is blocked');
        }
        //check if username already exists
        const ExistingUser = await usermodel.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (ExistingUser && ExistingUser.isAccountVerified) {
            throw new ApiError(400, "User already exists");
        }
        //check user verified or not
        if (ExistingUser && !ExistingUser.isAccountVerified) {
            const user = await ExistingUser.updateOne({
                username: username,
                name: name,
                email: email,
                gender: gender,
                address: address,
                phone: phone,
                age: age,
                password: password,
        });
        await user.save();

        }


        //check id proof
        const {
            data: { text },
        } = await Tesseract.recognize(req.file.path, "eng",{
            tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. ",
            psm: 6,
        });
        console.log(text);

        const normalizedText = text.replace(/[^a-zA-Z0-9. ]/g, "").trim().toLowerCase();
        const normalizedName = name.replace(/[^a-zA-Z0-9. ]/g, "").trim().toLowerCase();

        function looseMatch(text, name) {
            return text.replace(/\s+/g, "").includes(name.replace(/\s+/g, ""));
        }
        
        const directMatch = looseMatch(normalizedText, normalizedName);
        console.log("Loose Match Found:", directMatch);

        const target = ["university", "school", "college", "student"];
        const fuse = new Fuse(target, { includeScore: true, threshold: 0.5 });
        const results = fuse.search(normalizedText);
        const containtarget = results.length > 0;
        
        console.log("Extracted Text:", text);
        console.log("Normalized Text:", normalizedText);
        console.log("Normalized Name:", normalizedName);
        console.log("Target Found:", containtarget);
        console.log("Fuzzy Search Results:", results);

        if (!containtarget && !directMatch) {
            throw new ApiError(400, "invalid ID");
        }

        //delete temparary id proof file
        try {
            await fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error("Error deleting temporary file:", error);
        }

        // create user
        const newuser = new usermodel({
            username: username,
            name: name,
            email: email,
            gender: gender,
            address: address,
            phone: phone,
            age: age,
            password: password,
        });
        await newuser.save();

        const token = await newuser.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.cookie("userToken", token, cookieOptions).json(
            new ApiResponse(201, newuser, "User registered successfully")
        );
    } catch (error) {
        try {
            await fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error("Error deleting temporary file:", error);
        }
        throw new ApiError(error.statusCode, error.message);
    }
});

//user login
const UserLogin = asyncHandler(async (req, res) => {
    console.log("Login route hit"); // Debug log
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        
        console.log(email, password);
        const user = await usermodel.findOne({ email });
        console.log(user);
        if (!user || !user.isAccountVerified) {
            throw new ApiError(401, "user not found or not verified");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
        }
        const token = await user.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        console.log("user", user);

        res.cookie("userToken", token, cookieOptions).json(
            new ApiResponse(200, user, "User logged in successfully")
        );
        console.log("after successful login");
    } catch (error) {
          console.error("Login error:", {
              statusCode: error.statusCode || 500,
              errors: error.errors || [],
              data: error.data || null,
              success: false,
              message: error.message || "Error in login",
          });
         throw new ApiError(error.statusCode,error.message);
    }
});

//usercontent
const GetUser = asyncHandler(async (req, res) => {
    const userId = req.user;
    try {
        const user = await usermodel.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.json(new ApiResponse(200, user, "User fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//get all jobs
const GetJobs = asyncHandler(async (req, res) => {
    try {
        const userId =  new mongoose.Types.ObjectId(req.user);
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHours}:${currentMinutes}`;
        const Alljobs = await jobmodel.aggregate([ 
            {
                $match: {
                     $or: [
                        {date: {$gt:today}},
                        {
                            $and: [
                                {date:{$eq:today}},
                                {startTime:{$gt:currentTime}}, 
                            ]
                        }
                     ]
                }
            },       
            {   
                $lookup : {
                    from : "companies",
                    localField : "company",
                    foreignField : "_id",
                    as : "companydetails"
                }, 
            },
            {
                $unwind : "$companydetails",
                
            },
            {
                $lookup : {
                    from : "applicants",
                    let : {jobId : "$_id", userId :userId},
                    pipeline : [{
                        $match : { $expr :{
                            $and : [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        } 
                    },
                    {$limit : 1}
                ],
                as : "applied"
                }
            },
            {
                $lookup : {
                    from : "wishlists",
                    let : {jobId : "$_id", userId : userId},
                    pipeline : [{
                        $match : { $expr : {
                            $and: [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        }
                    },
                    {$limit : 1}
                ],
                as : "wishlisted"
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    location: 1,
                    district: 1,
                    date: 1,
                    shift: 1,
                    startTime: 1,
                    endTime: 1,
                    salary: 1,
                    workersCount: 1,
                    workersNeeded: 1,
                    status: 1,
                    companyId: "$companydetails._id",
                    company: "$companydetails.companyName",
                    companyprofile : "$companydetails.profileImage",
                    isApplied: {$gt: [{ $size: "$applied"},0]},
                    isWishlisted: {$gt: [{ $size: "$wishlisted"},0]},
                },
            }
        ])

        if (!Alljobs) {
            throw new ApiError(404, "Job not found");
        }
        res.json(new ApiResponse(200,Alljobs, "Jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//get first 6 jobs
const sortJobs = asyncHandler(async (req, res) => {
    try {
        const userId =  new mongoose.Types.ObjectId(req.user);
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHours}:${currentMinutes}`;
        const jobs = await jobmodel.aggregate([
            {
                $match: {
                     $or: [
                        {date: {$gt:today}},
                        {
                            $and: [
                                {date:{$eq:today}},
                                {startTime:{$gt:currentTime}}, 
                            ]
                        }
                     ]
                }
            },           
            {   
                $lookup : {
                    from : "companies",
                    localField : "company",
                    foreignField : "_id",
                    as : "companydetails"
                }, 
            },
            {
                $unwind: {
                    path: "$companydetails",
                    preserveNullAndEmptyArrays: true // Prevents jobs without companies from being removed
                } 
            },
            {
                $lookup : {
                    from : "applicants",
                    let : {jobId : "$_id", userId :userId},
                    pipeline : [{
                        $match : { $expr :{
                            $and : [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        } 
                    },
                    {$limit : 1}
                ],
                as : "applied"
                }
            },
            {
                $lookup : {
                    from : "wishlists",
                    let : {jobId : "$_id", userId : userId},
                    pipeline : [{
                        $match : { $expr : {
                            $and: [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        }
                    },
                    {$limit : 1}
                ],
                as : "wishlisted"
                }
            },
            {
                $match: {
                    "applied" :{ $size:0 },
                }
            },
            {
                $sort : { createdAt: -1 }
            },
            {
                $limit : 6
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    location: 1,
                    district: 1,
                    date: 1,
                    shift: 1,
                    startTime: 1,
                    endTime: 1,
                    salary: 1,
                    workersCount: 1,
                    workersNeeded: 1,
                    status: 1,
                    companyId: "$companydetails._id",
                    company: "$companydetails.companyName",
                    companyprofile : "$companydetails.profileImage",
                    isApplied: {$gt: [{ $size: "$applied"},0]},
                    isWishlisted: {$gt: [{ $size: "$wishlisted"},0]},
                },
            }
        ]);
        console.log(jobs);
        if (jobs.length === 0) {
            return res.json(new ApiResponse(200, null, "Jobs not found"));
        }
        res.json(new ApiResponse(200, jobs, "First 6 jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//get job id
const GetJobById = asyncHandler(async (req, res) => {
    try {
        const userId =  new mongoose.Types.ObjectId(req.user);
        const {jobId} = req.params;
        const job = await jobmodel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(jobId)
                },
            },
            { 
                    $lookup : {
                        from : "companies",
                        localField : "company",
                        foreignField : "_id",
                        as : "companydetails"
                    }, 
                },
                {
                    $unwind : "$companydetails",
                    
                },
                {
                    $lookup : {
                        from : "applicants",
                        let : {jobId : "$_id", userId :userId},
                        pipeline : [{
                            $match : { $expr :{
                                $and : [
                                { $eq : ["$jobId", "$$jobId"] },
                                { $eq : ["$userId", "$$userId"]},
                            ] },
                            } 
                        },
                        {$limit : 1}
                    ],
                    as : "applied"
                    }
                },
                {
                    $lookup : {
                        from : "wishlists",
                        let : {jobId : "$_id", userId : userId},
                        pipeline : [{
                            $match : { $expr : {
                                $and: [
                                { $eq : ["$jobId", "$$jobId"] },
                                { $eq : ["$userId", "$$userId"]},
                            ] },
                            }
                        },
                        {$limit : 1}
                    ],
                    as : "wishlisted"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        location: 1,
                        district: 1,
                        date: 1,
                        shift: 1,
                        startTime: 1,
                        endTime: 1,
                        salary: 1,
                        workersCount: 1,
                        workersNeeded: 1,
                        status: 1,
                        companyId: "$companydetails._id",
                        company: "$companydetails.companyName",
                        companyprofile : "$companydetails.profileImage",
                        isApplied: {$gt: [{ $size: "$applied"},0]},
                        isWishlisted: {$gt: [{ $size: "$wishlisted"},0]},
                    },
                }
            
        ]);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        console.log("job detail with params ",job[0])
        return res.json(new ApiResponse(200, job[0], "Job fetched successfully"));

    } catch (error) {
        throw new ApiError(error.statusCode,error.message)
    }
});

//get applied jobs
const AppliedJobs = asyncHandler(async (req, res) => {
   try{ 
    const userId = req.user;
    const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHours}:${currentMinutes}`;
    const application = await applicantmodel.findOne({userId: userId});
    console.log("Application", application);
    
    if (!application) {
        return res.json(new ApiResponse(200,null,"No Applied Jobs found"));
    };

    const jobdetails = await applicantmodel.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "jobs",
                localField: "jobId",
                foreignField: "_id",
                as: "jobdetails",
            },
        },
        {
            $unwind: "$jobdetails",
        },
        {
            $lookup: {
                from: "companies",
                localField: "jobdetails.company",
                foreignField: "_id",
                as: "companydetails",
            },
        },
        {
            $unwind: "$companydetails",
        },
        {
            $addFields: {
                isjobPending:{
                    $or: [
                        {$gt: ["$jobdetails.date" , today]},
                        {
                            $and:[
                                {$eq: ["$jobdetails.date" , today]},
                                {$eq: ["$jobdetails.time" , currentTime]},
                            ]
                        }
                    ]

                }
            }
        },
        {
            $project: {
                _id: "$jobdetails._id",
                title: "$jobdetails.title",
                description: "$jobdetails.description",
                location: "$jobdetails.location",
                district: "$jobdetails.district",
                date: "$jobdetails.date",
                shift: "$jobdetails.shift",
                startTime: "$jobdetails.startTime",
                endTime: "$jobdetails.endTime",
                salary: "$jobdetails.salary",
                workersCount: "$jobdetails.workersCount",
                workersNeeded: "$jobdetails.workersNeeded",
                status: "$jobdetails.status",
                companyId: "$companydetails._id",
                company: "$companydetails.companyName",
                companyprofile: "$companydetails.profileImage",
                isjobPending: 1,
            },
        },
    ]);
    console.log("jobdetails", jobdetails);
    if(!jobdetails){
        throw new ApiError(404,"No applied jobs found")
    }
    
    return res.json(new ApiResponse(200, jobdetails, "applied jobs"))
} catch(error){
        throw new ApiError(error.statusCode,error.message);
    }
});

//send otp
const Sendotp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("email", email);

    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (user.isAccountVerified) {
            throw new ApiError(400, "Account is already verified");
        }

        const otp = crypto.randomInt(100000, 1000000);
        user.AccountVerificationOTP = otp;
        user.AccountVerificationOTPValidDate = new Date(
            Date.now() + 5 * 60 * 1000
        );
        await user.save();
        // send otp to email

        await sendMail(
            email,
            "Account Verification OTP",
            EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp)
        );
        return res.json(new ApiResponse(200, user, "OTP sent successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//verify email using otp
const Verifyemail = asyncHandler(async (req, res) => {
    const { otp } = req.body;
    const userId = req.user;
    console.log(req.body);
    console.log(otp, userId);
    if (!userId || !otp) {
        throw new ApiError(400, "userId and OTP are required");
    }
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        if (
            !user.AccountVerificationOTPValidDate ||
            user.AccountVerificationOTPValidDate < new Date()
        ) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        console.log("in db", user.AccountVerificationOTP);
        console.log(otp);
        if (user.AccountVerificationOTP !== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        user.isAccountVerified = true;
        user.AccountVerificationOTP = null;
        user.AccountVerificationOTPValidDate = null;
        await user.save();
        return res.json(
            new ApiResponse(200, user, "Email verified successfully")
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
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const otp = crypto.randomInt(100000, 1000000);
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPValidDate = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        // send otp to email
        await sendMail(
            email,
            "Reset Password OTP",
            PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp)
        );
        return res.json(
            new ApiResponse(
                200,
                user,
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
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        if (
            !user.resetPasswordOTPValidDate ||
            user.resetPasswordOTPValidDate < new Date()
        ) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (user.resetPasswordOTP !== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        return res.json(
            new ApiResponse(200, user, "reset password otp verified")
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
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        user.password = newPassword;
        await user.save();
        const token = await user.generateToken();

        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        res.cookie("userToken", token, cookieOptions).json(
            new ApiResponse(200, user, "Password updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//update profile and cover image
const updateProfileAndCover = asyncHandler(async (req, res) => {
    let profilepicpath = null;
    let coverpicpath = null;
    const userId = req.user;
    console.log("user", userId);
    if (!req.files) {
        throw new ApiError(400, "No file uploaded");
    }
    try {
        profilepicpath = req.files?.profileImage?.[0]?.path;
        coverpicpath = req.files?.coverImage?.[0]?.path;

        //user
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        //extracting profile image
        const existingprofileImage = user.profileImage;
        const existingcoverImage = user.coverImage;

        //deleting old and update profile and cover images
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
            user.profileImage = profileresponse.secure_url;
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
            user.coverImage = coverresponse.secure_url;
        }
        await user.save();

        return res.json(
            new ApiResponse(200, user, "Profile and cover pic updated")
        );
    } catch (error) {
        console.log(error)
        if (profilepicpath && fs.existsSync(profilepicpath)) {
            fs.unlinkSync(profilepicpath); // delete the file after upload
        }
        if (coverpicpath && fs.existsSync(coverpicpath)) {
            fs.unlinkSync(coverpicpath); // delete the file after upload
        }
        throw new ApiError(error.statusCode, error.message);
    }
});

//delete profile or cover Image
const DeleteProfileImage = asyncHandler(async(req, res, next)=>{
    try{
        const userId = req.user;
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(error.statusCode, error.message);
        }
        const profileImage = user.profileImage;
        if (profileImage) {
            const publicId = await extractPublicId(profileImage);
            const response = await cloudinary.deleteImageByPublicId(publicId);
            if(!response){
                throw new ApiError(error.statusCode,error.message)
            }
        }
        user.profileImage = null;
        await user.save();
        return res.json(
            new ApiResponse(200, user, "Profile image deleted")
        );
    }catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }; 
})

//delete cover Image
const DeleteCoverImage = asyncHandler(async(req, res, next)=>{
    try{
        const userId = req.user;
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(error.statusCode, error.message);
        }
        const coverImage = user.coverImage;
        if (coverImage) {
            const publicId = await extractPublicId(coverImage);
            const response = await cloudinary.deleteImageByPublicId(publicId);
            if(!response){
                throw new ApiError(error.statusCode,error.message)
            }
        }
        user.coverImage = null;
        await user.save();
        return res.json(
            new ApiResponse(200, user, "Cover image deleted")
        );
    }catch(error){
        throw new ApiError(error.statusCode, error.message);
    }
})

// logout
const Logout = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("userToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure it's secure
            sameSite: "lax",
        });

        return res
            .status(200)
            .json(new ApiResponse(200, null, "User logged out"));
    } catch (error) {
        throw new ApiError(error.statusCode || 500, error.message);
    }
});

//edit profile
const EditProfile = asyncHandler(async (req, res) => {
    const userId = req.user;
    const { name, address, phone} = req.body;
    console.log(name, address, phone);

    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        const updatedUser = await usermodel.findOneAndUpdate(
            {
                _id: userId,
            },
            {
                name: name || user.name,
                address: address || user.address,
                phone: phone || user.phone,
            },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            throw new ApiError(400, "Failed to update profile");
        }

        return res.json(
            new ApiResponse(200, updatedUser, "Profile updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//apply job
const ApplyJob = asyncHandler(async (req, res) => {
    const userId = req.user;
    console.log(req.params)
    const {jobId} = req.params;
    console.log(jobId)
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const job = await jobmodel.findById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        console.log(job)
        const applicant = await applicantmodel.findOne({
            userId: userId,
            jobId: jobId,
        });
        console.log(applicant)
        if (applicant) {
            throw new ApiError(400, "You have already applied for this job");
        }

        const workersNeeded = await job.workersNeeded;
        if (job.status === "Closed") {

            throw new ApiError(
                400,
                "This job is full. Please try another job or check back later."
            );
        }   else if (workersNeeded > 0) {
            await job.workersNeeded--;
            if (job.workersNeeded === 0) {
                job.status = "Closed";
            }
            await job.save();
        }


        const newApplicant = new applicantmodel({
            userId: userId,
            jobId: jobId,
        });
        await newApplicant.save();
        console.log(newApplicant)
        return res.json(
            new ApiResponse(200, newApplicant, "Job applied successfully")
        );
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//cancel job
const Canceljob = asyncHandler(async (req, res) => {
    const userId = req.user;
    const {jobId} = req.params;
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const job = await jobmodel.findById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        const applicant = await applicantmodel.findOne({
            userId: userId,
            jobId: jobId,
        });
        if (!applicant) {
            throw new ApiError(400, "You haven't applied for this job");
        }
        await applicant.deleteOne();
        await job.workersNeeded++;
        if (job.status === "Closed") {
            job.status = "Active";
        }
        await job.save();

        return res.json(
            new ApiResponse(200, null, "Job cancellation successful")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//check username unique
const checkUsernameUnique = asyncHandler(async(req,res)=>{
    const username = req.query.username; // Accessing query parameter

    console.log(username)

    try {
        const user = await usermodel.findOne({
            username: username,isAccountVerified:true
        })
        if(user){
            return res.json(new ApiResponse(200, true, "Username already taken"));
        }
        return res.json(new ApiResponse(200, true, "Username available"));
    } catch (error) {
        throw new ApiError(500,error?.message)
    }
})

//add job to wish list
const AddToWishlist = asyncHandler(async(req,res)=>{
    const userId = req.user;
    const {jobId} = req.params;
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const job = await jobmodel.findById(jobId);
        if (!job) {
            throw new ApiError(404, "Job not found");
        }
        const wishlist = await wishlistmodel.findOne({
            userId: userId,
            jobId: jobId,
        });
        if (wishlist) {
            throw new ApiError(400, "You have already added this job to your wishlist");
        }
        const newWishlist = new wishlistmodel({
            userId: userId,
            jobId: jobId,
        });
        await newWishlist.save();
        return res.json(
            new ApiResponse(200, newWishlist, "Job added to wishlist successfully")
        );
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//view jobs in wishlist
const GetWishlistJobs = asyncHandler(async(req,res)=>{
    const userId = req.user;
    try {
        const wishlist = await wishlistmodel.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "jobs",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "wishlist",
                },
            },
            {
                $unwind: "$wishlist",
            },
            {
                $lookup : {
                    from : "companies",
                    localField : "wishlist.company",
                    foreignField : "_id",
                    as : "companydetails"
                }
            },
            {
                $unwind : "$companydetails"
            },
            {
                $project: {
                    _id: "$wishlist._id",
                    title: "$wishlist.title",
                    description: "$wishlist.description",
                    location: "$wishlist.location",
                    district: "$wishlist.district",
                    date: "$wishlist.date",
                    shift: "$wishlist.shift",
                    startTime: "$wishlist.startTime",
                    endTime: "$wishlist.endTime",
                    salary: "$wishlist.salary",
                    workersCount: "$wishlist.workersCount",
                    workersNeeded: "$wishlist.workersNeeded",
                    status: "$wishlist.status",
                    companyId: "$companydetails._id",
                    company: "$companydetails.companyName",
                    companyprofile : "$companydetails.profileImage"
                },
            },
        ])
        if (!wishlist) {
            throw new ApiError(404, "No wishlist found");
        }
        return res.json(
            new ApiResponse(200, wishlist, "Wishlist fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//remove jobs from wishlist
const RemoveWishlist = asyncHandler(async(req,res)=>{
    const userId = req.user;
    const {jobId} = req.params;
    try {
        const user = await usermodel.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const wishlist = await wishlistmodel.findOneAndDelete({
            userId: userId,
            jobId: jobId,
        });
        if (!wishlist) {
            throw new ApiError(404, "Wishlist not found or job not in wishlist");
        }
        return res.json(
            new ApiResponse(200, null, "Job removed from wishlist successfully")
        );
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//view company
const ViewCompany = asyncHandler(async(req,res)=>{
    const {companyId} = req.params;
    const {userId} = new mongoose.Types.ObjectId(req.user);
    try {
        const now = new Date();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentHours = now.getHours().toString().padStart(2, '0');
        const currentMinutes = now.getMinutes().toString().padStart(2, '0');
        const currentTime = `${currentHours}:${currentMinutes}`;

        const company = await companymodel.findById(companyId);
        if (!company) {
            throw new ApiError(404, "Company not found");
        }
        const jobs = await jobmodel.aggregate([
            {
                $match:{company : new mongoose.Types.ObjectId(companyId)},
            },
            {   
                $lookup : {
                    from : "companies",
                    localField : "company",
                    foreignField : "_id",
                    as : "companydetails"
                }, 
            },
            {
                $unwind : "$companydetails",
                
            },
            {
                $lookup : {
                    from : "applicants",
                    let : {jobId : "$_id", userId : userId},
                    pipeline : [{
                        $match : { $expr :{
                            $and : [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        } 
                    },
                    {$limit : 1}
                ],
                as : "applied"
                }
            },
            {
                $lookup : {
                    from : "wishlists",
                    let : {jobId : "$_id", userId : userId},
                    pipeline : [{
                        $match : { $expr : {
                            $and: [
                            { $eq : ["$jobId", "$$jobId"] },
                            { $eq : ["$userId", "$$userId"]},
                        ] },
                        }
                    },
                    {$limit : 1}
                ],
                as : "wishlisted"
                }
            },
            {
                $addFields: {
                    isAvailable:{
                        $or: [
                            {$gt: ["$date" , today]},
                            {
                                $and:[
                                    {$eq: ["$date" , today]},
                                    {$eq: ["$time" , currentTime]},
                                ]
                            }
                        ]

                    }
                }
            },
            {
                $project:{
                    _id: 1,
                    title: 1,
                    description: 1,
                    location: 1,
                    district: 1,
                    date: 1,
                    shift: 1,
                    startTime: 1,
                    endTime: 1,
                    salary: 1,
                    workersCount: 1,
                    workersNeeded: 1,
                    status: 1,
                    companyId: "$companydetails._id",
                    company: "$companydetails.companyName",
                    companyprofile : "$companydetails.profileImage",
                    isApplied: {$gt: [{ $size: "$applied"},0]},
                    isWishlisted: {$gt: [{ $size: "$wishlisted"},0]},
                    isAvailable: 1,
                }
            }
        ]);
        if (!jobs || jobs.length === 0) {
            throw new ApiError(404, "No posted jobs found");
        }
        const noOfJobs = await jobs.length;
        const noOfActiveJobs = await jobs.filter(job => job.status === "Active").length;
        
        return res.json(new ApiResponse(200,{company,noOfActiveJobs,noOfJobs, jobs},"Company Profile"));
       
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
})


module.exports = {
    UserRegister,
    GetUser,
    GetJobs,
    sortJobs,
    GetJobById,
    UserLogin,
    Sendotp,
    Verifyemail,
    SendResetOtp,
    VerifyResetOtp,
    UpdatePassword,
    updateProfileAndCover,
    DeleteProfileImage,
    DeleteCoverImage,
    Logout,
    EditProfile,
    ApplyJob,
    Canceljob,
    checkUsernameUnique,
    AppliedJobs,
    AddToWishlist,
    GetWishlistJobs,
    RemoveWishlist,
    ViewCompany,
};
