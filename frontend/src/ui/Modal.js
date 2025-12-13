// ui/Modal.js
import React from 'react';

export const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                background: '#1e1e2e',
                border: '1px solid #3f3f46',
                borderRadius: '12px',
                padding: '24px',
                width: '400px',
                maxWidth: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                color: '#fff',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>
                <div style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 600, 
                    marginBottom: '16px',
                    borderBottom: '1px solid #3f3f46',
                    paddingBottom: '12px'
                }}>
                    {title}
                </div>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#d1d5db' }}>
                    {children}
                </div>
                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={onClose}
                        style={{
                            backgroundColor: '#6366f1',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
