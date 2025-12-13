import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { VscSymbolKeyword } from 'react-icons/vsc';
import { useNodeForm } from '../hooks/useNodeForm';
import { InputControl } from '../components/InputControl';
import { SelectControl } from '../components/SelectControl';

export const OutputNode = ({ id, data }) => {
  const [values, handleChange] = useNodeForm({
    currName: data?.outputName || id.replace('customOutput-', 'output_'),
    outputType: data.outputType || 'Text',
  });

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      icon={VscSymbolKeyword}
      color="#f43f5e" // Rose
      handles={[
        { type: 'target', position: Position.Left, id: 'value' },
        { type: 'source', position: Position.Right, id: 'out-test' },
      ]}
    >
      <InputControl
        label="Name"
        value={values.currName}
        onChange={handleChange('currName')}
      />
      <SelectControl
        label="Type"
        value={values.outputType}
        onChange={handleChange('outputType')}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'Image' },
        ]}
      />
    </BaseNode>
  );
};
