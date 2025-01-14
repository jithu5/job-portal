const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
    {
        company: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Company",
        },
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        Location: {
            type: String,
            required: true,
        },
        Date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
