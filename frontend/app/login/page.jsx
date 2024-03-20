"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div
        className="flex flex-col items-center justify-center h-screen bg-gray-100"
        >
        <div className="w-full max-w-xs">
            <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={(e) => {
                e.preventDefault();
                axios.defaults.withCredentials = true;
                axios
                .post('https://mern-app-backend-brown.vercel.app/login', {
                    email,
                    password,
                })
                .then((response) => {
                    console.log('response', response);
                })
                .catch((error) => {
                    console.error('error', error);
                });
            }}
            >
            <div className="mb-4">
                <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
                >
                Email
                </label>
                <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-6">
                <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
                >
                Password
                </label>
                <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Sign In
                </button>
            </div>
                </form>
                </div>
        </div>
    );
}

export default LoginPage;
