const express = require('express')
const Mongoose = require('mongoose')
var bodyParser = require('body-parser');
const helmet = require('helmet')
const morgan = require('morgan')
const multer=require('multer')
const path=require('path')


//imports for routes
const authroute = require('./routes/auth')
const userroute = require('./routes/users')
const postroute = require('./routes/posts')
const conversationroute = require('./routes/convos')
const messageroute = require('./routes/messages')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));  //if i get an empty array as 
// response, so used bodyparser
app.use(bodyParser.json());

// MAKING IMAGES FOLDER PUBLIC TO USE
app.use('/images',express.static(path.join(__dirname,'/images')))

//cors policy
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

MONGO_URL = "mongodb://localhost:27017/fbdb"

Mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("Mongodb connected") }).catch((err) => console.log(err))


//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))


//routes for router
app.use('/api/auth', authroute)
app.use('/api/users', userroute)
app.use('/api/posts', postroute)
app.use('/api/conversations', conversationroute)
app.use('/api/messages', messageroute)


//code for file upload using multer
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload=multer({storage:storage})

app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")

})

//running the app
app.listen('5000', () => {
    console.log("Backend server is running")
})