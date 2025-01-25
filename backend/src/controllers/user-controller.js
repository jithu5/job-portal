const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/Asynchandler.js");
const usermodel = require("../models/usermodel.js");
const crypto = require('crypto');
const fs = require('fs');
const sendMail = require('../utils/sendEmail.js');
const EMAIL_VERIFY_TEMPLATE = require('../utils/emailverifytemplate.js');
const PASSWORD_RESET_TEMPLATE = require('../utils/resetotp.js');
const Tesseract = require('tesseract.js')


//homepage
const Homepage = asyncHandler(async (req, res) => {
    
})  

//user register
const UserRegister = asyncHandler(async (req, res) => {
    const { username, name, email, password, gender, address, phone, age } =
        req.body;
    console.log(req.body);
    console.log(req.file);
    
    
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
        //check if username already exists
        const ExistingUser = await usermodel.findOne({
            $or: [{ username: username }, { email: email }],
        });

        if (ExistingUser) {
            throw new ApiError(400, "User already exists");
        }

        //check id proof
        const {data: {text}} = await Tesseract.recognize(req.file.path,'eng');
        console.log(text);

        const target = ['usniversity','school','college',name];
        const containtarget = target.some(word => text.toLowerCase().includes(word));
        if(!containtarget){
            throw new ApiError(400, "invalid ID")
        }
        console.log("target: ", containtarget);

        //delete temparary id proof file
        try {
            await fs.unlinkSync(req.file.path);
        }catch(error){
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
        

        res.
        cookie("userToken",token,cookieOptions).json(
            new ApiResponse(201, newuser, "User registered successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

//user login
const UserLogin = asyncHandler(async (req, res, next) => {
    console.log("Login route hit"); // Debug log
    const { email, password } = req.body;
    
    if (!email ||!password) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials");
        }
        const token = await user.generateToken();
        
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };

        res.
        cookie("userToken", token, cookieOptions).json(
            new ApiResponse(200, user, "User logged in successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});



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

const Sendotp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("email",email);
    
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
        
        const otp = crypto.randomInt(1000,10000)
        user.AccountVerificationOTP = otp;
        user.AccountVerificationOTPValidDate = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        // send otp to email
        
        await sendMail(email, "Account Verification OTP", EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp));
        return res.json(new ApiResponse(200, user, "OTP sent successfully"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const Verifyemail = asyncHandler(async (req, res) =>{
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
    try {
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        if (!user.AccountVerificationOTPValidDate || user.AccountVerificationOTPValidDate < new Date()) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (user.AccountVerificationOTP!== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
        user.isAccountVerified = true;
        user.AccountVerificationOTP = null;
        user.AccountVerificationOTPValidDate = null;
        await user.save();
        return res.json(new ApiResponse(200, user, "Email verified successfully"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const SendResetOtp = asyncHandler(async(req,res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is required");
    }
    try {
        const user = await usermodel.findOne({email: email});
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const otp = crypto.randomInt(1000,10000);
        user.resetPasswordOTP = otp;
        user.resetPasswordOTPValidDate = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        // send otp to email
        await sendMail(email, "Reset Password OTP",PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp));
        return res.json(new ApiResponse(200, user, "OTP sent successfully for reset password to your email"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const VerifyResetOtp = asyncHandler(async(req, res, next)=>{
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new ApiError(400, "Email and OTP are required");
    }
    try {
        const user = await usermodel.findOne({email: email});
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        if (!user.resetPasswordOTPValidDate || user.resetPasswordOTPValidDate < new Date()) {
            throw new ApiError(400, "OTP expired or invalid");
        }
        if (user.resetPasswordOTP!== parseInt(otp)) {
            throw new ApiError(400, "Invalid OTP");
        }
       return res.json(new ApiResponse(200, user, "reset password otp verified"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
})

const UpdatePassword = asyncHandler(async(req, res) => {
    const { email,newPassword } = req.body;
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
        return res.json(new ApiResponse(200, user, "Password updated successfully"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});

const uploadProfilePic = asyncHandler(async(req, res) => {
    const userId = req.user;
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }
    const { filename } = req.file;
    try {
        const user = await usermodel.findByIdAndUpdate(userId, { profilePic: filename }, { new: true });
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return res.json(new ApiResponse(200, user, "Profile picture updated successfully"));
        
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
});



module.exports = {
    UserRegister,
    GetUser,
    UserLogin,
    Sendotp,
    Verifyemail,
    SendResetOtp,
    VerifyResetOtp,
    UpdatePassword,
    uploadProfilePic,
};
