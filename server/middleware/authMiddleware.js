const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



const protect = async (req, res, next) => {
   
    let token

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
           token = req.headers.authorization.split(" ")[1]
            
         // Verify Token
         const decoded = jwt.verify(token , process.env.JWT_SECRET)
             

        //  Find user
        const user = await User.findById(decoded.id).select("-password")
           
        
        if(user){
            req.user = user
            next()
        }
        else{
            res.status(401)
            throw new Error('Invalid Token Found!!')

        }
           
        }
        else {
            res.status(401)
            throw new Error('No Token Found!!')
        }
        
    } catch (error) {
        res.status(401)
        throw new Error('No Token Found!!!')
    }
    
   }


module.exports = protect