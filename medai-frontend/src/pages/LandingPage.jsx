import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, ClipboardList, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh', padding: '40px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🧬</div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>MedAI Diagnosis</h1>
            <p style={{ marginBottom: '36px', maxWidth: '600px', fontSize: '1.2rem' }}>
                Your AI-powered medical symptom checker. Describe how you feel and get instant guidance.
            </p>

            <div className="btns" style={{ display: 'flex', gap: '16px', marginBottom: '60px' }}>
                <Link to="/login" className="btn btn-primary">Get Started</Link>
                <Link to="/register" className="btn btn-secondary">Create Account</Link>
            </div>

            <div className="features" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div className="glass-card" style={{ padding: '24px', width: '250px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '16px', color: '#a78bfa' }}>
                        <Microscope size={40} style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Symptom Analysis</h3>
                    <p style={{ fontSize: '0.9rem' }}>Describe symptoms and get rule-based diagnosis with severity rating.</p>
                </div>

                <div className="glass-card" style={{ padding: '24px', width: '250px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '16px', color: '#a78bfa' }}>
                        <ClipboardList size={40} style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>History Tracking</h3>
                    <p style={{ fontSize: '0.9rem' }}>Every check is saved so you can monitor your health over time.</p>
                </div>

                <div className="glass-card" style={{ padding: '24px', width: '250px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '16px', color: '#a78bfa' }}>
                        <ShieldCheck size={40} style={{ margin: '0 auto' }} />
                    </div>
                    <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>Secure & Private</h3>
                    <p style={{ fontSize: '0.9rem' }}>Your data stays secure in our modern MySQL backend database.</p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
