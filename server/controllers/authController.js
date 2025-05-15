const User = require('../models/userModel')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');


const register = async (req, res) => {


// CHECK if all fields are coming

const { name, email, phone, password } = req.body

if (!name || !email || !phone || !password){
    res.status(400)
    throw new Error("Please Fill All Details!!")
    
}

// Check if user exist

const emailExist = await User.findOne({email : email})
const phoneExist = await User.findOne({phone : phone})



if(emailExist || phoneExist){
    res.status(400)
    throw new Error("User Already Exist")
    }



    // Hash Password

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)



//  Create user
const user = await User.create({name , email , phone , password:hashedPassword })


if (!user){
res.status(400)
    throw new Error("User not created")
}

res.status(201).json({
id : user._id,
name : user.name,
email : user.email,
token : generateToken(user._id)
})
}




const login = async (req,res) => {

// Check if all fields are coming

    const {  email, password } = req.body

if ( !email  || !password){
    res.status(400)
    throw new Error("Please Fill All Details!!")
    
}
// Find user

const user = await User.findOne({email: email})


// Check user and password
if( user && await bcrypt.compare(password , user.password)){
   res.status(200).json({
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id)
        })
   }
  else{
   res.status(400)
    throw new Error('Invalid Credentials')
}
}


const privateController = async(req, res) => {
    res.status(200).json(req.user)
}


// Generate token
const generateToken = (id) => {
   const token = jwt.sign({ id } , process.env.JWT_SECRET , {
   expiresIn : '30D'
   }) 

   return token
}



module.exports = {register , login, privateController}                                                              