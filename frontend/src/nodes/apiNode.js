// apiNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscCloud } from 'react-icons/vsc';

export const APINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="API"
      icon={VscCloud}
      color="#06b6d4" // Cyan
      handles={[
        { type: 'target', position: Position.Left, id: 'request' },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <span>External API Call</span>
    </BaseNode>
  );
};
