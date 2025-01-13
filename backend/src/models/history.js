const mongoose = require('mongoose');


const HistorySchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job'
    },
    status:{
        type:String,
        enum:["pending", "success","cancelled"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('History', HistorySchema);