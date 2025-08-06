import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useParams} from 'react-router'
import {useNavigate } from 'react-router'
import './UpdateUser.css';

function UpdateUser() {
    const [inputs,setInputs] =useState({});
    const history =useNavigate();
    const id= useParams().id;

    useEffect (()=>{
        const fetchHandler = async () =>{
            await axios
            .get(`http://localhost:5000/users/${id}`)
            .then((res)=> res.data)
            .then((data)=> setInputs(data.user));
        };
        fetchHandler();
    },[id]);

    const sendRequest = async() =>{
        await axios.put(`http://localhost:5000/users/${id}`,{
            name:String (inputs.name),
            gmail:String(inputs.gmail),
            age:Number(inputs.age),
            address:String(inputs.address),

        })
           .then((res)=> res.data);
    };
    const handleChange =(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
         const handleSubmit= (e)=>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>{
        window.alert("User details updates successfully!");
        history('/userdetails')});
    };

  return (
    <div className='update-container'>
      <h1>Update User</h1>
       <form onSubmit={handleSubmit}>
  <label htmlFor="name">Name:</label><br />
  <input type="text" id="name" name="name" onChange={handleChange} value={inputs.name} required /><br /><br />

  <label htmlFor="gmail">Gmail:</label><br />
  <input type="email" id="gmail" name="gmail" onChange={handleChange} value={inputs.gmail} required /><br /><br />

  <label htmlFor="age">Age:</label><br />
  <input type="number" id="age" name="age" min="0" onChange={handleChange} value={inputs.age} required /><br /><br />

  <label htmlFor="address">Address:</label><br />
  <textarea id="address" name="address" rows="3" onChange={handleChange} value={inputs.address} required></textarea><br /><br />

  <button type ="submit">Submit</button>
</form>
    </div>
  );
}

export default UpdateUser
