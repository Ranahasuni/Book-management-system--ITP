import React from "react";
import {Route,Routes} from "react-router";
import './App.css';
import Home from "./Components/Home/Home.js";
import AddUser from "./Components/AddUser/AddUser.js";
import UserDetails from "./Components/UserDetails/UserDetails.js";
import UpdateUser from "./Components/UpdateUser/UpdateUser.js";
import Register from "./Components/Register/Register.js";
import Login from "./Components/Login/Login.js";
import ContactUs from "./Components/ContactUs/Contactus.js";
import SendPdf from "./Components/SendPdf/SendPdf.js";
import ImgUploader from "./Components/ImgUploader/ImgUploader.js";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path= "/" element={<Home/>}/>
          <Route path= "/mainhome" element={<Home/>}/>
          <Route path= "/adduser" element={<AddUser/>}/>
          <Route path= "/userdetails" element={<UserDetails/>}/>
          <Route path= "/userdetails/:id" element={<UpdateUser/>}/>
          <Route path= "/register" element={<Register/>}/>
          <Route path= "/login" element={<Login/>}/>
          <Route path= "/conus" element={<ContactUs/>}/>
          <Route path= "/sendpdf" element={<SendPdf/>}/>
          <Route path= "/imgpart" element={<ImgUploader/>}/>
        </Routes>

      </React.Fragment>
    </div>
  );
}

export default App;
