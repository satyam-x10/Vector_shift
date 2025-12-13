// outputNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscSymbolKeyword } from 'react-icons/vsc';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon={VscSymbolKeyword}
      color="#f43f5e" // Rose
      handles={[
        { type: 'target', position: Position.Left, id: 'value' },
        { type: 'source', position: Position.Right, id: 'out-test' }, // Added to enable cycles for testing
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
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{ marginLeft: '5px' }}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
