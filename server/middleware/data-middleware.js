import jwt from 'jsonwebtoken';
export const dataMiddleware =(req,res,next)=>{
    const token = req.header("authToken").replace("Bearer","").trim();
    
    if(!token){
        return res.status(401).json({message:"Access Denied"})
    }
    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({message:"Invalid Token",error:error})
    }
} 