import { UserModel } from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs';


export const register = async (req,res)=>{
    try {
        const {name,email,password,age} = req.body;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT,10));
        const user = new UserModel({name,email,password:hashedPassword,age})
        await user.save();
        return res.json({message:"success", user})
    } catch (error) {
        return res.json({message:'err:', error})
    }
}


export const signin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({message:"invalid data"});
        }
        const check = await bcrypt.compare(password, user.password );
        if(!check){
            return res.json({message:"invalid data"});
        }
        return res.json({message:"success",user});
    } catch (error) {
        return res.json({message:'err:', error})
    }
}