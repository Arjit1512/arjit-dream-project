import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const history = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')

    axios.defaults.withCredentials = true;

    async function submit(e) {
        e.preventDefault();

        try {

            await axios.post("http://localhost:3001/auth/register", "https://arjit-fashion.vercel.app/auth/register", {
                userName, email, password
            })

                .then(res => {
                    if (res.data.status == "old-user") {
                        alert("User already exists")
                    }
                    else if (res.data.status == "new-user") {
                        const userId = res.data.userId;
                        const name = res.data.name;
                        localStorage.setItem('userId', userId);
                        localStorage.setItem('name', name); 
                        console.log("User ID:", userId);
                        history("/");
                    }

                })
                .catch(e => {
                    alert("Please try entering new email and password")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }


    return (


        <>
            <link
                rel="stylesheet"
                href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            />
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="styles.css" />
            {/* Font Awesome */}

            <div className="wdiv">
                <div className="wrapper">
                    <div className="form-box login">
                        <h2>Register</h2>
                        <form action="index.html" onSubmit={submit}>
                            <div className="input-box">
                                <input placeholder="User Name" type="text" required onChange={(e) => { setUserName(e.target.value) }} />
                            </div>

                            <div className="input-box">
                                <input placeholder="Email" type="email" pattern="[a-zA-Z0-9._%+-]+@gmail.com" required onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div className="input-box">
                                <input placeholder="Password" type="password" required="" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="div-bt">
                                <button className="bt" type="submit">
                                    Register
                                </button>
                            </div>
                            <p>
                                Already have an account?
                                <Link to="../login">
                                    <a>  Login</a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
