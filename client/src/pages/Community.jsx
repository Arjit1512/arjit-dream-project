import React from 'react'
import location from "../sources/location.png";
const Community = () => {
    return (
        <>
            <section id='community-page'>
                <div className='cpage1'>
                    <h1>Give us your valuable feedback.</h1>

                    <div className='brown-border'></div>
                    <p className='text-community'>Before we kick off any project we like to consult with you to give you the most accurate quote possible.<br />
                        Use the form below to schedule a time and day for us to come out and check out your property.</p>


                    <form action='' method='post'>
                        <div className='flex-col'>
                            <label>Name</label>

                            <div className='flex-row name-form'>
                                <input className='' type='text' placeholder='first Name' />
                                <input className='' style={{ marginLeft: "3%" }} type='text' placeholder='last Name' />

                            </div>
                            <br />
                            <label>Email</label>
                            <input className='' type='text' placeholder='' />
                            <br />
                            <label>Subject</label>
                            <input className='' type='text' placeholder='' />
                            <br />
                            <label>Message</label>
                            <textarea style={{ height: "75px" }} className='' type='text' placeholder='' />

                            <button className='send'>SEND</button>
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