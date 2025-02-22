const mongoose = require("mongoose");

const blockSchema = mongoose.Schema(
    {   
        blockedEmail: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Blocklist", blockSchema);