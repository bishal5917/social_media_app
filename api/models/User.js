const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
        unique:true,
        default:""
    },
    bio: {
        type: String,
        unique:true,
        default:""
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phonenumber: {
        type: Number,
        default:0
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default:[]
    },
    following: {
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports=mongoose.model('User',UserSchema) 
//model name is user