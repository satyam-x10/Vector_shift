// visualizationNode.js
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { VscGraph } from 'react-icons/vsc';

export const VisualizationNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Visualization"
      icon={VscGraph}
      color="#ec4899" // Pink
      handles={[{ type: 'target', position: Position.Left, id: 'data' }]}
    >
      <span>Visualize Results</span>
    </BaseNode>
  );
};
