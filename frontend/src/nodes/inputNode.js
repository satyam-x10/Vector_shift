import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { VscSymbolInterface } from 'react-icons/vsc';
import { useNodeForm } from '../hooks/useNodeForm';
import { InputControl } from '../components/InputControl';
import { SelectControl } from '../components/SelectControl';

export const InputNode = ({ id, data }) => {
  const [values, handleChange] = useNodeForm({
    currName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data.inputType || 'Text',
  });

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      icon={VscSymbolInterface}
      color="#10b981" // Emerald
      handles={[
        { type: 'source', position: Position.Right, id: 'value' },
        { type: 'target', position: Position.Left, id: 'in-test' },
      ]}
    >
      <InputControl
        label="Name"
        value={values.currName}
        onChange={handleChange('currName')}
      />
      <SelectControl
        label="Type"
        value={values.inputType}
        onChange={handleChange('inputType')}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ]}
      />
    </BaseNode>
  );
};
