import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { VscSymbolString } from 'react-icons/vsc';
import { useVariableDetection } from '../hooks/useVariableDetection';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [variableValues, setVariableValues] = useState(data?.variables || {});
  const [isCollapsed, setIsCollapsed] = useState(true);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Dynamic Resizing
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const variables = useVariableDetection(currText);

  // Handle Updates
  useEffect(() => {
    const newHandles = [
      { type: 'source', position: Position.Right, id: 'output' },
    ];
    setHandles(newHandles);
  }, []); // Only runs once now as output handle is static

  // Separate effect to trigger internals update when variable count changes
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const handleVariableChange = (variable, value) => {
    setVariableValues((prev) => ({
      ...prev,
      [variable]: value,
    }));
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      icon={VscSymbolString}
      color="#f59e0b" // Amber
      handles={handles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ display: 'block' }}>
          <span style={{ fontSize: '12px', color: '#888', marginBottom: '4px', display: 'block' }}>Text Template</span>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="nodrag"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              minHeight: '60px',
              resize: 'none',
              overflow: 'hidden',
              background: '#1e1e2e',
              color: '#eee',
              border: '1px solid #444',
              borderRadius: '4px',
              padding: '8px',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
          />
        </label>

        {variables.length > 0 && (
          <div className="variable-viewer">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="variable-collapse-btn"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: '#f59e0b',
                fontSize: '11px',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span style={{
                transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)',
                transition: 'transform 0.2s',
                display: 'inline-block'
              }}>▶</span>
              Variables ({variables.length})
            </button>

            {!isCollapsed && (
              <div className="variable-list" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginTop: '5px',
                padding: '8px',
                background: '#252535',
                borderRadius: '6px',
                border: '1px solid #333'
              }}>
                {variables.map((variable) => (
                  <div key={variable} style={{ display: 'flex', flexDirection: 'column', gap: '2px', position: 'relative' }}>
                    <Handle
                      type="source"
                      position={Position.Right}
                      id={variable}
                      style={{
                        right: '-28px', // Adjust based on padding
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    />
                    <label style={{ fontSize: '10px', color: '#aaa' }}>{variable}</label>
                    <input
                      type="text"
                      className="nodrag"
                      value={variableValues[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                      placeholder={`Value for ${variable}`}
                      style={{
                        background: '#151520',
                        border: '1px solid #444',
                        color: '#eee',
                        borderRadius: '3px',
                        padding: '4px 6px',
                        fontSize: '11px',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
