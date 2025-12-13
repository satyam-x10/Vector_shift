// textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Dynamic Resizing
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Variable Detection
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const variables = Array.from(new Set(matches.map(m => m[1])));

    const newHandles = [
      ...variables.map((variable, i) => ({
        type: 'target',
        position: Position.Left,
        id: variable,
        style: { top: `${(i + 1) * 100 / (variables.length + 1)}%` }
      })),
      { type: 'source', position: Position.Right, id: 'output' }
    ];

    setHandles(newHandles);
    
    // updateNodeInternals needs to be called after state update, but here we are setting state.
    // Ideally we wait for render? Or just call it.
    // ReactFlow docs say to call it passing the node id.
    // We should put this in a separate effect that watches 'handles' or simply call it here.
    // However, setHandles is async (batch). 
    // We can use a setTimeout or a separate useEffect on [handles].
    
  }, [currText]);

  // Separate effect to trigger internals update when handles actually change
  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
    >
      <label style={{ display: 'block', height: '100%' }}>
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          style={{ 
            width: '100%', 
            boxSizing: 'border-box', 
            minHeight: '40px',
            resize: 'none',
            overflow: 'hidden'
          }}
        />
      </label>
    </BaseNode>
  );
}
