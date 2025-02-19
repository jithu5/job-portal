const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const AdminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        role: {
            type: String,
            default: "admin",
        },
        isAccountVerified: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);


AdminSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});



AdminSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
    }
};

AdminSchema.methods.generateToken = async function () {
    if(!process.env.JWT_SECRET) {
       throw new Error("JWT secret key is missing");
    }
    return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: 2 *24* 60 * 60 * 1000 });
};

module.exports = mongoose.model('Admin', AdminSchema);