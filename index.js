require('dotenv').config()

const express=require('express')

const cors=require('cors')
const router=require('./routes/router')
 require('./database/dbConnection')


// call express
const userServer=express()
// enable cors
userServer.use(cors())
// for parse json from client
userServer.use(express.json())
userServer.use(router)

const PORT=3000 || process.env.PORT

// to run port
userServer.listen(PORT,()=>{
    console.log(`Server started at Port: ${PORT}`); 
})
// to resolve GET

userServer.get('/',(req,res)=>{
    res.status(200).send('<h1 style="color:red;">Server is running!!</h1>')
})

