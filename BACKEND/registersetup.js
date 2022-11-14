const mongoose = require('mongoose')

const schema = mongoose.Schema;
const registerSchema = new schema({
    user:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
})

module.exports = mongoose.model('Registeruser', registerSchema)