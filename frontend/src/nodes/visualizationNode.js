// visualizationNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const VisualizationNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="Visualization"
      handles={[
        { type: 'target', position: Position.Left, id: 'data' }
      ]}
    >
      <span>Visualize Results</span>
    </BaseNode>
  );
};
