const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CompanySchema = mongoose.Schema({
    Cname:{
        type:String,
        required:true,
        unique:true,
        minlength: 5,
        maxlength: 25,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength: 5,
        maxlength: 50
    },
    address:{
        type:String,
        required:true,
        minlength: 10,
        maxlength: 100
    },
    phone:{
        type:Number,
        required:true,
        minlength: 10,
        maxlength: 10,
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
        maxlength: 12,
    }
},
{
    timestamps: true,
    
}
)

CompanySchema.pre("save",async function (next){
    try {
        if (this.isModified("password")){
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        }
        next();
    } catch (error) {
        console.log(error)
    } 
});

CompanySchema.methods.comparePassword = async function (password) {
   try {
    return await bcrypt.compare(password,this.password)
   } catch (error) {
     console.log(error);
     
   } 
}

module.exports = mongoose.model("Company", CompanySchema);