import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../Login/login.module.css'

import Cookies from 'universal-cookie';

const api_base='http://localhost:3001/';

function Login()
{
const cookie=new Cookies();
const navigate=useNavigate();

const [email,setemail]=useState('');
const [password,setpassword]=useState('');

const [error,seterror]=useState('');

const loginUser=async (e)=>{
  
  fetch(api_base+`fetchusers?email=${email}&pass=${password}`,{headers:{'Content-Type':'application/json'},credentials:'include'}).then(e=>e.json()).then(data=>{
   if(data)
   {
      console.log(data);
      cookie.set('login',Math.random()*1000,{maxAge:10000});
      navigate(`/App/?username=${data.user.name}&email=${data.user.email}`);
   }
  }).catch(e=>console.log(e));

}

return(
 
    <div className={styles.container}>
     <div className={styles.centerbackground}>
        <h1>User Login</h1>
      <div id="column">
         <label htmlFor="email">Email</label>
         <input type="text" name="email" onChange={(e)=>{setemail(e.target.value)}}/>
      </div>
      <div id="column">
         <label htmlFor="password">Password</label>
         <input type="text" name="password" onChange={(e)=>setpassword(e.target.value)}/>
      </div>
      <div id="error">
         <h6>{error}</h6>
      </div>
      <div id="column">
         <div className="registerbuttons">
         <button type="button" onClick={(e)=>{navigate('/signup')}} className={styles.button}>Register</button>
         <button type="button" onClick={(e)=>{loginUser(e);}} className={styles.button}>Login</button>
         </div>
      </div>

     </div>
    </div>
)
}
export default Login;