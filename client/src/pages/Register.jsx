import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import './Login.css';

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
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

    const [otpToken, setOtpToken] = useState()

    async function handleSendOtp() {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/send-otp`, { email });
            setOtpToken(res.data.otpToken);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
            setRegistrationError('Failed to send OTP. Please try again.');
        }
    }

    async function handleVerifyOtp() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-otp`, { email, otp, otpToken });
            if (response.status === 200) {
                setOtpVerified(true);
                setRegistrationError('OTP Verified.')
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setRegistrationError('Invalid OTP. Please try again.');
        }
    }

    const gotoHome = async () => {
        window.location.reload(); // Refresh the page
        navigate("/");
    }

    return (
        <>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous" />
            <link rel="stylesheet" href="styles.css" />
            <section className='header-login'>
                <div className='navbar'>
                    <p onClick={gotoHome} style={{cursor:"pointer"}}>TRUE HOOD</p>
                </div>
            </section>
            <div className="wdiv">
                <div className="wrapper">
                    <div className="form-box register">
                        <h2>Welcome, to the hood</h2>
                        <form onSubmit={handleRegister}>
                            <div className="input-box">
                                <input
                                    placeholder="Name"
                                    type="text"
                                    required
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="input-box special">
                                <input
                                    placeholder="Email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="button" onClick={handleSendOtp}>Send OTP</button>
                            </div>
                            {otpSent && (
                                <div className="input-box special">
                                    <input
                                        placeholder="OTP"
                                        type="text"
                                        required
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                    <button type="button" onClick={handleVerifyOtp}>Verify</button>
                                </div>
                            )}
                            <div className="input-box">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={!otpVerified}
                                />
                            </div>
                            <div className="div-bt">
                                <button className="bt" type="submit" disabled={!otpVerified}>
                                    Register
                                </button>
                            </div>
                            {registrationError && <p className="error-message">{registrationError}</p>}
                            <p className='label-register' style={{ marginTop: '5%' }}>
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
