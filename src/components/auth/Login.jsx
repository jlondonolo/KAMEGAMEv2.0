// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login(formData.username, formData.password)) {
            navigate('/');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-[#1e1e2f] flex items-center justify-center p-4">
            <div className="flex flex-col md:flex-row bg-[#282a36] rounded-lg overflow-hidden shadow-xl max-w-4xl w-full">
                <div className="p-8 flex-1">
                    <h1 className="text-2xl md:text-3xl text-white text-center mb-2">Kame - Game</h1>
                    <h2 className="text-xl text-[#ffb86c] text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 bg-[#383a59] border border-[#44475a] rounded-md text-white"
                                placeholder="Enter your Username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 bg-[#383a59] border border-[#44475a] rounded-md text-white"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#ff5555] text-white rounded-md hover:bg-[#ff4444] transition-colors"
                        >
                            Log In
                        </button>
                    </form>

                    <p className="text-center mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#50fa7b] hover:underline">
                            Sign up now
                        </Link>
                    </p>
                </div>

                <div className="hidden md:flex flex-1 bg-[#44475a] items-center justify-center p-8">
                    <img
                        src="/logo/logokamegame.webp"
                        alt="Login Illustration"
                        className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
