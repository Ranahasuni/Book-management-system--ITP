import React,{useState} from 'react';
import Nav from "../Nav/Nav";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AddUser.css';

function AddUser() {
    const history = useNavigate();
    const [inputs,setInputs] = useState({
          name:"",
          gmail:"",
          age:"",
          address:"",
          
    });
    const handleChange =(e)=>{
        setInputs((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const sendRequest = async()=>{
        await axios.post("http://localhost:5000/users",{
            name:String (inputs.name),
            gmail:String(inputs.gmail),
            age:Number(inputs.age),
            address:String(inputs.address)
        }).then(res => res.data);
    };
       const handleSubmit= (e)=>{
        e.preventDefault();
        console.log(inputs);
        window.alert("user added successfully!");
        sendRequest().then(()=>history('/userdetails'))
    };

  return (
    <div className='add-user-page'>
    <Nav/>
      <div className ="add-user-container">
       <h1>Add User </h1> 
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
    </div>
  );
}

export default AddUser;
