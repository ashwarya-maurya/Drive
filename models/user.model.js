const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required : true,
        trim : true,
        unique : true,
        lowercase: true,
        minlength : [3,"Username must have 3 charcters long"]
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        minlength : [11,"Invalid Email"]
    },
    password :{
        type : String,
        required : true,
        trim : true,
        minlength : [5,"Password must be 5 charcters long"]
    }
})

const user = mongoose.model('user',userSchema);
module.exports = user;