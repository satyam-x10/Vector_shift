// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { Modal } from './ui/Modal';

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
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
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
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button type="submit" onClick={handleSubmit}>
                    {isLoading ? 'Scanning...' : 'Submit Pipeline'}
                </button>
            </div>
            
            <Modal
                isOpen={!!modalData}
                onClose={() => setModalData(null)}
                title="Pipeline Analysis"
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ width: '120px', color: '#9ca3af' }}>Nodes:</span>
                        <span style={{ fontWeight: 'bold' }}>{modalData?.num_nodes}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ width: '120px', color: '#9ca3af' }}>Edges:</span>
                        <span style={{ fontWeight: 'bold' }}>{modalData?.num_edges}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                        <span style={{ width: '120px', color: '#9ca3af' }}>Status:</span>
                        <span style={{ 
                            fontWeight: 'bold', 
                            color: modalData?.is_dag ? '#4ade80' : '#ef4444' 
                        }}>
                            {modalData?.is_dag ? 'Directed Acyclic Graph (DAG)' : 'Cycle Detected (Not a DAG)'}
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
}
