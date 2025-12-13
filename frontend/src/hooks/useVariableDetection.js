import { useMemo } from 'react';

export const useVariableDetection = (text) => {
    return useMemo(() => {
        const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
        const matches = [...text.matchAll(regex)];
        return Array.from(new Set(matches.map((m) => m[1])));
    }, [text]);
};
