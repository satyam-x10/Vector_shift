// transformNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' }
      ]}
    >
      <span>Transform Data</span>
    </BaseNode>
  );
};
