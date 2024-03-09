import { UserModel } from "../../../DB/models/user.model.js"

export const getUsers = async (req,res)=>{
    try {
        const users = await UserModel.find();
        return res.json ({message:"success", users});
    } catch (error) {
        return res.json({message:'err:', error})
    }
};

export const destroy = async (req,res)=> {
    try {
        const {_id} = req.params;
        const deleted = await UserModel.findByIdAndDelete(_id);
        return res.json({message:"success", deleted});
    } catch (error) {
        return res.json({message:'err:', error})
    }
}

export const update = async (req,res)=>{
    try {
        const {_id} = req.params; 
        const {email} = req.body;
        const user = await UserModel.findByIdAndUpdate(_id, {confirmEmail:true});
        return res.json ({message:"success", user});
    } catch (error) {
        return res.json({message:'err:', error})
    }
}