const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'company'
    },
    Title:{
        type:String,
        required:true,
    },
    Descr:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    },

})

module.exports = mongoose.model('jobs', jobSchema);