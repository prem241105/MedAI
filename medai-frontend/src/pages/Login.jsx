import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append("username", email);
        params.append("password", password);

        try {
            await API.post("/login", params);
            await checkAuth();
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Invalid email or password.");
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card" style={{ padding: '40px', width: '400px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>🧬 MedAI</h1>
                <p style={{ textAlign: 'center', color: '#a0aec0', fontSize: '0.9rem', marginBottom: '32px' }}>
                    Welcome back! Please login to your account.
                </p>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', padding: '12px', marginBottom: '20px', color: '#fca5a5', fontSize: '0.9rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e0', marginBottom: '8px' }}>Email Address</label>
                        <input
                            className="input-focus"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e0', marginBottom: '8px' }}>Password</label>
                        <input
                            className="input-focus"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: '600' }}>
                        Login
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', color: '#a0aec0', fontSize: '0.9rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: '600' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
