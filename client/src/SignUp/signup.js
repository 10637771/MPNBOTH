import React, { useEffect,useState } from "react";
import '../SignUp/signup.css';
import { useNavigate } from 'react-router-dom';

const api_base='https://nodejsbackend-y0x6.onrender.com';

function Signup()
{
   const navigate=useNavigate();
const [name,setname]=useState('');
const [email,setemail]=useState('');
const [password,setpassword]=useState('');
const [confirmpassword,setconfirmpassword]=useState('');

const [error,seterror]=useState('');

const addUser=async (e)=>{
   console.log(process.env.REACT_APP_render_url);
  const user=await fetch(api_base+'/createuser',{method:'POST',headers:{'Content-Type':"application/json"},body:JSON.stringify({name:name,email:email,password:password,confirmpassword:confirmpassword})}).then(res=>res.json());
  console.log(user.error);
  if(user.error)
   seterror(user.message);
}

const user={};
return(
    <div className="container">
     <div className="centerbackground">
        <h1>User Registration</h1>
      <div id="column">
         <label htmlFor="name">Name</label>
         <input type="text" name="name" onChange={(e)=>{setname(e.target.value)}}/>
      </div>
      <div id="column">
         <label htmlFor="email">Email</label>
         <input type="text" name="email" onChange={(e)=>{setemail(e.target.value)}}/>
      </div>
      <div id="column">
         <label htmlFor="password">Password</label>
         <input type="text" name="password" onChange={(e)=>setpassword(e.target.value)}/>
      </div>
      <div id="column">
         <label htmlFor="confirmpassword">Confirm Password</label>
         <input type="text" name="confirmpassword" onChange={(e)=>setconfirmpassword(e.target.value)}/>
      </div>
      <div id="error">
         <h6>{error}</h6>
      </div>
      <div id="column">
         <div className="registerbuttons">
         <button type="button" onClick={(e)=>{addUser(e);}} className="button">Register</button>
         <button type="button" onClick={(e)=>{navigate('/')}} className="button">Login</button>
         </div>
      </div>

     </div>
    </div>
)
}
export default Signup;