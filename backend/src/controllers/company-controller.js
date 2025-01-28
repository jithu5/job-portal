const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/Asynchandler.js");
const companymodel = require("../models/company.js");
const jobmodel = require("../models/jobs.js");
const crypto = require("crypto");
const sendMail = require("../utils/sendEmail.js");
const EMAIL_VERIFY_TEMPLATE = require("../utils/emailverifytemplate.js");
const PASSWORD_RESET_TEMPLATE = require("../utils/resetotp.js");

//company register
const CRegister = asyncHandler(async (req, res) => {
    const { companyName, email, password, address, phone } = req.body;

    if (!companyName || !email || !password || !address || !phone) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        //check if username already exists
        const ExistingC = await companymodel.findOne({
            $or: [{ companyName: companyName }, { email: email }],
        });

        if (ExistingC) {
            throw new ApiError(400, "User already exists");
        }

        // create user
        const newcompany = new companymodel({
            companyName: companyName,
            email: email,
            address: address,
            phone: phone,
            password: password,
        });
        await newcompany.save();

        const token = await newcompany.generateToken();

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
        const company = await companymodel.findOne({ email: email });

        if (!company) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid email or password");
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
    console.log(email)
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
const Verifyemail = asyncHandler(async (req, res) =>{
    const { otp } = req.body;
    const companyId = req.company;
    console.log(req.body)
    console.log(companyId)
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
const VerifyResetOtp = asyncHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
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
    if (!req.user) {
        throw new ApiError(401, "Not authorized");
    }
    if (!newPassword) {
        throw new ApiError(400, "New password is required");
    }
    try {
        const company = await companymodel.findOne({ email: email });
        company.password = newPassword;
        await company.save();
        return res.json(
            new ApiResponse(200, company, "Password updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//post job
const PostJob = asyncHandler(async (req, res) => {
    const { title, description, location, salary, date, workersCount } =
        req.body;
    const companyId = req.company;
    console.log(companyId);
    if (
        !title ||
        !description ||
        !location ||
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
            salary,
            date,
            workersCount,
        });
        await newJob.save();
        return res.json(
            new ApiResponse(201, newJob, "Job posted successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

module.exports = {
    CRegister,
    GetCompany,
    CLogin,
    Sendotp,
    Verifyemail,
    SendResetOtp,
    VerifyResetOtp,
    UpdatePassword,
    PostJob,
};
