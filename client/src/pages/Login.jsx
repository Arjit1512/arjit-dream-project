// import React, { useEffect, useState } from "react"
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// import "./Login.css";

// function Login() {

//   const history = useNavigate();

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   //axios.defaults.withCredentials = true;
//   async function submit(e) {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:3001/auth/login",{// "https://arjit-fashion.vercel.app/auth/login", {
//         email, password
//       })
//         .then(res => {
//           if (res.data.status === "old-user") {
//             const userId = res.data.userId;
//             const name = res.data.name;
//             localStorage.setItem('userId', userId);
//             localStorage.setItem('name', name);
//             console.log("User ID:", userId);
//             history("/")
//           }
//           else if (res.data.status === "new-user") {
//             alert("Wrong password entered.")
//           }

//         })
//         .catch(e => {
//           alert("User have not signed up!")
//           console.log(e);
//         })

//     }
//     catch (e) {
//       console.log(e);

//     }

//   }
  
//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
//       />
//       <link
//         rel="stylesheet"
//         href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//         integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//         crossOrigin="anonymous"
//       />
//       <link rel="stylesheet" href="styles.css" />

//       <div className="wdiv">
//         <div className="wrapper">
//           <div className="form-box login">
//             <h2>Login</h2>
//             <form action="POST">
//               <div className="input-box">
//                 <input placeholder="Email" type="email" pattern="[a-zA-Z0-9._%+-]+@gmail.com" required="" onChange={(e) => { setEmail(e.target.value) }} />
//                 {/* <label>Email</label> */}
//               </div>
//               <div className="input-box">
//                 <input placeholder="Password" type="password" required="" onChange={(e) => { setPassword(e.target.value) }} />
//                 {/* <label>Password</label> */}
//               </div>
//               <div className="div-bt">
//                 <button onClick={submit} className="bt" type="submit">
//                   Login
//                 </button>
//               </div>
//               <p style={{ marginTop: "5%" }}>
//                 Don't have an account?
//                 <Link to="../register">
//                   <a>  Register</a>
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>

//   )
// }

// export default Login

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const endpointUrls = {
//     local: "http://localhost:3001/auth/login",
//     remote: "https://arjit-fashion.vercel.app/auth/login"
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(endpointUrls.local, {
//         email,
//         password
//       });

//       if (response.data.status === "old-user") {
//         const { userId, name } = response.data;
//         localStorage.setItem('userId', userId);
//         localStorage.setItem('name', name);
//         console.log("User ID:", userId);
//         navigate("/");
//       } else if (response.data.status === "new-user") {
//         alert("Wrong password entered.");
//       }
//     } catch (error) {
//       if (error.response) {
//         // Server responded with a status other than 2xx
//         console.error('Error response:', error.response.data);
//       } else if (error.request) {
//         // Request was made but no response was received
//         console.error('Error request:', error.request);
//       } else {
//         // Something happened in setting up the request
//         console.error('Error message:', error.message);
//       }
//       alert("User has not signed up!");
//     }
//   };

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
//       />
//       <link
//         rel="stylesheet"
//         href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//         integrity="sha384-Gn5384xQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
//         crossOrigin="anonymous"
//       />
//       <link rel="stylesheet" href="styles.css" />

//       <div className="wdiv">
//         <div className="wrapper">
//           <div className="form-box login">
//             <h2>Login</h2>
//             <form onSubmit={submit}>
//               <div className="input-box">
//                 <input
//                   placeholder="Email"
//                   type="email"
//                   pattern="[a-zA-Z0-9._%+-]+@gmail.com"
//                   required
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="input-box">
//                 <input
//                   placeholder="Password"
//                   type="password"
//                   required
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//               <div className="div-bt">
//                 <button className="bt" type="submit">
//                   Login
//                 </button>
//               </div>
//               <p style={{ marginTop: "5%" }}>
//                 Don't have an account?
//                 <Link to="../register">
//                   Register
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                email,
                password
            });

            if (response.data.status === "old-user") {
                const { token } = response.data;
                localStorage.setItem('token', token);
                console.log("Login successful. Token:", token);
                navigate("/");
            } else {
                console.error("Unexpected response:", response.data);
                setLoginError("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setLoginError("Login failed. Please try again.");
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
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form onSubmit={submit}>
                            <div className="input-box">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="div-bt">
                                <button className="bt" type="submit">
                                    Login
                                </button>
                            </div>
                            {loginError && <p className="error-message">{loginError}</p>}
                            <p style={{ marginTop: '5%' }}>
                                Don't have an account?{' '}
                                <Link to="/register">
                                    <span>Register here</span>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
