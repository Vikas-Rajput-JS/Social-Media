const express = require('express')
const app = express()
const cors = require('cors')
require('./Connection/Db')
const Authantication = require('./Routes/Authantication')
const Followers = require('./Routes/Following')
const Post = require('./Routes/Post')
app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    console.log( 'Hello World')
})
app.use('/api/auth',Authantication)
app.use('/api/auth',Followers)
app.use('/api/auth/post',Post)

app.listen(5500)