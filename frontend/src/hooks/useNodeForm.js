import { useState } from 'react';

export const useNodeForm = (initialState) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (key) => (e) => {
        setValues((prev) => ({ ...prev, [key]: e.target.value }));
    };

    return [values, handleChange, setValues];
};
