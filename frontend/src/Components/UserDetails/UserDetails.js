import React, { useState,useEffect,useRef } from "react";
import Nav from "../Nav/Nav.js";
import axios from "axios";
import User from '../User/User.js';
import {useReactToPrint} from "react-to-print";
import './UserCard.css';

const URL= "http://localhost:5000/users";

const fetchHandler =async()=>{
  return await axios.get(URL).then((res)=> res.data);

};
function UserDetails() {

  const [users,setUsers]= useState([]);
  useEffect(()=>{
    fetchHandler().then((data)=> setUsers(data.users));
  },[])

  const componentRef= useRef(); 

 const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  documentTitle: "Users Report",
  onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
});
 const [searchQuery, setSearchQuery]=useState("");
 const [noResults,setNoResults]=useState(false);

 const handleSearch = () =>{
   fetchHandler().then((data)=>{
      const filteredUsers =data.users.filter((user)=>
      Object.values(user).some((field)=>
      field.toString().toLowerCase().includes(searchQuery.toLowerCase())
    ))
    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
   });
  };

  const handleSendReport =() =>{
    //create the WhatsApp Chate URL
    const phoneNumber ="+94740989001";//replace with desired 4n no
    const message=`selected User Reports from here`;
    const WhatsAppUrl =`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    //open the whatsapp chat in new window
    window.open(WhatsAppUrl,"_blank");

  }

  return (
    <div className="uderdetail-page">
      <Nav/>
      <h1 className="title">User Details</h1>
      <div className="button-card">
      <input onChange={(e)=> setSearchQuery(e.target.value)}
      type="text"
      name="search"
      placeholder="Search Users Details"
      ></input>
      <button onClick={handleSearch} className="search-send">Search</button><br/>
      <button onClick={handlePrint} className="no-print">Download Report</button>
      
      <button onClick={handleSendReport}className="search-send">Send WhatsApp message</button>
      </div>

      {noResults ? (
        <div>
          <p>No Users FOund</p>
        </div>
      ):(

      <div ref={componentRef} className="print-area">
        {users && users.map((user,i)=>(
          <div key ={i}>
            <User user ={user}/>
            </div>
        ))}
      </div>
      )}
      
    </div>
    
  );
}

export default UserDetails;
