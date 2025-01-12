const mongoose = require('mongoose');


const historySchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job'
    }
})

module.exports = mongoose.model('history', historySchema);