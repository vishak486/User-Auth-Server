const mongoose=require('mongoose')

// db connection string from atals to js file
const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDb Atlas connection Successfull with Server");
    
}).catch(err=>{
    console.log("MongoDb Atlas connection failed");
    console.log(err);
    
})