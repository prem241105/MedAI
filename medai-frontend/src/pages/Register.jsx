import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setStatus(null);

        try {
            await API.post("/api/register", {
                name, // Included name as the backend User entity supports it
                email,
                password
            });

            setStatus({ type: 'success', message: '✅ Account created! Redirecting...' });
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.error || "Registration failed. Please try again." });
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
            <div className="glass-card" style={{ padding: '40px', width: '400px' }}>
                <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '8px' }}>🧬 MedAI</h1>
                <p style={{ textAlign: 'center', color: '#a0aec0', fontSize: '0.9rem', marginBottom: '32px' }}>
                    Create your medical profile
                </p>

                {status && (
                    <div style={{
                        background: status.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        border: `1px solid ${status.type === 'success' ? '#22c55e' : '#ef4444'}`,
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '20px',
                        color: status.type === 'success' ? '#86efac' : '#fca5a5',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e0', marginBottom: '8px' }}>Full Name</label>
                        <input
                            className="input-focus"
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e0', marginBottom: '8px' }}>Email Address</label>
                        <input
                            className="input-focus"
                            type="email"
                            placeholder="your@email.com"
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
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem', fontWeight: '600' }}>
                        Register
                    </button>
                </form>

                <p style={{ marginTop: '24px', textAlign: 'center', color: '#a0aec0', fontSize: '0.9rem' }}>
                    Already have an account? <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: '600' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
