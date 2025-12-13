// apiNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      handles={[
        { type: 'target', position: Position.Left, id: 'request' },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <span>External API Call</span>
    </BaseNode>
  );
};
