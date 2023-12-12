import userregistermodel from '../Model/userregistermodel.js';
import express from 'express';

const router=express.Router();

router.use(express.json());

router.get('/todo/:id',async (req,res)=>{
  const id=req.params.id;
   const user= await userregistermodel.findOne({email:id});
   res.json(user.todotask);
});

router.post('/todo/new/:id',async (req,res)=>{
  const task=req.body;
  const email=req.params.id;
  let user=await userregistermodel.findOne({email:email});
  
  if(user)
  {
    user.todotask.push(task);
    await user.save();
  }
   res.json({message:'Unable to post the task'});
});

router.delete('/todo/delete/:id/:email',async(req,res)=>{
    const body=req.params;
    const user=await userregistermodel.findOne({email:body.email});
    if(user){

      user.todotask.filter(item=>{if(item._id==body.id){user.todotask.remove(item)}});
      await user.save();
    }
    else
    res.json('user does not exist');
});

router.put('/todo/complete/:id/:email',async(req,res)=>{
  const body=req.params;
  console.log(body);
  if(body)
  {
    const user=await userregistermodel.findOne({email:body.email});
    if(user)
    {
      user.todotask.filter((item)=>{if(item._id==body.id){item.complete=!item.complete}})
      await user.save();
    }
  }
  else
  {
    res.json({message:"error finding the user!"})
  }
});


export default router;