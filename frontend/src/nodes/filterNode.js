// filterNode.js
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { VscFilter } from 'react-icons/vsc';

export const FilterNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      icon={VscFilter}
      color="#f97316" // Orange
      handles={[
        { type: 'target', position: Position.Left, id: 'input' },
        { type: 'source', position: Position.Right, id: 'output' },
      ]}
    >
      <span>Filter Data</span>
    </BaseNode>
  );
};
