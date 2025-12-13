
import React from 'react';
import { VscClose } from 'react-icons/vsc';

export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
      <div style={{
        background: '#18181b', // zinc-900
        border: '1px solid #3f3f46',
        borderRadius: '12px',
        padding: '24px',
        width: '420px',
        maxWidth: '90%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        color: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }} onClick={e => e.stopPropagation()}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #27272a', // zinc-800
          paddingBottom: '12px',
          marginBottom: '4px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#f4f4f5'
          }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a1a1aa',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.color = '#fff';
              e.target.style.background = '#3f3f46';
            }}
            onMouseLeave={e => {
              e.target.style.color = '#a1a1aa';
              e.target.style.background = 'transparent';
            }}
          >
            <VscClose size={20} />
          </button>
        </div>

        <div style={{ color: '#d4d4d8', fontSize: '0.95rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};
