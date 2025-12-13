import React from 'react';

export const InputControl = ({ label, value, onChange, type = 'text', placeholder = '', style = {} }) => {
    return (
        <label style={{ display: 'block', marginBottom: '5px', ...style }}>
            {label && <span style={{ marginRight: '5px' }}>{label}:</span>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="nodrag"
                style={{ marginLeft: label ? '0' : '5px' }} // Adjusted margin logic
            />
        </label>
    );
};
