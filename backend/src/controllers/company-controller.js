const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');
const asyncHandler = require('../utils/Asynchandler.js');
const companymodel = require('../models/company.js');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(async(usernameOrEmail,password,done)=>{
    console.log("Username",usernameOrEmail);
    console.log("password",password);
    try {
        const company = await companymodel.findOne({
            $or:[{Cname: usernameOrEmail},{email: usernameOrEmail}] 
        });
        if (!company) {
            return done(null,false,{message: "Invalid username"});
        }
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            return done(null,false,{message: "Invalid password"});
        }
        return done(null,company);
    } catch (error) {
        return done(error);
    }
}))

passport.serializeUser((company,done)=>{
    done(null,company.id);
})

passport.deserializeUser(async(id,done)=>{
    try {
        const company = await companymodel.findById(id);
        done(null,company);
          
    } catch (error) {
        done(error);   
    }
})

//company register
const CRegister = asyncHandler(async(req,res)=>{
    
    const {cname,email,password,address,phone} = req.body;
    

    if (!cname || !email || !password || !address || !phone) {
        throw new ApiError(400,"All fields are required")
    }
    try {
        //check if username already exists
        const ExistingC = await companymodel.findOne({
            $or:[{Cname: cname},{email: email}]
        })
        console.log("Exist",ExistingC);
        
        if (ExistingC) {
            throw new ApiError(400 , "User already exists");
        }

        // create user 
        const newcompany= new companymodel({
            Cname: cname,
            email: email,
            address: address,
            phone: phone,
            password: password
        })
        newcompany.save();
        // save user in session
        req.session.user = {
            id: newcompany._id,
            username: newcompany.cname,
            email: newcompany.email
        }

        res.status(201).json(new ApiResponse(201,newcompany,"User registered successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})

//user login
const CLogin = asyncHandler(async(req, res, next) => {
    passport.authenticate('local',(err, company,info) => {
        console.log("company",company);
        
        if (err) {
            throw new ApiError(500, "Internal server error");
        }
        if (!company) {
            throw new ApiError(400, "Invalid credentials");
        }
        req.logIn(company, (err) => {
            if (err) {
                throw new ApiError(500, "Internal server error");
            }
            return res.status(200).json(new ApiResponse(200, company, "User logged in successfully"));
        });
    })(req, res, next);
})

const GetUser = asyncHandler( async(req, res) => {
    // code
})

module.exports = {
    CRegister,
    GetUser,
    CLogin,
}