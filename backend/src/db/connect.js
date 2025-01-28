const mongoose = require('mongoose');

 async function db() {
    console.log(process.env.MONGO_URI);
    try {
         await mongoose.connect(process.env.MONGO_URI);
            console.log('connected successfully');
        }
        
     catch (error) {      
         console.log('Error connecting db');
    }
    
}

module.exports = db;