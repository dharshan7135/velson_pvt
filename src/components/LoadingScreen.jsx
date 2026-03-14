import React from 'react';
import logo from '../assets/logo.png';

const LoadingScreen = () => (
    <div style={{
        position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#0a1628',
        zIndex: 9999,
    }}>
        <div style={{ textAlign: 'center' }}>
            <img
                src={logo}
                alt="Velson"
                style={{
                    width: 270,
                    animation: 'logoBlink 1s ease-in-out infinite',
                }}
            />
            <style>{`
                @keyframes logoBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.2; }
                }
            `}</style>
        </div>
    </div>
);

export default LoadingScreen;
