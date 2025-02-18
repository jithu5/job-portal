const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            index: { expires : 0 },
        },
        shift: {
            type: String,
            required: true,
        },
        time:{
            type: Date,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
            default: 0,
        },
        workersCount: {
            type: Number,
            required: true,
            default: 0,
        },
        workersNeeded: {
            type: Number,
            required: true,
            default: 0,
        },  
        status: {
            type: String,
            required: true,
            default: "Active",
            enum: ["Active", "Closed"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
