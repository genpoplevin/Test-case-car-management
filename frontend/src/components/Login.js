import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8000/api/token/', 
                { 
                    username, 
                    password 
                }
            );
            localStorage.setItem('token', response.data.access);
            navigate('/profile');

        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <button type="submit">Login</button>
                </form>

                {error && <div className='error'>{error}</div>}
            </div>
        </div>
    );
};

export default Login;
