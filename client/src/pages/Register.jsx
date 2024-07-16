// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"

// function Login() {
//     const history = useNavigate();

//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [userName, setUserName] = useState('')

//     //axios.defaults.withCredentials = true;

//     async function submit(e) {
//         e.preventDefault();

//         try {

//             await axios.post("http://localhost:3001/auth/register", {//"https://arjit-fashion.vercel.app/auth/register", {
//                 userName, email, password
//             })

//                 .then(res => {
//                     if (res.data.status == "old-user") {
//                         alert("User already exists")
//                     }
//                     else if (res.data.status == "new-user") {
//                         const userId = res.data.userId;
//                         const name = res.data.name;
//                         localStorage.setItem('userId', userId);
//                         localStorage.setItem('name', name); 
//                         console.log("User ID:", userId);
//                         history("/");
//                     }

//                 })
//                 .catch(e => {
//                     alert("Please try entering new email and password")
//                     console.log(e);
//                 })

//         }
//         catch (e) {
//             console.log(e);

//         }

//     }


//     return (


//         <>
//             <link
//                 rel="stylesheet"
//                 href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
//             />
//             <link
//                 rel="stylesheet"
//                 href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//                 integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//                 crossOrigin="anonymous"
//             />
//             <link rel="stylesheet" href="styles.css" />
//             {/* Font Awesome */}

//             <div className="wdiv">
//                 <div className="wrapper">
//                     <div className="form-box login">
//                         <h2>Register</h2>
//                         <form action="index.html" onSubmit={submit}>
//                             <div className="input-box">
//                                 <input placeholder="User Name" type="text" required onChange={(e) => { setUserName(e.target.value) }} />
//                             </div>

//                             <div className="input-box">
//                                 <input placeholder="Email" type="email" pattern="[a-zA-Z0-9._%+-]+@gmail.com" required onChange={(e) => { setEmail(e.target.value) }} />
//                             </div>
//                             <div className="input-box">
//                                 <input placeholder="Password" type="password" required="" onChange={(e) => { setPassword(e.target.value) }} />
//                             </div>
//                             <div className="div-bt">
//                                 <button className="bt" type="submit">
//                                     Register
//                                 </button>
//                             </div>
//                             <p>
//                                 Already have an account?
//                                 <Link to="../login">
//                                     <a>  Login</a>
//                                 </Link>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>

//     )
// }

// export default Login

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//     const navigate = useNavigate();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [userName, setUserName] = useState('');

//     const endpointUrls = {
//         local: "http://localhost:3001/auth/register",
//         remote: "https://arjit-fashion.vercel.app/auth/register"
//     };

//     async function submit(e) {
//         e.preventDefault();

//         try {
//             const response = await axios.post(endpointUrls.local, {
//                 userName, email, password
//             });

//             if (response.data.status === "old-user") {
//                 alert("User already exists");
//             } else if (response.data.status === "new-user") {
//                 const userId = response.data.userId;
//                 const name = response.data.name;
//                 localStorage.setItem('userId', userId);
//                 localStorage.setItem('name', name);
//                 console.log("User ID:", userId);
//                 navigate("/");
//             }
//         } catch (error) {
//             alert("Please try entering a new email and password");
//             console.log(error);
//         }
//     }

//     return (
//         <>
//             <link
//                 rel="stylesheet"
//                 href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
//             />
//             <link
//                 rel="stylesheet"
//                 href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//                 integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//                 crossOrigin="anonymous"
//             />
//             <link rel="stylesheet" href="styles.css" />

//             <div className="wdiv">
//                 <div className="wrapper">
//                     <div className="form-box login">
//                         <h2>Register</h2>
//                         <form onSubmit={submit}>
//                             <div className="input-box">
//                                 <input
//                                     placeholder="User Name"
//                                     type="text"
//                                     required
//                                     onChange={(e) => { setUserName(e.target.value) }}
//                                 />
//                             </div>
//                             <div className="input-box">
//                                 <input
//                                     placeholder="Email"
//                                     type="email"
//                                     pattern="[a-zA-Z0-9._%+-]+@gmail.com"
//                                     required
//                                     onChange={(e) => { setEmail(e.target.value) }}
//                                 />
//                             </div>
//                             <div className="input-box">
//                                 <input
//                                     placeholder="Password"
//                                     type="password"
//                                     required
//                                     onChange={(e) => { setPassword(e.target.value) }}
//                                 />
//                             </div>
//                             <div className="div-bt">
//                                 <button className="bt" type="submit">
//                                     Register
//                                 </button>
//                             </div>
//                             <p>
//                                 Already have an account?
//                                 <Link to="../login">
//                                     <a> Login</a>
//                                 </Link>
//                             </p>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import './Login.css';

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                userName,
                email,
                password
            });

            if (response.data.status === 'new-user') {
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log('Registration successful. Token:', token);
                navigate('/'); // Navigate to home or wherever needed after successful registration
            } else {
                console.log('Unexpected response:', response.data);
                setRegistrationError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationError('Registration failed. Please try again.');
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous" />
            <link rel="stylesheet" href="styles.css" />

            <div className="wdiv">
                <div className="wrapper">
                    <div className="form-box register">
                        <h2>Register</h2>
                        <form onSubmit={handleRegister}>
                            <div className="input-box">
                                <input
                                    placeholder="User Name"
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="div-bt">
                                <button className="bt" type="submit">
                                    Register
                                </button>
                            </div>
                            {registrationError && <p className="error-message">{registrationError}</p>}
                            <p style={{ marginTop: '5%' }}>
                                Already have an account?{' '}
                                <Link to="/login">
                                    <span> Login</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
