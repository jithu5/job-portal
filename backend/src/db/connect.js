const mongoose = require('mongoose');

 async function db() {
    try {
         await mongoose.connect("mongodb://127.0.0.1:27017/job-portal")
            console.log('connected successfully');
        }
        
     catch (error) {
        
         console.log('Error connecting db');
    }
    
}

module.exports = db;