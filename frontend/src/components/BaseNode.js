// BaseNode.js
import { Handle, Position, useReactFlow } from 'reactflow';

export const BaseNode = ({
  id,
  data,
  title,
  children,
  handles = [],
  icon: Icon,
  color = '#6366f1',
}) => {
  const { setNodes } = useReactFlow();

  const onDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
  };

  return (
    <div className="custom-node" style={{ borderColor: color }}>
      <div
        className="custom-node-header"
        style={{
          color: color,
          borderBottomColor: `${color}40`,
          background: `${color}10`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon style={{ fontSize: '16px' }} />}
          <span>{title}</span>
        </div>
        <button
          className="node-delete-btn"
          onClick={onDelete}
          title="Delete Node"
        >
          ×
        </button>
      </div>
      <div className="custom-node-body">{children}</div>

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
