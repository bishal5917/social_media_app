const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
        max:300
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports=mongoose.model('Post',PostSchema) 
//model name is Post