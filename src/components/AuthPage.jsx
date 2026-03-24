import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { api } from '../services/api';

const AuthPage = ({ onSelectUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            let user;
            if (isLogin) {
                user = await api.login({
                    email: formData.email,
                    password: formData.password
                });
            } else {
                user = await api.register(formData);
            }

            if (user && user._id) {
                // Save to local storage for persistence
                localStorage.setItem('habitflow_user', JSON.stringify(user));
                onSelectUser(user);
            } else if (user && user.message) {
                setError(user.message);
            } else {
                setError('Authentication failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Auth error:', err);
            setError('Failed to connect to server. Please ensure backend is running and MongoDB is connected.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'var(--bg-app)',
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--bg-card)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid var(--border-strong)',
                boxShadow: 'var(--shadow-lg)',
                maxWidth: '440px',
                width: '100%',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        width: '64px', height: '64px',
                        background: 'var(--primary-light)',
                        borderRadius: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--primary)',
                        marginBottom: '1rem',
                        transform: 'rotate(-5deg)'
                    }}>
                        <User size={32} />
                    </div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 800 }}>
                        {isLogin ? 'Welcome Back' : 'Get Started'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Login to continue your habit journey' : 'Create an account to track your habits'}
                    </p>
                </div>

                {error && (
                    <div style={{
                        color: 'var(--error)',
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {!isLogin && (
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                <User size={18} />
                            </div>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.85rem 1rem 0.85rem 3rem',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-light)',
                                    background: 'var(--bg-subtle)',
                                    color: 'var(--text-main)',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    )}

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                            <Mail size={18} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 3rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-light)',
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '0.85rem 1rem 0.85rem 3rem',
                                borderRadius: '12px',
                                border: '1px solid var(--border-light)',
                                background: 'var(--bg-subtle)',
                                color: 'var(--text-main)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            borderRadius: '12px',
                            background: 'var(--primary)',
                            color: 'white',
                            border: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            marginTop: '0.5rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px var(--shadow-color)'
                        }}
                    >
                        {isLoading ? (
                            'Processing...'
                        ) : (
                            <>
                                {isLogin ? 'Login' : 'Create Account'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError(null);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                marginLeft: '0.5rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
