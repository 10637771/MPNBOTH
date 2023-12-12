import React, { useEffect,useState } from "react";
import './index.css';
import {Routes,BrowserRouter,Route} from 'react-router-dom';
import {  } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const api_base='http://localhost:3001';

function App() {
const [todos,setTodos]=useState([]);
const [popupActive,setpopupActive]=useState(false);
const [newTodo,setnewTodo]=useState("");
const searchParams = new URLSearchParams(window.location.search);

useEffect(()=>
{
  getTodos();
  checklogin();
},[todos]);

const navigate=useNavigate();
const cookie=new Cookies();
const checklogin=()=>{
const login=cookie.get('login');


if(!login)
{
  navigate('/');
}
}
const getTodos=async ()=>{
  const data=await fetch(api_base+`/task/todo/${searchParams.get('email')}`).then(res=>res.json());
  if(data)
  {
     setTodos(data);
  }
}

const addTodo=async ()=>{
  const data=await fetch(api_base+`/task/todo/new/${searchParams.get('email')}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:newTodo})})
  .then(res=>res.json());
  setnewTodo("");
  setpopupActive(false);
}

const deleteTodos=async (id)=>{
  const data=await fetch(api_base+`/task/todo/delete/${id}/${searchParams.get('email')}`,{method:'DELETE'}).then(res=>res.json());
  
  setTodos(todos=>todos.filter(todo=>todo._id!==data._id));
}
const completeTodos=async (todoId)=>{
  const data= await fetch(api_base+`/task/todo/complete/${todoId}/${searchParams.get('email')}`,{method:'put',headers:{'Content-Type':'application/json'}}).then(resp=>resp.json());
 
  setTodos(todos=>todos.map(todo=>{
    if(todo._id===data._id)
    {
      todo.complete=data.complete;
    }
    return todo;
  }));
}
  return (
    <div className="App">
      <div className="topbar">
         <h1>Hello,{searchParams.get('username')}</h1>
         <button type="button" onClick={()=>cookie.set('login','',{maxAge:0})}>Logout</button>
      </div>
    <h4>Welcome TO My Library!</h4>
    <div className="grid">
      <div id="date">Date Posted</div>
      <div id="book">Book Name</div>
      </div>
      <div className="row">
        <div className="date">
        {todos.map(todo=>(
        <div className="todo">
          {todo.timeStamp}
        </div>
        ))}
        </div>
    <div className="todos">
      {todos.map(todo=>(
      <div className={"todo "+ (todo.complete?"is-complete":"")} key={todo._id}>
       <div className="checkbox" onClick={()=>completeTodos(todo._id)}></div>
       <div className="text">{ todo.text }</div>
       <div className="delete-todo" onClick={()=>deleteTodos(todo._id)}>x</div>
      </div> 
     ))}       
    </div>
    </div>
    <div className="addPopUp" onClick={()=>setpopupActive(true)}>+</div>
    {
      popupActive?
      <div className="popup">
        <div className="closePopUp" onClick={()=>setpopupActive(false)}>X</div>
        <div className="content">
          <h3>Add Task</h3>
       <input onChange={(e)=>{if(e.target.value!=null || e.target.value!=''){setnewTodo(e.target.value)}else setnewTodo('.')}}></input>
       <div className="button" onClick={()=>{addTodo()}}>Create Task</div>
       </div>
       </div>
      :
      ''
     }
     </div>
  );
}
export default App;
