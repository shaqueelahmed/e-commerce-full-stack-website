import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {saveTokens} from '../utils/auth';

function Login() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL || 'https://e-commerce-full-stack-website-e94i.onrender.com';
    const [form, setForm] = useState({ username: '', password: '' });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const response = await fetch(`${BASE}/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                saveTokens(data);
                setMsg('Login successful');
                setTimeout(() => { 
                    navigate('/');
                }, 800);
                navigate('/');
            } else {
                setMsg(data.detail || 'Login failed');
            }
        } catch (error) {
            setMsg('An error occurred during login');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="username"
                        onChange={handleChange}
                        value={form.username}
                        placeholder="Username"
                        required
                        className="w-full p-2 border rounded"
                        />
                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={form.password}
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                        Login
                    </button>
                </form>
                {msg && <p className="text-red-500 mt-4">{msg}</p>}
                <div className="mt-4 text-center">
                    Don't have an account?
                    <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    );
}

export default Login;