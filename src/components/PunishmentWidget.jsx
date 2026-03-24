import React, { useState, useEffect } from 'react';
import { Skull, RefreshCw, CheckCircle } from 'lucide-react';
import { punishments } from '../data/punishments';

const PunishmentWidget = () => {
    const [currentPunishment, setCurrentPunishment] = useState(() => {
        return localStorage.getItem('habitflow_current_punishment') || null;
    });
    const [isSpinning, setIsSpinning] = useState(false);

    useEffect(() => {
        if (currentPunishment) {
            localStorage.setItem('habitflow_current_punishment', currentPunishment);
        } else {
            localStorage.removeItem('habitflow_current_punishment');
        }
    }, [currentPunishment]);

    const spinWheel = () => {
        setIsSpinning(true);
        setCurrentPunishment(null);

        // Simple spin effect
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * punishments.length);
            setCurrentPunishment(punishments[randomIndex]);
            setIsSpinning(false);
        }, 800);
    };

    const clearPunishment = () => {
        setCurrentPunishment(null);
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="special-header" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626' }}>
                <Skull size={20} />
                PENALTY JAR
            </div>

            <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '1.25rem 1rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'center',
                minHeight: '180px',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {!currentPunishment && !isSpinning && (
                    <>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>🏺</div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            Did you miss a habit today? <br /> The jar demands a penalty!
                        </p>
                    </>
                )}

                {isSpinning && (
                    <div style={{ animation: 'spin 1s linear infinite' }}>
                        <RefreshCw size={32} color="var(--primary)" />
                    </div>
                )}

                {currentPunishment && (
                    <div className="animate-fade-in" style={{ width: '100%' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>⚡</div>
                        <p style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--text-main)',
                            lineHeight: 1.3,
                            padding: '0 0.5rem'
                        }}>
                            "{currentPunishment}"
                        </p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', width: '100%' }}>
                            <button
                                onClick={clearPunishment}
                                className="btn"
                                style={{
                                    flex: 1,
                                    background: '#ECFDF5',
                                    color: '#059669',
                                    border: '1px solid #A7F3D0',
                                    padding: '0.5rem',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.3rem',
                                    justifyContent: 'center'
                                }}
                            >
                                <CheckCircle size={16} /> Done
                            </button>
                            <button
                                onClick={spinWheel}
                                className="btn"
                                style={{
                                    flex: 1,
                                    background: 'var(--bg-subtle)',
                                    color: 'var(--text-muted)',
                                    border: '1px solid var(--border-light)',
                                    padding: '0.5rem',
                                    fontWeight: 500,
                                    fontSize: '0.8rem'
                                }}
                            >
                                Reroll
                            </button>
                        </div>
                    </div>
                )}

                {!currentPunishment && !isSpinning && (
                    <button
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className="btn"
                        style={{
                            marginTop: '0.5rem',
                            background: '#FEF2F2',
                            color: '#EF4444',
                            border: '1px solid #FECACA',
                            padding: '0.6rem 1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            width: '100%',
                            justifyContent: 'center',
                            opacity: isSpinning ? 0.7 : 1
                        }}
                    >
                        Pick a Penalty
                    </button>
                )}
            </div>
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default PunishmentWidget;
