import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Signup() {
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL || 'http://127.0.0.1:8000';
    const [form, setForm] = useState({ username: '', password: '', email: '', password2: '' });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg('');
        try {
            const response = await fetch(`${BASE}/api/register/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                setMsg('Signup successful');
                setTimeout(() => {
                    navigate('/login');
                }, 1200);
            } else {
                setMsg(data.username || data.password || data.email || JSON.stringify(data) || 'Signup failed');
            }
        } catch (error) {
            setMsg('An error occurred during signup');
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
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
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        placeholder="Email"
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
                    <input
                        name="password2"
                        type="password"
                        onChange={handleChange}
                        value={form.password2}
                        placeholder="Confirm Password"
                        required
                        className="w-full p-2 border rounded"
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                        Create Account
                    </button>
                </form>
                {msg && <p className="text-red-500 mt-4">{msg}</p>}
                <div className="mt-4 text-center">
                    Already have an account?
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;