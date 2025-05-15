const jwt = require('jsonwebtoken')
const User = require('../models/userModel')



const adminProtect = async (req, res, next) => {
   
    let token

    try {

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
           token = req.headers.authorization.split(" ")[1]
            
         // Verify Token
         const decoded = jwt.verify(token , process.env.JWT_SECRET)
             

        //  Find user
        const user = await User.findById(decoded.id).select("-password")
           
        
        if(user.isAdmin){
            req.user = user
            next()
        }
        else{
            res.status(401)
            throw new Error('You are not admin!!')

        }
      }
        else {
            res.status(401)
            throw new Error('Invalid Token Found!! : Not Admin')

        }
        } catch (error) {
        res.status(401)
        throw new Error('No Token Found!! : Not Admin')
    }
    
   }


module.exports = adminProtect