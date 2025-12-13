// transformNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscSymbolConstant } from 'react-icons/vsc';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      icon={VscSymbolConstant}
      color="#3b82f6" // Blue
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      <span>Transform Data</span>
    </BaseNode>
  );
};
