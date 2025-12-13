// toolbar.js
import { DraggableNode } from './draggableNode';
import {
  VscSymbolInterface,
  VscSymbolKeyword,
  VscSymbolString,
  VscSymbolConstant,
  VscFilter,
  VscCloud,
  VscDatabase,
  VscGraph,
  VscCircuitBoard,
} from 'react-icons/vsc';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <DraggableNode
        type="customInput"
        label="Input"
        icon={VscSymbolInterface}
        color="#10b981"
      />
      <DraggableNode
        type="llm"
        label="LLM"
        icon={VscCircuitBoard}
        color="#8b5cf6"
      />
      <DraggableNode
        type="customOutput"
        label="Output"
        icon={VscSymbolKeyword}
        color="#f43f5e"
      />
      <DraggableNode
        type="text"
        label="Text"
        icon={VscSymbolString}
        color="#f59e0b"
      />
      <DraggableNode
        type="transform"
        label="Transform"
        icon={VscSymbolConstant}
        color="#3b82f6"
      />
      <DraggableNode
        type="filter"
        label="Filter"
        icon={VscFilter}
        color="#f97316"
      />
      <DraggableNode type="api" label="API" icon={VscCloud} color="#06b6d4" />
      <DraggableNode
        type="database"
        label="Database"
        icon={VscDatabase}
        color="#64748b"
      />
      <DraggableNode
        type="visualization"
        label="Visualize"
        icon={VscGraph}
        color="#ec4899"
      />
    </div>
  );
};
