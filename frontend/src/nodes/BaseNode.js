// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, children, handles = [] }) => {
  return (
    <div className="custom-node">
      <div className="custom-node-header">
        {title}
      </div>
      <div className="custom-node-body">
        {children}
      </div>

      {handles.map((handle, index) => (
        <Handle
          key={`${id}-${handle.id}-${index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${handle.type}-${index}`} 
          style={handle.style || {}}
        />
      ))}
    </div>
  );
};
