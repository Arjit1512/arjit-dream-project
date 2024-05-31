import React, { useState } from 'react'
import location from "../sources/location.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const Community = () => {
    
    const [message,setMessage] = useState("");
    const [fName,setfName] = useState("");
    const [lName,setlName] = useState("");
    const [subject,setSubject] = useState("");
    const {id} = useParams();
        
    function handleMessage(event){
        setMessage(event.target.value);
    }
    function handlefName(event){
        setfName(event.target.value);
    }
    function handlelName(event){
        setlName(event.target.value);
    }
    function handleSubject(event){
        setSubject(event.target.value);
    }
    const navigate = useNavigate();
   
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        try {
          const response = await axios.post(`http://localhost:3001/community/${id}`, {
            message,fName,lName,subject
          });
    
          if (response.status === 201) {
            navigate('/success');
          } else {
            alert('User does not exist.');
          }
        } catch (error) {
          console.error('Failed to submit message', error);
          alert('An error occurred while submitting the message.');
        }
      };
      
    return (
        <>
            <section id='community-page'>
                <div className='cpage1'>
                    <h1>Give us your valuable feedback.</h1>

                    <div className='brown-border'></div>
                    <p className='text-community'>Before we kick off any project we like to consult with you to give you the most accurate quote possible.<br />
                        Use the form below to schedule a time and day for us to come out and check out your property.</p>


                    <form onSubmit={handleSubmit}>
                        <div className='flex-col'>
                            <label>Name</label>

                            <div className='flex-row name-form'>
                                <input className='' type='text' placeholder='first Name' onChange={handlefName} value={fName} />
                                <input className='' style={{ marginLeft: "3%" }} type='text' placeholder='last Name' onChange={handlelName} value={lName} />

                            </div>
                            <br />
                            <label>Subject</label>
                            <input className='' type='text' placeholder='' onChange={handleSubject} value={subject} />
                            <br />
                            <label>Message</label>
                            <textarea style={{ height: "75px" }} className='' type='text' placeholder='' onChange={handleMessage} value={message}/>

                            <button className='send' type='submit'>SEND</button>
                          </div>
                    </form>

                </div>

                <div className='cpage2'>
                    <img src={location} alt='' />

                    <div className='contact-text'>
                        <h1>Contact</h1>
                    </div>

                    <div className='light-border lb2'></div>
                    <div className='address'>
                        <p>Arjit Avadhanam<br/>
                            IIIT Sricity<br/>
                            near Tada<br/>
                            Sricity, 517646<br/>
                            <br />
                            avadhanamarjit15@gmail.com<br/>
                            9618825172</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Community