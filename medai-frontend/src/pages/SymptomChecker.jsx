import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import api from '../services/api';

const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const commonSymptoms = [
        { label: '🌡️ Fever', value: 'fever' },
        { label: '😷 Cough', value: 'cough' },
        { label: '🤕 Headache', value: 'headache' },
        { label: '😴 Fatigue', value: 'fatigue' },
        { label: '🤢 Nausea', value: 'nausea' },
        { label: '💔 Chest Pain', value: 'chest pain' },
        { label: '🫁 Sore Throat', value: 'sore throat' },
        { label: '💪 Body Ache', value: 'body ache' },
        { label: '💫 Dizziness', value: 'dizziness' },
        { label: '😮‍💨 Shortness of Breath', value: 'shortness of breath' },
        { label: '🔴 Rash', value: 'rash' },
        { label: '🚽 Diarrhea', value: 'diarrhea' },
    ];

    const addTag = (symptom) => {
        setSymptoms(prev => {
            if (prev && !prev.endsWith(' ')) return prev + ', ' + symptom;
            return prev + symptom;
        });
    };

    const runSimpleDiagnosis = (symptomsText) => {
        const text = symptomsText.toLowerCase();
        const rules = {
            "fever,cough,fatigue,body ache": ["Flu / Influenza", "Paracetamol, Ibuprofen", "Get vitamin C, rest, and flu vaccination."],
            "chest pain,shortness of breath": ["Possible Cardiac Event", "Aspirin (if advised)", "Call emergency services immediately."],
            "headache,nausea,sensitivity": ["Migraine", "Painkillers (Sumatriptan)", "Avoid bright lights and loud noises."],
            "rash,itching,swelling": ["Allergic Reaction", "Antihistamines", "Identify and avoid triggers/allergens."],
            "sore throat,runny nose,sneezing": ["Common Cold", "Decongestants, throat lozenges", "Wash hands frequently, stay hydrated."],
            "abdominal pain,vomiting,diarrhea": ["Gastroenteritis", "ORS (Oral Rehydration Salts)", "Eat bland foods (BRAT diet), maintain hygiene."],
            "dizziness,fainting,weakness": ["Low Blood Pressure / Anemia", "Iron supplements (if advised)", "Regular exercise, balanced diet."],
            "frequent urination,thirst,fatigue": ["Possible Diabetes", "Consult doctor for insulin/metformin", "Maintain healthy weight, low sugar diet."]
        };

        for (const [key, value] of Object.entries(rules)) {
            const keywords = key.split(",");
            const matches = keywords.filter(kw => text.includes(kw.trim())).length;
            if (matches >= 2) return { diagnosis: value[0], medicine: value[1], prevention: value[2] };
        }
        return { diagnosis: "Symptoms inconclusive", medicine: "Consult a professional", prevention: "Monitor symptoms closely" };
    };

    const checkSymptoms = async () => {
        if (!symptoms.trim()) {
            alert('Please describe your symptoms first.');
            return;
        }

        setLoading(true);
        setResult(null);

        const dr = runSimpleDiagnosis(symptoms);

        try {
            const res = await api.post('/api/symptom-check', {
                symptoms: symptoms,
                diagnosis: dr.diagnosis,
                medicine: dr.medicine,
                prevention: dr.prevention
            });

            setResult({
                ...res.data,
                date: new Date().toLocaleString()
            });
        } catch (err) {
            console.error('Failed to check symptoms:', err);
            alert('Error saving results. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '18px 36px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                <h1 style={{ fontSize: '1.4rem' }}>🔬 Symptom Checker</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </button>
            </header>

            <main style={{ maxWidth: '720px', margin: '40px auto', padding: '0 20px' }}>
                <h2 style={{ fontSize: '2rem' }}>What are you feeling?</h2>
                <p style={{ color: '#a0aec0', marginBottom: '28px', fontSize: '0.9rem' }}>
                    Describe your symptoms in detail or click a common symptom below.
                </p>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e0', marginBottom: '12px' }}>
                        Symptoms Description
                    </label>
                    <textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g. I have fever, cough, and body ache since yesterday..."
                        style={{
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            minHeight: '150px',
                            outline: 'none',
                            fontFamily: 'inherit',
                            marginBottom: '20px'
                        }}
                    />

                    <label style={{ display: 'block', fontSize: '0.9rem', color: '#cbd5e0', marginBottom: '12px' }}>
                        Common Symptoms
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                        {commonSymptoms.map((tag) => (
                            <span
                                key={tag.value}
                                onClick={() => addTag(tag.value)}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '20px',
                                    background: 'rgba(124, 58, 237, 0.2)',
                                    border: '1px solid rgba(124, 58, 237, 0.4)',
                                    color: '#c4b5fd',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    transition: '0.2s'
                                }}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>

                    <button
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '16px' }}
                        onClick={checkSymptoms}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : <><Sparkles size={18} /> Analyze Symptoms</>}
                    </button>
                </div>

                {result && (
                    <div className="glass-card" style={{ marginTop: '32px', padding: '32px' }}>
                        <h3 style={{ fontSize: '1.4rem', color: '#a78bfa', marginBottom: '20px' }}>🩺 Diagnosis Report</h3>

                        {[
                            { label: 'Symptoms', value: result.symptoms },
                            { label: 'Diagnosis', value: result.diagnosis },
                            { label: 'Medicine', value: result.medicine },
                            { label: 'Prevention', value: result.prevention },
                            { label: 'Checked At', value: result.date }
                        ].map((row, idx, arr) => (
                            <div key={row.label} style={{
                                display: 'flex',
                                padding: '12px 0',
                                borderBottom: idx === arr.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.07)'
                            }}>
                                <span style={{ fontSize: '0.85rem', color: '#718096', width: '140px', flexShrink: 0 }}>{row.label}</span>
                                <span style={{ fontSize: '0.95rem', color: '#fff', lineHeight: '1.5' }}>{row.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SymptomChecker;
