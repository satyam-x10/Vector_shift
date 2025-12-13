import React from 'react';

export const NodeButton = ({ onClick, title, icon: Icon, className = 'node-delete-btn' }) => {
    return (
        <button className={className} onClick={onClick} title={title}>
            {Icon ? <Icon /> : '×'}
        </button>
    );
};
