import mongoose from 'mongoose';
import todoschema from './todo.js';

const registerSchema=mongoose.Schema({
    name:{
       type:String,
       required:true, 
    },
    email:{
        type:String,
        required:true, 
        unique:true,
     },
     password:{
        type:String,
        required:true, 
     },
     todotask:[todoschema]
});

const registermodel=mongoose.model('UserRegisterModel',registerSchema);

export default registermodel;