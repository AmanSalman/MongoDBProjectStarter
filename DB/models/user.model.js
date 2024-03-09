import mongoose, { Schema } from 'mongoose';


const userschema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['male', 'female'],
        default:'female'
    }
},{
    timestamps:true
});


export const UserModel = mongoose.model('user', userschema);
