import mongoose from 'mongoose';

const todoschema=mongoose.Schema({
   text:{
    type:String,
   },
   complete:{
    type:Boolean,
   },
   timeStamp:{
    type:String,
    default:`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
   }
});

const todoModel=mongoose.model('todoModel',todoschema);

export default todoschema;