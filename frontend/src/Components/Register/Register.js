import React, { useState } from 'react'
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
    const history =useNavigate();
    const [user,setUser]=useState({
        fullname:"",
        email:"",
        password:"",
        address:"",
        gender:"",
    });
    const handleInputChange =(e)=>{
        const {name,value}=e.target;
        setUser((prevUser)=>({...prevUser,[name]:value}));
    };
    const handleSubmit =(e) =>{
        e.preventDefault();

        sendRequest().then(()=>{
            alert("Register Success");
            history("/userdetails");
        }).catch(err=>{
            alert(err.message);
        });
    };
    const sendRequest = async() => {
        await axios.post ("http://localhost:5000/register",{
            fullname:String(user.fullname),
            email:String(user.email),
            password:String(user.password),
            address:String(user.address),
            gender:String(user.gender),
        })
        .then((res) => res.data);
    }
  return (
    <div>
      <Nav/>
      <div className='register-container'>
         <h1>User Regitser</h1>
      <form onSubmit={handleSubmit}>
      <label for="fullname">Full Name</label><br/>
      <input type="text" id="fullname" name="fullname" value={user.fullname} onChange={handleInputChange} required/><br/>

      <label for="email">Email Address</label><br/>
      <input type="email" id="email" name="email" value={user.email} onChange={handleInputChange}  required/><br/>

      <label for="password">Password</label><br/>
      <input type="password" id="password" name="password" value={user.password} onChange={handleInputChange} required/><br/>

      <label for="confirm-password">Confirm Password</label><br/>
      <input type="password" id="confirm-password" name="confirm-password" required/><br/>

      <label for="address">Address</label><br/>
      <textarea id="address" name="address" rows="3" value={user.address}onChange={handleInputChange}  required></textarea><br/>

      <label for="gender">Gender</label><br/>
      <select id="gender" name="gender" value={user.gender} onChange={handleInputChange} required><br/>
        <option value="">-- Select Gender --</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select><br/>
       <br></br>
      <button type="submit">Register</button><br/>
    </form>
    </div>
    </div>
  );
}

export default Register;
