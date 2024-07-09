import React from 'react'
import imgurl from "../sources/success.png";
import "../App.css"
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';

const Success = () => {
  return (
    <div className='s-class'>
        <img className = "s-img" src={imgurl} alt="success" />
       <div  className='s-h2'> 
        <h2 className='ss-h2'>Thanks for your feedback!</h2>
        <p>Your feedback is valuable for us. We will make sure<br/>
        your opinion counts!</p>
        <Link className='s-box' to={"/"}>GO TO HOME</Link>
        </div>
    </div>
  );
}

export default Success