const mongoose = require('mongoose');


const ApplicantSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        status: {
            type: String,
            enum: ["pending", "success", "cancelled"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Applicants', ApplicantSchema);