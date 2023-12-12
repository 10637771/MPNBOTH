import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Signup from './SignUp/signup';
import Login from './Login/login.js';
import {Routes,BrowserRouter,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/App' element={<App/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
);


