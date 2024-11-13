const users=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

// register
exports.registerController=async(req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    
    const {id,firstname,lastname,email,password,phone}=req.body
    try
    {
        const existingUser= await users.findOne({email})
        if(existingUser)
        {
            res.status(406).json("Already Existing User....Please Login")
        }
        else
        {
            const hashedPassword = await bcrypt.hash(password,10);

            const newUser= new users({
                id,firstname,lastname,email,password:hashedPassword,phone
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}
// login
exports.loginController=async(req,res)=>{
    console.log("Inside loginController");
    const {email,password}=req.body
    console.log(email,password);
    try
    {
        const existingUser= await users.findOne({email})
        if(existingUser)
        {
            const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if(isMatch)
            {
                res.status(200).json({
                    user:existingUser,token
                })
            }
            else
            {
                res.status(401).json("Invalid Password")
            }
            
        }
        else
        {
            res.status(404).json("Incorrect Email / Password")
        }
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
    
}

// List All Users
exports.allUserViewController=async(req,res)=>{
    console.log("Inside allUserController");
    try
    {
        const allUser= await users.find()
        res.status(200).json(allUser.map(user=>({firstname: user.firstname,email:user.email})))
    }
    catch(err)
    {
        res.status(err)
    }  
}

exports.oneUserDetailsController=async(req,res)=>{
    console.log("Inside oneUserDetailsController");

    const email=req.body.email
    try
    {
        const userDetails= await users.find({email})
        if(userDetails)
        {
            res.status(200).json(userDetails.map( Detail=> ({firstname: Detail.firstname,lastname:Detail.lastname,email:Detail.email,phone:Detail.phone})))
        }
        else
        {
            res.status(404).json("User not Found")
        }
    }
    catch(err)
    {
        console.log(err);
        
    }

    
}
