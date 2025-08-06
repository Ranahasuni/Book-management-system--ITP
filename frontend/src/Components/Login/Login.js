import React, { useState } from 'react'
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import'./Login.css';

function Login() {
      const history =useNavigate();
    const [user,setUser]=useState({
        fullname:"",
        email:"",
        
    });
    const handleInputChange =(e)=>{
        const {name,value}=e.target;
        setUser((prevUser)=>({...prevUser,[name]:value}));
    };
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await sendRequest();
            if(response.status === "ok"){
                alert("Login success");
                history("/userdetails");
            }else{
                alert("Login error");
            }
        }catch(err){
            alert("error"+err.message);
        }

    };
    const sendRequest = async() => {
        return await axios.post ("http://localhost:5000/login",{
            email:user.email,
            password:user.password,
           
        })
        .then((res) => res.data);
    }
  return (
    <div>
        <Nav/>
        <div className='login-container'>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit}>

      <label for="email">Email Address</label><br/>
      <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange}  required/><br/>

      <label for="password">Password</label><br/>
      <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} required/><br/>  
    <br></br>
      <button type="submit">Login</button><br/>
    </form>
     </div> 
    </div>
  )
}

export default Login;
