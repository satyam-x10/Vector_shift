// databaseNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscDatabase } from 'react-icons/vsc';

export const DatabaseNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      icon={VscDatabase}
      color="#64748b" // Slate
      handles={[
        { type: 'target', position: Position.Left, id: 'query' },
        { type: 'source', position: Position.Right, id: 'result' },
      ]}
    >
      <span>Database Query</span>
    </BaseNode>
  );
};
