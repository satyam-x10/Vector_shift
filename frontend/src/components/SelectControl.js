import React from 'react';

export const SelectControl = ({ label, value, onChange, options = [], style = {} }) => {
    return (
        <label style={{ display: 'block', marginBottom: '5px', ...style }}>
            {label && <span style={{ marginRight: '5px' }}>{label}:</span>}
            <select value={value} onChange={onChange} className="nodrag">
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
};
