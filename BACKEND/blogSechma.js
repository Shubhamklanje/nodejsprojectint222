const mongoose = require('mongoose')

const schema = mongoose.Schema;
const blogSchema = new schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('Blogs', blogSchema)