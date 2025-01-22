const mongoose = require('mongoose');

 async function db() {
    try {
         await mongoose.connect("mongodb+srv://jobproject2025:Jobportal2025@jpcluster.prcua.mongodb.net/job-portal")
            console.log('connected successfully');
        }
        
     catch (error) {
        
         console.log('Error connecting db');
    }
    
}

module.exports = db;