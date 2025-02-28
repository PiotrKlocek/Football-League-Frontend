import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import './LoginForm.css';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import bcrypt from 'bcryptjs';

const LoginForm = () => {

    const [action, setAction] = useState('Login');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();


    const handleSubmit = async () => {
        if (action !== "Sign Up") return;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword
        };

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered:', data);
                alert('User registered successfully!');
            } else {
                console.error('Failed to register user');
                alert('Error: User could not be registered.');
            }
        } catch (error) {
            console.error('Error submitting user data:', error);
            alert('Error: Something went wrong!');
        }
    };

    const handleLogin = async () => {
        if (action !== "Login") return;

        try {
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const users = await response.json();
            const user = users.find(user => user.email === email);

            if (user && await bcrypt.compare(password, user.password)) {
                navigate('/homepage');
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            alert('Error: Something went wrong!');
        }
    };


    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="inputs2">
                        <div className="input">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div className="input">
                            <FaUser className="icon" />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="input">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Forgot Password?<span> Click Here</span>
                </div>
            )}

            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>
                    <div >
                        <button onClick={handleSubmit} className={action === "Login" ? "submit gray" : "submit"}>
                            Register
                        </button>
                    </div>
                </div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
                    <div >
                        <button onClick={handleLogin} className={action === "Sign Up" ? "submit gray" : "submit"}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm