import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Activity, History, BookOpen, Calendar, Pill, Shield } from "lucide-react";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const fetchHistory = () => {
        setLoading(true);
        API.get("/api/symptom-history")
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch history:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div style={{ minHeight: '100vh' }}>
            <header className="flex justify-between items-center p-6 bg-white/5 border-b border-white/10 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">🧬 MedAI Dashboard</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#a0aec0', fontSize: '0.9rem' }}>{user?.email}</span>
                    <button className="btn btn-secondary" onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </header>

            <main style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '12px' }}>Welcome, {user?.name || 'User'}!</h2>
                    <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>Your personal AI health assistant is ready.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
                    <div className="glass-card" style={{ padding: '32px', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/symptom-checker')}>
                        <div style={{ color: '#7c3aed', marginBottom: '16px' }}><Activity size={40} /></div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Symptom Checker</h3>
                        <p style={{ color: '#a0aec0', fontSize: '0.95rem', lineHeight: '1.6' }}>Analyze new symptoms and get immediate AI-driven guidance.</p>
                    </div>

                    <div className="glass-card" style={{ padding: '32px', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={fetchHistory}>
                        <div style={{ color: '#7c3aed', marginBottom: '16px' }}><History size={40} /></div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Refresh History</h3>
                        <p style={{ color: '#a0aec0', fontSize: '0.95rem', lineHeight: '1.6' }}>Update your recent medical checks and diagnosis reports.</p>
                    </div>

                    <div className="glass-card" style={{ padding: '32px', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => window.open('https://www.who.int/health-topics', '_blank')}>
                        <div style={{ color: '#7c3aed', marginBottom: '16px' }}><BookOpen size={40} /></div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>Medical Library</h3>
                        <p style={{ color: '#a0aec0', fontSize: '0.95rem', lineHeight: '1.6' }}>Explore verified health information from global health organizations.</p>
                    </div>
                </div>

                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.8rem', color: '#a78bfa', fontWeight: '700' }}>Recent Diagnoses</h3>
                        <span style={{ fontSize: '0.9rem', color: '#718096' }}>{data.length} records found</span>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px' }}>
                            <div className="loader" style={{ margin: '0 auto 20px' }}></div>
                            <p style={{ color: '#a0aec0' }}>Loading your history...</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <p style={{ color: '#4a5568', fontSize: '1.1rem' }}>No history found. Start your first check-up!</p>
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: '20px' }}
                                onClick={() => navigate('/symptom-checker')}
                            >
                                Check Symptoms Now
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {data.map((item) => (
                                <div key={item.id} className="glass-card" style={{ padding: '24px', borderLeft: '4px solid #7c3aed' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', fontSize: '0.85rem' }}>
                                            <Calendar size={14} />
                                            {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                                        </div>
                                        <span style={{
                                            background: 'rgba(124, 58, 237, 0.1)',
                                            color: '#a78bfa',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}>Verified</span>
                                    </div>

                                    <h4 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#fff' }}>{item.diagnosis}</h4>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                                        <div>
                                            <p style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '4px' }}>SYMPTOMS</p>
                                            <p style={{ fontSize: '0.95rem', color: '#cbd5e0' }}>{item.symptoms}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '4px' }}>MEDICINE</p>
                                            <p style={{ fontSize: '0.95rem', color: '#cbd5e0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <Pill size={16} color="#a78bfa" /> {item.medicine || 'General Rest'}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <p style={{ fontSize: '0.8rem', color: '#718096', marginBottom: '4px' }}>PREVENTION</p>
                                        <p style={{ fontSize: '0.95rem', color: '#cbd5e0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Shield size={16} color="#a78bfa" /> {item.prevention || 'Standard health precautions'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;
