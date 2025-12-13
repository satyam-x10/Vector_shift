// llmNode.js
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { VscCircuitBoard } from 'react-icons/vsc';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      icon={VscCircuitBoard}
      color="#8b5cf6" // Violet
      handles={[
        { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: 'response' }
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
