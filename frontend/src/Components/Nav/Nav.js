import React from "react";
import './nav.css';
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
        <ul className='home-ul'>
            <li className='home-li'>
                <Link to ="/mainhome" className='active home-a'>
                <h1>home</h1>
                </Link>
            </li>
            <li className='home-li'>
                <Link to ="/adduser" className='active home-a'>
                <h1>ADD user</h1>
                </Link>
            </li>
            <li className='home-li'>
                 <Link to ="/userdetails" className='active home-a'>
                <h1>user details</h1>
                </Link>
            </li>
               <li className='home-li'>
                 <Link to ="/conus" className='active home-a'>
                <h1>Contact US</h1>
                </Link>
            </li>
               <li className='home-li'>
                 <Link to ="/sendpdf" className='active home-a'>
                <h1>Send Pdf</h1>
                </Link>
            </li>
            <li className='home-li'>
                 <Link to ="/imgpart" className='active home-a'>
                <h1>Photos</h1>
                </Link>
            </li>
               <li className='home-li'>
                 <Link to ="/register" className='active home-a'>
                <button>Register</button>
                </Link>
            </li>
               <li className='home-li'>
                 <Link to ="/login" className='active home-a'>
                <button>Login</button>
                </Link>
            </li>
        </ul>

    </div>
  );
}

export default Nav
