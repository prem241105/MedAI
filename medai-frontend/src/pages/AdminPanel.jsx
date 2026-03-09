import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Users, Shield, AlertTriangle } from 'lucide-react';

const AdminPanel = () => {
    const [stats, setStats] = useState({ users: 0, cases: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Here you could fetch admin-specific stats
        setLoading(false);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Admin Command Center</h1>
                <p style={styles.subtitle}>Manage medical records and user security</p>
            </div>

            <div style={styles.grid}>
                <div className="glass-card" style={styles.card}>
                    <Users size={32} color="#7c3aed" />
                    <h3>System Users</h3>
                    <p style={styles.stat}>--</p>
                </div>
                <div className="glass-card" style={styles.card}>
                    <Shield size={32} color="#7c3aed" />
                    <h3>Security Status</h3>
                    <p style={{ ...styles.stat, color: '#22c55e' }}>Active</p>
                </div>
                <div className="glass-card" style={styles.card}>
                    <AlertTriangle size={32} color="#ef4444" />
                    <h3>Incidents</h3>
                    <p style={styles.stat}>0</p>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '40px', padding: '32px' }}>
                <h3>Recent System Activity</h3>
                <div style={styles.placeholder}>
                    <p>Log monitoring will be available in the next version.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
    },
    header: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '800',
        marginBottom: '10px',
    },
    subtitle: {
        color: '#94a3b8',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
    },
    card: {
        padding: '32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
    },
    stat: {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: 0,
    },
    placeholder: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#475569',
        border: '2px dashed rgba(255,255,255,0.05)',
        borderRadius: '12px',
        marginTop: '20px',
    }
};

export default AdminPanel;
