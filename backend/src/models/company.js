const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CompanySchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            index:true,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 25,
        },
        email: {
            type: String,
            index:true,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 50,
        },
        profileImage: {
            type: String,
        },
        coverImage: {   
            type: String,
        },
        address: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 100,
        },
        phone: {
            type: Number,
            required: true,
            minlength: 10,
            maxlength: 10,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            default: 'company',
        },
        isAccountVerified: {
            type: Boolean,
            default: false,
        },
        AccountVerificationOTP: {
            type: Number,
            default: null,
        },
        AccountVerificationOTPValidDate: {
            type: Date,
            default: null,
        },
        resetPasswordOTP: {
            type: Number,
            default: null,
        },
        resetPasswordOTPValidDate: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

CompanySchema.pre("save",async function (next){
    try {
        if (this.isModified("password")){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            
        }
        next();
    } catch (error) {
        console.log(error)
        next(error);
    } 
});

CompanySchema.methods.comparePassword = async function (password) {
   try {
    return await bcrypt.compare(password,this.password)
   } catch (error) {
     console.log(error);
     
   } 
}

CompanySchema.methods.generateToken = async function () {
    if (!process.env.JWT_SECRET) {
        console.log("Error: JWT_SECRET not found in .env file");
        return;
    }
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 2 * 24 * 60 * 60 * 1000 });
};

module.exports = mongoose.model("Company", CompanySchema);