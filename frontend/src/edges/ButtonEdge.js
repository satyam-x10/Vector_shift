import React from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    useReactFlow,
} from 'reactflow';

import { useStore } from '../store';
import { shallow } from 'zustand/shallow';

import { RxCross2 } from "react-icons/rx";

const selector = (state) => ({
    deleteEdge: state.deleteEdge,
});

export default function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    selected,
}) {
    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const { deleteEdge } = useStore(selector, shallow);

    const onEdgeClick = (evt, id) => {
        evt.stopPropagation();
        deleteEdge(id);
    };

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            {selected && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                    >
                        <button
                            className="edgebutton"
                            style={{
                                width: '20px',
                                height: '20px',
                                background: '#303030ff',
                                border: '1px solid #fff',
                                cursor: 'pointer',
                                borderRadius: '50%',
                                fontSize: '12px',
                                lineHeight: 1,
                                color: 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onClick={(event) => onEdgeClick(event, id)}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}
