// databaseNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      handles={[
        { type: 'target', position: Position.Left, id: 'query' },
        { type: 'source', position: Position.Right, id: 'result' }
      ]}
    >
      <span>Database Query</span>
    </BaseNode>
  );
};
