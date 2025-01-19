const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 20,
        },
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 50,
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other"],
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
        age: {
            type: Number,
            required: true,
            min: 18,
            max: 25,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 12,
        },
        role:{
            type: String,
            default: "user",
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

UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        }
        next();
    } catch (error) {
        console.log(error);
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoose.model("User", UserSchema);
