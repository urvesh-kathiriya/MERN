import jwt from 'jsonwebtoken';
export const dataMiddleware =(req,res,next)=>{
    try {
    const token = req.header("authToken").replace("Bearer","").trim();
    
    if(!token){
        return res.status(401).json({message:"Access Denied"})
    }
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(400).json({message:"Invalid Token Or Token Is Not Given",error:error})
    }
} 