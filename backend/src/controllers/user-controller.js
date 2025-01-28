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
const cloudinary = require('../utils/cloudinary.js');


//homepage
const Homepage = asyncHandler(async (req, res) => {
    
})  

//user register
const UserRegister = asyncHandler(async (req, res) => {
    const { username, name, email, password, gender, address, phone, dob } =
        req.body;
    console.log(req.body);
    console.log(req.file);
    const calculateage = async(dob) => {
        const dobDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();
        if (age >= 18 ){
            return age;
        }
        else{
            throw new ApiError(400, "Age should be 18 or above");
        }
    }
    const age = await calculateage(dob);

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

        const target = ['university','school','college',name];
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
        
        try {
            await fs.unlinkSync(req.file.path);
        }catch(error){
            console.error("Error deleting temporary file:", error);
        }
        throw new ApiError(error.statusCode, error.message);
    }
});

//user login
const UserLogin = asyncHandler(async (req, res) => {
    console.log("Login route hit"); // Debug log
    const { email, password } = req.body;
    
    if (!email ||!password) {
        throw new ApiError(400, "All fields are required");
    }
    try {
        const users = await usermodel.find({})
        console.log(users);
        console.log(email, password);
        const user = await usermodel.findOne({ email });
        console.log(user);
        if (!user) {
            throw new ApiError(401, "Invalid credentials v");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError(401, "Invalid credentials s");
        }
        const token = await user.generateToken();
        
        const cookieOptions = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        };
        console.log("user",user);
        
        res.
        cookie("userToken", token, cookieOptions).json(
            new ApiResponse(200, user, "User logged in successfully")
        );
    } catch (error) {
        console.log(error)
        throw new ApiError(error.statusCode, error.message);
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

//send otp
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

//verify email using otp
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

//send reset password otp 
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

//verify reset password otp
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

//reset password
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

//upload profile picture(pending... cloudinary)
const uploadProfilePic = asyncHandler(async(req, res) => {
    const userId = req.user;
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }
    try {
        const profilepicpath = require.file.path;
        const response = await cloudinary.uploadProfilePic(profilepicpath);
        const user = await usermodel.findByIdAndUpdate(userId, { profileImage: response.secure_url }, { new: true });
        return res.json(ApiResponse(200, user,"profile pic updated"));
    } catch (error) {
        if(fs.existsSync(profilepicpath)){
            fs.unlinkSync(profilepicpath); // delete the file after upload
        }
        console.log("some error occurred while uploading profile");
    }
});

const uploadCoverPic = asyncHandler(async(req, res) => {
    const userId = req.user;
    if (!req.file) {
        throw new ApiError(400, "No file uploaded");
    }
    try {
        const coverpicpath = require.file.path;
        const response = await cloudinary.uploadCoverPic(coverpicpath);
        const user = await usermodel.findByIdAndUpdate(userId, { coverImage: response.secure_url }, { new: true });
        return res.json(ApiResponse(200, user,"profile pic updated"));
    } catch (error) {
        if(fs.existsSync(coverpicpath)){
            fs.unlinkSync(coverpicpath); // delete the file after upload
        }
        console.log("some error occurred while uploading profile");
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
    Homepage,
    uploadCoverPic,
};
