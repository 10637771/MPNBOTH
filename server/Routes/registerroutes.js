import userregistermodel from '../Model/userregistermodel.js';
import express, { json } from 'express';

import cookieParser from 'cookie-parser';
const router=express.Router();

router.use(express.json());

router.use(cookieParser());

import cors from 'cors';

const allowedOrigins = [
    'http://localhost:3000', // Your frontend
    'http://localhost:3001', // Your backend
  ];

router.use(cors({credentials:true,origin:allowedOrigins}));

//To create the user
router.post('/createuser',async (req,res)=>{
    const body=req.body;
    console.log(body);
    const confirmpassword=body.confirmpassword;
    if(body)
    {
      if(confirmpassword!=body.password)
      {
        res.json({message:'Password does not match'});
        return;
      }
      await userregistermodel.create({name:body.name,email:body.email,password:body.password}).then(e=>{
      res.json({message:'User login',error:false,login:true});
    }).catch(e=>{
        res.json({message:'email id already exist',error:true,login:true});
      });
    }
    else
    {
        res.json({message:'field required',error:true,login:false});
    }
});

//To fetch the userdetails
router.get('/fetchusers',async (req,res)=>{ 
   const query=req.query;
   if(query)
  {
    const users=await userregistermodel.findOne({email:query.email});
    if(!users)
    {
        res.json({message:'Email id not exist!Please register yourself!'});
        return;
    }
    else
    {
        if(users.password!=query.pass)
        {
            res.json({message:'Password not correct'});
            return;
        }
        else
        {
            res.json({message:'successfully login',user:users});
        }
    }
  }
});

export default router;