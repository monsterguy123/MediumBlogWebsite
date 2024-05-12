const express = require('express')
const dotenv = require('dotenv')
const DB = require('./config/db')
const bodyParser = require('body-parser');
dotenv.config()
const userRoute = require('./routes/user')
const PostRoute = require('./routes/post')
const CommentRoute = require('./routes/comment')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors({
    origin:'*'
}))

//Database
DB();

//Routes
app.use('/api/v1/user/',userRoute)
app.use('/api/v1/post/',PostRoute)
app.use('/api/v1/comment/',CommentRoute)

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log("server is running in port ",PORT)
})