// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        const success = register(
            formData.username,
            formData.password
        );

        if (success) {
            navigate('/login');
        } else {
            alert('El nombre de usuario ya está registrado');
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
                    <h2 className="text-xl text-[#ffb86c] text-center mb-6">Register</h2>

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
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full p-3 bg-[#383a59] border border-[#44475a] rounded-md text-white"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#ff5555] text-white rounded-md hover:bg-[#ff4444] transition-colors"
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#50fa7b] hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                <div className="hidden md:flex flex-1 bg-[#44475a] items-center justify-center p-8">
                    <img
                        src="/logo/logokamegame.webp"
                        alt="Register Illustration"
                        className="max-w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
