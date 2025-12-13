// inputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscSymbolInterface } from 'react-icons/vsc';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon={VscSymbolInterface}
      color="#10b981" // Emerald
      handles={[
        { type: 'source', position: Position.Right, id: 'value' },
        { type: 'target', position: Position.Left, id: 'in-test' } // Added to enable cycles for testing
      ]}
    >
      <label style={{ display: 'block', marginBottom: '5px' }}>
        Name:
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          style={{ marginLeft: '5px' }}
        />
      </label>
      <label style={{ display: 'block' }}>
        Type:
        <select value={inputType} onChange={handleTypeChange} style={{ marginLeft: '5px' }}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
}
