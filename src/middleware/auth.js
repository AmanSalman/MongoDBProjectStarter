import  jwt from 'jsonwebtoken';
const auth = (req,res,next) =>{
    const {authorization}= req.headers;
    if(!authorization.startsWith('Aman__')){
        return res.json({message:"not auth user"});
    }
    const token = authorization.split(process.env.BERERTOKEN)[1];
    if(!token){
        return res.json({message:"not auth user"});
    }
    const decoded = jwt.verify(token,process.env.LOGINSIG);
    req.userId = decoded._id;
    next();
};

export default auth;