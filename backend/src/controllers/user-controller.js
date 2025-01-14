const ApiResponse = require('../utils/ApiResponse.js');
const ApiError = require('../utils/ApiError.js');
const asyncHandler = require('../utils/Asynchandler.js');
const usermodel = require('../models/usermodel.js');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(async(username,password,done)=>{
    try {
        const user = await usermodel.findOne({username: username});
        if (!user) {
            return done(null,false,{message: "Invalid username"});
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return done(null,false,{message: "Invalid password"});
        }
        return done(null,user);
    } catch (error) {
        return done(error);
    }
}))

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    usermodel.findById(id,(err,user)=>{
        done(err,user);
    })
})

const UserRegister = asyncHandler(async(req,res)=>{
    console.log(req.body);
    
    const {username,name,email,password,gender,address,phone,age} = req.body;

    if (!username || !name || !email || !password || !gender || !address || !phone || !age) {
        throw new ApiError(400,"All fields are required")
    }
    try {
        //check if username already exists
        const ExistingUser = await usermodel.findOne({
            $or:[{username: username},{email: email}]
        })
        console.log("Exist",ExistingUser);
        
        if (ExistingUser) {
            throw new ApiError(400 , "User already exists");
        }

        // create user 
        const newuser= new usermodel({
            username: username,
            name: name,
            email: email,
            gender: gender,
            address: address,
            phone: phone,
            age: age,
            password: password
        })
        newuser.save();
        // save user in session
        req.session.user = {
            id: newuser._id,
            username: newuser.username,
            email: newuser.email
        }

        res.status(201).json(new ApiResponse(201,newuser,"User registered successfully"));
    } catch (error) {
        throw new ApiError(error.statusCode, error.message)
    }
})

const UserLogin = asyncHandler(async(req, res, next) => {
    passport.authenticate('local',(err, user,info) => {
        if (err) {
            throw new ApiError(500, "Internal server error");
        }
        if (!user) {
            throw new ApiError(400, "Invalid credentials");
        }
        req.logIn(user, (err) => {
            if (err) {
                throw new ApiError(500, "Internal server error");
            }
            return res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));
        });
    })(req, res, next);
})

const GetUser = asyncHandler( async(req, res) => {
    // code
})

module.exports = {
    UserRegister,
    GetUser,
    UserLogin,
}