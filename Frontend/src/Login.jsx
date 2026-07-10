import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api/axiosConfig'; // Import your custom Axios instance

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Hit the open auth endpoint
            const response = await api.post('/auth/login', {
                username,
                password
            });

            // Grab the token from the response
            const token = response.data.token;

            // Save it to the browser's local storage
            localStorage.setItem('jwtToken', token);

            // Redirect to your protected applications page
            navigate('/'); 
            
        } catch (err) {
            setError('Invalid username or password');
            console.error(err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username: </label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;