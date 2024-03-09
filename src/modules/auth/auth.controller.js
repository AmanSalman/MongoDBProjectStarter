import { UserModel } from "../../../DB/models/user.model.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const registrationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(1),
});

// export const register = async (req,res)=>{
//     try {
//         const {name,email,password,age} = req.body;
//         const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT,10));
//         const user = new UserModel({name,email,password:hashedPassword,age})
//         await user.save();
//         return res.json({message:"success", user})
//         const { error } = registrationSchema.validate(req.body, { abortEarly: false });
//         if (error) {
//             return res.json({ message: 'Validation failed', errors: error.details });
//         }
//         const { name, email, password, age } = req.body;
//         const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
//         const user = new UserModel({ name, email, password: hashedPassword, age });
//         await user.save();
//     } catch (error) {
//         console.error('Error during registration:', error);
//         if (error.code === 11000) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }
//     }
// }

export const register = async (req, res) => {
    try {
        const { error } = registrationSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.json({ message: 'Validation failed', errors: error.details });
        }
        const { name, email, password, age } = req.body;
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));

        const user = new UserModel({ name, email, password: hashedPassword, age });

        await user.save();

        return res.json({ message: "Registration successful", user });
        
    } catch (error) {
        console.error('Error during registration:', error);

        if (error.name === 'MongoError' && error.code === 11000) {
            return res.json({ message: 'Email already registered' });
        }

        return res.json({ message: 'Internal Server Error' });
    }
};


export const signin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({message:"invalid data"});
        }
        const token = jwt.sign({_id:user._id,role:'user'}, process.env.LOGINSIG);
        const check = await bcrypt.compare(password, user.password );
        if(!check){
            return res.json({message:"invalid data"});
        }
        return res.json({message:"success",token});
    } catch (error) {
        return res.json({message:'err:', error})
    }
}