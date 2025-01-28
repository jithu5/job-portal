const mongoose = require('mongoose');

 async function db() {
    try {
         await mongoose.connect(process.env.MONGO_URI);
            console.log('connected successfully');
        }
        
     catch (error) {      
         console.log('Error connecting db');
    }
    
}

module.exports = db;