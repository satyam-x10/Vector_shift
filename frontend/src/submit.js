// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Modal } from './ui/Modal';
import { VscDebugStart, VscLoading, VscCheck, VscSymbolClass, VscLink, VscError } from 'react-icons/vsc';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [modalData, setModalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        // Filter edges to ensure they connect to existing nodes
        const nodeIds = new Set(nodes.map((n) => n.id));
        const validEdges = edges.filter(
            (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target)
        );

        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges: validEdges }),
            });

            const data = await response.json();
            setModalData(data);
        } catch (error) {
            console.error(error);
            alert('Error submitting pipeline. Ensure backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                bottom: '30px',
                right: '30px',
            }}
        >
            {!isLoading && (
                <button className="btn-primary" type="submit" onClick={handleSubmit}>
                    <VscDebugStart style={{ fontSize: '18px' }} />
                </button>
            )}
            {isLoading && (
                <button className="btn-primary" type="submit">
                    <VscLoading
                        style={{
                            fontSize: '18px',
                            animation: 'spin 1s linear infinite',
                        }}
                    />{' '}
                    <style>
                        {`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}
                    </style>{' '}
                </button>
            )}


            <Modal
                isOpen={!!modalData}
                onClose={() => setModalData(null)}
                title="Pipeline Analysis"
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '12px',
                            marginBottom: '8px',
                        }}
                    >
                        {/* Nodes */}
                        <div
                            style={{
                                padding: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <VscSymbolClass size={24} color="#a1a1aa" />
                                <span
                                    style={{
                                        color: '#a1a1aa',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Nodes
                                </span>
                            </div>
                            <span style={{ fontSize: '20px', fontWeight: '600', color: '#e4e4e7' }}>
                                {modalData?.num_nodes}
                            </span>
                        </div>

                        {/* Edges */}
                        <div
                            style={{
                                padding: '12px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <VscLink size={24} color="#a1a1aa" />
                                <span
                                    style={{
                                        color: '#a1a1aa',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    Edges
                                </span>
                            </div>
                            <span style={{ fontSize: '20px', fontWeight: '600', color: '#e4e4e7' }}>
                                {modalData?.num_edges}
                            </span>
                        </div>
                    </div>

                    {/* DAG status */}
                    <div
                        style={{
                            padding: '16px',
                            background: modalData?.is_dag
                                ? 'rgba(74, 222, 128, 0.1)'
                                : 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '8px',
                            border: `1px solid ${modalData?.is_dag
                                ? 'rgba(74, 222, 128, 0.2)'
                                : 'rgba(239, 68, 68, 0.2)'
                                }`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                        }}
                    >
                        {modalData?.is_dag ? (
                            <VscCheck size={24} color="#4ade80" />
                        ) : (
                            <VscError size={24} color="#ef4444" />
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span
                                style={{
                                    fontWeight: '600',
                                    color: modalData?.is_dag ? '#4ade80' : '#ef4444',
                                    fontSize: '15px',
                                }}
                            >
                                {modalData?.is_dag ? 'Pipeline is Healthy' : 'Invalid Pipeline'}
                            </span>
                            <span
                                style={{
                                    color: '#d4d4d8',
                                    fontSize: '13px',
                                    marginTop: '2px',
                                }}
                            >
                                {modalData?.is_dag
                                    ? 'Successfully validated as a Directed Acyclic Graph.'
                                    : 'Cycle detected. Please check node connections.'}
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};
