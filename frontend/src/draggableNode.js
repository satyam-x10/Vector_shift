// draggableNode.js

export const DraggableNode = ({ type, label, icon: Icon, color }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`draggable-node ${type}`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
            borderColor: color,
            color: '#fff' // keep text white
        }}
        draggable
      >
          {Icon && <Icon style={{ marginRight: '8px', color: color }} />}
          <span>{label}</span>
      </div>
    );
  };
  