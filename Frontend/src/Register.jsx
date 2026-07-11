import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api/axiosConfig'; // Import your custom Axios instance
import './css/Login.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await api.post('/auth/register', {
                username,
                password
            });

            setSuccess('Account created! Redirecting to login...');

            setTimeout(() => {
                navigate('/login');
            }, 1200);

        } catch (err) {
            const backendMessage =
                typeof err.response?.data === 'string'
                    ? err.response.data
                    : err.response?.data?.message;
            setError(backendMessage || 'Registration failed. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Register</h2>
                {error && <p className="login-error">{error}</p>}
                {success && <p className="login-success">{success}</p>}
                <form onSubmit={handleRegister} className="login-form">
                    <div className="login-username">
                        <label>Username: </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-password">
                        <label>Password: </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-password">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;