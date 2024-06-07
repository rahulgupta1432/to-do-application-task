const jwt=require('jsonwebtoken');

exports.generateToken=async(userId,isAdmin)=>{
    return jwt.sign({userId,randomness:Math.random(),expiresOn:Date.now()+1*24*60*60*1000,createdOn:Date.now(),isAdmin},
    process.env.JWT_SECRET,{expiresIn:'1d'});
    
}