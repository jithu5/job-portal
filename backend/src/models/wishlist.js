const mongoose = require('mongoose');


const WishlistSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        // status: {
        //     type: mongoose.Schema.Types.String,
        //     ref: "Job",
        // },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Wishlist', WishlistSchema);