import Nav from"../Nav/Nav.js";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

function Contactus() {
      const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_gvd95ni',
                'template_ew576sv',
                form.current, {
                publicKey: 'x1UkV1BFf2GqKkS8J',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("success!")
         
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("not send")
        },
      );
  };
  return (
    <div className="contact-page">
        <Nav/>
        <div className="contact-container">
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label><br/>
      <input type="text" name="user_name" /><br/>
      <label>Email</label><br/>
      <input type="email" name="user_email" /><br/>
      <label>Message</label><br/>
      <textarea name="message" /><br/>
      <input type="submit" value="Send" /><br/>
    </form>
     </div>
    </div>
  )
}

export default Contactus
