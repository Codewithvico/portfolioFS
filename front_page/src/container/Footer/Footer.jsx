import React, { useState } from 'react';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client'

import './Footer.scss';

const Footer = () => {

  const [formData, setformData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setloading] = useState(false)

  const { name, email, message } = formData;

  const handleChaneInput = (e) => {
    const { name, value } = e.target;

    setformData({...formData, [name]: value })
  }

  const handleSubmit = () => {
    setloading(true);

    const contact = {
      _type: 'contact',
      name:  name,
      email: email,
      message: message,
    }
    client.create(contact)
    .then(() => {
       setloading(false);
       setIsFormSubmitted(true);
    })
  }

  return (
    <>
      <h2 className="head-text">Take a coffe & chat with me. I'm ready </h2>

      <div className="app__footer-main"> 
      <div className="app__footer-sideImage">
          <img src={images.possibility} alt="no-image found" />
          </div>
          
      {!isFormSubmitted ? 
      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input type="text" name="name" id="" placeholder="Your Name or Company Name" value={name} onChange={handleChaneInput} />
        </div>
        <div className="app__flex">
          <input type="email" name="email" id="" placeholder="Your Email address" value={email} onChange={handleChaneInput} />
        </div>
        <div>
          <textarea
            className="p-text"
            placeholder="Your Message"
            value={message}
            name="message"
            onChange={handleChaneInput} 
          />
           </div>
          <button type="button" className="p-text" onClick={handleSubmit}> { loading ? 'Sending' : 'Send Message' } </button>
          </div>
          : <div>
            <h3 className="head-text">Thank you for getting in touch </h3>
          </div> }
         </div>
        </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'

);