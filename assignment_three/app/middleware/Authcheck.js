const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const hashedPassword=(password)=>{
    const salt=10
    const hash=bcryptjs.hashSync(password,salt)
    return hash
}

const comparePassword=(password,hashedPassword)=>{
    return bcryptjs.compareSync(password,hashedPassword)
}
const Authcheck=(req,res,next)=>{
    const token=req?.body?.token||req.headers['x-access-token']
    if(!token){
        res.status(400).json({
            status:false,
            message:'pls first login to access this page'
        })
    } 
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRECT_KEY)
        req.user=decoded

    }catch(error){
        res.status(400).json({
            status:false,
            message:error.message
        })
    }
    next()
}
module.exports={hashedPassword,comparePassword,Authcheck}